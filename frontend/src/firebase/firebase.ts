import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cinebhapp-storage.firebaseapp.com",
  projectId: "cinebhapp-storage",
  storageBucket: "cinebhapp-storage.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
