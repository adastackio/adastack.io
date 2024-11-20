import React from "react";
import { Table, Tag, Typography, Tooltip, Button, Card, Space } from "antd";
import { StarIcon } from "../../assets/icons";
import TeamGithubBadge from "@components/badges/TeamGithubBadge";
import CodeLanguageShieldIoBadge from "@components/badges/shield_io_badges/CodeLanguageShieldIoBadge";
import RepoShieldIoBadge from "@components/badges/shield_io_badges/RepoShieldIoBadge";
import Favicon from "@components/badges/Favicon";
import LatestCommitBadge from "@components/badges/LatestCommitBadge";
import MostStarredCommitBadge from "@components/badges/MostStarredCommitBadge";
import { CopyIcon, CopySuccessIcon } from "../../assets/icons";

const { Paragraph, Title } = Typography;

const capitalizeAndRemoveHypens = (name) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const RepoTooltip = ({ repo, children }) => {
  return (
    <Tooltip
      mouseEnterDelay={0.6}
      title={
        <div>
          <Title level={4} className="tooltip-title">
            {repo?.name ? capitalizeAndRemoveHypens(repo.name) : ""}
          </Title>
          {repo?.description || "No project description provided."}
          <br />
          <CodeLanguageShieldIoBadge language={repo?.language || ""} />
          <br />
          Last Commit: {repo?.timeSinceLastCommit || ""} ago
          <br />
          Github Stars: {repo?.stars || ""}
          <a href={repo?.url || ""} target="_blank">
            <div style={{ marginTop: "6px" }}>
              <Button block>See on Github</Button>
            </div>
          </a>
        </div>
      }
    >
      {children}
    </Tooltip>
  );
};

