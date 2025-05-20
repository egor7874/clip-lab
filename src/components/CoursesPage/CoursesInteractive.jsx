import clapperboard from "../../assets/clapperboard.png";
import test from "../../assets/test.png";
import app from "../../assets/app-2.png";
import target from "../../assets/target.png";
import review from "../../assets/review.png";
import medal from "../../assets/medal.png";

const features = [
  {
    title: "Подробные",
    highlight: "видеоуроки",
    text: "Каждый шаг объяснен подробно, с демонстрацией.",
    icon: clapperboard,
  },
  {
    title: "Мини-",
    highlight: "квизы и тесты",
    text: "После каждого модуля — закрепление материала.",
    icon: test,
  },
  {
    title: <><span className="text-[#FADF4B]">Индивидуальные</span> задания</>,
    text: "Выполняй реальные задачи — как в работе.",
    icon: app,
  },
  {
    title: "Еженедельные",
    highlight: "челленджи",
    text: "Испытай себя в творческих вызовах.",
    icon: target,
  },
  {
    title: "Практика",
    highlight: "и обратная связь",
    text: "Присылай свои работы — получай комментарии.",
    icon: review,
  },
  {
    title: "Прогресс и",
    highlight: "достижения",
    text: "Система баллов, трофеев и рейтинга.",
    icon: medal,
  },
];

export default function CoursesInteractive() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-16 text-white">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 text-center">
        Что делает наши курсы <span className="text-[#FADF4B]">интерактивными?</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#2B2D34] p-6 rounded-xl shadow-md flex flex-col gap-4 group"
          >
            <img src={item.icon} alt="" className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-black mb-3 leading-snug">
              {typeof item.title === "string" ? (
                item.highlight ? (
                  <>
                    {item.title} <span className="text-[#FADF4B]">{item.highlight}</span>
                  </>
                ) : (
                  item.title
                )
              ) : (
                item.title
              )}
            </h3>
            <p className="text-white/90 text-base mb-6">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}