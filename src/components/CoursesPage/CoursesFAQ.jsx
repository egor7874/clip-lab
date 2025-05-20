import { useState } from "react";
import { Plus, Minus } from "lucide-react";

// ... Твои вопросы (оставь как есть)
const faqData = [
  {
    question: "1. Нужно ли уметь монтировать заранее?",
    answer: "Нет, есть курсы с нуля.",
  },
  {
    question: "2. Какие программы используются?",
    answer: "Final Cut, Premiere Pro, DaVinci.",
  },
  {
    question: "3. Что такое интерактивные задания?",
    answer: "Это задания по ходу курса, с проверкой и обратной связью.",
  },
  {
    question: "4. Можно ли учиться с телефона?",
    answer: "Да, курсы адаптированы под мобильные устройства.",
  },
  {
    question: "5. Сколько времени нужно на курс?",
    answer: "В среднем 2 месяца по 5 модулей.",
  },
];

export default function CoursesFAQ() {
  // делим массив на две части
  const leftFaq = faqData.filter((_, i) => i % 2 === 0);
  const rightFaq = faqData.filter((_, i) => i % 2 !== 0);

  // делаем два массива индексов открытых вопросов
  const [openLeftIndexes, setOpenLeftIndexes] = useState([]);
  const [openRightIndexes, setOpenRightIndexes] = useState([]);

  const toggleLeftIndex = (idx) => {
    setOpenLeftIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleRightIndex = (idx) => {
    setOpenRightIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="bg-[#212123] text-white font-inter px-6 py-20 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-10">
          Часто задаваемые <span className="text-[#FADF4B]">вопросы</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Левая колонка */}
          <div className="flex-1 flex flex-col gap-5">
            {leftFaq.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#2B2B31] rounded-2xl p-6 cursor-pointer transition-all"
                onClick={() => toggleLeftIndex(idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-medium">{item.question}</h3>
                  <div className="text-[#FADF4B]">
                    {openLeftIndexes.includes(idx) ? <Minus size={28} /> : <Plus size={28} />}
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openLeftIndexes.includes(idx) ? "max-h-[400px] mt-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{ willChange: "max-height, opacity" }}
                >
                  <p className="text-white/80 text-sm md:text-base">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Правая колонка */}
          <div className="flex-1 flex flex-col gap-5">
            {rightFaq.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#2B2B31] rounded-2xl p-6 cursor-pointer transition-all"
                onClick={() => toggleRightIndex(idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-medium">{item.question}</h3>
                  <div className="text-[#FADF4B]">
                    {openRightIndexes.includes(idx) ? <Minus size={28} /> : <Plus size={28} />}
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openRightIndexes.includes(idx) ? "max-h-[400px] mt-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{ willChange: "max-height, opacity" }}
                >
                  <p className="text-white/80 text-sm md:text-base">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}