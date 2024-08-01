// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKDI_fe5gQVJr343yfeeoElIlz2nXLoYM",
  authDomain: "diskette-fefba.firebaseapp.com",
  projectId: "diskette-fefba",
  storageBucket: "diskette-fefba.appspot.com",
  messagingSenderId: "854596611720",
  appId: "1:854596611720:web:e1dc3eb7a51b2a0828b93d",
  measurementId: "G-ZDQJH35ZD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, db };
