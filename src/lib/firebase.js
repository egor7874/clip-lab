
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export async function uploadPracticeSubmission(practiceId, files) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("Пользователь не авторизован");

  const userId = user.uid;
  const uploadedFiles = [];

  for (const file of files) {
    const fileRef = ref(storage, `submissions/${userId}/${practiceId}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    uploadedFiles.push({ url, type: file.type });
  }

  const docRef = doc(db, "submissions", `${userId}_${practiceId}`);
  await setDoc(docRef, {
    userId,
    practiceId,
    status: "pending",
    files: uploadedFiles,
    createdAt: serverTimestamp()
  });

  return true;
}