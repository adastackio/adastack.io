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
      render: (_, { tags }) => {
        if (!Array.isArray(tags)) {
          return null;
        }
        return (
          <>
            {tags
              .filter((tag) => tag)
              .map((tag) => {
                let color = "green";
                console.log(tag);
                if (tag.toLowerCase() === "organization") {
                  color = "red";
                }
                return (
                  <Tag color={color} key={tag}>
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
