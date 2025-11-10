

import React from "react";

const Tabs = ({ tabs, active, onChange }) => {
  return (
    <div className="flex border-b border-gray-200 bg-white">
      {tabs.map((tab) => {
        const isActive = active === tab;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`
              relative px-6 py-3 text-sm font-medium
              transition-all duration-200
              rounded-t-md
              ${isActive 
                ? "text-green-700"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }
            `}
          >
            {tab}

            {/* Active Bottom Bar */}
            {isActive && (
              <span
                className="
                  absolute left-0 bottom-0 w-full h-[3px]
                  bg-green-700 rounded-t-md transition-all duration-300
                "
              ></span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;

