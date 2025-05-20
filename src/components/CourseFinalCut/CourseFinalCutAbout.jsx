import { useState } from "react";
import courseIcon from "../../assets/image24.png";
import targetIcon from "../../assets/image26.png";
import toolsIcon from "../../assets/image25.png";

export default function CourseFinalCutAbout() {
  const [activeTab, setActiveTab] = useState("what");
  const [displayedTab, setDisplayedTab] = useState("what");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabItems = [
    { id: "what", label: "Что вы изучите" },
    { id: "who", label: "Кому подойдёт" },
    { id: "need", label: "Что потребуется" },
  ];

  const handleTabClick = (tabId) => {
    if (tabId !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setDisplayedTab(tabId);
        setActiveTab(tabId);
        setIsTransitioning(false);
      }, 250);
    }
  };

  return (
    <section className="bg-[#212123] text-white font-inter px-6 py-14 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-10">
          О <span className="text-[#FADF4B]">курсе</span>
        </h2>

        {/* Переключатель вкладок */}
        <div className="flex gap-4 bg-[#2B2B31] rounded-full px-3 py-2 w-fit mb-10 shadow-md text-center mx-auto">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-5 py-2 rounded-full text-sm md:text-base transition ${
                activeTab === tab.id
                  ? "bg-[#36363f] text-[#FADF4B]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Контент вкладок с анимацией */}
        <div className="relative min-h-[280px] transition-all duration-500">
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              isTransitioning
                ? "opacity-0 scale-95 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
          >
            <div className="w-full">
              <div className="flex justify-center">
                <div className="bg-[#2B2B31] w-full max-w-4xl p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8 text-left">
                  {displayedTab === "what" && (
                    <>
                      <img src={courseIcon} alt="Что изучите" className="w-40 md:w-52" />
                      <ul className="list-disc list-outside ml-6 space-y-3 text-white/90 text-lg text-left">
                        <li>Полный интерфейс Final Cut Pro X и его логику</li>
                        <li>Создание и структурирование проектов</li>
                        <li>Монтаж видео, работа с аудио и титрами</li>
                        <li>Цветокоррекция, эффекты, переходы</li>
                        <li>Основы Motion и Compressor</li>
                        <li>Экспорт в нужных форматах</li>
                      </ul>
                    </>
                  )}
                  {displayedTab === "who" && (
                    <>
                      <img src={targetIcon} alt="Кому подойдёт" className="w-40 md:w-52" />
                      <ul className="list-disc list-outside ml-6 space-y-3 text-white/90 text-lg text-left">
                        <li>Тем, кто только начинает и хочет освоить монтаж</li>
                        <li>Владельцам Mac, выбирающим Final Cut как основную программу</li>
                        <li>
                          Тем, кто хочет монтировать Reels, YouTube, обучающее и коммерческое
                          видео
                        </li>
                      </ul>
                    </>
                  )}
                  {displayedTab === "need" && (
                    <>
                      <img src={toolsIcon} alt="Что потребуется" className="w-40 md:w-52" />
                      <ul className="list-disc list-outside ml-6 space-y-3 text-white/90 text-lg text-left">
                        <li>MacBook или iMac</li>
                        <li>Установленный Final Cut Pro X (демо-версия подойдёт для старта)</li>
                        <li>Желание развиваться и практиковаться</li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}