const fetchGithubData = async (url) => {
  try {
    const repoOwner = url.split("/").pop();
    const query = `
      query($repoOwner: String!) {
        user(login: $repoOwner) {
          repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
            nodes {
              stargazerCount
            }
            pageInfo {
              hasNextPage
              endCursor
            }
            totalCount
          }
        }
      }
    `;

    const variables = { repoOwner: "tuckpuck" };

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from GitHub");
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const repos = data.data.user.repositories.nodes;
    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazerCount,
      0
    );
    console.log("stars:", totalStars, " | error:", error);
    return { stars: totalStars, error: null };
  } catch (error) {
    console.error(`Error fetching GitHub data: ${error.message}`);
    return { stars: null, error: error.message };
  }
};

export default fetchGithubData;
