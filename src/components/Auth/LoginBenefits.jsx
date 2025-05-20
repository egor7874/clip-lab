import benefitImage from "../../assets/image43.png";

export default function LoginBenefits() {
  return (
    <section className="bg-[#212123] text-white font-inter px-6 pt-10 pb-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-10 text-center md:text-left">
          <span className="text-[#FADF4B]">Новый</span> пользователь?
        </h2>

        <div className="bg-[#2B2B31] rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-10">
          <img
            src={benefitImage}
            alt="Преимущества аккаунта"
            className="w-full max-w-xs md:max-w-sm"
          />
          <div className="text-left">
            <p className="text-xl mb-4 font-bold">Создайте бесплатный аккаунт, чтобы:</p>
            <ul className="text-lg space-y-4 list-disc pl-4">
              <li>Начать прохождение бесплатных и платных курсов</li>
              <li>Отслеживать свой прогресс</li>
              <li>Участвовать в рейтингах и получать достижения</li>
              <li>Открыть доступ к базе знаний и форуму</li>
              <li>Получать индивидуальные задания и обратную связь</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-center md:justify-start">
          <button
            onClick={() => window.location.href = "/register"}
            className="bg-[#5B76EF] hover:bg-[#4d66d6] text-white px-10 py-3 rounded-full transition"
          >
            Создать аккаунт
          </button>
        </div>
      </div>
    </section>
  );
}