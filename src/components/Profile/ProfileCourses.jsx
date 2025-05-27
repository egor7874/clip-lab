import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import courseImage from "../../assets/image6.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { calculateCourseProgress } from "../../lib/calculateCourseProgress";
import { courseStructure } from "../Courses/FinalCutProXZero/courseStructure";
import { subscribeToUserPracticeStatuses } from "../../lib/practiceSubmissions";
import { subscribeToUserTaskStatuses } from "../../lib/taskSubmissions";
import { subscribeToUserQuizStatuses } from "../../lib/quizResults";

export default function ProfileCourses() {
  const [userId, setUserId] = useState(null);
  const [userCourses, setUserCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnrolled, setShowEnrolled] = useState(false);
  const [shine, setShine] = useState(false);
  const [practiceStatuses, setPracticeStatuses] = useState({});
  const [taskStatuses, setTaskStatuses] = useState({});
  const [quizStatuses, setQuizStatuses] = useState({});
  const navigate = useNavigate();

  // Показывать уведомление если флаг в localStorage
  useEffect(() => {
    if (localStorage.getItem("courseEnrolled") === "fcpx-zero") {
      setShowEnrolled(true);
      localStorage.removeItem("courseEnrolled");
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserCourses(userDocSnap.data());
        } else {
          setUserCourses(null);
        }
      } else {
        setUserId(null);
        setUserCourses(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const unsubPractices = subscribeToUserPracticeStatuses(userId, setPracticeStatuses);
    const unsubTasks = subscribeToUserTaskStatuses(userId, setTaskStatuses);
    const unsubQuizzes = subscribeToUserQuizStatuses(userId, setQuizStatuses);

    return () => {
      unsubPractices();
      unsubTasks();
      unsubQuizzes();
    };
  }, [userId]);

  const progress = userCourses && userCourses.progress && userCourses.progress["fcpx-zero"];
  
  useEffect(() => {
    if (!progress) {
      const interval = setInterval(() => {
        setShine(true);
        setTimeout(() => {
          setShine(false);
        }, 1100);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [progress]);

  const hasNoCourses =
    !userCourses ||
    !Array.isArray(userCourses.enrolledCourses) ||
    !userCourses.enrolledCourses.includes("fcpx-zero");

  if (loading) {
    return null;
  }

  // --- Вычисляем реальный прогресс для курса "fcpx-zero"
  let progressData = { percent: 0, done: 0, total: 0 };
  if (userCourses && userCourses.progress && userCourses.progress["fcpx-zero"]) {
    const fcpxProgress = userCourses.progress["fcpx-zero"];
    const visitedSections = fcpxProgress?.visitedSections || [];
    progressData = calculateCourseProgress({
      courseStructure,
      visitedSections,
      practiceStatuses,
      taskStatuses,
      quizStatuses,
    });
  }

  if (hasNoCourses) {
    return (
      <div className="bg-[#2B2D34] rounded-3xl px-10 py-16 flex flex-col items-center w-full ml-0 shadow-xl min-h-[220px]">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          У вас пока нет добавленных курсов
        </h2>
        <p className="text-base text-white/80 mb-6 text-center max-w-lg">
          Вы можете записаться на курс на странице курсов и начать обучение в любое время.
        </p>
        <button
          onClick={() => { window.location.href = '/courses'; }}
          className="bg-[#FADF4B] text-[#212123] text-base font-semibold py-3 px-8 rounded-full hover:bg-[#e4d937] transition mt-2"
        >
          Найти курс
        </button>
      </div>
    );
  }

  const startCourse = async () => {
    if (!userId) return;
    const userDocRef = doc(db, "users", userId);
    const updatedProgress = {
      ...userCourses.progress,
      "fcpx-zero": { completedSections: [] },
    };
    await updateDoc(userDocRef, { progress: updatedProgress });
    setUserCourses((prev) => ({
      ...prev,
      progress: updatedProgress,
    }));
    navigate("/courses/fcpx-zero/lesson/1.1");
    window.location.reload();
  };

  const getLastAccessibleSectionUrl = () => {
    const progress = userCourses.progress && userCourses.progress["fcpx-zero"];
    if (progress && Array.isArray(progress.completedSections) && progress.completedSections.length > 0) {
      const lastSection = progress.completedSections[progress.completedSections.length - 1];
      if (lastSection.startsWith("lesson-")) {
        return `/courses/fcpx-zero/lesson/${lastSection.replace("lesson-", "")}`;
      } else if (lastSection.startsWith("quiz-")) {
        return `/courses/fcpx-zero/quiz/${lastSection.replace("quiz-", "")}`;
      } else if (lastSection.startsWith("practice-")) {
        return `/courses/fcpx-zero/practice/${lastSection.replace("practice-", "")}`;
      } else if (lastSection.startsWith("task-")) {
        return `/courses/fcpx-zero/task/${lastSection.replace("task-", "")}`;
      } else {
        return "/courses/fcpx-zero/lesson/1.1";
      }
    } else {
      return "/courses/fcpx-zero/lesson/1.1";
    }
  };

  const continueCourse = () => {
    navigate(getLastAccessibleSectionUrl());
    window.location.reload();
  };

  return (
    <>
      <AnimatePresence>
        {showEnrolled && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
            <motion.div
              className="fixed inset-0 z-[110] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.97, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ duration: 0.35 }}
            >
              <div className="bg-[#2B2B31] text-center px-10 py-10 rounded-2xl shadow-xl max-w-lg w-full flex flex-col gap-6 items-center border border-[#FADF4B]">
                <h2 className="text-3xl font-black mb-2 text-[#FADF4B]">Курс добавлен!</h2>
                <p className="text-white text-lg mb-2">
                  Поздравляем, Final Cut Pro X с нуля теперь в вашем Личном кабинете 🎉<br />
                  Можете начать обучение прямо сейчас.
                </p>
                <button
                  className="bg-[#FADF4B] text-[#212123] text-base font-semibold py-2.5 px-10 rounded-full hover:bg-[#e4d937] transition mt-2"
                  onClick={() => setShowEnrolled(false)}
                >
                  Ок
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="w-full flex items-start">
      <div className="bg-[#2B2D34] rounded-2xl p-4 max-w-sm w-full flex flex-col gap-6 text-lg font-medium text-white">
        <div className="flex flex-col gap-2">
          <img
            src={courseImage}
            alt="Final Cut Course"
            className="rounded-xl mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Final Cut Pro X с нуля</h2>
        </div>

        {progress ? (
          <div>
            <p className="text-sm mb-1">Прогресс: {progressData.percent}% ({progressData.done}/{progressData.total})</p>
            <div className="w-full h-3 bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-green-400" style={{ width: `${progressData.percent}%` }}></div>
            </div>
          </div>
        ) : null}

        {progress ? (
          <button
            onClick={continueCourse}
            className="w-full bg-[#5B76EF] hover:bg-[#4d66d6] transition text-white rounded-full py-2 font-semibold text-center block rounded-full"
          >
            Продолжить обучение
          </button>
        ) : (
          <button
            onClick={startCourse}
            className={`w-full bg-[#5B76EF] hover:bg-[#4d66d6] transition text-white rounded-full py-2 font-semibold text-center block rounded-full shine-effect${shine ? " shine-animate" : ""}`}
          >
            Начать обучение
          </button>
        )}
      </div>
    </div>
    </>
  );
}