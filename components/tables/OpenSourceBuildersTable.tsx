import React from "react";
import { Table, Tag, Typography } from "antd";
const { Paragraph, Text } = Typography;
import { CopyIcon, CopySuccessIcon } from "@components/icons";
import StarBadge from "@components/badges/StarBadge";
import GithubBadge from "@components/badges/GithubBadge";
import Favicon from "@components/badges/Favicon";
import LatestCommitBadge from "@components/badges/LatestCommitBadge";

const OpenSourceBuildersTable = ({ data }) => {
  const columns = [
    {
      title: "Team",
      dataIndex: "name",
      key: "name",
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
      title: "Team GitHub",
      dataIndex: "teamGithubURL",
      key: "teamGithubURL",
      width: 170,
      render: (teamGithubURL, record) => (
        <>
          <GithubBadge teamGithubURL={teamGithubURL} error={record.error} />
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
      ),
    },
    {
      title: "Sum of Stars",
      dataIndex: "starCount",
      key: "starCount",
      width: 110,
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
      title: "Latest Commit",
      dataIndex: ["mostRecentRepo", "pushedAt"],
      key: "pushedAt",
      width: 200,
      ellipsis: true,
      sorter: {
        multiple: 3,
        compare: (a, b) => {
          const dateA = a.mostRecentRepo?.pushedAt
            ? new Date(a.mostRecentRepo.pushedAt).getTime()
            : 0;
          const dateB = b.mostRecentRepo?.pushedAt
            ? new Date(b.mostRecentRepo.pushedAt).getTime()
            : 0;
          return dateB - dateA;
        },
      },
      render: (pushedAt, record) => (
        <>
          <LatestCommitBadge repoURL={record.mostRecentRepo?.url || ""} />
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
          const tagsA = Array.isArray(a.tags) ? a.tags : [];
          const tagsB = Array.isArray(b.tags) ? b.tags : [];
          const tagA = tagsA[0] || "";
          const tagB = tagsB[0] || "";
          return tagA.localeCompare(tagB);
        },
        multiple: 1,
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
                  color = "purple";
                }
                return (
                  <Tag bordered={false} color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
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

  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default OpenSourceBuildersTable;
