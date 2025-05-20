import accessIcon from "../../assets/24-7.png";
import testIcon from "../../assets/test.png";
import appIcon from "../../assets/app-2.png";
import targetIcon from "../../assets/target.png";
import reviewIcon from "../../assets/review.png";

export default function CourseFinalCutHow() {
  const features = [
    {
      icon: accessIcon,
      title: "Доступ к урокам",
      highlight: "24/7",
    },
    {
      icon: testIcon,
      title: "Тесты и квизы",
      highlight: "прямо в платформе",
    },
    {
      icon: appIcon,
      title: "Индивидуальные",
      highlight: "задания и проверка",
    },
    {
      icon: targetIcon,
      title: "Достижения",
      highlight: "и прогресс",
    },
    {
      icon: reviewIcon,
      title: "Ответы от",
      highlight: "наставника",
    },
  ];

  return (
    <section className="bg-[#212123] text-white font-inter px-6 py-20 md:px-20">
      <div className="max-w-7xl mx-auto text-left">
        <h2 className="text-4xl md:text-5xl font-black mb-12">
          Как проходит <span className="text-[#FADF4B]">обучение</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {features.map((f, index) => (
            <div
              key={index}
              className="group bg-[#2B2B31] rounded-2xl shadow-lg p-6 w-full max-w-sm flex items-center gap-4"
            >
              <img
                src={f.icon}
                alt="icon"
                className="w-12 h-12 mt-1 transition-transform duration-300 group-hover:scale-110"
              />
              <p className="text-left text-lg font-semibold leading-snug">
                {f.title} <span className="text-[#FADF4B]">{f.highlight}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}