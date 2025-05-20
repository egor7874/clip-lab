export default function ProfileProgress() {
  return (
    <div className="bg-[#2B2D34] rounded-3xl px-10 py-16 flex flex-col items-center w-full ml-0 shadow-xl min-h-[220px]">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        Раздел прогресс находится в <span className="text-[#FADF4B]">разработке</span>.
      </h2>
      <div className="mt-8 flex justify-center">
        <span className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 block border-t-yellow-400 animate-spin"></span>
      </div>
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
}