import { FCPX_ZERO_TASK_ACHIEVEMENTS } from "./achievements";
import { grantAchievement } from "../../../lib/userProgress";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import taskIcon from "../../../assets/image50.png"; // Актуальная иконка
import { uploadToCloudinary } from "../../../lib/uploadToCloudinary";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { saveTaskSubmission, subscribeToUserTaskStatuses } from "../../../lib/taskSubmissions"; // Исправленные импорты
import TaskSkeleton from "../../Skeletons/TaskSkeleton";
import { motion } from "framer-motion";

const TaskView = ({ task, userId, userAchievements = {} }) => {
  const [content, setContent] = useState("");
  const [pinContent, setPinContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [taskStatus, setTaskStatus] = useState(null);
  const [taskComment, setTaskComment] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      try {
        if (typeof task.markdown === "function") {
          const res = await task.markdown();
          setContent(res.default || res);
        }
        if (typeof task.pin === "function") {
          const resPin = await task.pin();
          setPinContent(resPin.default || resPin);
        }
      } catch (err) {
        console.error("Ошибка загрузки markdown:", err);
      }
    };
    loadTask();
  }, [task?.id]);

  useEffect(() => {
    setTaskStatus("loading"); // Показать загрузку
    setTaskComment("");
    const auth = getAuth();
    let unsubscribe = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user || !task?.id) {
        setTaskStatus(null);
        setTaskComment("");
        return;
      }

      unsubscribe = subscribeToUserTaskStatuses(user.uid, (statuses) => {
        const statusRaw = statuses[task.id];
        if (typeof statusRaw === "object" && statusRaw !== null) {
          setTaskStatus(statusRaw.status || null);
          setTaskComment(statusRaw.comment || "");
        } else {
          setTaskStatus(statusRaw || null);
          setTaskComment("");
        }
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
      unsubscribeAuth();
    };
  }, [task?.id]);

  useEffect(() => {
    setSelectedFiles([]);
    setUploadMessage("");
    setUploading(false);
  }, [task?.id]);

  useEffect(() => {
    if (taskStatus === "accepted" && userId && FCPX_ZERO_TASK_ACHIEVEMENTS[task.id]) {
      // Проверяем, выдано ли уже достижение
      const userTaskAchievements = userAchievements["fcpx-zero"] || [];
      if (!userTaskAchievements.includes(task.id)) {
        grantAchievement(userId, "fcpx-zero", task.id);
      }
    }
    // eslint-disable-next-line
  }, [taskStatus, userId, task?.id]);

  if (!task) {
    return (
      <div className="text-white p-6">Выберите индивидуальное задание в меню слева</div>
    );
  }

  // Показываем скелетон, если статус "loading"
  if (taskStatus === "loading") {
    return <TaskSkeleton />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-[#2B2B31] p-6 rounded-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-4xl font-bold mb-4">Индивидуальное задание</h2>
            <p className="text-xl font-semibold">{task.title}</p>
          </div>
          <img
            src={taskIcon}
            alt="Индивидуальное задание"
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
            <>
              {taskStatus === "pending" && (
                <div className="p-4 rounded-xl bg-yellow-900/40 text-yellow-400 font-semibold text-center mt-4">
                  Задание отправлено на проверку. Ждите ответа преподавателя.
                </div>
              )}
              {taskStatus === "accepted" && (
                <div className="p-4 rounded-xl bg-green-900/40 text-green-400 font-semibold text-center mt-4">
                  Задание одобрено! <br />
                  Поздравляем, задание принято.
                </div>
              )}
              {(!taskStatus || taskStatus === "rejected") && (
                <>
                  {taskStatus === "rejected" && (
                    <div className="p-4 rounded-xl bg-red-900/40 text-red-400 font-semibold text-center mt-2">
                      Задание не одобрено преподавателем.
                      {taskComment && (
                        <div className="mt-3 p-3 rounded-xl border border-red-400 bg-red-950/50 text-white font-normal text-left mx-auto max-w-xl whitespace-pre-line">
                          <span className="font-semibold text-red-400">Комментарий преподавателя:</span>
                          <br />
                          {taskComment}
                        </div>
                      )}
                      <div className="mt-2 text-red-200 font-normal">Можете отправить новую попытку.</div>
                    </div>
                  )}
                  {/* Форма загрузки файлов */}
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
                        id="task-files"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('task-files').click()}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold w-full mb-1"
                      >
                        Выбрать файлы
                      </button>
                    </label>
                    {selectedFiles.length > 0 && (
                      <div className="text-xs text-white/70 mt-1 max-w-[250px] truncate" title={selectedFiles.length === 1 ? selectedFiles[0].name : selectedFiles.map(f => f.name).join(', ')}>
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
                        await saveTaskSubmission({
                          userId: user.uid,
                          courseId: task.courseId || "default",
                          assignmentId: task.id,
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
            </>
          </div>
        </div>
        {/* Animated Achievement Block */}
        {FCPX_ZERO_TASK_ACHIEVEMENTS[task.id] && (
          <motion.div
            className={`mt-6 ${taskStatus === "accepted" ? "achievement-glow-block" : ""}`}
            initial={false}
            animate={{}}
          >
            <div className="bg-[#38383F] rounded-2xl p-5 flex items-center gap-4 shadow-inner border border-[#2c2c38] relative">
              <img
                src={FCPX_ZERO_TASK_ACHIEVEMENTS[task.id].icon}
                alt={FCPX_ZERO_TASK_ACHIEVEMENTS[task.id].name}
                className={`w-16 h-16 object-contain ${taskStatus === "accepted" ? "" : "opacity-40 grayscale"}`}
              />
              <div>
                <div className={`font-bold text-lg ${taskStatus === "accepted" ? "text-green-400" : "text-white/70"}`}>
                  {taskStatus === "accepted" ? "Достижение получено" : "Достижение после успешной сдачи"}
                </div>
                <div className="font-semibold text-white">{FCPX_ZERO_TASK_ACHIEVEMENTS[task.id].name}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TaskView;