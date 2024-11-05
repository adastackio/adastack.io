import React from "react";
import { Table, Tag, Typography } from "antd";
const { Paragraph, Text } = Typography;

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
      render: (name, record) => (
        <a href={record.teamGithubURL}>
          <Paragraph copyable>{record.teamGithubURL}</Paragraph>
        </a>
      ),
    },
    {
      title: "Sum of Stars",
      dataIndex: "stars",
      key: "stars",
      sorter: {
        compare: (a, b) => a.stars - b.stars,
        multiple: 2,
      },
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
          text: "dApp",
          value: "dApp",
        },
        {
          text: "Organization",
          value: "Organization",
        },
        {
          text: "Dev Company",
          value: "Dev Company",
        },
        {
          text: "Code Audits",
          value: "Code Audits",
        },
        ,
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
