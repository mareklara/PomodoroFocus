import React from "react";

const SideBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "timer", label: "Pomodoro Timer" },
    { id: "notes", label: "Notes" },
    { id: "history", label: "History" },
    { id: "sessions", label: "Sessions" },
  ];

  return (
    <div>
      <aside className="w-48 h-full overflow-y-auto bg-gray-200 p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Welcome, Learner</h3>
        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-4 py-2 rounded hover:bg-gray-200 transition ${
                activeTab === tab.id ? "bg-gray-300 font-bold" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
