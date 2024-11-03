// components/BuildersTable.jsx
import React from "react";
import { Table } from "antd";

const BuildersTable = ({ data }) => {
  const columns = [
    {
      title: "Builder Team",
      dataIndex: "name",
      key: "name",
      render: (name, record) => <a href={record.website}>{name}</a>
    },
    {
      title: "Team on GitHub",
      dataIndex: "teamGithubURL",
      key: "teamGithubURL"
    },
    {
      title: "Sum of Stars",
      dataIndex: "stars",
      key: "stars"
    },
    {
      title: "Recent Commit",
      dataIndex: "recentCommit",
      key: "recentCommit"
    },
    {
      title: "Category",
      dataIndex: "type",
      key: "type"
    }
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default BuildersTable;