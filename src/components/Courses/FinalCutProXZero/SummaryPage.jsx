import LessonSkeleton from "../../Skeletons/LessonSkeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";



const SummaryPage = ({ summary }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkdown = async () => {
      if (summary && typeof summary.markdown === "function") {
        try {
          setLoading(true);
          const res = await summary.markdown();
          setContent(res.default || res);
          setLoading(false);
        } catch (err) {
          console.error("Ошибка загрузки markdown:", err);
          setLoading(false);
        }
      }
    };

    loadMarkdown();
  }, [summary?.id]);

  if (!summary) {
    return (
      <div className="text-white p-6">
        Итоговая страница не найдена
      </div>
    );
  }

  if (loading === true) {
    return <LessonSkeleton />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-[#2B2B31] p-6 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">{summary.title || "Подведение итогов"}</h2>
        {summary.video && (
          <video
            key={summary.video}
            controls
            poster={summary.poster}
            className="w-full rounded-xl mb-6 max-h-[500px] mx-auto bg-black"
          >
            <source src={summary.video} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        )}
        <div className="prose prose-invert max-w-none text-base">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;