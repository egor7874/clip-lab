import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDfkKtHbbacGBwch12R5DRhhN0NI9FTRMQ",
    authDomain: "cliplab-c8fd4.firebaseapp.com",
    projectId: "cliplab-c8fd4",
    storageBucket: "cliplab-c8fd4.firebasestorage.app",
    messagingSenderId: "178509329186",
    appId: "1:178509329186:web:be84b64dbe6bea264feb7b"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 