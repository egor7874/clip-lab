import React from "react";

const ProfileNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "progress", label: "Прогресс" },
    { id: "courses", label: "Мои курсы" },
    { id: "settings", label: "Настройки" },
  ];

  return (
    <div className="bg-[#2B2D34] p-6 rounded-2xl flex-shrink-0 flex flex-col justify-start gap-6 text-lg font-medium text-white w-[240px]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`text-left transition ${
            activeTab === tab.id ? "text-[#FADF4B]" : "text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProfileNavigation;
