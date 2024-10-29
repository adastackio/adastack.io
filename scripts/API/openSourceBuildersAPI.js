const fetchGitHubStars = async (name) => {
  let url = `https://api.github.com/users/${name}/repos?per_page=100`;
  let totalStars = 0;
  let allRepos = [];

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

    const linkHeader = response.headers.get("Link");
    url = linkHeader?.match(/<([^>]+)>;\s*rel="next"/)?.[1] || null;
  }

  return { totalStars, repos: allRepos };
};

const openSourceBuildersAPI = async (teamData) => {
  return Promise.all(
    teamData.map(async (member) => {
      try {
        const urlParts = new URL(member.teamURL).pathname
          .split("/")
          .filter(Boolean);
        const repoOwner = urlParts[0];
        const { totalStars, repos } = await fetchGitHubStars(repoOwner);
        return { ...member, stars: totalStars, repos, error: null };
      } catch (error) {
        console.error(`Error fetching data for ${member.name}:`, error);
        return {
          ...member,
          stars: null,
          repos: null,
          error: `${error}`,
        };
      }
    })
  );
};

export default openSourceBuildersAPI;
