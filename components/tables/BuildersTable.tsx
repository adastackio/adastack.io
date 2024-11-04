import React from "react";
import { Table, Tag } from "antd";

const BuildersTable = ({ data }) => {
  const columns = [
    {
      title: "Builder Team",
      dataIndex: "name",
      key: "name",
      render: (name, record) => <a href={record.website}>{name}</a>,
    },
    {
      title: "Team on GitHub",
      dataIndex: "teamGithubURL",
      key: "teamGithubURL",
    },
    {
      title: "Sum of Stars",
      dataIndex: "stars",
      key: "stars",
      sorter: (a, b) => a.stars - b.stars,
    },
    {
      title: "Recent Commit",
      dataIndex: "recentCommit",
      key: "recentCommit",
    },
    {
      title: "Category",
      key: "tag",
      dataIndex: "tag",
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

export default BuildersTable;
