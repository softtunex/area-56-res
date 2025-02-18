import React from "react";
import LoaderImage from "../asset/Pizza-sliced-unscreen.gif";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <img
          src={LoaderImage} // sure this path matches your file structure
          alt="Loading..."
          className="w-20 h-20"
        />
        <p className="mt-4 text-white text-lg font-bold">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
