import PracticeSkeleton from "../../Skeletons/PracticeSkeleton";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import practiceIcon from "../../../assets/image49.png"; // поставь актуальную иконку
import { uploadToCloudinary } from "../../../lib/uploadToCloudinary";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { savePracticeSubmission } from "../../../lib/practiceSubmissions";
import { subscribeToUserPracticeStatuses } from "../../../lib/practiceSubmissions";

const PracticeView = ({ practice }) => {
  const [content, setContent] = useState("");
  const [pinContent, setPinContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [practiceStatus, setPracticeStatus] = useState(null);
  const [practiceComment, setPracticeComment] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    const loadPractice = async () => {
      try {
        if (typeof practice.markdown === "function") {
          const res = await practice.markdown();
          setContent(res.default || res);
        }
        if (typeof practice.pin === "function") {
          const resPin = await practice.pin();
          setPinContent(resPin.default || resPin);
        }
      } catch (err) {
        console.error("Ошибка загрузки markdown:", err);
      }
    };

    loadPractice();
  }, [practice?.id]);

  useEffect(() => {
    const auth = getAuth();
    let unsubscribeStatuses = null;
    let unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && practice?.id) {
        setLoadingStatus(true);
        unsubscribeStatuses = subscribeToUserPracticeStatuses(user.uid, (statuses) => {
          const statusRaw = statuses[practice.id];
          if (typeof statusRaw === "object" && statusRaw !== null) {
            setPracticeStatus(statusRaw.status || null);
            setPracticeComment(statusRaw.comment || "");
          } else {
            setPracticeStatus(statusRaw || null);
            setPracticeComment("");
          }
          setLoadingStatus(false);
        });
      } else {
        setPracticeStatus(null);
        setPracticeComment("");
        setLoadingStatus(false);
      }
    });

    return () => {
      if (unsubscribeStatuses) unsubscribeStatuses();
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, [practice?.id]);

useEffect(() => {
  setSelectedFiles([]);
  setUploadMessage("");
  setUploading(false);
}, [practiceStatus, practice?.id]);

  if (!practice) {
    return (
      <div className="text-white p-6">Выберите практику в меню слева</div>
    );
  }

  if (loadingStatus) {
    return <PracticeSkeleton />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-[#2B2B31] p-6 rounded-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-4xl font-bold mb-4">Практика</h2>
            <p className="text-xl font-semibold">{practice.title}</p>
          </div>
          <img
            src={practiceIcon}
            alt="Практика"
            className="w-64 aspect-square object-contain ml-4"
          />
        </div>

        <div className="bg-[#38383F] p-6 rounded-2xl text-white mb-6">
          <div className="prose prose-invert max-w-none text-sm leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="bg-[#38383F] p-6 rounded-2xl text-white mt-6 flex flex-row items-stretch gap-8 min-h-[220px] h-full">
          <div className="prose prose-invert max-w-none text-sm leading-relaxed min-w-[270px] h-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {pinContent}
            </ReactMarkdown>
          </div>
          <div className="flex-1 min-w-[250px] flex flex-col justify-end gap-2 h-full">
            {practiceStatus === "pending" && (
              <div className="p-4 rounded-xl bg-yellow-900/40 text-yellow-400 font-semibold text-center mt-4">
                Практика отправлена на проверку. Ждите ответа преподавателя.
              </div>
            )}

            {practiceStatus === "accepted" && (
              <div className="p-4 rounded-xl bg-green-900/40 text-green-400 font-semibold text-center mt-4">
                Практика одобрена! <br />
                Поздравляем, задание принято.
              </div>
            )}

            {(!practiceStatus || practiceStatus === "rejected") && (
              <>
                {practiceStatus === "rejected" && (
                  <div className="p-4 rounded-xl bg-red-900/40 text-red-400 font-semibold text-center mt-2">
                    Практика не одобрена преподавателем.
                    {practiceComment && (
                      <div className="mt-3 p-3 rounded-xl border border-red-400 bg-red-950/50 text-white font-normal text-left mx-auto max-w-xl whitespace-pre-line">
                        <span className="font-semibold text-red-400">Комментарий преподавателя:</span>
                        <br />
                        {practiceComment}
                      </div>
                    )}
                    <div className="mt-2 text-red-200 font-normal">Можете отправить новую попытку.</div>
                  </div>
                )}
                {/* Вся форма загрузки файлов (оставить без изменений) */}
                <label className="block text-sm font-medium mb-2">Загрузите файлы (скриншоты или видео):</label>
                <div className="flex flex-col gap-1">
                  <label className="block">
                    <span className="sr-only">Выберите файлы</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) => setSelectedFiles([...e.target.files])}
                      className="hidden"
                      id="practice-files"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('practice-files').click()}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold w-full mb-1"
                    >
                      Выбрать файлы
                    </button>
                  </label>
                  {selectedFiles.length > 0 && (
                    <div
                      className="text-xs text-white/70 mt-1 max-w-[250px] truncate"
                      title={selectedFiles.length === 1 ? selectedFiles[0].name : selectedFiles.map(f => f.name).join(', ')}
                    >
                      {selectedFiles.length === 1
                        ? `Выбран файл: ${selectedFiles[0].name}`
                        : `Выбрано файлов: ${selectedFiles.length}`}
                    </div>
                  )}
                </div>
                <button
                  disabled={uploading || selectedFiles.length === 0}
                  onClick={async () => {
                    setUploading(true);
                    setUploadMessage("");
                    try {
                      const uploaded = await uploadToCloudinary(selectedFiles);
                      const auth = getAuth();
                      const user = auth.currentUser;
                      if (!user) throw new Error("Необходима авторизация!");
                      await savePracticeSubmission({
                        userId: user.uid,
                        courseId: practice.courseId || "default",
                        practiceId: practice.id,
                        files: uploaded,
                      });
                      setUploadMessage("Файлы успешно загружены и отправлены на проверку!");
                      setSelectedFiles([]);
                    } catch (err) {
                      console.error("Ошибка при загрузке:", err);
                      setUploadMessage("Ошибка при загрузке или отправке. Попробуйте ещё раз.");
                    }
                    setUploading(false);
                  }}
                  className={`bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold ${uploading || selectedFiles.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {uploading ? "Отправка..." : "Отправить на проверку"}
                </button>
                {uploadMessage && <p className="mt-2 text-sm text-white/80">{uploadMessage}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeView;