import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export async function markSectionCompleted(userId, courseId, sectionId) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    [`progress.${courseId}.completedSections`]: arrayUnion(sectionId),
    [`progress.${courseId}.lastSection`]: sectionId,
  });
}

export async function markSectionVisited(userId, courseId, sectionId) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    [`progress.${courseId}.visitedSections`]: arrayUnion(sectionId),
    [`progress.${courseId}.lastSection`]: sectionId,
  });
}

export async function grantAchievement(userId, courseId, achievementId) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    [`achievements.${courseId}`]: arrayUnion(achievementId)
  });
}