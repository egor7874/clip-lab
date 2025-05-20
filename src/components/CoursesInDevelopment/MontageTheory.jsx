import heroImage from "../../assets/image4.png";
import Header from "../Header";
import Footer from "../Footer";

export default function MontageTheory() {
  return (
    <>
      <Header />
      <section className="bg-[#212123] text-white py-20 px-6 md:px-10 min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 w-full">
          {/* Левая часть — описание */}
          <div className="md:max-w-[50%] w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Теория <span className="text-[#FADF4B]">монтажа</span>
            </h1>
            <p className="mt-3 text-lg md:text-xl font-medium text-white/80 mb-8">
              Узнай основы видеомонтажа: ритм, склейки, планы и законы восприятия.
            </p>
            <button className="px-8 py-4 rounded-full bg-[#5B76EF] text-white text-base font-semibold hover:bg-[#4d66d6] transition">
              Уведомить о курсе
            </button>
          </div>
          {/* Правая часть — картинка с оверлеем */}
          <div className="md:max-w-[45%] w-full relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Теория монтажа"
                className="w-full h-[320px] object-cover brightness-[.65]"
              />
              {/* Затемняющий overlay */}
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3 text-center drop-shadow-lg">
                  Данный курс в <br /> разработке
                </h2>
                {/* Спиннер */}
                <div className="mt-3 flex justify-center">
                  <span className="w-11 h-11 border-4 border-[#FADF4B] border-t-transparent rounded-full animate-spin"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}