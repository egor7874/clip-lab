import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AdminAuth({ children }) {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("not-auth");
        return;
      }
      // Проверяем роль только если есть пользователь
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists() && snap.data().role === "admin") {
        setStatus("ok");
      } else {
        setStatus("forbidden");
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (status === "not-auth") {
      navigate("/login", { replace: true });
    }
  }, [status, navigate]);

  if (status === "loading") return <div className="text-white">Загрузка...</div>;
  if (status === "forbidden") return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "#191A1D",
        animation: "flash-bg 1s infinite",
      }}
    >
      <div className="text-white text-2xl font-bold px-8 py-6 rounded-xl shadow-lg border-2 border-red-600 bg-[#232427]/70">
        🚫 Доступ запрещён (вы не администратор)
      </div>
      <style>
        {`
          @keyframes flash-bg {
            0%, 100% { background: #191A1D; }
            50% { background: #8B0000; }
          }
        `}
      </style>
    </div>
  );

  return children;
}