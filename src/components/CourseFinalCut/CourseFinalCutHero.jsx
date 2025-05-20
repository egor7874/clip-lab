import heroImage from "../../assets/image23.png";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseFinalCutHero() {
  const [isAuth, setIsAuth] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [showAlreadyEnrolled, setShowAlreadyEnrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  const handleEnroll = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      window.location.href = "/login";
      return;
    }
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? userSnap.data() : {};

    // enrolledCourses всегда должен быть массивом
    let enrolledCourses = [];
    if (Array.isArray(userData.enrolledCourses)) {
      enrolledCourses = userData.enrolledCourses;
    }

    if (enrolledCourses.includes("fcpx-zero")) {
      // Показать уведомление о том, что курс уже добавлен
      setShowAlreadyEnrolled(true);
      return;
    }

    await updateDoc(userRef, { enrolledCourses: [...enrolledCourses, "fcpx-zero"] });

    // Новый: ставим флаг в localStorage и редиректим
    localStorage.setItem("courseEnrolled", "fcpx-zero");
    window.location.href = "/profile/mycourses";
  };

  return (
    <section
      style={{
        background: "linear-gradient(90deg, #F3EF3C 0%, #F0463C 25%, #A997F7 50%, #66E8F5 75%, #5DF957 100%)"
      }}
      className="text-white py-20 px-6 md:px-10 font-inter relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#19191e]/70 z-0 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Левая часть */}
          <div className="md:max-w-[50%] text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
              Final Cut Pro X <span className="text-[#FADF4B]">с нуля</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-white/80 mb-4">
              Полный курс по Final Cut Pro X — от нуля до уверенного видеомейкера
            </p>
            <p className="text-[#FADF4B] text-lg font-medium mb-8">
              3 месяца • 6 модулей
            </p>
            {loadingUser ? (
              <span className="inline-block h-[56px] w-[260px] rounded-full animate-pulse bg-gradient-to-r from-[#2b2b31] to-[#363646]"></span>
            ) : (
              <button
                className="mt-2 px-8 py-4 rounded-full bg-[#5B76EF] text-white text-base font-semibold hover:bg-[#4d66d6] transition"
                onClick={handleEnroll}
              >
                {isAuth ? "Записаться на курс" : "Войдите, чтобы записаться на курс"}
              </button>
            )}

            <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
              {["Видеоуроки", "Тесты", "Практика", "Интерактивный", "Проверка заданий"].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#2B2B31] px-5 py-2 rounded-full text-white/90 text-sm font-light shadow-md"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Правая часть */}
          <div className="md:max-w-[45%] w-full">
            <img
              src={heroImage}
              alt="Final Cut Pro X"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAlreadyEnrolled && (
          <>
            {/* Затемненный фон с блюром */}
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
                <h2 className="text-3xl font-black mb-2 text-[#FADF4B]">Курс уже добавлен!</h2>
                <p className="text-white text-lg mb-2">
                  Этот курс уже есть в вашем Личном кабинете 🎉<br />
                  Вы можете найти его в разделе «Мои курсы».
                </p>
                <button
                  className="bg-[#FADF4B] text-[#212123] text-base font-semibold py-2.5 px-10 rounded-full hover:bg-[#e4d937] transition mt-2"
                  onClick={() => setShowAlreadyEnrolled(false)}
                >
                  Ок
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}