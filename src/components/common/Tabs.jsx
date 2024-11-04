// src/components/Tabs.js
import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col items-center mt-5 lg:-mt-9">
      <div className="flex w-fit bg-white dark:bg-gray-800 p-1 rounded-full shadow">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              activeTab === index ? "bg-primary text-white rounded-full" : ""
            } flex-1 inline-flex items-center py-1 px-4 text-sm focus:outline-none whitespace-nowrap`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="w-full">
        {tabs.map((tab, index) => (
          <div key={index} className={activeTab === index ? "block" : "hidden"}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