const OpenSourceBuildersTable = ({ data }) => {
  console.log(data);
  const columns = [
    {
      title: "Team",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 230,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, record) => (
        <a className="text-base team_table_name" href={record.website}>
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center">
              <Favicon url={record.website} />
              &nbsp;<span className="team_table_name_container">{name}</span>
            </span>

            <Paragraph
              className="ml-auto"
              copyable={{
                text: record.website,
                icon: [
                  <CopyIcon key="copy-icon" />,
                  <CopySuccessIcon key="copy-icon" />,
                ],
                tooltips: ["Copy Website URL", "Copied"],
              }}
            ></Paragraph>
          </div>
        </a>
      ),
    },
    {
      title: "Sum of Stars",
      dataIndex: "starCount",
      key: "starCount",
      width: 100,
      defaultSortOrder: "descend",
      sorter: {
        compare: (a, b) => a.starCount - b.starCount,
        multiple: 2,
      },
      render: (starCount, record) => {
        const getBadgeContent = () => {
          if (record.error || starCount === null || starCount === undefined) {
            record.error && console.log(record.error);
            return "...";
          } else {
            return starCount.toLocaleString();
          }
        };

        return (
          <a
            href={record.reposOnGithub}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="badge-container stars-across-all-repos-badge-container">
              <Button
                icon={<StarIcon />}
                className="badge-button stars-across-all-repos-badge-content"
              >
                {getBadgeContent()}
              </Button>
            </div>
          </a>
        );
      },
    },
    {
      title: "Most Starred Repo",
      dataIndex: ["mostStarredRepo", "pushedAt"],
      key: "pushedAt",
      width: 280,
      sorter: {
        compare: (a, b) =>
          (b.mostStarredRepo?.stars || 0) - (a.mostStarredRepo?.stars || 0),
        multiple: 2,
      },
      render: (pushedAt, record) => (
        <RepoTooltip repo={record.mostStarredRepo}>
          <div>
            <MostStarredCommitBadge
              repoURL={record.mostStarredRepo?.url || ""}
              repoStarCount={record.mostStarredRepo?.stars || ""}
            />
          </div>
        </RepoTooltip>
      ),
    },
    {
      title: "Latest Commit",
      dataIndex: ["mostRecentRepo", "url"],
      key: "url",
      width: 280,
      sorter: {
        compare: (a, b) => {
          const dateA = a.mostRecentRepo?.pushedAt
            ? new Date(a.mostRecentRepo.pushedAt).getTime()
            : 0;
          const dateB = b.mostRecentRepo?.pushedAt
            ? new Date(b.mostRecentRepo.pushedAt).getTime()
            : 0;
          return dateB - dateA;
        },
        multiple: 3,
      },
      render: (url, record) => (
        <RepoTooltip repo={record.mostRecentRepo}>
          <span>
            <LatestCommitBadge repoURL={record.mostRecentRepo?.url || ""} />
          </span>
        </RepoTooltip>
      ),
    },
    {
      title: "Team GitHub",
      dataIndex: "teamGithubURL",
      key: "teamGithubURL",
      width: 140,
      render: (teamGithubURL, record) => {
        return (
          <div className="flex items-center">
            <Tooltip
              mouseEnterDelay={0.6}
              title={
                <Space direction="vertical" size={16}>
                  <Card
                    size="small"
                    title={<a href={record.website}>{record.name}</a>}
                    extra={<a href={teamGithubURL}>Github</a>}
                    style={{ width: "auto" }}
                  >
                    <a href={record.reposOnGithub}>
                      <Button block>
                        See {record.repoCount} Repos on Github
                      </Button>
                    </a>
                  </Card>
                </Space>
              }
            >
              <span>
                <TeamGithubBadge
                  teamGithubURL={teamGithubURL}
                  text="Team"
                  error={record.error}
                />
              </span>
            </Tooltip>

            <div onClick={(e) => e.stopPropagation()}>
              <Paragraph
                copyable={{
                  text: teamGithubURL,
                  icon: [
                    <CopyIcon key="copy-icon" />,
                    <CopySuccessIcon key="copy-icon" />,
                  ],
                  tooltips: ["Copy GitHub URL", "Copied"],
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "Category",
      key: "tag",
      width: 165,
      dataIndex: "tag",
      sorter: {
        compare: (a, b) => {
          const priorityOrder = [
            "Organization",
            "dApp",
            "Audits",
            "Dev Company",
            "Tools",
          ];

          const getPriorityScore = (tags) => {
            if (!Array.isArray(tags) || tags.length === 0) return Infinity;
            return Math.min(
              ...tags.map((tag) => {
                const index = priorityOrder.indexOf(tag);
                return index === -1 ? Infinity : index;
              })
            );
          };

          const scoreA = getPriorityScore(a.tags);
          const scoreB = getPriorityScore(b.tags);

          if (scoreA !== scoreB) {
            return scoreA - scoreB;
          }

          // If priority scores are the same, sort by number of tags (more tags first)
          if (a.tags.length !== b.tags.length) {
            return b.tags.length - a.tags.length;
          }

          // If number of tags is the same, sort alphabetically
          return a.tags.join(",").localeCompare(b.tags.join(","));
        },
        multiple: 2,
      },
      filters: [
        {
          text: "Organization",
          value: "Organization",
        },
        {
          text: "dApp",
          value: "dApp",
        },
        {
          text: "Dev Company",
          value: "Dev Company",
        },
        {
          text: "Audits",
          value: "Audits",
        },
        {
          text: "Tools",
          value: "Tools",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) =>
        Array.isArray(record.tags) &&
        record.tags.some((tag) =>
          tag.toLowerCase().includes(value.toLowerCase())
        ),
      render: (_, { tags }) => {
        if (!Array.isArray(tags)) {
          return null;
        }
        return (
          <>
            {tags
              .filter((tag) => tag)
              .map((tag) => {
                let color = "blue";
                if (tag.toLowerCase() === "dapp") {
                  color = "geekblue";
                }
                if (tag.toLowerCase() === "organization") {
                  color = "green";
                }
                if (tag.toLowerCase() === "tools") {
                  color = "gold";
                }
                if (tag.toLowerCase() === "audits") {
                  color = "cyan";
                }
                return (
                  <>
                    <Tag bordered={false} color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  </>
                );
              })}
          </>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={false}
        scroll={{
          x: 500,
        }}
      />
    </>
  );
};

export default OpenSourceBuildersTable;
