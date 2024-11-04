import React from "react";

export default function Skeleton() {
  return (
    <div className="flex flex-col items-center justify-between animate-pulse w-full bg-white dark:bg-gray-800 h-screen">
      <div className="w-full bg-gray-400 dark:bg-gray-700 p-7"></div>
      <div className="p-8 w-full flex flex-col items-center max-w-3xl">
        <div className="bg-gray-400 dark:bg-gray-700 rounded-xl w-96 p-7 my-3"></div>
        <div className="bg-gray-400 dark:bg-gray-700 rounded-xl w-full p-2 mt-7"></div>
        <div className="bg-gray-400 dark:bg-gray-700 rounded-xl w-full p-2 mt-7"></div>
        <div className="bg-gray-400 dark:bg-gray-700 rounded-xl w-64 p-2 my-3"></div>
        <div className="bg-gray-400 dark:bg-gray-700 rounded-full w-28 p-5 mt-7"></div>
      </div>
      <div className="w-full bg-gray-400 dark:bg-gray-700 p-6 h-64"></div>
    </div>
  );
}
