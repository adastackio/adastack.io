interface RepoShieldIoProps {
  repoURL: string;
}

const RepoShieldIo = ({ repoURL }: RepoShieldIoProps) => {
  const url = new URL(repoURL);
  
  // Remove trailing slashes and split path into segments
  const cleanPath = url.pathname.replace(/\/+$/, '');
  
  // Split path into segments and filter out empty segments 
  const pathSegments = cleanPath.split('/').filter(Boolean);
  
  // First segment is owner, second is repo name
  const [owner, repo] = pathSegments;
  

  return (
    <a href={repoURL}>
      <img
        src={`https://img.shields.io/github/stars/${owner}/${repo}?style=social&label=GitHub`}
        className="shields_io_button"
        alt="GitHub link"
      />
    </a>
  );
};

export default RepoShieldIo;