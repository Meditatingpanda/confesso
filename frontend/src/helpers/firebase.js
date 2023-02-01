// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr9HwMr3iaZkx3zyQbSgykX3EwqaQe6Bo",
  authDomain: "confesso-2.firebaseapp.com",
  projectId: "confesso-2",
  storageBucket: "confesso-2.appspot.com",
  messagingSenderId: "905637832850",
  appId: "1:905637832850:web:b3f016d77463eb9c0c5e4b",
  measurementId: "G-82NY0CHNYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;