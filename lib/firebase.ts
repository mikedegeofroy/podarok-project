import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCFPoeRl72YHhXZ4UUnVLVojQ5vTXJVK3k",
    authDomain: "podarok-3c23d.firebaseapp.com",
    projectId: "podarok-3c23d",
    storageBucket: "podarok-3c23d.appspot.com",
    messagingSenderId: "449474562725",
    appId: "1:449474562725:web:17d0b4594266bc98b69b4c",
    measurementId: "G-4R94Z2J52B"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();