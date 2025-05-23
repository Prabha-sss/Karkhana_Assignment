import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUZzQvO98M-p6CjkEsXU03lPOZoDzs-cs",
  authDomain: "project-50c35.firebaseapp.com",
  projectId: "project-50c35",
  storageBucket: "project-50c35.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "346204752729",
  appId: "1:346204752729:web:a089b15f8e74c4b3e15a48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;