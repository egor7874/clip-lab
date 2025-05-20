import cliplabLogo from "../assets/cliplablogoFull.png";
import userIcon from "../assets/user.png";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const { user, loading } = useContext(UserContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  let menuCloseTimeout;

  // Следим за скроллом
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 110) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(menuCloseTimeout);
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    menuCloseTimeout = setTimeout(() => setMenuOpen(false), 200);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  function getHeaderContent(withBg = true) {
    return (
      <div className={`max-w-[1200px] mx-auto flex items-center justify-between px-4 h-[56px] rounded-2xl text-white font-inter ${withBg ? "bg-[#2C2D33]" : ""}`}>
        {/* Логотип */}
        <a href="/">
          <img
            src={cliplabLogo}
            alt="ClipLab logo"
            className="w-[115px] h-auto"
          />
        </a>
        {/* Центрируем навигацию, справа — фиксированный блок */}
        <div className="flex-1 flex items-center justify-center">
          <nav className="hidden md:flex gap-6 text-base font-semibold text-white/90 group">
            <a href="/courses" className="hover:text-[#FADF4B] transition">
              Курсы
            </a>
            <a href="/knowledge" className="hover:text-[#FADF4B] transition">
              База знаний
            </a>
            <a href="/forum" className="hover:text-[#FADF4B] transition">
              Форум
            </a>
            <a href="/challenges" className="hover:text-[#FADF4B] transition">
              Испытания
            </a>
          </nav>
        </div>
        {/* Фиксированный по ширине блок пользователя/заглушки */}
        <div className="w-[135px] flex items-center justify-end">
          {loading ? (
            <div className="h-[36px] rounded-full animate-pulse bg-gradient-to-r from-[#292930] to-[#343445] w-full"></div>
          ) : user ? (
            <div
              className="relative"
              onMouseOver={handleMouseEnter}
              onMouseOut={handleMouseLeave}
            >
              <button
                className="flex items-center gap-2 text-white px-3 py-1 rounded-full bg-[#3B3B42] hover:bg-[#4b4b52] transition max-w-[160px]"
                style={{ minWidth: 0 }}
              >
                <img src={userIcon} alt="User icon" className="w-4 h-4" />
                <span
                  className="font-semibold text-sm overflow-hidden text-ellipsis whitespace-nowrap block"
                  style={{ maxWidth: 105 }}
                  title={user.nickname}
                >
                  {user.nickname.length > 15
                    ? user.nickname.slice(0, 13) + "..."
                    : user.nickname}
                </span>
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-[#3B3B42] rounded-xl shadow-lg z-50 p-2 space-y-1"
                >
                  <button
                    onClick={() => { window.location.href = "/profile"; }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-[#4b4b52] rounded text-sm"
                  >
                    Личный кабинет
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#4b4b52] rounded text-sm"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="flex items-center justify-between w-[185px] px-3 py-2 rounded-full bg-[#5B76EF] hover:bg-[#4d66d6] transition text-white font-semibold text-sm"
            >
              <span className="overflow-hidden truncate">{'Вход/Регистрация'}</span>
              <img src={userIcon} alt="User icon" className="w-4 h-4 flex-shrink-0 ml-2" />
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Обычный хедер */}
      <header className="bg-[#212123] mt-4">{getHeaderContent(true)}</header>
      {/* Sticky хедер — только если showSticky */}
      {showSticky && (
        <header
          className="fixed top-4 left-0 w-full z-[999] flex justify-center pointer-events-none transition-all duration-300 animate-fadeIn"
          style={{ animation: "fadeIn 0.4s" }}
        >
          <div
            className="max-w-[1200px] w-full rounded-2xl pointer-events-auto border border-[#FADF4B] shadow-2xl backdrop-blur-md"
            style={{ background: "rgba(44,45,51,0.85)" }}
          >
            {getHeaderContent(false)}
          </div>
        </header>
      )}
      {/* Минимальный css для анимации (можно в index.css) */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s;
          }
        `}
      </style>
    </>
  );
}