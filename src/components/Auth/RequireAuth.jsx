// src/components/Auth/RequireAuth.jsx
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
      setChecking(false);
    });
    return () => unsub();
  }, [navigate]);

  if (checking)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#212123]">
        <span className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 block border-t-yellow-400 animate-spin"></span>
        <style>
          {`
            .loader {
              border-top-color: #FADF4B;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}
        </style>
      </div>
    );
  return children;
}