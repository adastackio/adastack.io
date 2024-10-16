const StarBadge = ({ githubURL }) => {
  const userPath = new URL(githubURL).pathname.slice(1).replace(/\/$/, ""); // Extract organization/user path and remove trailing slash
  return (
    <>
      &nbsp;&nbsp;⟡&nbsp;&nbsp;
      <a href={githubURL} className="shields_io_inline-badge">
        <img
          alt="GitHub link and star count"
          src={`https://img.shields.io/github/stars/${userPath}`}
        />
      </a>
    </>
  );
};

export default StarBadge;
