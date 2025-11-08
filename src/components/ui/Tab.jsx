const Tabs = ({ tabs, active, onChange }) => {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`
              relative px-5 py-2.5 text-sm font-medium transition-all duration-200
              ${isActive ? "text-green-600" : "text-gray-600 hover:text-gray-800"}
            `}
          >
            {tab}

            {/* Active Bottom Highlight Bar */}
            {isActive && (
              <span className="absolute left-0 bottom-[-1px] w-full h-[2px] bg-green-600 rounded-t-md"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
