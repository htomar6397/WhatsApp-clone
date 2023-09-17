
import { FirebaseError, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD2w5RfzZI-pgdXqPJmW546ODwcifdKTuc",
  authDomain: "whatsapp-clone-ed0dd.firebaseapp.com",
  projectId: "whatsapp-clone-ed0dd",
  storageBucket: "whatsapp-clone-ed0dd.appspot.com",
  messagingSenderId: "512633478702",
  appId: "1:512633478702:web:39b6190933d49687f089bf",
  databaseURL:"https://whatsapp-clone-ed0dd-default-rtdb.firebaseio.com"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);