import guideIcon from "../../assets/user-guide.png";
import paletteIcon from "../../assets/palette.png";
import pluginIcon from "../../assets/puzzle-piece-plugin.png";
import appIcon from "../../assets/app.png";
import soundIcon from "../../assets/volume.png";
import bookImage from "../../assets/image14.png";

export default function Tips() {
  const tips = [
    { icon: guideIcon, label: "Гайды" },
    { icon: paletteIcon, label: "Цветокор" },
    { icon: pluginIcon, label: "Плагины" },
    { icon: appIcon, label: "Софт" },
    { icon: soundIcon, label: "Советы по звуку", wide: true },
  ];

  return (
    <section className="bg-[#212123] text-white font-inter px-6 py-16 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="flex-1">
          <div className="flex items-start mb-6">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-0 flex-1">
              Быстрые <span className="text-[#FADF4B]">советы</span>
              <br />и полезные <span className="text-[#FADF4B]">фишки</span>
            </h2>
            <img
              src={bookImage}
              alt="Книга"
              className="w-28 h-auto ml-3 md:hidden block"
            />
          </div>
          {/* остальной контент блока без изменений */}
          <p className="text-white text-lg font-medium mb-8">
            Здесь ты найдёшь всё, что помогает в работе:
          </p>
          <div className="flex flex-col gap-3 min-w-0">
            <div className="grid grid-cols-2 xs:grid-cols-1 gap-3 min-w-0">
              {tips.slice(0, 4).map((item, i) => (
                <div key={i} className="bg-[#2B2B31] text-white font-bold text-xl md:text-3xl px-4 py-3 md:px-6 md:py-4 rounded-xl flex items-center gap-2 md:gap-3 group min-w-0">
                  <img src={item.icon} alt="" className="w-5 h-5 md:w-7 md:h-7 transition-transform duration-300 group-hover:scale-125" />
                  <span className="truncate min-w-0">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex">
              <div className="bg-[#2B2B31] text-white font-bold text-xl md:text-3xl px-4 py-3 md:px-6 md:py-4 rounded-xl flex flex-row items-center justify-center gap-2 md:gap-3 w-full group min-w-0">
                <img src={tips[4].icon} alt="" className="w-5 h-5 md:w-7 md:h-7 transition-transform duration-300 group-hover:scale-125" />
                <span className="truncate min-w-0">{tips[4].label}</span>
              </div>
            </div>
          </div>
          <a
            href="/knowledge"
            className="mt-8 bg-[#5B76EF] text-white text-base md:text-lg font-medium py-3 px-8 rounded-full hover:bg-[#4d66d6] transition inline-block text-center"
          >
            База знаний
          </a>
        </div>
        <div className="flex-1 hidden md:block">
          <img src={bookImage} alt="Книга" className="w-4/5 mx-auto h-auto" />
        </div>
      </div>
    </section>
  );
}