import React from "react";
import { Table, Typography, Tooltip, Button, Card } from "antd";
import { CopyIcon, CopySuccessIcon } from "../../assets/icons";
import LanguageShieldIo from "@components/badges/shield_io_badges/LanguageShieldIo";
import Favicon from "@components/badges/Favicon";
import LatestCommitBadge from "@components/badges/LatestCommitBadge";
import { StarIcon } from "../../assets/icons";
import MostStarredRepoBadge from "@components/badges/MostStarredRepoBadge";
import TeamGithubBadge from "@components/badges/TeamGithubBadge";
import CategoryTag from "@components/badges/CategoryTag";

const { Paragraph, Title, Text } = Typography;

const capitalizeAndRemoveHypens = (name) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const RepoInfoTooltip = ({ repo, children }) => {
  return (
    <Tooltip
      mouseEnterDelay={0.6}
      overlayInnerStyle={{ padding: 0 }}
      overlayClassName="rounded-lg shadow-none"
      title={
        <div>
          <Card
            size="small"
            bordered={false}
            style={{ width: "auto", padding: "0px" }}
          >
            <Title level={4} className="tooltip-title font-normal">
              {repo?.name ? capitalizeAndRemoveHypens(repo.name) : ""}
            </Title>
            <Text
              style={{
                fontSize: "14px",
                paddingBottom: "8px",
                display: "inline-block",
              }}
            >
              {repo?.description || "No project description"}
            </Text>
            <br />
            {repo?.language && (
              <div className="block pt-0 pb-0">
                <Text
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <span className="font-semibold inline-block">Stack:</span>
                  &nbsp;
                </Text>
                <LanguageShieldIo
                  language={repo.language}
                  isColorChanging={true}
                />
              </div>
            )}

            <Text
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "4px",
              }}
            >
              <span className="font-semibold inline-block">Stars:</span>&nbsp;
              {repo?.stars ?? 0}
            </Text>
            <Text
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "4px",
              }}
            >
              <span className="font-semibold inline-block">Last Commit:</span>
              &nbsp;
              {repo?.timeSinceLastCommit || ""} ago
            </Text>
            <a href={repo?.url || ""} target="_blank">
              <div style={{ marginTop: "8px" }}>
                <Button block>See on Github</Button>
              </div>
            </a>
          </Card>
        </div>
      }
    >
      {children}
    </Tooltip>
  );
};

const TeamGithubTooltip = ({ record, children }) => {
  return (
    <Tooltip
      mouseEnterDelay={0.6}
      overlayInnerStyle={{ padding: 0 }}
      overlayClassName="rounded-xl shadow-none"
      title={
        <Card
          bordered={false}
          style={{ width: "auto", padding: "0px" }}
          size="small"
        >
          <a href={record.reposOnGithub}>
            <Button block>See {record.repoCount} Repos on Github</Button>
          </a>
        </Card>
      }
    >
      {children}
    </Tooltip>
  );
};

const OpenSourceBuildersTable = ({ data }) => {
  const columns = [
    {
      title: "Team",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 260,
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
      title: "Latest Commit",
      dataIndex: ["mostRecentRepo", "url"],
      key: "url",
      width: 276,
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
        <>
          <RepoInfoTooltip repo={record.mostRecentRepo}>
            <span>
              <LatestCommitBadge repoURL={record.mostRecentRepo?.url || ""} />
            </span>
          </RepoInfoTooltip>
          &nbsp;
          <span className="text-gray-400">
            {record.mostRecentRepo?.timeSinceLastCommit || "..."}
          </span>
        </>
      ),
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
        <div>
          <RepoInfoTooltip repo={record.mostStarredRepo}>
            <span>
              <MostStarredRepoBadge
                repoURL={record.mostStarredRepo?.url || ""}
                repoStarCount={record.mostStarredRepo?.stars ?? 0}
              />
            </span>
          </RepoInfoTooltip>
        </div>
      ),
    },
    {
      title: "Total Stars",
      dataIndex: "starCount",
      key: "starCount",
      width: 100,
      sorter: {
        compare: (a, b) => (a.starCount ?? 0) - (b.starCount ?? 0),
        multiple: 2,
      },
      render: (starCount, record) => {
        const displayValue =
          !starCount && starCount !== 0 ? "..." : starCount.toLocaleString();

        return (
          <Button
            as="a"
            href={record.reposOnGithub}
            target="_blank"
            rel="noopener"
            aria-label={`${displayValue} GitHub stars`}
            className="badge-button stars-across-all-repos-badge-content"
            icon={<StarIcon aria-hidden="true" />}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "0px 8px 0px 10px",
              gap: "6px",
            }}
          >
            <Text style={{ fontSize: 14 }}>{displayValue}</Text>
          </Button>
        );
      },
    },
    {
      title: "Team GitHub",
      dataIndex: "teamGithubURL",
      key: "teamGithubURL",
      width: 140,
      render: (teamGithubURL, record) => {
        return (
          <div className="flex items-center">
            <TeamGithubTooltip record={record}>
              <span>
                <TeamGithubBadge teamGithubURL={teamGithubURL} text="Team" />
              </span>
            </TeamGithubTooltip>
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
      width: 185,
      dataIndex: "tag",
      sorter: {
        compare: (a, b) => {
          const priorityOrder = [
            "Organization",
            "dApp",
            "Audits",
            "dev_company",
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
          value: "organization",
        },
        {
          text: "DApp",
          value: "dapp",
        },
        {
          text: "Dev Company",
          value: "dev_company",
        },
        {
          text: "Audits",
          value: "audit_company",
        },
        {
          text: "Tools",
          value: "tools",
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
                let color;
                if (tag.toLowerCase() === "dapp") {
                  color = "indigo";
                }
                if (tag.toLowerCase() === "organization") {
                  color = "green";
                }
                if (tag.toLowerCase() === "tools") {
                  color = "yellow";
                }
                if (tag.toLowerCase() === "audits") {
                  color = "gray";
                }
                return (
                  <>
                    <CategoryTag
                      color={color}
                      category={tag.replace(/_/g, " ").toUpperCase()}
                    />
                  </>
                );
              })}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          x: 500,
        }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-odd" : "table-row-even"
        }
      />
    </>
  );
};

export default OpenSourceBuildersTable;
