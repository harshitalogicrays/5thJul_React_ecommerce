import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBmOjJQjHek-wL0Ds5uT6jtQSSPYvMvyMk",
  authDomain: "th-myshop.firebaseapp.com",
  projectId: "th-myshop",
  storageBucket: "th-myshop.appspot.com",
  messagingSenderId: "880007801342",
  appId: "1:880007801342:web:e10b26ffa9335de97a38af"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
export default app