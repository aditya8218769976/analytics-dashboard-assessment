import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16"></div>
    </div>
  );
};

export default Loader;
