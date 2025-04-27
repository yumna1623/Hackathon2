import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCQClAKiVmBYmSz5IV7vR2cvhC1cJXqcf0",
  authDomain: "notesapp-17b84.firebaseapp.com",
  projectId: "notesapp-17b84",
  storageBucket: "notesapp-17b84.firebasestorage.app",
  messagingSenderId: "899795435396",
  appId: "1:899795435396:web:0da5db6b68cdbce42aa7d1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };


