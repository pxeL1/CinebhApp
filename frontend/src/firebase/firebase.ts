import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "cinebhapp-storage.firebaseapp.com",
    projectId: "cinebhapp-storage",
    storageBucket: "cinebhapp-storage.firebasestorage.app",
    messagingSenderId: "983506880901",
    appId: "1:983506880901:web:7763d18f5bd852acc21cec"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);