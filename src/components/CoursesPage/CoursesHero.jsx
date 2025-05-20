import heroImage from "../../assets/image19.png";

export default function CoursesHero() {
  const handleScrollToCourses = () => {
    const coursesSection = document.getElementById("courses-section");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#212123] text-white py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:max-w-[50%]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Курсы по <span className="text-[#FADF4B]">видеомонтажу</span> <br />
            с <span className="text-[#FADF4B]">интерактивной</span> системой обучения
          </h1>
          <p className="mt-6 text-lg md:text-xl font-medium text-white/80">
            Прокачай свои навыки в Final Cut, Premiere, DaVinci и не только. Теория, практика и вызовы — всё в одном месте.
          </p>
          <button
            className="mt-10 px-8 py-4 rounded-full bg-[#5B76EF] text-white text-base font-semibold hover:bg-[#4d66d6] transition"
            onClick={handleScrollToCourses}
          >
            Начать обучение
          </button>
        </div>
        <div className="md:max-w-[45%] w-full">
          <img src={heroImage} alt="Programs Collage" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}