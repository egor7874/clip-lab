import { useContext, useState } from "react";
import cliplabLogo from "../assets/cliplablogoFull.png";
import userIcon from "../assets/user.png";
import { UserContext } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function MiniHeader() {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  let menuCloseTimeout;

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

  return (
    <header className="bg-[#212123] mt-4">
      <div className="w-fit ml-auto px-4 py-2 rounded-2xl text-white font-inter bg-[#2C2D33] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => { window.location.href = "/"; }}
          style={{ background: "none", border: "none", padding: 0, margin: 0, cursor: "pointer" }}
        >
          <img
            src={cliplabLogo}
            alt="ClipLab logo"
            className="w-[115px] h-auto"
          />
        </button>

        <div className="ml-auto">
          <div
            className="relative"
            onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave}
          >
            <button
              className="flex items-center gap-2 text-white px-3 py-1 rounded-full bg-[#3B3B42] hover:bg-[#4b4b52] transition"
            >
              <img src={userIcon} alt="User icon" className="w-4 h-4" />
              <span className="font-semibold text-sm">{user ? user.nickname : ""}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#3B3B42] rounded-xl shadow-lg z-50 p-2 space-y-1">
                <button
                  type="button"
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
        </div>
      </div>
    </header>
  );
}