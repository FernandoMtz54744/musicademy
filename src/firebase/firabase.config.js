import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDsdvIZig20qp_aKImce8HvSjFFXAcEFKQ",
  authDomain: "musicademy-aaa17.firebaseapp.com",
  projectId: "musicademy-aaa17",
  storageBucket: "musicademy-aaa17.appspot.com",
  messagingSenderId: "75631616180",
  appId: "1:75631616180:web:92e0f647203524054a77e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);