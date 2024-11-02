import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Octokit } from "@octokit/rest";

// Add the locale to TimeAgo
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

// Initialize Octokit with auth token
const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
  userAgent: "adastack.io v1.0",
  retry: { enabled: true },
  throttle: {
    onRateLimit: (retryAfter, options) => {
      console.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );
      if (options.request.retryCount <= 2) {
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onSecondaryRateLimit: (retryAfter, options) => {
      console.warn(
        `Secondary rate limit hit for request ${options.method} ${options.url}`
      );
      if (options.request.retryCount <= 2) {
        return true;
      }
    },
  },
});

const fetchAllRepos = async (owner, type = "users") => {
  try {
    const repos = [];
    let page = 1;

    while (true) {
      const response = await octokit.rest.repos
        .listForUser({
          username: owner,
          per_page: 100,
          page,
          sort: "pushed",
          direction: "desc",
        })
        .catch(async (error) => {
          if (error.status === 404 && type === "users") {
            // Try as organization if user not found
            return octokit.rest.repos.listForOrg({
              org: owner,
              per_page: 100,
              page,
              sort: "pushed",
              direction: "desc",
            });
          }
          throw error;
        });

      const currentRepos = response.data;
      if (currentRepos.length === 0) break;

      repos.push(...currentRepos);
      if (currentRepos.length < 100) break;
      page++;
    }

    return repos;
  } catch (error) {
    console.error(`Error fetching repos for ${owner}:`, error);
    throw error;
  }
};

const calculateRepoStats = (repos) => {
  if (!repos || repos.length === 0) return null;

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const mostRecentRepo = repos[0]; // Already sorted by pushed_at desc
  const mostRecentDate = new Date(mostRecentRepo.pushed_at);
  const timeSinceLastCommit = timeAgo.format(mostRecentDate);

  return {
    totalStars,
    repos,
    mostRecentRepo: {
      url: mostRecentRepo.html_url,
      timeSinceLastCommit,
      name: mostRecentRepo.name,
      description: mostRecentRepo.description,
      stars: mostRecentRepo.stargazers_count,
      language: mostRecentRepo.language,
      pushedAt: mostRecentRepo.pushed_at,
    },
  };
};

const openSourceBuildersAPI = async (teamData) => {
  return Promise.all(
    teamData.map(async (member) => {
      try {
        if (!member.teamGithubURL) {
          throw new Error("Team URL is missing");
        }

        const urlParts = new URL(member.teamGithubURL).pathname
          .split("/")
          .filter(Boolean);

        const repoOwner = urlParts[0];
        if (!repoOwner) {
          throw new Error("Invalid GitHub URL");
        }

        const repos = await fetchAllRepos(repoOwner);
        const stats = calculateRepoStats(repos);

        return {
          ...member,
          stars: stats.totalStars,
          repos: stats.repos,
          mostRecentRepo: stats.mostRecentRepo,
          error: null,
        };
      } catch (error) {
        console.error(`Error processing ${member.teamGithubURL}:`, error);
        return {
          ...member,
          stars: null,
          repos: null,
          mostRecentRepo: null,
          error: error.message || "An unknown error occurred",
        };
      }
    })
  );
};

export default openSourceBuildersAPI;
