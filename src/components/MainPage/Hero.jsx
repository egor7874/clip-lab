import heroImage from "../../assets/image3.png";

export default function Hero() {
  return (
    <section className="bg-[#212123] text-white font-inter px-4 pt-6 pb-10 md:px-6 md:pt-8 md:pb-14">
      <div className="max-w-7xl mx-auto flex flex-row items-center gap-4 md:flex-row md:gap-10">
        {/* Текстовый блок */}
        <div className="w-3/5 md:max-w-[48%]">
          <h1 className="text-2xl font-black leading-tight tracking-tight md:text-5xl md:leading-tight">
            <span className="text-[#FADF4B]">Интерактивная</span>{" "}
            платформа <br /> по обучению видеомонтажу
          </h1>
          <p className="mt-4 text-base font-medium text-white/80 md:text-xl md:mt-6">
            Учись, практикуйся и расти в монтаже видео – от первого до финального кадра
          </p>
          <button
            className="mt-6 px-6 py-3 rounded-full bg-[#5B76EF] text-white text-base w-full max-w-xs md:mt-10 md:px-10 md:py-4 hover:bg-[#4d66d6] transition"
            onClick={() => {
              const section = document.getElementById("courses");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Начать обучение
          </button>
        </div>
        {/* Картинка справа */}
        <div className="w-2/5 flex justify-end md:w-[45%]">
          <img
            src={heroImage}
            alt="ClipLab Hero"
            className="w-44 h-auto md:w-full"
          />
        </div>
      </div>
    </section>
  );
}