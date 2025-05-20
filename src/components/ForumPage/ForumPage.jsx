import Header from "../Header";
import Footer from "../Footer";

export default function ForumPage() {
  return (
    <>
      <Header />
      <div className="min-h-[60vh] flex flex-col py-12 px-2 bg-[#212123]">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-4xl font-black mb-12 mt-2 text-white text-left px-2 md:px-0">
            Форум <span className="text-[#FADF4B]">ClipLab</span>
          </h1>
        </div>
        <div className="max-w-4xl w-full mx-auto">
          <div className="bg-[#2B2D34] rounded-3xl px-10 py-16 flex flex-col items-center w-full shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Этот раздел находится в <span className="text-[#FADF4B]">разработке</span>.
            </h2>
            <div className="mt-8 flex justify-center">
              <span className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 block border-t-yellow-400 animate-spin"></span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
    </>
  );
}