// components/Stars.js

import React, { useState, useEffect } from "react";

function Stars({ repoURL }) {
  const [stars, setStars] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(repoURL);
    const fetchGitHubStars = async () => {
      try {
        const response = await fetch(repoURL, {
          headers: {
            Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub stars");
        }

        const data = await response.json();
        setStars(data.stargazers_count || "N/A");
      } catch (err) {
        console.error(err);
        setError("Unable to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStars();
  }, [repoURL]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;

  return (
    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
      {stars}
    </span>
  );
}

export default Stars;
