import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore }  from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyC1oAByFpwzxb3n4wcDhC7dqpp8LXqXxvc",
  authDomain: "project-35c7c.firebaseapp.com",
  projectId: "project-35c7c",
  storageBucket: "project-35c7c.firebasestorage.app",
  messagingSenderId: "243995151650",
  appId: "1:243995151650:web:e86508d3cd231e1885697b",
  measurementId: "G-C6PBGET38Z"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()