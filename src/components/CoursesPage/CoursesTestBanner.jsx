import React, { useState, useEffect } from "react";
import testImage from "../../assets/image22.png";

// Картинки курсов (замени на актуальные пути)
import courseFCPX from "../../assets/image6.png";
import coursePremiere from "../../assets/image8.png";
import courseDaVinci from "../../assets/image7.png";
import courseMobile from "../../assets/image5.png";
import courseTheory from "../../assets/image4.png";
import courseColor from "../../assets/image9.png";
import courseAI from "../../assets/image16.png";
import courseFCPXPro from "../../assets/image10.png";
import coursePremierePro from "../../assets/image12.png";
import courseDaVinciPro from "../../assets/image11.png";
import courseFilmEditing from "../../assets/image13.png";

const questions = [
  {
    title: "Какой у тебя сейчас уровень в видеомонтаже?",
    options: [
      { text: "🟡 Никогда не монтировал(а)", value: "never" },
      { text: "🟠 Немного монтировал(а), но без уверенности", value: "little" },
      { text: "🔵 Есть уверенный опыт", value: "confident" },
      { text: "🔴 Работаю профессионально / хочу углубиться", value: "pro" },
    ],
  },
  {
    title: "В какой программе ты хочешь (или планируешь) монтировать?",
    options: [
      { text: "❓ Не знаю, хочу, чтобы вы выбрали", value: "any" },
      { text: "🍎 Final Cut Pro X", value: "fcpx" },
      { text: "🎬 Premiere Pro", value: "premiere" },
      { text: "🎨 DaVinci Resolve", value: "davinci" },
      { text: "📱 Мобильные приложения", value: "mobile" },
      { text: "🤖 Нейросети и генерация", value: "ai" },
    ],
  },
  {
    title: "Что тебе сейчас важнее всего?",
    options: [
      { text: "🚀 Просто начать и разобраться", value: "start" },
      { text: "🧠 Понять монтажную теорию", value: "theory" },
      { text: "🎨 Научиться цветокоррекции", value: "color" },
      { text: "🎞 Делать анимации и заставки", value: "animation" },
      { text: "📱 Монтировать с телефона", value: "mobile" },
      { text: "🎥 Делать киношный монтаж", value: "film" },
      { text: "🤖 Применять нейросети", value: "ai" },
      { text: "📈 Углубиться в продвинутые фишки", value: "advanced" },
    ],
  },
  {
    title: "Где ты планируешь использовать знания?",
    options: [
      { text: "🧍 Только для себя", value: "self" },
      { text: "📱 Для соцсетей и YouTube", value: "social" },
      { text: "💼 Для работы / фриланса", value: "work" },
      { text: "🎬 Для кино / клипов / рекламы", value: "film" },
    ],
  },
  {
    title: "Что у тебя есть из оборудования?",
    options: [
      { text: "📱 Только телефон", value: "phone" },
      { text: "💻 Mac с Final Cut", value: "mac" },
      { text: "💻 ПК с Windows", value: "windows" },
      { text: "💻 Любой компьютер, неважно", value: "any" },
    ],
  },
];

const allCourses = [
  {
    key: "fcpx-zero",
    title: "Final Cut Pro X с нуля",
    desc: "Освой монтаж в Final Cut с чистого листа — от импорта файлов до финального экспорта.",
    image: courseFCPX,
    duration: "3 месяца • 6 модулей",
    link: "/courses/final-cut",
  },
  {
    key: "premiere-zero",
    title: "Premiere Pro с нуля",
    desc: "Пойми логику работы в Premiere и начни собирать свои первые монтажи.",
    image: coursePremiere,
    duration: "2 месяца • 5 модулей",
    link: "/courses/premierepro-zero",
  },
  {
    key: "davinci-zero",
    title: "DaVinci Resolve с нуля",
    desc: "Сделай первые шаги в мощном и бесплатном редакторе DaVinci Resolve.",
    image: courseDaVinci,
    duration: "2 месяца • 5 модулей",
    link: "/courses/davinciresolve-zero",
  },
  {
    key: "mobile",
    title: "Мобильный монтаж",
    desc: "Научись монтировать качественные ролики прямо на телефоне — быстро и удобно.",
    image: courseMobile,
    duration: "2 месяца • 5 модулей",
    link: "/courses/mobile-montage",
  },
  {
    key: "theory",
    title: "Теория монтажа",
    desc: "Узнай основы видеомонтажа: ритм, склейки, планы и законы восприятия.",
    image: courseTheory,
    duration: "2 месяца • 5 модулей",
    link: "/courses/montage-theory",
  },
  {
    key: "color",
    title: "Цветокоррекция в DaVinci Resolve",
    desc: "Научись профессионально управлять цветом, создавая выразительный и кинематографичный стиль.",
    image: courseColor,
    duration: "2 месяца • 5 модулей",
    link: "/courses/davinciresolve-colorcorrection",
  },
  {
    key: "ai",
    title: "Видеомейкинг в нейросетях",
    desc: "Исследуй, как использовать нейросети в создании и редактировании видео.",
    image: courseAI,
    duration: "2 месяца • 5 модулей",
    link: "/courses/ai-videomaking",
  },
  {
    key: "fcpx-pro",
    title: "Final Cut Pro X — продвинутый уровень",
    desc: "Освой мультитреки, сложные эффекты и оптимизацию рабочих процессов в Final Cut.",
    image: courseFCPXPro,
    duration: "2 месяца • 5 модулей",
    link: "/courses/fcpx-pro",
  },
  {
    key: "premiere-pro",
    title: "Premiere Pro — продвинутый уровень",
    desc: "Овладей мощными инструментами Premiere: от динамического монтажа до коллаборации с After Effects.",
    image: coursePremierePro,
    duration: "2 месяца • 5 модулей",
    link: "/courses/premierepro-pro",
  },
  {
    key: "davinci-pro",
    title: "DaVinci Resolve — продвинутый уровень",
    desc: "Погрузись в продвинутый монтаж, трекинг, Fusion и детализацию цветокора.",
    image: courseDaVinciPro,
    duration: "2 месяца • 5 модулей",
    link: "/courses/davinciresolve-pro",
  },
  {
    key: "film-editing",
    title: "Киномонтаж",
    desc: "Разбери монтажные приёмы в кино — ритм, драматургия, атмосфера и эмоции кадра.",
    image: courseFilmEditing,
    duration: "2 месяца • 5 модулей",
    link: "/courses/filmediting",
  },
];

