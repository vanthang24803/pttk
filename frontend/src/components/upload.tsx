import { ImageIcon, X } from "lucide-react";

type Props = {
  url: string | null;
  resetImage: () => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Upload = ({ url, resetImage, handleFileInputChange }: Props) => {
  return (
    <div className="w-1/5 flex flex-col space-y-3">
      {url ? (
        <div className="relative">
          <img className="w-full h-[40vh] object-cover" src={url} />
          <X
            className="absolute top-2 right-2 hover:cursor-pointer hover:scale-105"
            onClick={resetImage}
          />
        </div>
      ) : (
        <>
          <label htmlFor="upload" className="cursor-pointer">
            <div className="w-full h-[40vh] flex items-center justify-center border rounded">
              <ImageIcon className="w-16 h-16" />
            </div>
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </label>
        </>
      )}
    </div>
  );
};
