import React, { useEffect, useState, useCallback } from "react";

const StarBadge = ({ githubURL }) => {
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllRepos = useCallback(async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const repos = await response.json();
    const nextLink = response.headers
      .get("Link")
      ?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
    return { repos, nextLink };
  }, []);

  const fetchStars = useCallback(async () => {
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
  }, [githubURL, fetchAllRepos]);

  useEffect(() => {
    fetchStars();
  }, [fetchStars]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <a href={githubURL} target="_blank" rel="noopener noreferrer">
      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
          className="mr-1 inline-block h-4 w-4 align-text-bottom text-gray-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          ></path>
        </svg>

        <span className="stars">{stars}</span>
      </span>
    </a>
  );
};

export default StarBadge;
