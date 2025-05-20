import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { calculateCourseProgress } from "../../../lib/calculateCourseProgress";
import { subscribeToUserPracticeStatuses } from "../../../lib/practiceSubmissions";
import { subscribeToUserTaskStatuses } from "../../../lib/taskSubmissions";
import { CSSTransition } from "react-transition-group";
import { courseStructure } from "./courseStructure";



export default function FCPXZeroNavigation({ userId, onLessonSelect, currentLessonId, currentQuizId, onQuizReset, currentPracticeId, quizStatuses = {}, currentTaskId, currentModuleId, progress = {}, role = "student" }) {
  const [openModules, setOpenModules] = useState({ 0: true });
  const [practiceStatuses, setPracticeStatuses] = useState({});
  const [taskStatuses, setTaskStatuses] = useState({});

  const moduleRefs = useRef(courseStructure.map(() => React.createRef()));

  const completedSections = progress.completedSections || [];
  const lastSection = progress.lastSection;

  const location = useLocation();
  const finalActiveId =
    location.pathname.endsWith("/summary") ? "summary" :
    location.pathname.endsWith("/achievements") ? "achievements" :
    location.pathname.endsWith("/certificate") ? "certificate" :
    null;

  useEffect(() => {
    // Если мы находимся в финальном разделе — раскрываем только модуль "Финальные разделы"
    if (finalActiveId) {
      const idx = courseStructure.findIndex(m => m.moduleid === "final");
      if (idx !== -1) setOpenModules({ [idx]: true });
      return;
    }
    // Обычные модули
    if (currentModuleId) {
      const idx = courseStructure.findIndex(m => m.moduleid === currentModuleId);
      if (idx !== -1) setOpenModules({ [idx]: true });
      return;
    }
    // Если ничего не выбрано — раскрыть первый модуль (по умолчанию)
    setOpenModules({ 0: true });
  }, [currentModuleId, finalActiveId]);

  useEffect(() => {
    if (!userId) return;
    // Подписываемся на статусы практик
    const unsubscribePractices = subscribeToUserPracticeStatuses(userId, setPracticeStatuses);
    // Подписываемся на статусы индивидуальных заданий
    const unsubscribeTasks = subscribeToUserTaskStatuses(userId, setTaskStatuses);
    return () => {
      unsubscribePractices();
      unsubscribeTasks();
    };
  }, [userId]);

  const toggleModule = (index) => {
    setOpenModules((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Для роли student вычисляем доступные разделы
  // Новая логика: теперь разделы "квиз", "практика", "индивидуальное задание" становятся доступны, если студент хотя бы раз их посетил (есть в completedSections или были открыты), а не только если был результат/статус.
let unlockedSet = new Set();
if (role === "student") {
  // Собираем список всех sectionId
  const allSectionIds = courseStructure.flatMap(mod => mod.items.map(item => item.id));
  // Первый раздел (урок) всегда доступен
  if (allSectionIds.length > 0) unlockedSet.add(allSectionIds[0]);

  // 1. Все завершённые
  completedSections.forEach(id => {
    unlockedSet.add(id);
  });

  // 2. Все посещённые (новое)
  if (progress.visitedSections) {
    progress.visitedSections.forEach(id => {
      unlockedSet.add(id);
    });
  }

  // 3. Текущий открытый раздел (подстраховка)
  if (currentLessonId) unlockedSet.add(`lesson-${currentLessonId}`);
  if (currentPracticeId) unlockedSet.add(`practice-${currentPracticeId}`);
  if (currentQuizId) unlockedSet.add(`quiz-${currentQuizId}`);
  if (currentTaskId) unlockedSet.add(`task-${currentTaskId}`);
}

  // Вычисляем прогресс курса
  const { percent, done, total } = calculateCourseProgress({
    courseStructure,
    visitedSections: progress.visitedSections,
    practiceStatuses,
    taskStatuses,
    quizStatuses,
  });

  return (
    <aside className="bg-[#2B2D34] p-4 rounded-2xl w-[260px] text-white font-medium">
      {/* Прогресс-бар */}
      <div className="mb-6">
        <div className="mb-1 text-xs text-white/70 flex justify-between">
          <span>Прогресс: {percent}%</span>
          <span>{done}/{total}</span>
        </div>
        <div className="w-full h-3 bg-[#393B43] rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      {courseStructure.map((module, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => toggleModule(index)}
            className="w-full text-left bg-[#4B4E58] p-3 rounded-xl flex justify-between items-center"
          >
            <span>{module.title}</span>
            <span>{openModules[index] ? "▾" : "▸"}</span>
          </button>
          <CSSTransition
            in={openModules[index]}
            timeout={350}
            classNames="nav-list"
            unmountOnExit
            nodeRef={moduleRefs.current[index]}
          >
            <ul className="mt-2 space-y-1 text-sm text-left px-2" ref={moduleRefs.current[index]}>
              {module.items.map((item, i) => {
                if (!item) return null;
                const isLesson = item.id && item.id.startsWith("lesson-");
                const isPractice = item.id?.startsWith("practice-");
                const isQuiz = item.id?.startsWith("quiz-");
                const isAssignment = item.id?.startsWith("task-");
                const quizId = isQuiz ? item.id : null;
                const isActive =
                  (isLesson && item.id.replace("lesson-", "") === currentLessonId) ||
                  (isQuiz && quizId === currentQuizId) ||
                  (isPractice && item.id.replace("practice-", "") === currentPracticeId) ||
                  (isAssignment && item.id.replace("task-", "") === currentTaskId);

                // Статус для практики
                let practiceStatus = null;
                if (isPractice && practiceStatuses) {
                  practiceStatus = practiceStatuses[item.id];
                }

                // Статус для задания
                let taskStatus = null;
                if (isAssignment && taskStatuses) {
                  taskStatus = taskStatuses[item.id];
                }

                // Статус для квиза
                let quizStatus = null;
                if (isQuiz && quizStatuses) {
                  quizStatus = quizStatuses[item.id];
                }

                // Новые переменные для финальных разделов
                const isFinalSection = ["summary", "achievements", "certificate"].includes(item.id);
                const isSectionLocked = isFinalSection && percent < 100;

                // Для финальных разделов отдельный рендеринг
                if (isFinalSection) {
                  let liClass = "p-2 rounded-xl transition ";
                  if (isSectionLocked) {
                    liClass += "bg-[#232427] text-gray-500 opacity-50 cursor-not-allowed";
                  } else if (isActive || (isFinalSection && item.id === finalActiveId)) {
                    liClass += "bg-[#3B3D46] text-white cursor-pointer";
                  } else {
                    liClass += "hover:bg-[#393B43] cursor-pointer";
                  }
                  return (
                    <li
                      key={i}
                      className={liClass}
                      onClick={() => {
                        if (isSectionLocked) return;
                        if (item.id) onLessonSelect(item.id);
                      }}
                      style={{ pointerEvents: isSectionLocked ? "none" : "auto" }}
                    >
                      <span className={isActive || (isFinalSection && item.id === finalActiveId) ? "text-white" : ""}>{item.label}</span>
                    </li>
                  );
                }

                // Разделяем стили
                let itemStatusStyle = "";
                let itemStatusTextStyle = "";

                // Для практики
                if (isPractice && practiceStatus) {
                  if (practiceStatus.status === "pending") {
                    itemStatusStyle = "bg-[#393605]";
                    itemStatusTextStyle = "text-[#FFD600]";
                  } else if (practiceStatus.status === "accepted") {
                    itemStatusStyle = "bg-[#24422B]";
                    itemStatusTextStyle = "text-[#4CAF50]";
                  } else if (practiceStatus.status === "rejected") {
                    itemStatusStyle = "bg-[#4D2222]";
                    itemStatusTextStyle = "text-[#FF5252]";
                  }
                }

                // Для задания
                if (isAssignment && taskStatus) {
                  if (taskStatus.status === "pending") {
                    itemStatusStyle = "bg-[#393605]";
                    itemStatusTextStyle = "text-[#FFD600]";
                  } else if (taskStatus.status === "accepted") {
                    itemStatusStyle = "bg-[#24422B]";
                    itemStatusTextStyle = "text-[#4CAF50]";
                  } else if (taskStatus.status === "rejected") {
                    itemStatusStyle = "bg-[#4D2222]";
                    itemStatusTextStyle = "text-[#FF5252]";
                  }
                }

                // Для квиза (если это квиз — перезаписываем стили для этого пункта)
                if (isQuiz && quizStatus) {
                  if (quizStatus === "excellent" || quizStatus === "good") {
                    itemStatusStyle = "bg-[#24422B]";
                    itemStatusTextStyle = "text-[#4CAF50]";
                  } else if (quizStatus === "average") {
                    itemStatusStyle = "bg-[#393605]";
                    itemStatusTextStyle = "text-[#FFD600]";
                  } else if (quizStatus === "fail") {
                    itemStatusStyle = "bg-[#4D2222]";
                    itemStatusTextStyle = "text-[#FF5252]";
                  }
                }

                const isUnlocked = role === "admin" || unlockedSet.has(item.id);

                // Новая логика рендера <li> для уроков (lesson-...)
                if (isLesson) {
                  const isCompleted = completedSections.includes(item.id);
                  let liClass = "p-2 rounded-xl transition ";
                  let spanClass = "";
                  if (!isUnlocked) {
                    liClass += "bg-[#232427] text-gray-500 opacity-50 cursor-not-allowed";
                  } else if (isActive) {
                    liClass += "bg-[#3B3D46] text-white cursor-pointer";
                  } else if (isCompleted) {
                    liClass += "bg-[#24422B] text-[#4CAF50] hover:bg-[#393B43] cursor-pointer";
                    spanClass += "text-[#4CAF50]";
                  } else {
                    liClass += "hover:bg-[#393B43] cursor-pointer";
                  }

                  return (
                    <li
                      key={i}
                      className={liClass}
                      onClick={() => {
                        if (!isUnlocked) return;
                        if (item.id) onLessonSelect(item.id);
                      }}
                      style={{ pointerEvents: isUnlocked ? "auto" : "none" }}
                    >
                      <span className={spanClass}>{item.label}</span>
                    </li>
                  );
                }
                // Для практик, квизов, заданий — используем логику с подсветкой по статусу...
                return (
                  <li
                    key={i}
                    className={`p-2 rounded-xl transition
                      ${!isUnlocked
                        ? "bg-[#232427] text-gray-500 opacity-50 cursor-not-allowed"
                        : isActive
                          ? "bg-[#3B3D46] text-white cursor-pointer"
                          : ((isPractice && practiceStatus) || (isQuiz && quizStatus) || (isAssignment && taskStatus))
                            ? `${itemStatusStyle} hover:bg-[#393B43] cursor-pointer`
                            : "hover:bg-[#393B43] cursor-pointer"
                      }
                    `}
                    onClick={() => {
                      if (!isUnlocked) return;
                      if (item.id) {
                        if (isQuiz && onQuizReset) onQuizReset();
                        onLessonSelect(item.id);
                      }
                    }}
                    style={{ pointerEvents: isUnlocked ? "auto" : "none" }}
                  >
                    <span className={
                      isActive
                        ? "text-white"
                        : (isUnlocked && ((isPractice && practiceStatus) || (isQuiz && quizStatus) || (isAssignment && taskStatus)))
                          ? itemStatusTextStyle
                          : ""
                    }>
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </CSSTransition>
        </div>
      ))}
    </aside>
  );
}