function determineCourse(answers) {
  const [level, program, goal, usage, device] = answers;
  // Финальная логика — сверяем с условиями!
  // 1. Видеомейкинг в нейросетях
  if (goal === "ai" || program === "ai") return "ai";
  // 2. Мобильный монтаж
  if (device === "phone" || goal === "mobile" || program === "mobile") return "mobile";
  // 3. Теория монтажа
  if (goal === "theory") return "theory";
  // 4. Цветокоррекция DaVinci
  if (goal === "color" && program === "davinci" && (level === "little" || level === "confident" || level === "pro")) return "color";
  // 5. Final Cut Pro X — продвинутый
  if (program === "fcpx" && (level === "confident" || level === "pro") && device === "mac" && ["advanced", "work", "film"].includes(goal))
    return "fcpx-pro";
  // 6. Premiere Pro — продвинутый
  if (program === "premiere" && (level === "confident" || level === "pro") && (device === "windows" || device === "any") && ["advanced", "work", "film"].includes(goal))
    return "premiere-pro";
  // 7. DaVinci Resolve — продвинутый
  if (program === "davinci" && (level === "confident" || level === "pro") && ["film", "work", "advanced"].includes(goal)) return "davinci-pro";
  // 8. Киномонтаж
  if (goal === "film" && (level === "confident" || level === "pro")) return "film-editing";
  // 9. Final Cut Pro X с нуля
  if ((level === "never" || level === "little") && (program === "fcpx" || program === "any") && (goal === "start" || usage === "social") && device === "mac")
    return "fcpx-zero";
  // 10. Premiere Pro с нуля
  if (level === "never" && program === "premiere" && (device === "windows" || device === "any") && ["social", "self", "work"].includes(usage))
    return "premiere-zero";
  // 11. DaVinci Resolve с нуля
  if (level === "never" && (program === "davinci" || program === "any") && (goal === "start" || usage === "social") && (device === "any" || device === "mac" || device === "windows"))
    return "davinci-zero";
  // Fallback
  return "theory";
}

