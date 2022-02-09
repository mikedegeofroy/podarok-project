// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

import { initializeApp, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, where, limit, query, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFPoeRl72YHhXZ4UUnVLVojQ5vTXJVK3k",
  authDomain: "podarok-3c23d.firebaseapp.com",
  projectId: "podarok-3c23d",
  storageBucket: "podarok-3c23d.appspot.com",
  messagingSenderId: "449474562725",
  appId: "1:449474562725:web:17d0b4594266bc98b69b4c",
  measurementId: "G-4R94Z2J52B"
};

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
// }

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = 'state_changed';

export const firestore = getFirestore(firebaseApp);

// export const firestore = firebase.firestore();
// export const storage = firebase.storage();