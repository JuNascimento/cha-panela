import { initializeApp } from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoI8KCtO2qA4RZGty9Zj6fd5dPQzT12Mo",
  authDomain: "cha-panela-50bc0.firebaseapp.com",
  databaseURL: "https://cha-panela-50bc0-default-rtdb.firebaseio.com",
  projectId: "cha-panela-50bc0",
  storageBucket: "cha-panela-50bc0.appspot.com",
  messagingSenderId: "327474084811",
  appId: "1:327474084811:web:f2de101b3f7c0609b6544e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app.database();