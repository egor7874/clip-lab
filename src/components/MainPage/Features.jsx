import clapperboardIcon from "../../assets/clapperboard.png";
import calendarIcon from "../../assets/calendar.png";
import medalIcon from "../../assets/medal.png";

export default function Features() {
  const features = [
    {
      icon: clapperboardIcon,
      title: (
        <>
          <span className="text-[#FADF4B]">Курсы</span> для новичков и профи
        </>
      ),
      text: "С видеоуроками, квизами и заданиями прямо по ходу обучения.",
      link: "/courses",
    },
    {
      icon: calendarIcon,
      title: (
        <>
          <span className="text-[#FADF4B]">Еженедельные испытания</span> по монтажу
        </>
      ),
      text: "Покажи свой скилл и получи баллы!",
      link: "/challenges",
    },
    {
      icon: medalIcon,
      title: (
        <>
          Система <span className="text-[#FADF4B]">рейтинга</span>
        </>
      ),
      text: "Соревнуйся с другими и продвигайся вверх в таблице лучших.",
      link: "/challenges",
    },
  ];

  return (
    <section className="bg-[#212123] text-white font-inter px-6 py-20 md:px-20">
      <div className="max-w-7xl mx-auto text-left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12">
          Что делает платформу{" "}
          <span className="text-[#FADF4B]">интерактивной?</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-[#2B2B31] p-6 rounded-2xl flex flex-col items-start text-left h-full"
            >
              <div className="relative overflow-visible">
                <img
                  src={item.icon}
                  alt="Иконка"
                  className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-black mb-3 leading-snug">{item.title}</h3>
              <p className="text-white/90 text-base mb-6">{item.text}</p>
              <a
                href={item.link}
                className="mt-auto bg-[#5B76EF] text-white text-sm font-medium py-2.5 px-6 rounded-full hover:bg-[#4d66d6] transition"
              >
                Подробнее
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}