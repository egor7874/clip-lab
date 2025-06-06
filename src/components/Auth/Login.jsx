import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import welcomeImage from "../../assets/image42.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    try {
      await signInWithEmailAndPassword(auth, email, password);  

      window.location.href = "/profile";                            // Успешный вход, делай редирект!
    } catch (err) {
      let msg = "";
 
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        msg = "Неверная почта или пароль";
      } else if (err.code === "auth/invalid-email") {
        msg = "Некорректный формат почты";
      } else {
        msg = "Ошибка входа: " + err.message;
      }
      setErrorMessages([msg]);
    }
  };

  useEffect(() => {
    setErrorMessages([]);
  }, [email, password]);

  return (
    <section className="bg-[#212123] text-white font-inter px-6 pt-10 pb-10 md:pt-20 md:pb-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Левая часть */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black">
            Добро пожаловать в <span className="text-[#FADF4B]">ClipLab!</span>
          </h1>
          <img
            src={welcomeImage}
            alt="ClipLab Welcome"
            className="max-w-lg mx-auto md:mx-0"
          />
        </div>

        {/* Правая часть */}
        <form
          onSubmit={handleLogin}
          className="bg-[#2B2B31] p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-black">
            <span className="text-[#FADF4B]">Войти</span> в аккаунт
          </h2>
          <input
            type="email"
            placeholder="Почта"
            className="w-full p-3 rounded bg-[#1c1c1e] text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              className="w-full p-3 rounded bg-[#1c1c1e] text-white pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
          <div className="flex flex-col gap-4 w-full transition-all duration-300">
            <AnimatePresence>
              {errorMessages.length > 0 && errorMessages.map((msg, i) => (
                <motion.div
                  key={"login-error-" + i}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#2B2B31] border border-[#FADF4B] rounded-lg px-4 py-2 mb-2 text-red-400 text-sm"
                >
                  {msg}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <button
            type="submit"
            className="w-full bg-[#5B76EF] hover:bg-[#4d66d6] p-3 rounded-full text-white font-medium transition"
          >
            Войти
          </button>
          <div className="text-center text-sm text-white/60">или</div>
          <button
            type="button"
            className="w-full bg-[#FADF4B] hover:bg-[#e4d937] p-3 rounded-full text-black font-medium transition"
            onClick={() => window.location.href = "/register"}
          >
            Создать аккаунт
          </button>
        </form>
      </div>
    </section>
  );
}