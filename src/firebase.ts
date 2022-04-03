import { firebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebase = initializeApp(firebaseConfig);

const fireStore = getFirestore();

export { fireStore };
