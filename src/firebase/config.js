import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDfM9IHwjF1x4V_e_rukrOzSExMwpNVkHg",
  authDomain: "miniblog-acc25.firebaseapp.com",
  projectId: "miniblog-acc25",
  storageBucket: "miniblog-acc25.appspot.com",
  messagingSenderId: "936934664950",
  appId: "1:936934664950:web:ccba047b7b26398a151ad7"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };