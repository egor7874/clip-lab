// src/lib/calculateCourseProgress.js

/**
 * Подсчитывает прогресс по курсу по четырём категориям:
 * - уроки (visitedSections)
 * - практики (accepted)
 * - индивидуальные задания (accepted)
 * - квизы (>=75% — статус excellent/good)
 * 
 * @param {Object[]} courseStructure — структура курса (модули и пункты)
 * @param {string[]} visitedSections — id посещённых уроков
 * @param {Object} practiceStatuses — статусы практик (ключ: id, значение: {status})
 * @param {Object} taskStatuses — статусы заданий (ключ: id, значение: {status})
 * @param {Object} quizStatuses — статусы квизов (ключ: id, значение: "excellent"/"good"/"average"/"fail")
 * @returns {{ percent: number, done: number, total: number, details: {lessons, practices, tasks, quizzes, lessonsTotal, practicesTotal, tasksTotal, quizzesTotal} }}
 */
export function calculateCourseProgress({
  courseStructure,
  visitedSections = [],
  practiceStatuses = {},
  taskStatuses = {},
  quizStatuses = {},
}) {
  let total = 0;
  let done = 0;

  let lessons = 0, practices = 0, tasks = 0, quizzes = 0;
  let lessonsTotal = 0, practicesTotal = 0, tasksTotal = 0, quizzesTotal = 0;

  courseStructure.forEach(module => {
    module.items.forEach(item => {
      // Уроки (visited)
      if (item.id.startsWith("lesson-")) {
        lessonsTotal += 1;
        total += 1;
        if (visitedSections?.includes(item.id)) {
          done += 1;
          lessons += 1;
        }
      }
      // Практики (accepted)
      if (item.id.startsWith("practice-")) {
        practicesTotal += 1;
        total += 1;
        if (practiceStatuses?.[item.id]?.status === "accepted") {
          done += 1;
          practices += 1;
        }
      }
      // Индивидуальные задания (accepted)
      if (item.id.startsWith("task-")) {
        tasksTotal += 1;
        total += 1;
        if (taskStatuses?.[item.id]?.status === "accepted") {
          done += 1;
          tasks += 1;
        }
      }
      // Квизы (good/excellent)
      if (item.id.startsWith("quiz-")) {
        quizzesTotal += 1;
        total += 1;
        const quizResult = quizStatuses?.[item.id];
        if (quizResult === "excellent" || quizResult === "good") {
          done += 1;
          quizzes += 1;
        }
      }
    });
  });

  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return {
    percent,
    done,
    total,
    details: {
      lessons, practices, tasks, quizzes,
      lessonsTotal, practicesTotal, tasksTotal, quizzesTotal,
    }
  };
}