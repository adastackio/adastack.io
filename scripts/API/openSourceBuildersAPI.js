const githubAPICall = async (name) => {
  let url = `https://api.github.com/users/${name}/repos?per_page=100`;
  let totalStars = 0;
  let allRepos = [];
  let mostRecentRepo = null;
  let mostRecentDate = null;

  while (url) {
    let response = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (response.status === 404 && url.includes("/users/")) {
      // If user not found, try as an organization
      url = `https://api.github.com/orgs/${name}/repos?per_page=100`;
      response = await fetch(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      });
    }

    if (!response.ok) {
      const errorMessage = `HTTP error! Status: ${response.status}, Text: ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const repos = await response.json();
    allRepos = allRepos.concat(repos);
    totalStars += repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    // Find the most recently committed repository
    repos.forEach((repo) => {
      const pushedAt = new Date(repo.pushed_at);
      if (!mostRecentDate || pushedAt > mostRecentDate) {
        mostRecentDate = pushedAt;
        mostRecentRepo = repo;
      }
    });

    const linkHeader = response.headers.get("Link");
    url = linkHeader?.match(/<([^>]+)>;\s*rel="next"/)?.[1] || null;
  }

  // Calculate time difference for the most recent commit
  let timeSinceLastCommit = null;
  if (mostRecentRepo) {
    const now = new Date();
    const timeDifference = now - mostRecentDate;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    timeSinceLastCommit = `${days} days, ${hours} hours, and ${minutes} minutes`;
  }


  return {
    totalStars,
    repos: allRepos,
    mostRecentRepo: mostRecentRepo
      ? {
          url: mostRecentRepo.html_url,
          timeSinceLastCommit,
        }
      : null,
  };
};

const openSourceBuildersAPI = async (teamData) => {
  return Promise.all(
    teamData.map(async (member) => {
      try {
        const urlParts = new URL(member.teamURL).pathname
          .split("/")
          .filter(Boolean);
        const repoOwner = urlParts[0];
        const { totalStars, repos, mostRecentRepo } = await githubAPICall(
          repoOwner
        );
        return {
          ...member,
          stars: totalStars,
          repos,
          mostRecentRepo,
          error: null,
        };
      } catch (error) {
        console.error(error);
        return {
          ...member,
          stars: null,
          repos: null,
          mostRecentRepo: null,
          error: `${error}`,
        };
      }
    })
  );
};

export default openSourceBuildersAPI;
