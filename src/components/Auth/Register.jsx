import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, runTransaction } from "firebase/firestore";
import { auth, db } from "../../firebase";
import cliplabLogo from "../../assets/image43.png";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [nickname, setNickname] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [errorFields, setErrorFields] = useState({
    lastName: false,
    firstName: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreePolicy: false,
    captcha: false,
    nickname: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [stage, setStage] = useState("register"); // "register" | "nickname"
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Следим за текущим пользователем
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u && stage === "register") {
        setStage("nickname");
      }
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  // Пароль правила
  const passwordRules = [
    { label: "Не менее 8 символов", valid: formData.password.length >= 8 },
    { label: "Хотя бы одна цифра", valid: /\d/.test(formData.password) },
    { label: "Заглавная буква", valid: /[A-ZА-ЯЁ]/.test(formData.password) },
  ];
  const passwordValid = passwordRules.every((r) => r.valid);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  // Создание уникального индекса для никнейма (Atomic)
  async function claimUniqueIndex(collection, value) {
    const ref = doc(db, collection, value);
    try {
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(ref);
        if (docSnap.exists()) {
          throw new Error("exists");
        }
        transaction.set(ref, { created: Date.now() });
      });
      return true;
    } catch (err) {
      if (err.message === "exists") return false;
      throw err;
    }
  }

  // Обработка изменения полей регистрации
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorFields[name]) {
      setErrorFields((prev) => ({ ...prev, [name]: false }));
      setErrorMessages((prev) =>
        prev.filter(
          (msg) =>
            !(
              (name === "firstName" && msg.includes("Имя")) ||
              (name === "lastName" && msg.includes("Фамилия")) ||
              (name === "email" && msg.toLowerCase().includes("почта")) ||
              (name === "password" && msg.toLowerCase().includes("пароль")) ||
              (name === "confirmPassword" && msg.toLowerCase().includes("повторите пароль")) ||
              (name === "confirmPassword" && msg.includes("Пароли не совпадают"))
            )
        )
      );
    }
  };

  // Обработка изменения никнейма
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    if (errorFields.nickname) {
      setErrorFields((prev) => ({ ...prev, nickname: false }));
      setErrorMessages((prev) => prev.filter((msg) => !(msg.toLowerCase().includes("ник"))));
    }
  };

  // Валидация полей регистрации
  const validateFields = useCallback(async (fields = formData) => {
    const namePattern = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;
    let errors = [];
    let newErrorFields = {
      lastName: false,
      firstName: false,
      email: false,
      password: false,
      confirmPassword: false,
      agreePolicy: false,
      captcha: false,
      nickname: false,
    };
    if (!namePattern.test(fields.firstName)) {
      errors.push("Имя может содержать только буквы, от 2 до 30 символов");
      newErrorFields.firstName = true;
    }
    if (!namePattern.test(fields.lastName)) {
      errors.push("Фамилия может содержать только буквы, от 2 до 30 символов");
      newErrorFields.lastName = true;
    }
    if (!fields.email) {
      errors.push("Пожалуйста, заполните поле 'Почта'");
      newErrorFields.email = true;
    } else if (!validateEmail(fields.email)) {
      errors.push("Введите корректный email");
      newErrorFields.email = true;
    }
    if (!fields.password) {
      errors.push("Пожалуйста, заполните поле 'Пароль'");
      newErrorFields.password = true;
    } else if (!passwordValid) {
      errors.push("Пароль должен быть не менее 8 символов, содержать цифру и заглавную букву");
      newErrorFields.password = true;
    }
    if (!fields.confirmPassword) {
      errors.push("Пожалуйста, заполните поле 'Повторите пароль'");
      newErrorFields.confirmPassword = true;
    } else if (!passwordsMatch) {
      errors.push("Пароли не совпадают");
      newErrorFields.confirmPassword = true;
    }
    if (fields.firstName.length > 30) {
      errors.push("Имя не должно превышать 30 символов");
      newErrorFields.firstName = true;
    }
    if (fields.lastName.length > 30) {
      errors.push("Фамилия не должна превышать 30 символов");
      newErrorFields.lastName = true;
    }
    if (fields.email.length > 80) {
      errors.push("Почта не должна превышать 80 символов");
      newErrorFields.email = true;
    }
    if (!agreePolicy) {
      errors.push("Необходимо согласиться с политикой обработки данных");
      newErrorFields.agreePolicy = true;
    }
    if (!captchaToken) {
      errors.push("Подтвердите, что вы не робот");
      newErrorFields.captcha = true;
    }
    setErrorMessages(errors);
    setErrorFields(newErrorFields);
    return errors.length === 0;
    // eslint-disable-next-line
  }, [formData, agreePolicy, captchaToken, passwordValid, passwordsMatch]);

  // Валидация поля никнейма
  const validateNickname = async () => {
    const nicknamePattern = /^[a-zA-Zа-яА-ЯёЁ0-9_]{3,20}$/;
    let errors = [];
    let valid = true;
    let newErrorFields = { ...errorFields, nickname: false };
    if (!nicknamePattern.test(nickname)) {
      errors.push("Никнейм должен содержать только буквы, цифры или подчёркивание, от 3 до 20 символов");
      newErrorFields.nickname = true;
      valid = false;
    }
    if (nickname.length > 20) {
      errors.push("Никнейм не должен превышать 20 символов");
      newErrorFields.nickname = true;
      valid = false;
    }
    if (nickname.length < 3) {
      errors.push("Никнейм слишком короткий");
      newErrorFields.nickname = true;
      valid = false;
    }
    // Проверка уникальности
    if (valid) {
      setLoading(true);
      const isUnique = await claimUniqueIndex("unique_nicknames", nickname);
      setLoading(false);
      if (!isUnique) {
        errors.push("Никнейм уже занят");
        newErrorFields.nickname = true;
        valid = false;
      }
    }
    setErrorMessages(errors);
    setErrorFields((prev) => ({ ...prev, ...newErrorFields }));
    return valid;
  };

  // Отправка формы регистрации (1 этап)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const isValid = await validateFields(formData);
    if (!isValid) {
      setLoading(false);
      return;
    }
    setErrorMessages([]);
    setErrorFields({
      lastName: false,
      firstName: false,
      email: false,
      password: false,
      confirmPassword: false,
      agreePolicy: false,
      captcha: false,
      nickname: false,
    });
    try {
      // Создаём пользователя
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // После успешной регистрации ждём onAuthStateChanged, который переведёт на этап никнейма
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrorMessages(["Этот email уже зарегистрирован. Используйте другой или войдите в аккаунт."]);
        setErrorFields((prev) => ({ ...prev, email: true }));
      } else if (err.code === "auth/invalid-email") {
        setErrorMessages(["Некорректный формат email."]);
        setErrorFields((prev) => ({ ...prev, email: true }));
      } else if (err.code === "auth/weak-password") {
        setErrorMessages(["Пароль слишком слабый (минимум 6 символов)."]);
        setErrorFields((prev) => ({ ...prev, password: true }));
      } else {
        setErrorMessages(["Ошибка регистрации: " + err.message]);
      }
    }
    setLoading(false);
  };

  // Отправка формы выбора никнейма (2 этап)
  const handleNicknameSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setErrorMessages(["Ошибка: пользователь не найден"]);
      return;
    }
    const valid = await validateNickname();
    if (!valid) return;
    // Создаём документ пользователя
    try {
      await setDoc(doc(db, "users", user.uid), {
        nickname: nickname,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        uid: user.uid,
        role: "student",
        registrationCompleted: true,
      });
      localStorage.setItem("justRegistered", "1");
      window.location.href = "/profile";
    } catch (err) {
      // Очищаем никнейм из индекса, если не удалось завершить регистрацию
      // (оставим как было, т.к. уникальность никнейма нужна)
      await import("firebase/firestore").then(({ deleteDoc, doc }) =>
        deleteDoc(doc(db, "unique_nicknames", nickname))
      );
      setErrorMessages(["Ошибка завершения регистрации: " + err.message]);
    }
  };

  const canSubmit =
    formData.lastName &&
    formData.firstName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    agreePolicy &&
    captchaToken;

  const canFinish =
    nickname &&
    !loading;

  return (
    <section className="bg-[#212123] text-white font-inter px-6 pt-10 pb-10 md:pt-20 md:pb-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        {/* Левая часть */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black">
            Добро пожаловать в <span className="text-[#FADF4B]">ClipLab!</span>
          </h1>
          <img
            src={cliplabLogo}
            alt="ClipLab Logo"
            className="max-w-lg mx-auto md:mx-0"
          />
        </div>

        {/* Правая часть */}
        <div className="w-full md:w-[45%] bg-[#2B2B31] p-8 rounded-xl shadow-xl flex flex-col items-start">
          {stage === "register" && (
            <>
              <h3 className="text-2xl md:text-3xl font-black mb-6">
                <span className="text-[#FADF4B]">Создать</span> аккаунт
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 w-full" noValidate>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Фамилия"
                  value={formData.lastName}
                  onChange={handleChange}
                  maxLength={30}
                  pattern="[a-zA-Zа-яА-ЯёЁ]{2,30}"
                  title="Только буквы, 2–30 символов"
                  className={`w-full rounded-full px-4 py-3 bg-[#3B3B42] placeholder-white/50 focus:outline-none ${errorFields.lastName ? "border-red-500 border" : ""}`}
                />
                <input
                  type="text"
                  name="firstName"
                  placeholder="Имя"
                  value={formData.firstName}
                  onChange={handleChange}
                  maxLength={30}
                  pattern="[a-zA-Zа-яА-ЯёЁ]{2,30}"
                  title="Только буквы, 2–30 символов"
                  className={`w-full rounded-full px-4 py-3 bg-[#3B3B42] placeholder-white/50 focus:outline-none ${errorFields.firstName ? "border-red-500 border" : ""}`}
                />
                <div className="relative w-full">
                  <input
                    type="text"
                    name="email"
                    placeholder="Почта"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={80}
                    className={`w-full rounded-full px-4 py-3 bg-[#3B3B42] placeholder-white/50 focus:outline-none ${errorFields.email ? "border-red-500 border" : ""}`}
                    autoComplete="off"
                  />
                </div>
                {/* Пароль + чеклист */}
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    maxLength={72}
                    className={`w-full rounded-full px-4 py-3 bg-[#3B3B42] placeholder-white/50 focus:outline-none pr-12 ${errorFields.password ? "border-red-500 border" : ""}`}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    tabIndex={-1}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    maxLength={72}
                    className={`w-full rounded-full px-4 py-3 bg-[#3B3B42] placeholder-white/50 focus:outline-none pr-12 ${errorFields.confirmPassword ? "border-red-500 border" : ""}`}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
                {/* Чекбокс согласия с политикой */}
                <label className="flex items-center gap-2 text-sm mb-2">
                  <input type="checkbox" checked={agreePolicy} onChange={e => setAgreePolicy(e.target.checked)} />
                  Я соглашаюсь с <a href="/policy" target="_blank" rel="noopener noreferrer" className="underline text-[#FADF4B]">политикой обработки персональных данных</a>
                </label>
                {/* Компонент рекапчи */}
                <ReCAPTCHA
                  sitekey="6LcgXT8rAAAAANcdlhy4g3h3PSm2Yeuf9C8qQlcH"
                  onChange={token => setCaptchaToken(token)}
                  theme="dark"
                  className="mb-2"
                />
                <div className="flex flex-col gap-4">
                  <div className="w-full transition-all duration-300">
                    <AnimatePresence>
                      {errorMessages.length > 0 && errorMessages.map((msg, i) => (
                        <motion.div
                          key={"error-" + i}
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
                    className={`w-1/2 bg-[#5B76EF] hover:bg-[#4d66d6] transition text-white rounded-full py-3 font-semibold mx-auto flex justify-center ${
                      !canSubmit || loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!canSubmit || loading}
                  >
                    {loading ? "Создание..." : "Создать аккаунт"}
                  </button>
                  <p className="text-center text-white/70 pt-2">или</p>
                  <button
                    type="button"
                    onClick={() => window.location.href = "/login"}
                    className="w-1/2 bg-[#FADF4B] hover:bg-[#e4d937] transition text-black rounded-full py-3 font-semibold mx-auto flex justify-center"
                  >
                    Войти
                  </button>
                </div>
              </form>
            </>
          )}
          {stage === "nickname" && user && (
            <form onSubmit={handleNicknameSubmit} className="space-y-4 w-full" noValidate>
              <h3 className="text-2xl md:text-3xl font-black mb-6">
                <span className="text-[#FADF4B]">Выберите</span> никнейм
              </h3>
              <input
                type="text"
                name="nickname"
                placeholder="Никнейм"
                value={nickname}
                onChange={handleNicknameChange}
                maxLength={20}
                pattern="[a-zA-Zа-яА-ЯёЁ0-9_]{3,20}"
                title="Только буквы, цифры и подчёркивание, 3–20 символов"
                className={`w-full rounded-full px-4 py-3 bg-[#3B3B42] placeholder-white/50 focus:outline-none ${errorFields.nickname ? "border-red-500 border" : ""}`}
                autoFocus
              />
              <div className="flex flex-col gap-4">
                <div className="w-full transition-all duration-300">
                  <AnimatePresence>
                    {errorMessages.length > 0 && errorMessages.map((msg, i) => (
                      <motion.div
                        key={"error-nick-" + i}
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
                  className={`w-1/2 bg-[#5B76EF] hover:bg-[#4d66d6] transition text-white rounded-full py-3 font-semibold mx-auto flex justify-center ${
                    !canFinish ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!canFinish}
                >
                  {loading ? "Проверка..." : "Завершить регистрацию"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
