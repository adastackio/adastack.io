import React from "react";
import { Table, Tag, Typography } from "antd";
const { Paragraph, Text } = Typography;
import { CopyIcon, CopySuccessIcon } from "@components/icons";

const OpenSourceBuildersTable = ({ data }) => {
  const columns = [
    {
      title: "Team",
      dataIndex: "name",
      key: "name",
      render: (name, record) => <a href={record.website}>{name}</a>,
    },
    {
      title: "Team on GitHub",
      dataIndex: "teamGithubURL",
      key: "teamGithubURL",
      render: (teamGithubURL) => (
        <a href={teamGithubURL}>
          <Paragraph
            copyable={{
              icon: [
                <CopyIcon key="copy-icon" />,
                <CopySuccessIcon key="copy-icon" />,
              ],
            }}
          >
            {teamGithubURL}
          </Paragraph>
        </a>
      ),
    },
    {
      title: "Sum of Stars",
      dataIndex: "starCount",
      key: "starCount",
      sorter: {
        compare: (a, b) => a.starCount - b.starCount,
        multiple: 2,
      },
    },
    {
      title: "Latest Commit",
      dataIndex: "pushedAt",
      key: "pushedAt",
      sorter: {
        compare: (a, b) =>
          new Date(a.pushedAt).getTime() - new Date(b.pushedAt).getTime(),
        multiple: 3,
      },
      render: (date) =>
        new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      defaultSortOrder: "descend", // Added to sort by newest first by default
    },
    {
      title: "Category",
      key: "tag",
      dataIndex: "tag",
      sorter: {
        compare: (a, b) => {
          // Sort by first tag
          const tagA = a.tags[0] || "";
          const tagB = b.tags[0] || "";
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
          text: "Code Audits",
          value: "Code Audits",
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
                if (tag.toLowerCase() === "code audits") {
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
