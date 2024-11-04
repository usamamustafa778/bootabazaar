import React from "react";

export default function Status({ type, className }) {
  return (
    <>
      {(type === "notAssign" || type === "needToStart") && (
        <div
          className={`py-1 px-2 text-sm rounded-full min-w-20 capitalize font-bold bg-yellow-100 text-yellow-700 text-center ${className}`}
        >
          {type === "notAssign" && "Not Assigned"}
          {type === "needToStart" && "Need To Start"}
        </div>
      )}
      {type === "assigned" && (
        <div
          className={`py-1 px-2 text-sm rounded-full min-w-20 capitalize font-bold bg-green-100 text-green-600 text-center ${className}`}
        >
          Assigned
        </div>
      )}
      {(type === "success" || type === "active") && (
        <div className="py-1 px-2 text-sm rounded-full min-w-20 capitalize font-bold bg-green-100 dark:bg-green-500/20 dark:text-green-300 text-green-600 text-center">
          active
        </div>
      )}
      {type === "pending" && (
        <div
          className={`py-1 px-2 text-sm rounded-full min-w-20 capitalize font-bold bg-red-100 dark:bg-red-500/20 text-red-500 dark:text-red-400 text-center ${className}`}
        >
          Pending DNS
        </div>
      )}
      {type === "inProcess" && (
        <div className="py-1 px-2 text-sm rounded-full min-w-20 capitalize font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-center">
          In Process
        </div>
      )}
      {type === "inActive" && (
        <div className="py-1 px-2 text-sm rounded-full min-w-20 capitalize font-bold bg-gray-200 dark:bg-gray-500/20 text-gray-600 dark:text-gray-300 text-center">
          InActive
        </div>
      )}
    </>
  );
}