export default function CourseTestBanner() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const [animateModal, setAnimateModal] = useState(false);
  const [animateOverlay, setAnimateOverlay] = useState(false);
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  // Для анимации появления результата
  const [isResultVisible, setIsResultVisible] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setAnimateOverlay(true);
      setAnimateModal(true);
    }, 10);
  };
  const closeModal = () => {
    setAnimateOverlay(false);
    setAnimateModal(false);
    setTimeout(() => resetTest(), 200);
    setIsResultVisible(false);
  };

  const resetTest = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setIsLoadingResult(false);
    setShowModal(false);
  };

  const handleNext = () => {
    if (selected == null) return;

    // Если сейчас последний вопрос — показываем лоадер, потом результат
    if (step === questions.length) {
      setAnswers((prev) => [...prev, selected]);
      setIsLoadingResult(true);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setIsLoadingResult(false);
        // selected не сбрасываем!
      }, 1500);
      return;
    }

    setAnswers((prev) => [...prev, selected]);
    setStep((prev) => prev + 1);
    setSelected(null);
  };

  const handleSelect = (value) => setSelected(value);

  const courseKey = step === questions.length + 1 ? determineCourse(answers) : null;
  const matchedCourse = allCourses.find((c) => c.key === courseKey);

  // Анимация появления результата
  useEffect(() => {
    if (step === questions.length + 1) {
      // Короткая задержка для анимации
      const timer = setTimeout(() => setIsResultVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsResultVisible(false);
    }
  }, [step]);

  return (
    <>
      <section className="bg-[#212123] text-white font-inter px-6 py-20 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Не знаешь <span className="text-[#FADF4B]">с чего начать</span>?
            </h2>
            <p className="text-white text-lg font-medium mb-8">
              Пройди короткий тест — мы подберем курс, подходящий именно тебе.
            </p>
            <button
              className="bg-[#5B76EF] text-white text-base font-medium py-3 px-8 rounded-full hover:bg-[#4d66d6] transition"
              onClick={openModal}
            >
              Подобрать курс
            </button>
          </div>
          <div className="flex-shrink-0">
            <img src={testImage} alt="Тест по подбору курса" className="w-full max-w-sm" />
          </div>
        </div>
      </section>

      {/* Modal with overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-10 transition-opacity duration-200 ${animateOverlay ? "opacity-100" : "opacity-0"}`}
            onClick={closeModal}
          />

          {/* Modal */}
          <div
            className={`relative z-10 bg-[#24252A] max-w-3xl w-full rounded-2xl shadow-xl px-8 py-8 md:px-14 md:py-10 flex flex-col gap-6 transition-all duration-200 ${animateModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ minWidth: 480, minHeight: 340 }}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white text-3xl font-thin"
              onClick={closeModal}
              aria-label="Закрыть"
              tabIndex={1}
            >
              ×
            </button>

            {/* Лоадер результата */}
            {isLoadingResult && (
              <div className="flex flex-col items-center justify-center h-full min-h-[240px] py-12">
                <div className="mb-6">
                  <svg className="animate-spin h-12 w-12 text-[#FADF4B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-white text-center">Подбираем подходящий курс…</div>
              </div>
            )}

            {/* Старт теста */}
            {!isLoadingResult && step === 0 && (
              <div className="flex flex-col md:flex-row items-center h-full min-h-[240px] gap-6 flex-1">
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black mb-2">
                      Подберите себе <span className="text-[#FADF4B]">подходящий курс</span>
                    </h2>
                    <p className="text-white text-base mb-5">
                      Пройди короткий тест — и мы подберем идеальный курс именно для тебя. Всего 5 вопросов и меньше минуты времени.
                    </p>
                  </div>
                  <button
                    className="bg-[#FADF4B] text-[#212123] text-base font-semibold py-2.5 px-8 rounded-full hover:bg-[#e4d937] transition mt-10 md:mt-8 w-fit"
                    onClick={() => setStep(1)}
                  >
                    Начать тест
                  </button>
                </div>
                <img
                  src={testImage}
                  alt="Тест"
                  className="w-36 h-36 object-contain flex-shrink-0"
                  draggable={false}
                />
              </div>
            )}

            {/* Вопросы */}
            {!isLoadingResult && step > 0 && step <= questions.length && (
              <div>
                <div className="mb-5">
                  <h2 className="text-2xl font-black mb-1">
                    Подберите себе <span className="text-[#FADF4B]">подходящий курс</span>
                  </h2>
                  <div className="font-semibold mt-3 mb-2">Вопрос {step}</div>
                  <div className="mb-2">{questions[step - 1].title}</div>
                </div>
                <form>
                  <div className="flex flex-col gap-3">
                    {questions[step - 1].options.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer text-base font-medium">
                        <input
                          type="radio"
                          name={`question-${step}`}
                          value={opt.value}
                          checked={selected === opt.value}
                          onChange={() => handleSelect(opt.value)}
                          className="accent-[#FADF4B] w-5 h-5"
                        />
                        <span className="text-white">
                          {opt.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </form>
                <button
                  disabled={selected == null}
                  className={`mt-8 w-full bg-[#FADF4B] text-[#212123] text-base font-semibold py-2.5 rounded-full transition ${selected == null ? "opacity-60 cursor-not-allowed" : "hover:bg-[#e4d937]"}`}
                  onClick={handleNext}
                >
                  {step === questions.length ? "Узнать результат" : "Следующий вопрос"}
                </button>
              </div>
            )}

            {/* Результат */}
            {!isLoadingResult && step === questions.length + 1 && matchedCourse && (
              <div
                className={`animate-fadein flex items-center flex-col md:flex-row gap-8 h-full min-h-[240px] transition-all duration-500 ${
                  isResultVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-black leading-tight text-left mb-0">
                    Готово! Мы подобрали для тебя <span className="text-[#FADF4B]">подходящий курс!</span>
                  </h2>
                </div>
                <div className="bg-[#202024] rounded-2xl px-3 py-3 w-64 flex flex-col items-center shadow-lg">
                  <img src={matchedCourse.image} alt={matchedCourse.title} className="rounded-lg w-full h-32 object-cover mb-3" />
                  <div className="font-bold text-white mb-2">{matchedCourse.title}</div>
                  <div className="text-white/80 text-sm mb-2">{matchedCourse.desc}</div>
                  <div className="text-[#FADF4B] text-xs font-medium mb-3">{matchedCourse.duration}</div>
                  <a
                    href={matchedCourse.link}
                    className="block w-full text-center bg-[#5B76EF] text-white text-sm font-medium py-2 px-3 rounded-full hover:bg-[#4d66d6] transition"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}