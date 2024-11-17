import React from "react";
import { Table, Tag, Typography, Tooltip } from "antd";
import StarBadge from "@components/badges/StarBadge";
import TeamGithubBadge from "@components/badges/TeamGithubBadge";
import CodeLanguageShieldIoBadge from "@components/badges/CodeLanguageShieldIoBadge";
import RepoShieldIoBadge from "@components/badges/RepoShieldIoBadge";
import Favicon from "@components/badges/Favicon";
import LatestCommitBadge from "@components/badges/LatestCommitBadge";
import { CopyIcon, CopySuccessIcon } from "../../assets/icons";

const { Paragraph } = Typography;

const OpenSourceBuildersTable = ({ data }) => {
  const columns = [
    {
      title: "Team",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 230,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, record) => (
        <div className="flex items-center justify-between w-full">
          <a className="text-base" href={record.website}>
            <span className="flex items-center">
              <Favicon url={record.website} />
              &nbsp;{name}
            </span>
          </a>
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
      render: (starCount, record) => (
        <StarBadge
          teamGithubURL={record.teamGithubURL}
          starCount={starCount}
          error={record.error}
        />
      ),
    },
    {
      title: "Team GitHub",
      dataIndex: "teamGithubURL",
      key: "teamGithubURL",
      width: 170,
      render: (teamGithubURL, record) => {
        return (
          <>
            <TeamGithubBadge
              teamGithubURL={teamGithubURL}
              text="GitHub"
              error={record.error}
            />
            <Paragraph
              copyable={{
                text: teamGithubURL,
                icon: [
                  <CopyIcon key="copy-icon" />,
                  <CopySuccessIcon key="copy-icon" />,
                ],
                tooltips: ["Copy GitHub URL", "Copied"],
              }}
            ></Paragraph>
          </>
        );
      },
    },
    {
      title: "Latest Commit",
      dataIndex: ["mostRecentRepo", "pushedAt"],
      key: "pushedAt",
      width: 240,
      ellipsis: true,
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
      render: (pushedAt, record) => (
        <>
          <Tooltip
            mouseEnterDelay={0.6}
            title={
              <div>
                {record.mostRecentRepo?.description ||
                  "No project description provided."}
                {(record.mostRecentRepo?.language ||
                  record.mostRecentRepo?.url) && (
                  <div
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    {record.mostRecentRepo?.language && (
                      <a
                        href={record.mostRecentRepo?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CodeLanguageShieldIoBadge
                          language={record.mostRecentRepo.language}
                        />
                      </a>
                    )}
                    {record.mostRecentRepo?.url && (
                      <RepoShieldIoBadge
                        githubUrl={record.mostRecentRepo.url}
                        text="Project on Github"
                      />
                    )}
                  </div>
                )}
              </div>
            }
          >
            <span className="latest-commit-badge-container">
              <LatestCommitBadge repoURL={record.mostRecentRepo?.url || ""} />
            </span>
          </Tooltip>
          &nbsp;
          <span className="text-gray-400">
            {record.mostRecentRepo?.timeSinceLastCommit || "..."}
          </span>
        </>
      ),
    },
    {
      title: "Category",
      key: "tag",
      width: 195,
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
        pagination={{
          defaultPageSize: 200,
          pageSize: 200,
          pageSizeOptions: [10, 20, 50, 100, 200, 500],
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
        scroll={{
          x: 500,
        }}
      />
    </>
  );
};

export default OpenSourceBuildersTable;
