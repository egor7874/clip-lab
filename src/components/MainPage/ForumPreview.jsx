

import forumImage from "../../assets/image15.png";

export default function ForumPreview() {
  return (
    <section className="bg-[#212123] text-white font-inter px-6 py-20 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
            Обсуждай, <span className="text-[#FADF4B]">спрашивай</span>, делись
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Форум — это место, где ты можешь найти помощь, поделиться опытом и получить фидбек от других монтажёров.
          </p>
          <a
            href="/forum"
            className="px-8 py-4 rounded-full bg-[#5B76EF] text-white text-base font-medium hover:bg-[#4d66d6] transition"
          >
            Форум
          </a>
        </div>
        <div className="md:w-1/2 w-full flex justify-center">
          <img src={forumImage} alt="Форум" className="max-w-[300px] w-full h-auto" />
        </div>
      </div>
    </section>
  );
}