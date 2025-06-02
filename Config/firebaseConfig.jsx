// firebaseConfig.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // ✅ Use web SDK for Expo Go
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA-0I7cYQYlGk_7jwui5fHr8FiixkkqGBg',
  authDomain: 'reactnatively-14c27.firebaseapp.com',
  projectId: 'reactnatively-14c27',
  storageBucket: 'reactnatively-14c27.appspot.com',
  messagingSenderId: '205672231989',
  appId: '1:205672231989:web:2ff4c316714fad294a6d7c',
  measurementId: 'G-MMJKRD5WVM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Web SDK auth — compatible with Expo Go
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
