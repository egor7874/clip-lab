import { AnimatePresence, motion } from "framer-motion";
import Header from "../Header";
import Footer from "../Footer";
import ProfileNavigation from "./ProfileNavigation";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [showWelcome, setShowWelcome] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Определяем активную вкладку по url
  const path = location.pathname.replace("/profile", "") || "/";
  let activeTab = "progress";
  if (path.startsWith("/mycourses")) activeTab = "courses";
  if (path.startsWith("/settings")) activeTab = "settings";
  const handleTabClick = (tabId) => {
    switch(tabId) {
      case "progress":
        navigate("/profile");
        break;
      case "courses":
        navigate("/profile/mycourses");
        break;
      case "settings":
        navigate("/profile/settings");
        break;
      default:
        navigate("/profile");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("justRegistered") === "1") {
      setShowWelcome(true);
      localStorage.removeItem("justRegistered");
    }
  }, []);

  return (
    <>
      <Header />
      <AnimatePresence>
        {showWelcome && (
          <>
            {/* Затемненный фон с плавным исчезновением */}
            <motion.div
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
            {/* Само уведомление */}
            <motion.div
              className="fixed inset-0 z-[110] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.97, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ duration: 0.35 }}
            >
              <div className="bg-[#2B2B31] text-center px-10 py-10 rounded-2xl shadow-xl max-w-lg w-full flex flex-col gap-6 items-center border border-[#FADF4B]">
                <h2 className="text-3xl font-black mb-2 text-[#FADF4B]">Добро пожаловать!</h2>
                <p className="text-white text-lg mb-2">Поздравляем с успешной регистрацией 🎉<br />Теперь вы в Личном кабинете ClipLab!</p>
                <button
                  className="bg-[#FADF4B] text-[#212123] text-base font-semibold py-2.5 px-10 rounded-full hover:bg-[#e4d937] transition mt-2"
                  onClick={() => setShowWelcome(false)}
                >
                  Ок
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <section className="bg-[#212123] text-white font-inter px-6 py-20 md:px-20 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <h1 className="text-4xl md:text-5xl font-black mb-8">
            <span className="text-[#FADF4B]">Личный</span> кабинет
          </h1>
          <div className="flex gap-10 items-start">
            <div className="h-full">
                <ProfileNavigation activeTab={activeTab} setActiveTab={handleTabClick} />
            </div>
            <div className="flex-1 self-stretch">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}