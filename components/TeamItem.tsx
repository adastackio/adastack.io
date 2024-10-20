import React, { useEffect, useState, useCallback } from "react";

const isValidRepoURL = (url) => {
  try {
    const parsedURL = new URL(url);
    const isGitHub = parsedURL.hostname === "github.com";
    const pathParts = parsedURL.pathname.split("/").filter(Boolean);

    return isGitHub && pathParts.length >= 1;
  } catch (error) {
    console.error("Error parsing URL:", error);
    return false;
  }
};

// Memoized StarIcon component
const StarIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    aria-hidden="true"
    data-slot="icon"
    className="mr-1 inline-block h-4 w-4 align-text-bottom text-gray-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
));

const TeamItem = React.memo(({ repoURL }) => {
  const [stars, setStars] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all GitHub repos for a user or organization
  const fetchAllGitHubRepos = useCallback(async (url, name) => {
    let response = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    if (response.status === 404) {
      // If user not found, try organization endpoint
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
    const nextLink = response.headers
      .get("Link")
      ?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
    return { repos, nextLink };
  }, []);

  // Function to fetch total star count for a GitHub user or organization
  const fetchGitHubStars = useCallback(
    async (name) => {
      let url = `https://api.github.com/users/${name}/repos?per_page=100`;
      let totalStars = 0;

      while (url) {
        const { repos, nextLink } = await fetchAllGitHubRepos(url, name);
        totalStars += repos.reduce(
          (sum, repo) => sum + repo.stargazers_count,
          0
        );
        url = nextLink;
      }
      return totalStars;
    },
    [fetchAllGitHubRepos]
  );

  // Main function to fetch stars
  const fetchStars = useCallback(async () => {
    if (!isValidRepoURL(repoURL)) {
      console.error("Error: Invalid repository URL");
      setError("Error: Invalid URL");
      setLoading(false);
      return;
    }

    try {
      const urlParts = new URL(repoURL).pathname.split("/").filter(Boolean);
      const owner = urlParts[0];
      const starCount = await fetchGitHubStars(owner);

      setStars(starCount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stars:", error);
      setError("Unable to fetch data");
      setLoading(false);
    }
  }, [repoURL, fetchGitHubStars]);

  // Effect to trigger star fetching
  useEffect(() => {
    fetchStars();
  }, [fetchStars]);

  // Determine badge content based on loading/error state
  const getBadgeContent = () => {
    if (loading) return "Loading...";
    if (error) return error;
    return stars !== null ? stars.toLocaleString() : "N/A";
  };

  // Render the star badge
  return (
    <a href={repoURL} target="_blank" rel="noopener noreferrer">
      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
        <StarIcon />
        <span className="stars">{getBadgeContent()}</span>
      </span>
    </a>
  );
});

export default TeamItem;
