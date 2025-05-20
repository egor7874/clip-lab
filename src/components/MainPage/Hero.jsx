import heroImage from "../../assets/image3.png";

export default function Hero() {
  return (
    <section className="bg-[#212123] text-white font-inter px-6 pt-4 pb-10 md:pt-6 md:pb-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:max-w-[48%] w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            <span className="text-[#FADF4B]">Интерактивная</span>{" "}
            платформа <br /> по обучению видеомонтажу
          </h1>
          <p className="mt-6 text-lg md:text-xl font-medium text-white/80">
            Учись, практикуйся и расти в монтаже видео – от первого до финального кадра
          </p>
          <button
            className="mt-10 px-10 py-4 rounded-full bg-[#5B76EF] text-white text-base font-normal hover:bg-[#4d66d6] transition"
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
        <div className="md:w-[45%] w-full">
          <img src={heroImage} alt="ClipLab Hero" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}