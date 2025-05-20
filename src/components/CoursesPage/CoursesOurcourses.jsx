import course1 from "../../assets/image4.png";
import course2 from "../../assets/image5.png";
import course3 from "../../assets/image6.png";
import course4 from "../../assets/image7.png";
import course5 from "../../assets/image8.png";
import course6 from "../../assets/image16.png";

import course7 from "../../assets/image9.png";
import course8 from "../../assets/image10.png";
import course9 from "../../assets/image11.png";
import course10 from "../../assets/image12.png";
import course11 from "../../assets/image13.png";


export default function CoursesOurcourses() {
  const beginnerCourses = [
    {
      title: "Final Cut Pro X с нуля",
      desc: "Освой монтаж в Final Cut с чистого листа — от импорта файлов до финального экспорта.",
      image: course3,
      program: "Final Cut Pro X",
      duration: "3 месяца • 6 модулей",
      link: "/courses/final-cut",
    },
    {
      title: "Теория монтажа",
      desc: "Узнай основы видеомонтажа: ритм, склейки, планы и законы восприятия.",
      image: course1,
      program: "Без конкретной программы",
      duration: "2 месяца • 5 модулей",
      link: "/courses/montage-theory",
    },
    {
      title: "Мобильный монтаж",
      desc: "Научись монтировать качественные ролики прямо на телефоне — быстро и удобно.",
      image: course2,
      program: "CapCut, VN, InShot",
      duration: "2 месяца • 5 модулей",
      link: "/courses/mobile-montage",
    },
    {
      title: "DaVinci Resolve с нуля",
      desc: "Сделай первые шаги в мощном и бесплатном редакторе DaVinci Resolve.",
      image: course4,
      program: "DaVinci Resolve",
      duration: "2 месяца • 5 модулей",
      link: "/courses/davinciresolve-zero",
    },
    {
      title: "Premiere Pro с нуля",
      desc: "Пойми логику работы в Premiere и начни собирать свои первые монтажи.",
      image: course5,
      program: "Adobe Premiere Pro",
      duration: "2 месяца • 5 модулей",
      link: "/courses/premierepro-zero",
    },
    {
      title: "Видеомейкинг в нейросетях",
      desc: "Исследуй, как использовать нейросети в создании и редактировании видео.",
      image: course6,
      program: "Runway ML, Pika",
      duration: "2 месяца • 5 модулей",
      link: "/courses/ai-videomaking",
    },
  ];

  const proCourses = [
    {
      title: "Цветокоррекция в DaVinci Resolve",
      desc: "Научись профессионально управлять цветом, создавая выразительный и кинематографичный стиль.",
      image: course7,
      program: "DaVinci Resolve",
      duration: "2 месяца • 5 модулей",
      link: "/courses/davinciresolve-colorcorrection",
    },
    {
      title: "Final Cut Pro X — продвинутый уровень",
      desc: "Освой мультитреки, сложные эффекты и оптимизацию рабочих процессов в Final Cut.",
      image: course8,
      program: "Final Cut Pro X",
      duration: "2 месяца • 5 модулей",
      link: "/courses/fcpx-pro",
    },
    {
      title: "DaVinci Resolve — продвинутый уровень",
      desc: "Погрузись в продвинутый монтаж, трекинг, Fusion и детализацию цветокора.",
      image: course9,
      program: "DaVinci Resolve",
      duration: "2 месяца • 5 модулей",
      link: "/courses/davinciresolve-pro",
    },
    {
      title: "Premiere Pro — продвинутый уровень",
      desc: "Овладей мощными инструментами Premiere: от динамического монтажа до коллаборации с After Effects.",
      image: course10,
      program: "Adobe Premiere Pro",
      duration: "2 месяца • 5 модулей",
      link: "/courses/premierepro-pro",
    },
    {
      title: "Киномонтаж",
      desc: "Разбери монтажные приёмы в кино — ритм, драматургия, атмосфера и эмоции кадра.",
      image: course11,
      program: "Без конкретной программы",
      duration: "2 месяца • 5 модулей",
      link: "/courses/filmediting",
    },
  ];

  return (
    <section id="courses-section" className="bg-[#212123] text-white font-inter px-6 py-20 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
          Наши <span className="text-[#FADF4B]">курсы</span>
        </h2>

        <h3 className="text-xl md:text-2xl font-black text-[#FADF4B] mb-6 bg-[#2B2B31] inline-block px-5 py-2 rounded-xl">
          Для начинающих
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beginnerCourses.map((course, index) => (
            <div key={index} className="bg-[#2B2B31] rounded-xl overflow-hidden flex flex-col group transition-transform duration-300 hover:scale-105">
              <div className="p-4 overflow-hidden rounded-lg">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-lg transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="px-4 pb-5 pt-1 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">{course.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{course.desc}</p>
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-sm mb-1">
                    <span className="text-white font-semibold">Программы:</span> {course.program}
                  </p>
                  <p className="text-[#FADF4B] text-sm font-medium mb-4">{course.duration}</p>
                  <a
                    href={course.link}
                    className="bg-[#5B76EF] text-white text-sm font-medium py-2.5 px-6 rounded-full hover:bg-[#4d66d6] transition w-fit inline-block"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl md:text-2xl font-black text-[#FADF4B] mt-10 mb-6 bg-[#2B2B31] inline-block px-5 py-2 rounded-xl">
          Для профи
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proCourses.map((course, index) => (
            <div key={index} className="bg-[#2B2B31] rounded-xl overflow-hidden flex flex-col group transition-transform duration-300 hover:scale-105">
              <div className="p-4 overflow-hidden rounded-lg">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-lg transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="px-4 pb-5 pt-1 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">{course.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{course.desc}</p>
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-sm mb-1">
                    <span className="text-white font-semibold">Программы:</span> {course.program}
                  </p>
                  <p className="text-[#FADF4B] text-sm font-medium mb-4">{course.duration}</p>
                  <a
                    href={course.link}
                    className="bg-[#5B76EF] text-white text-sm font-medium py-2.5 px-6 rounded-full hover:bg-[#4d66d6] transition w-fit inline-block"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}