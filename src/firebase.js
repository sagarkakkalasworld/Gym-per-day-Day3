import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//get firebase credentials from Firebase App/Video
const firebaseConfig = {
  apiKey: "AIzaSyB-dJ2k8SqfrvyFn5oX4e8fUbl5tbTiGoA",
  authDomain: "gym-per-day-demo-bcf51.firebaseapp.com",
  projectId: "gym-per-day-demo-bcf51",
  storageBucket: "gym-per-day-demo-bcf51.firebasestorage.app",
  messagingSenderId: "195574263086",
  appId: "1:195574263086:web:042b249611fc7f3905debf"
};
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);