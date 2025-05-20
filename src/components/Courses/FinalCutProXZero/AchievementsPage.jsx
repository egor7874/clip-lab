import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Импорт иконок
import achiev1 from "../../../assets/image56.png";
import achiev2 from "../../../assets/image51.png";
import achiev3 from "../../../assets/image52.png";
import achiev4 from "../../../assets/image53.png";
import achiev5 from "../../../assets/image54.png";
import achiev6 from "../../../assets/image55.png";
import trophyIcon from "../../../assets/image57.png";

const achievementIcons = [achiev1, achiev2, achiev3, achiev4, achiev5, achiev6];

const AchievementsPage = ({ userAchievements = [] }) => {
  const [shownAchievements, setShownAchievements] = useState(0);
  const [showTrophy, setShowTrophy] = useState(false);
  const allAchieved = userAchievements.length === achievementIcons.length;

  useEffect(() => {
    // Сброс при переходе между пользователями/страницами
    setShownAchievements(0);
    setShowTrophy(false);

    if (userAchievements.length > 0) {
      achievementIcons.forEach((_, idx) => {
        setTimeout(() => {
          setShownAchievements((prev) => Math.max(prev, idx + 1));
        }, 100 * (idx + 1)); // 200ms задержка между появлением медалей
      });

      // Кубок появляется строго после шестой медальки, даже если не все достижения
      setTimeout(() => {
        setShowTrophy(true);
      }, 200 * achievementIcons.length + 500);
    }
  }, [userAchievements, allAchieved]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-[#2B2B31] p-6 rounded-2xl text-white">
        {/* Заголовок */}
        <h2 className="text-3xl font-bold text-white mb-8">Достижения</h2>
        <div className="flex flex-col md:flex-row items-start justify-center gap-12">
          {/* Медали */}
          <div className="bg-[#38383F] p-6 rounded-2xl grid grid-cols-3 gap-6 min-h-[320px] w-[480px]">
            {achievementIcons.map((icon, idx) => (
              <div key={idx} className="flex justify-center items-center">
                <img
                  src={icon}
                  alt={`Achievement ${idx + 1}`}
                  className={`w-24 h-24 rounded-xl transition-all duration-500 select-none
                    ${userAchievements[idx] && idx < shownAchievements ? "opacity-100" : "opacity-0 grayscale"}
                  `}
                  style={{ objectFit: "contain", transitionDelay: `${idx * 0.2}s` }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
          {/* Кубок */}
          <motion.div
            className={`relative p-0 rounded-2xl transition-shadow duration-700 ${showTrophy ? "achievement-glow-block" : ""}`}
            animate={showTrophy ? { boxShadow: "0 0 32px 8px #FFD600, 0 0 0 6px #FFD60040" } : { boxShadow: "none" }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-[#38383F] p-6 rounded-2xl flex flex-col items-center justify-center min-h-[320px] min-w-[220px]">
              <img
                src={trophyIcon}
                alt="Трофей"
                className={`w-56 h-56 mb-4 drop-shadow-xl select-none transition-all duration-700 ${
                  showTrophy ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                style={{ objectFit: "contain" }}
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
        {/* Поздравление */}
        <div className="w-full mt-10 flex justify-center">
          <h3 className="text-2xl font-bold text-white text-center">
            Поздравляем с получением{" "}
            <span className="text-yellow-400">итогового достижения!</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;