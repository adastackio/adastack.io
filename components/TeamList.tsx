import React, { useState } from "react";
import TeamItem from "./TeamItem";

const teamsData = [
  {
    name: "Input Output Global",
    url: "https://iohk.io/",
    repoURL: "https://github.com/input-output-hk/",
  },
  {
    name: "Tweag",
    url: "https://www.tweag.io/",
    repoURL: "https://github.com/tweag",
  },
  // Add all other teams similarly...
];

const TeamList = () => {
  const [teams, setTeams] = useState(teamsData);
  const [sortOrder, setSortOrder] = useState("asc");

  const sortTeams = () => {
    const sortedTeams = [...teams].sort((a, b) => {
      return sortOrder === "asc" ? a.stars - b.stars : b.stars - a.stars;
    });
    setTeams(sortedTeams);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };


  return (
    <div>
      <button onClick={sortTeams}>Sort by Stars</button>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Stars</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.name}>
              <td>
                <a href={team.url}>{team.name}</a>
              </td>
              <td>
                <TeamItem repoURL={team.repoURL} />
              </td>
              <td>{team.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamList;
