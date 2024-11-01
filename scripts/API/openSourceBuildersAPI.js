import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Octokit } from "@octokit/rest";
import { graphql } from "@octokit/graphql";

// Add the locale to TimeAgo
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

// Initialize Octokit with retry and throttling plugins
const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
  userAgent: 'adastack.io v1.0',
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      console.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
      if (retryCount < 5) {
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onSecondaryLimit: (retryAfter, options, octokit, retryCount) => {
      console.warn(`Secondary rate limit hit for request ${options.method} ${options.url}`);
      if (retryCount < 5) {
        return true;
      }
    },
  },
  retry: {
    doNotRetry: ["429"],
  },
});

// Initialize GraphQL with Octokit's request implementation
const graphqlWithAuth = graphql.defaults({
  request: octokit.request,
});

// GraphQL query for both users and organizations
const query = `
  query($login: String!, $afterCursor: String) {
    repositoryOwner(login: $login) {
      ... on User {
        repositories(first: 100, after: $afterCursor, orderBy: {field: PUSHED_AT, direction: DESC}) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            name
            url
            stargazerCount
            pushedAt
          }
        }
      }
      ... on Organization {
        repositories(first: 100, after: $afterCursor, orderBy: {field: PUSHED_AT, direction: DESC}) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            name
            url
            stargazerCount
            pushedAt
          }
        }
      }
    }
    rateLimit {
      remaining
      resetAt
    }
  }
`;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchAllRepos = async (owner) => {
  try {
    // First try to get user info using REST API to determine if it's a user or org
    // This leverages Octokit's built-in retry and throttling
    let ownerType;
    try {
      await octokit.users.getByUsername({ username: owner });
      ownerType = 'user';
    } catch (error) {
      if (error.status === 404) {
        await octokit.orgs.get({ org: owner });
        ownerType = 'org';
      } else {
        throw error;
      }
    }

    let hasNextPage = true;
    let afterCursor = null;
    let allRepos = [];
    let totalStars = 0;

    while (hasNextPage) {
      // Use GraphQL for efficient data fetching
      const response = await graphqlWithAuth(query, {
        login: owner,
        afterCursor,
      });

      const repos = response.repositoryOwner?.repositories;
      if (!repos) break;

      const currentRepos = repos.nodes;
      
      // Only store what we need
      const processedRepos = currentRepos.map(repo => ({
        url: repo.url,
        stargazerCount: repo.stargazerCount,
        pushedAt: repo.pushedAt
      }));
      
      allRepos.push(...processedRepos);
      totalStars += currentRepos.reduce((sum, repo) => sum + repo.stargazerCount, 0);

      // Check rate limits before continuing
      const remainingRequests = response.rateLimit.remaining;
      if (remainingRequests < 100 && repos.pageInfo.hasNextPage) {
        const resetAt = new Date(response.rateLimit.resetAt);
        const waitTime = resetAt - new Date();
        if (waitTime > 0) {
          console.warn(`Low rate limit. Waiting ${waitTime}ms before continuing`);
          await sleep(waitTime);
        }
      }

      hasNextPage = repos.pageInfo.hasNextPage;
      afterCursor = repos.pageInfo.endCursor;

      if (!hasNextPage) break;
    }

    return { repos: allRepos, totalStars };
  } catch (error) {
    // Use Octokit's error handling
    if (error.status === 404) {
      throw new Error(`Repository owner ${owner} not found`);
    }
    if (error.status === 403 && error.message.includes('rate limit')) {
      const resetDate = new Date(error.response.headers['x-ratelimit-reset'] * 1000);
      throw new Error(`Rate limit exceeded. Resets at ${resetDate.toISOString()}`);
    }
    throw error;
  }
};

const calculateRepoStats = (repos) => {
  if (!repos || repos.length === 0) return null;

  const mostRecentRepo = repos[0]; // Already sorted by pushed_at desc
  const mostRecentDate = new Date(mostRecentRepo.pushedAt);
  const timeSinceLastCommit = timeAgo.format(mostRecentDate);

  return {
    mostRecentRepo: {
      url: mostRecentRepo.url,
      timeSinceLastCommit,
    },
  };
};

const openSourceBuildersAPI = async (teamData) => {
  return Promise.all(
    teamData.map(async (member) => {
      try {
        if (!member.teamURL) {
          throw new Error('Team URL is missing');
        }

        const urlParts = new URL(member.teamURL).pathname
          .split('/')
          .filter(Boolean);
        
        const repoOwner = urlParts[0];
        if (!repoOwner) {
          throw new Error('Invalid GitHub URL');
        }

        const { repos, totalStars } = await fetchAllRepos(repoOwner);
        const stats = calculateRepoStats(repos);

        return {
          ...member,
          stars: totalStars,
          mostRecentRepo: stats.mostRecentRepo,
          error: null,
        };
      } catch (error) {
        console.error(`Error processing ${member.teamURL}:`, error);
        return {
          ...member,
          stars: null,
          mostRecentRepo: null,
          error: error.message || 'An unknown error occurred',
        };
      }
    })
  );
};

export default openSourceBuildersAPI;
