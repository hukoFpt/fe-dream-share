// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp ({
  apiKey: "AIzaSyBU3kwh-Qeye_nFI5zN8rtmVZ_96uGUgNE",
  authDomain: "dream-share-4f2af.firebaseapp.com",
  projectId: "dream-share-4f2af",
  storageBucket: "dream-share-4f2af.appspot.com",
  messagingSenderId: "973389463734",
  appId: "1:973389463734:web:6573b3cc73da09cce7a617",
  measurementId: "G-SPQ6DRZ1G8"
});

// Initialize Firebase
const storage = getStorage(app);
export default storage;