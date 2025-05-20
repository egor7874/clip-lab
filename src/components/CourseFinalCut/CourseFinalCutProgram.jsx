import { useState } from "react";

export default function CourseFinalCutProgram() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleModule = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const modules = [
    {
      title: "Основы Final Cut Pro X и интерфейс",
      goal: "Ознакомить с программой и логикой Apple в видеомонтаже.",
      points: [
        "1.1 Что такое FCPX и почему он уникален?",
        "1.2 Структура проекта: Libraries, Events, Projects",
        "1.3 Интерфейс и рабочее пространство: окна, таймлайн, инспектор",
        "1.4 Импорт и организация медиа",
        "1.5 Горячие клавиши и производительность",
      ],
      badge: "🚀 Первый запуск",
    },
    {
      title: "Базовый монтаж и таймлайн",
      goal: "Научиться собирать таймлайн и работать с нарезкой.",
      points: [
        "2.1 Добавление и перемещение клипов",
        "2.2 Нарезка: Blade, Trim, Position, Magnetic timeline",
        "2.3 Монтаж по музыке и ритму",
        "2.4 Использование Storylines и Compound Clips",
        "2.5 Простые переходы",
      ],
      badge: "🟡 Таймлайн-новичок",
    },
    {
      title: "Работа со звуком",
      goal: "Ознакомить с программой и логикой Apple в видеомонтаже.",
      points: [
        "3.1 Что такое FCPX и почему он уникален?",
        "3.2 Структура проекта: Libraries, Events, Projects",
        "3.3 Интерфейс и рабочее пространство: окна, таймлайн, инспектор",
        "3.4 Импорт и организация медиа",
        "3.5 Горячие клавиши и производительность",
      ],
      badge: "🎧 Звукорежиссёр-практикант",
    },
    {
      title: "Цвет и визуальный стиль",
      goal: "Научиться базовой цветокоррекции и стилю изображения.",
      points: [
        "4.1 Баланс белого и экспозиции",
        "4.2 Коррекция цветов: цветовые колёса и кривые",
        "4.3 Луты и пресеты",
        "4.4 Эффекты и фильтры",
        "4.5 Настройка стилистики видео",
      ],
      badge: "🧑‍🎨 Колорист-новичок",
    },
    {
      title: "Motion и анимация",
      goal: "Введение в Motion — создание титров и базовой графики.",
      points: [
        "5.1 Что такое Apple Motion и как он работает с FCP",
        "5.2 Шаблоны титров и нижних третей",
        "5.3 Создание простых анимированных элементов",
        "5.4 Использование keyframes",
        "5.5 Импорт в FCP и повторное использование",
      ],
      badge: "🎬 Аниматор-интерн",
    },
    {
      title: "Экспорт, Compressor и финал",
      goal: "Подготовить готовый проект к публикации.",
      points: [
        "6.1 Экспорт в FCP: кодеки, пресеты, форматы",
        "6.2 Основы Apple Compressor",
        "6.3 Создание пресетов под YouTube, Instagram, Reels",
        "6.4 Контроль качества и итоговая проверка",
        "6.5 Чек-лист финального проекта",
      ],
      badge: "📦 Готов к публикации",
    },
  ];

  return (
    <section className="bg-[#212123] text-white font-inter px-6 py-20 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-10">
          Программа <span className="text-[#FADF4B]">курса</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-min gap-6">
          {modules.map((mod, index) => (
            <div key={index} className="self-start">
              <div
                className="flex flex-col bg-[#2B2B31] rounded-2xl shadow-lg transition-all"
              >
                <div
                  className="flex justify-between items-center cursor-pointer p-6"
                  onClick={() => toggleModule(index)}
                >
                  <h3 className="text-lg font-semibold">Модуль {index + 1}. {mod.title}</h3>
                  <span className="text-[#FADF4B] text-3xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>

                <div className="grid grid-cols-1">
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out px-6 ${
                      openIndex === index ? "max-h-[1000px] opacity-100 pb-6" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-yellow-400 font-medium mb-2">
                      Цель: <span className="text-white/90">{mod.goal}</span>
                    </p>
                    <ul className="ml-5 space-y-1 text-white/90 text-sm">
                      {mod.points.map((p, i) => (
                        <li key={i} className="pl-1">
                          <span className="text-[#FADF4B]">{p.slice(0, 3)}</span>{p.slice(3)}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-white/80">
                      Достижение за прохождение:{" "}
                      <span className="bg-[#36363f] text-white px-3 py-1 rounded-full text-xs">
                        {mod.badge}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}