import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

const firebase = initializeApp(firebaseConfig);

const fireStore = getFirestore();

export { fireStore };
