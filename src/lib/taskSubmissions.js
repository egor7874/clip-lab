// src/lib/taskSubmissions.js
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp, getDocs, collection, query, where, onSnapshot } from "firebase/firestore";

// Сохранить отправку индивидуального задания
export async function saveTaskSubmission({ userId, courseId, assignmentId, files }) {
  const ref = doc(db, "task_submissions", `${userId}_${assignmentId}`);
  await setDoc(ref, {
    userId,
    courseId,
    assignmentId,
    files,
    status: "pending",
    comment: "",
    createdAt: serverTimestamp(),
  });
}

// Получить статусы всех заданий пользователя
export async function getUserTaskStatuses(userId) {
  const q = query(collection(db, "task_submissions"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const statuses = {};
  querySnapshot.forEach((doc) => {
    const { assignmentId, status, comment = "" } = doc.data();
    statuses[`assignment-${assignmentId}`] = { status, comment };
  });
  return statuses;
}

// Слушаем статусы заданий для пользователя в реальном времени
export function subscribeToUserTaskStatuses(userId, callback) {
  const q = query(collection(db, "task_submissions"), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const statuses = {};
    snapshot.forEach(doc => {
      const { assignmentId, status, comment = "" } = doc.data();
      statuses[assignmentId] = { status, comment }; // <-- исправлено!
    });
    callback(statuses);
  });
}

// Обновить статус задания (для админки)
export async function updateTaskStatus(submissionId, status, comment = "") {
  const ref = doc(db, "task_submissions", submissionId);
  await updateDoc(ref, { status, comment });
}