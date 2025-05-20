import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { lessons } from "./lessons";
import MiniHeader from "../../MiniHeader";
import FCPXZeroNavigation from "./FCPXZeroNavigation";
import LessonDisplay from "./LessonDisplay";
import QuizView from "./QuizView";
import { quizzes } from "./quizzes";
import PracticeView from "./PracticeView";
import { practice } from "./practice";
import { task } from "./task";
import TaskView from "./TaskView";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { subscribeToUserQuizStatuses } from "../../../lib/quizResults";
import { courseSections } from "./courseSections";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { markSectionCompleted, markSectionVisited } from "../../../lib/userProgress";
import { FCPX_ZERO_TASK_ACHIEVEMENTS } from "./achievements";
import SummaryPage from "./SummaryPage";
import AchievementsPage from "./AchievementsPage";
import CertificatePage from "./CertificatePage";
import { calculateCourseProgress } from "../../../lib/calculateCourseProgress";
import { courseStructure } from "./courseStructure";
import { subscribeToUserPracticeStatuses } from "../../../lib/practiceSubmissions";
import { subscribeToUserTaskStatuses } from "../../../lib/taskSubmissions";




const FCPXZeroPage = () => {
  const markedRef = useRef({});
  const { lessonId, practiceId, quizId, taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  function getCurrentSectionIndex() {
  // Проверяем финальные страницы по URL
  if (location.pathname.endsWith("/summary")) {
    return courseSections.findIndex(s => s.id === "summary");
  }
  if (location.pathname.endsWith("/achievements")) {
    return courseSections.findIndex(s => s.id === "achievements");
  }
  if (location.pathname.endsWith("/certificate")) {
    return courseSections.findIndex(s => s.id === "certificate");
  }
  // Обычная логика для всех остальных
  const sectionId =
    lessonId ? `lesson-${lessonId}` :
    practiceId ? `practice-${practiceId}` :
    quizId ? `quiz-${quizId}` :
    taskId ? `task-${taskId}` :
    courseSections[0].id;
  return courseSections.findIndex(s => s.id === sectionId);
  }
  const currentSectionIndex = getCurrentSectionIndex();

  // Определяем принадлежность к финальным разделам
  const firstFinalSectionIndex = courseSections.findIndex(s => s.id === "summary");
  const lastFinalSectionIndex = courseSections.findIndex(s => s.id === "certificate");
  const isInFinalSections = currentSectionIndex >= firstFinalSectionIndex && currentSectionIndex <= lastFinalSectionIndex;
  const isLastFinalSection = currentSectionIndex === lastFinalSectionIndex;

  function getCurrentModuleId() {
    const sectionId =
      lessonId ? `lesson-${lessonId}` :
      practiceId ? `practice-${practiceId}` :
      quizId ? `quiz-${quizId}` :
      taskId ? `task-${taskId}` :
      courseSections[0].id;
    const section = courseSections.find(s => s.id === sectionId);
    return section?.moduleid || courseSections[0].moduleid;
  }

  function goToSection(section) {
    if (!section) return;
    // Финальные разделы — отдельная обработка
    if (["summary", "achievements", "certificate"].includes(section.id)) {
      navigate(`/courses/fcpx-zero/${section.id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (userId) markSectionVisited(userId, "fcpx-zero", section.id);
      return;
    }
    if (section.type === "lesson") {
      navigate(`/courses/fcpx-zero/lesson/${section.id.replace("lesson-", "")}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (userId) markSectionVisited(userId, "fcpx-zero", section.id);
      return;
    }
    if (section.type === "practice") {
      navigate(`/courses/fcpx-zero/practice/${section.id.replace("practice-", "")}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (userId) markSectionVisited(userId, "fcpx-zero", section.id);
      return;
    }
    if (section.type === "quiz") {
      navigate(`/courses/fcpx-zero/quiz/${section.id.replace("quiz-", "")}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (userId) markSectionVisited(userId, "fcpx-zero", section.id);
      return;
    }
    if (section.type === "task") {
      navigate(`/courses/fcpx-zero/task/${section.id.replace("task-", "")}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (userId) markSectionVisited(userId, "fcpx-zero", section.id);
      return;
    }
  }

  const [userId, setUserId] = useState(null);

  const [quizStatuses, setQuizStatuses] = useState({});
  const [role, setRole] = useState("");
  const [progress, setProgress] = useState({ completedSections: [], lastSection: null, visitedSections: [] });
  const [userAchievements, setUserAchievements] = useState([]);
  const [practiceStatuses, setPracticeStatuses] = useState({});
  const [taskStatuses, setTaskStatuses] = useState({});

  useEffect(() => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      const data = snap.data();
      setRole(data?.role || "");
      setProgress(
        data && data.progress && data.progress["fcpx-zero"]
          ? {
              completedSections: data.progress["fcpx-zero"].completedSections || [],
              lastSection: data.progress["fcpx-zero"].lastSection || null,
              visitedSections: data.progress["fcpx-zero"].visitedSections || []
            }
          : { completedSections: [], lastSection: null, visitedSections: [] }
      );
      setUserAchievements(data?.achievements?.["fcpx-zero"] || []);
    });
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!userId || !lessonId || !progress.completedSections) return;
    const sectionKey = `lesson-${lessonId}`;
    if (!progress.completedSections.includes(sectionKey) && !markedRef.current[sectionKey]) {
      markedRef.current[sectionKey] = true;
      markSectionCompleted(userId, "fcpx-zero", sectionKey);
    }
  }, [userId, lessonId, progress.completedSections]);

  // Получаем userId при монтировании
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = subscribeToUserQuizStatuses(userId, setQuizStatuses);
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const unsubPractice = subscribeToUserPracticeStatuses(userId, setPracticeStatuses);
    const unsubTask = subscribeToUserTaskStatuses(userId, setTaskStatuses);
    return () => { unsubPractice(); unsubTask(); };
}, [userId]);

  // Автоматически отмечаем первый урок посещённым и завершённым, если пользователь начал с 1.1
  useEffect(() => {
    // Для первого урока сразу ставим "посещено" и "завершено"
    if (userId && lessonId === "1.1" && !practiceId && !quizId && !taskId) {
      const sectionKey = "lesson-1.1";
      if (!progress.visitedSections.includes(sectionKey)) {
        markSectionVisited(userId, "fcpx-zero", sectionKey);
      }
      if (!progress.completedSections.includes(sectionKey)) {
        markSectionCompleted(userId, "fcpx-zero", sectionKey);
      }
    }
  }, [userId, lessonId, practiceId, quizId, taskId, progress.visitedSections, progress.completedSections]);

  let mainContent = null;

  // Проверяем финальные разделы по URL
  if (location.pathname.endsWith("/summary")) {
    mainContent = (
      <SummaryPage
        summary={{
          title: "Подведение итогов",
          video: "/video/FCPXZero1_1.mp4",
          poster: "/video/FCPXZero1_1.jpg",
          markdown: () => import("../../../Content/FCPXZeroLessons/Summary.md?raw")
        }}
      />
    );
  } else if (location.pathname.endsWith("/achievements")) {
    mainContent = <AchievementsPage userAchievements={userAchievements} />;
  } else if (location.pathname.endsWith("/certificate")) {
    mainContent = <CertificatePage userId={userId} />;
  } else if (lessonId) {
    const lesson = lessons.find(l => l.id === `lesson-${lessonId}`);
    mainContent = lesson ? <LessonDisplay lesson={lesson} /> : <div className="text-white">Урок не найден</div>;
  } else if (practiceId) {
    const practiceItem = practice.find(p => p.id === `practice-${practiceId}`);
    mainContent = practiceItem ? <PracticeView practice={practiceItem} /> : <div className="text-white">Практика не найдена</div>;
  } else if (quizId) {
    const quiz = quizzes.find(q => q.id === `quiz-${quizId}`);
    mainContent = quiz ? <QuizView quiz={quiz} userId={userId} /> : <div className="text-white">Квиз не найден</div>;
  } else if (taskId) {
    const taskItem = task.find(t => t.id === `task-${taskId}`);
    mainContent = taskItem
      ? <TaskView task={taskItem} userAchievements={userAchievements} userId={userId} />
      : <div className="text-white">Индивидуальное задание не найдено</div>;
  } else {
    // Если ни один параметр не задан — показываем первый урок
    mainContent = <LessonDisplay lesson={lessons[0]} />;
  }

  const handleSectionSelect = (id) => {
    if (["summary", "achievements", "certificate"].includes(id)) {
      navigate(`/courses/fcpx-zero/${id}`);
    } else if (id.startsWith("quiz-")) {
      navigate(`/courses/fcpx-zero/quiz/${id.replace("quiz-", "")}`);
    } else if (id.startsWith("practice-")) {
      navigate(`/courses/fcpx-zero/practice/${id.replace("practice-", "")}`);
    } else if (id.startsWith("task-")) {
      navigate(`/courses/fcpx-zero/task/${id.replace("task-", "")}`);
    } else if (id.startsWith("lesson-")) {
      navigate(`/courses/fcpx-zero/lesson/${id.replace("lesson-", "")}`);
    } else {
      navigate(`/courses/fcpx-zero/lesson/${id}`);
    }
  };

  // Индекс последнего учебного раздела (task-6)
  const lastCoreSectionIndex = courseSections.findIndex(s => s.id === "task-6");
  const isLastTask = currentSectionIndex === lastCoreSectionIndex;

  const { percent } = calculateCourseProgress({
    courseStructure,
    visitedSections: progress.visitedSections,
    practiceStatuses,
    taskStatuses,
    quizStatuses,
  });

  const isAtEndOfCourse = isLastTask && percent === 100;

  // Проверяем, находимся ли на task-6 и не завершён ли курс
  const isTask6 = taskId === "6";
  const shouldShowWarning = isTask6 && percent < 100;

  // Обновленная функция handleNext с проверкой, чтобы не переходить дальше последнего раздела
  const handleNext = () => {
    if (currentSectionIndex >= courseSections.length - 1) {
      // На последнем разделе, не делаем ничего
      return;
    }
    const next = courseSections[currentSectionIndex + 1];
    if (next) {
      goToSection(next);
    }
  };

  const handlePrev = () => {
    const prev = courseSections[currentSectionIndex - 1];
    if (prev) goToSection(prev);
  };


  return (
    <div className="min-h-screen bg-[#212123] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between mt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Final Cut Pro X <span className="text-yellow-400">с нуля</span>
        </h1>
        <MiniHeader />
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex">
        <div className="pt-6">
          {userId && (
            <FCPXZeroNavigation
              userId={userId}
              onLessonSelect={handleSectionSelect}
              currentLessonId={lessonId}
              currentQuizId={quizId ? `quiz-${quizId}` : null}
              currentPracticeId={practiceId}
              currentTaskId={taskId}
              quizStatuses={quizStatuses}
              currentModuleId={getCurrentModuleId()}
              progress={progress}
              visitedSections={progress.visitedSections}
              role={role}
            />
          )}
        </div>
        <div className="flex-1 p-6">
          <div className="flex flex-col min-h-[80vh]">
            <div>
              {mainContent}
            </div>
            {shouldShowWarning && (
              <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded flex items-start gap-3">
                <span className="text-2xl mt-0.5">⚠️</span>
                <div>
                  <b className="block mb-1 text-base">Для доступа к финальным разделам завершите курс на 100%!</b>
                  <ul className="list-disc list-inside ml-0.5 text-sm leading-relaxed">
                    <li>
                      Все практики и индивидуальные задания должны быть <b className="text-green-700">приняты преподавателем</b>.
                    </li>
                    <li>
                      Все квизы пройдены минимум на <b className="text-green-700">оценку «хорошо»</b> или <b className="text-green-700">«отлично»</b>.
                    </li>
                  </ul>
                  <span className="block mt-2 text-xs text-yellow-700">После этого откроются разделы с итогами, достижениями и сертификатом.</span>
                </div>
              </div>
            )}
            <div className="flex gap-4 mt-6 justify-end">
              <button
                onClick={handlePrev}
                disabled={currentSectionIndex <= 0}
                className="bg-gray-700 px-4 py-2 rounded text-white disabled:opacity-40"
              >
                Назад
              </button>
              <button
                onClick={handleNext}
                disabled={
                  currentSectionIndex >= courseSections.length - 1 ||
                  (isLastTask && percent < 100)
                }
                className="bg-yellow-400 px-4 py-2 rounded text-black disabled:opacity-40"
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FCPXZeroPage;