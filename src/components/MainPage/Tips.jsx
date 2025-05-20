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
    { icon: appIcon, label: "Программы" },
    { icon: soundIcon, label: "Советы по звуку", wide: true },
  ];

  return (
    <section className="bg-[#212123] text-white font-inter px-6 py-16 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">
            Быстрые <span className="text-[#FADF4B]">советы</span>
            <br />и полезные <span className="text-[#FADF4B]">фишки</span>
          </h2>
          <p className="text-white text-lg font-medium mb-8">
            Здесь ты найдёшь всё, что помогает в работе:
          </p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              {tips.slice(0, 4).map((item, i) => (
                <div key={i} className="bg-[#2B2B31] text-white font-bold text-3xl px-6 py-4 rounded-xl flex items-center gap-3 group">
                  <img src={item.icon} alt="" className="w-7 h-7 transition-transform duration-300 group-hover:scale-125" />
                  {item.label}
                </div>
              ))}
            </div>
            <div className="flex">
              <div className="bg-[#2B2B31] text-white font-bold text-3xl px-6 py-4 rounded-xl flex flex-row items-center justify-center gap-3 w-full group">
                <img src={tips[4].icon} alt="" className="w-7 h-7 transition-transform duration-300 group-hover:scale-125" />
                {tips[4].label}
              </div>
            </div>
          </div>
          <a
            href="/knowledge"
            className="mt-8 bg-[#5B76EF] text-white text-base font-medium py-3 px-8 rounded-full hover:bg-[#4d66d6] transition inline-block text-center"
          >
            База знаний
          </a>
        </div>
        <div className="flex-1">
          <img src={bookImage} alt="Книга" className="w-4/5 mx-auto h-auto" />
        </div>
      </div>
    </section>
  );
}