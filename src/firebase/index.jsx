import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import "firebase/compat/auth"; // TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

//init firebase app
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const db = getDatabase(app, import.meta.env.VITE_FIREBASE_DBURL);
export { auth, db, googleProvider, githubProvider };
