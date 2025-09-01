import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Octokit } from "@octokit/rest";
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";

const MyOctokit = Octokit.plugin(retry, throttling);

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const octokit = new MyOctokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
  userAgent: "adastack.io v1.0",
  retry: {
    enabled: true,
    retries: 5,
    doNotRetry: ["429"],
  },
  request: {
    timeout: 60000, // 60 seconds
  },
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );
      if (retryCount < 3) {
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onSecondaryRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(
        `Secondary rate limit hit for request ${options.method} ${options.url}`
      );
      if (retryCount < 2) {
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter, options, octokit) => {
      octokit.log.warn(
        `Abuse detection triggered for request ${options.method} ${options.url}`
      );
      return false;
    },
    fallbackSecondaryRateRetryAfter: 60,
  },
});

const fetchAllRepos = async (owner, type = "users") => {
  try {
    const repos = [];
    let page = 1;
    let totalStars = 0;

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

      // Only keep essential fields from each repo
      const trimmedRepos = currentRepos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        pushed_at: repo.pushed_at,
      }));

      repos.push(...trimmedRepos);
      totalStars += currentRepos.reduce(
        (sum, repo) => sum + repo.stargazers_count,
        0
      );

      if (currentRepos.length < 100) break;
      page++;
    }

    return { repos, totalStars };
  } catch (error) {
    if (error.status === 404) {
      throw new Error(`Repository owner ${owner} not found`);
    }
    if (error.status === 403 && error.message.includes("rate limit")) {
      const resetDate = new Date(
        error.response.headers["x-ratelimit-reset"] * 1000
      );
      throw new Error(
        `Rate limit exceeded. Resets at ${resetDate.toISOString()}`
      );
    }
    throw error;
  }
};

const calculateRepoStats = (repos) => {
  if (!repos || repos.length === 0) return null;

  const starCount = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const repoCount = repos.length;

  // Find most recent repo (already sorted by pushed_at)
  const mostRecentRepo = repos[0];
  const mostRecentDate = new Date(mostRecentRepo.pushed_at);
  const timeSinceLastCommit = timeAgo.format(mostRecentDate, "mini-now");

  // Find most starred repo
  const mostStarredRepo = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];
  const mostStarredDate = new Date(mostStarredRepo.pushed_at);
  const starredTimeSinceLastCommit = timeAgo.format(
    mostStarredDate,
    "mini-now"
  );

  return {
    starCount,
    repoCount,
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
    mostStarredRepo: {
      url: mostStarredRepo.html_url,
      timeSinceLastCommit: starredTimeSinceLastCommit,
      name: mostStarredRepo.name,
      description: mostStarredRepo.description,
      stars: mostStarredRepo.stargazers_count,
      language: mostStarredRepo.language,
      pushedAt: mostStarredRepo.pushed_at,
    },
  };
};

const openSourceBuildersAPI = async (teamData) => {
  // Filter out teams with empty GitHub URLs first
  const validTeams = teamData.filter(team => team.teamGithubURL && team.teamGithubURL.trim() !== "");
  
  // Add timeout wrapper for each team processing
  const processTeamWithTimeout = async (team, index) => {
    return Promise.race([
      new Promise(async (resolve) => {
        const result = await processTeam(team, index);
        resolve(result);
      }),
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...team,
            key: `key-${index}-${team.website}`,
            starCount: 0,
            repos: [],
            repoCount: 0,
            mostRecentRepo: null,
            mostStarredRepo: null,
            reposOnGithub: team.teamGithubURL,
            error: "Request timed out",
          });
        }, 10000); // 10 second timeout per team
      })
    ]);
  };

  const processTeam = async (team, index) => {
      try {
        // Handle URLs with missing protocol
        let githubURL = team.teamGithubURL;
        if (!githubURL.startsWith('http')) {
          githubURL = 'https://' + githubURL;
        }

        const urlParts = new URL(githubURL).pathname
          .split("/")
          .filter(Boolean);

        const repoOwner = urlParts[0];
        if (!repoOwner) {
          throw new Error("Invalid GitHub URL");
        }

        const { repos, totalStars } = await fetchAllRepos(repoOwner);
        const stats = calculateRepoStats(repos);

        const reposOnGithub = urlParts[0].startsWith("@")
          ? `https://github.com/orgs/${repoOwner.substring(1)}/repositories`
          : `https://github.com/${repoOwner}?tab=repositories`;

        // Handle case where stats might be null (no repos found)
        if (!stats) {
          return {
            ...team,
            key: `key-${index}-${team.website}`,
            starCount: 0,
            repoCount: 0,
            repos: [],
            mostRecentRepo: null,
            mostStarredRepo: null,
            reposOnGithub,
            error: null,
          };
        }

        return {
          ...team,
          key: `key-${index}-${team.website}`,
          starCount: stats.starCount,
          repoCount: stats.repoCount,
          repos: stats.repos,
          mostRecentRepo: stats.mostRecentRepo,
          mostStarredRepo: stats.mostStarredRepo,
          reposOnGithub,
          error: null,
        };
      } catch (error) {
        console.error(`Error processing ${team.teamGithubURL}:`, error);
        return {
          ...team,
          key: `key-${index}-${team.website}`,
          starCount: 0,
          repos: [],
          repoCount: 0,
          mostRecentRepo: null,
          mostStarredRepo: null,
          reposOnGithub: team.teamGithubURL, // fallback to original URL
          error: error.message || "An unknown error occurred",
        };
      }
  };

  return Promise.all(
    validTeams.map(processTeamWithTimeout)
  );
};

export default openSourceBuildersAPI;
