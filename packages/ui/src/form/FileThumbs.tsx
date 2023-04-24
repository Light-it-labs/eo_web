import * as Icons from "@heroicons/react/24/outline";

import { Loading } from "../common/Loading";

interface FileThumbsProps {
  files: File[];
  onClick?: () => void;
  onDelete?: (file: File) => void;
  // loadingThumbs is an array of file names that are loading
  loadingThumbs: string[];
}

export const FileThumbs = ({
  files,
  loadingThumbs,
  onDelete,
  onClick,
}: FileThumbsProps) => {
  return (
    <aside className="flex flex-col justify-end gap-2 overflow-auto">
      {files.map((file) => (
        <div
          className="h-max border-radius border rounded mb-2 mr-2 py-4 px-6 w-96"
          key={file.name}
        >
          <div className="flex overflow-hidden w-full relative">
            <button
              className="flex justify-between w-full"
              onClick={() => onClick?.()}
            >
              {file?.name}
              {onDelete && (
                <Icons.TrashIcon
                  className="h-20 w-20 cursor-pointer text-violet-500"
                  onClick={() => onDelete(file)}
                />
              )}
            </button>
            {loadingThumbs.includes(file.name) && <Loading />}
          </div>
        </div>
      ))}
    </aside>
  );
};
