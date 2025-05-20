import { db } from "../firebase";
import { doc, setDoc, getDoc, deleteDoc, collection, query, where, onSnapshot, getDocs } from "firebase/firestore";

// Сохраняем результат квиза
export async function saveQuizResult({ userId, quizId, percent, answers }) {
  const ref = doc(db, "quiz_results", `${userId}_${quizId}`);
  await setDoc(ref, {
    userId,
    quizId,
    percent,
    answers,
    finishedAt: new Date(),
  });
}

// Получаем результат квиза (null если не проходил)
export async function getQuizResult(userId, quizId) {
  const ref = doc(db, "quiz_results", `${userId}_${quizId}`);
  try {
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (e) {
    // Ошибка при попытке чтения (скорее всего, недостаточно прав или документа не существует).
    // Не логируем ошибку, просто возвращаем null.
    return null;
  }
}

// Удалить результат квиза (если нужно "перепройти")
export async function resetQuizResult(userId, quizId) {
  const ref = doc(db, "quiz_results", `${userId}_${quizId}`);
  await deleteDoc(ref);
}

// Получить статус квиза по проценту (мэппинг как в QuizView)
function getQuizStatus(percent) {
  if (percent >= 90) return "excellent";
  if (percent >= 75) return "good";
  if (percent >= 60) return "average";
  return "fail";
}

// Получить все статусы квизов пользователя разово
export async function getUserQuizStatuses(userId) {
  const q = query(collection(db, "quiz_results"), where("userId", "==", userId));
  const snap = await getDocs(q);
  const statuses = {};
  snap.forEach((doc) => {
    const data = doc.data();
    const status = getQuizStatus(data.percent);
    statuses[data.quizId] = status;
  });
  return statuses;
}

// Подписка на все статусы квизов пользователя в реальном времени
export function subscribeToUserQuizStatuses(userId, callback) {
  const q = query(collection(db, "quiz_results"), where("userId", "==", userId));
  return onSnapshot(q, (snap) => {
    const statuses = {};
    snap.forEach(doc => {
      const data = doc.data();
      const status = getQuizStatus(data.percent);
      statuses[data.quizId] = status;
    });
    callback(statuses);
  });
}