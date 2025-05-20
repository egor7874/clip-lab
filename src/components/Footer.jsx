import cliplabLogo from "../assets/cliplablogoFull.png";
import telegramLogo from "../assets/telegram.png";
import emailIcon from "../assets/email-icon.png";

export default function Footer() {
  return (
    <footer className="bg-[#2B2D34] text-white font-inter text-sm px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="flex flex-col max-w-[200px] justify-start">
            <img
              src={cliplabLogo}
              alt="ClipLab logo"
              className="w-[150px] h-auto"
            />
            <p className="text-white/70 text-sm mt-8">
              ClipLab — платформа для интерактивного изучения видеомонтажа.
            </p>
            <div className="flex flex-row gap-4 mt-4">
              <a
                href="https://t.me/cliplab"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={telegramLogo} alt="Telegram" className="w-7 h-7" />
              </a>
              <a
                href="mailto:clip-lab@mail.ru"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={emailIcon} alt="Email" className="w-7 h-7" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-semibold mb-2">РАЗДЕЛЫ</h4>
              <span>Курсы</span>
              <span>База знаний</span>
              <span>Форум</span>
              <span>Испытания</span>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-white font-semibold mb-2">ОБУЧЕНИЕ</h4>
              <span>Final Cut Pro X</span>
              <span>DaVinci Resolve</span>
              <span>Premiere Pro</span>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-white font-semibold mb-2">ДОКУМЕНТЫ</h4>
              <span>Политика конфиденциальности</span>
              <span>Договор-оферта</span>
              <span>Правила оплаты</span>
              <span>Карта сайта</span>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-white font-semibold mb-2">СВЯЗЬ С НАМИ</h4>
              <span>Telegram</span>
              <a
                href="mailto:clip-lab@mail.ru"
                className="hover:text-white transition"
              >
                clip-lab@mail.ru
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-white/50 text-xs mt-10">
          © {new Date().getFullYear()} ClipLab. Все права защищены.
        </div>
      </div>
    </footer>
  );
}