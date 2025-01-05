import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore }  from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBLemseOViYvoVA7g3Ky1Iyc3ZPg7OJ9F0",
  authDomain: "project-705fd.firebaseapp.com",
  projectId: "project-705fd",
  storageBucket: "project-705fd.firebasestorage.app",
  messagingSenderId: "1053518486591",
  appId: "1:1053518486591:web:8b6dc1ac6b130b7f062c8a",
  measurementId: "G-W23FGRGC68"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()