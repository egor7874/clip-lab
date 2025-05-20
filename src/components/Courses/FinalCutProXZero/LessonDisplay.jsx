import LessonSkeleton from "../../Skeletons/LessonSkeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

const LessonDisplay = ({ lesson }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkdown = async () => {
      if (lesson && typeof lesson.markdown === "function") {
        try {
          setLoading(true);
          const res = await lesson.markdown();
          setContent(res.default || res);
          setLoading(false);
        } catch (err) {
          console.error("Ошибка загрузки markdown:", err);
          setLoading(false);
        }
      }
    };

    loadMarkdown();
  }, [lesson?.id]);

  if (!lesson) {
    return (
      <div className="text-white p-6">
        Выберите урок в меню слева
      </div>
    );
  }

  if (loading === true) {
    return <LessonSkeleton />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-[#2B2B31] p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">{lesson.title}</h2>
        {lesson.video && (
          <video key={lesson.video} controls poster={lesson.poster} className="w-full rounded-lg mb-6">
            <source src={lesson.video} type="video/mp4" />
          </video>
        )}
        <div className="prose prose-invert max-w-none text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default LessonDisplay;