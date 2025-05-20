// src/lib/practiceSubmissions.js
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp, getDocs, collection, query, where, onSnapshot } from "firebase/firestore";

export async function savePracticeSubmission({ userId, courseId, practiceId, files }) {
  const ref = doc(db, "practice_submissions", `${userId}_${practiceId}`);
  await setDoc(ref, {
    userId,
    courseId,
    practiceId,
    files,
    status: "pending",
    comment: "",
    createdAt: serverTimestamp(),
  });
}

// НОВАЯ ФУНКЦИЯ — получить статусы всех практик пользователя
export async function getUserPracticeStatuses(userId) {
  const q = query(collection(db, "practice_submissions"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const statuses = {};
  querySnapshot.forEach((doc) => {
    // В качестве ключа используем practiceId
    const { practiceId, status, comment = "" } = doc.data();
    statuses[practiceId] = { status, comment };
  });
  return statuses;
}

// Слушаем статусы практик для пользователя в реальном времени
export function subscribeToUserPracticeStatuses(userId, callback) {
  const q = query(collection(db, "practice_submissions"), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const statuses = {};
    snapshot.forEach(doc => {
      const { practiceId, status, comment = "" } = doc.data();
      statuses[practiceId] = { status, comment }; // <-- исправлено!
    });
    callback(statuses);
  });
}