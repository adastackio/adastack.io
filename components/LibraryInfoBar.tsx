import RepoShieldIo from './badges/shield_io_badges/RepoShieldIo';
import LanguageShieldIo from './badges/shield_io_badges/LanguageShieldIo';

interface LibraryInfoBarProps {
  repoURL: string;
  language: string;
}

const LibraryInfoBar = ({ repoURL, language }: LibraryInfoBarProps) => {
  return (
    <div className="code-library-info-bar flex gap-2 items-center">
      <LanguageShieldIo language={language} isColorChanging={false} />
      <RepoShieldIo repoURL={repoURL} />
    </div>
  );
};

export default LibraryInfoBar;

