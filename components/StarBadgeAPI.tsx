import React, { useEffect, useState } from "react";

const StarBadgeAPI = ({ githubURL }) => {
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllRepos = async (url) => {
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data from GitHub API");
      }
      const repos = await response.json();
      const nextLink = response.headers
        .get("Link")
        ?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
      return { repos, nextLink };
    };

    const fetchStars = async () => {
      try {
        const user = githubURL.split("/").pop().replace(/\/$/, "");
        let url = `https://api.github.com/users/${user}/repos?per_page=100`;
        let totalStars = 0;

        while (url) {
          const { repos, nextLink } = await fetchAllRepos(url);
          totalStars += repos.reduce(
            (sum, repo) => sum + repo.stargazers_count,
            0
          );
          url = nextLink;
        }

        setStars(totalStars);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stars:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStars();
  }, [githubURL]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>This user's repositories have {stars} stars in total.</div>;
};

export default StarBadgeAPI;
