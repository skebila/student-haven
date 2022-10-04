/**@author Steven Kebila
* Import the functions you need from the SDKs you need
*/

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAc4qeB74P6RUwG0CoMW-vOCXjeSN2PWNU",
  authDomain: "student-haven-257b5.firebaseapp.com",
  projectId: "student-haven-257b5",
  storageBucket: "student-haven-257b5.appspot.com",
  messagingSenderId: "636117682706",
  appId: "1:636117682706:web:4dfece39b67349e906a6cb",
  measurementId: "G-25EN7KRBGV"
    };


// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()
const storage = firebase.storage();

export {firebase, db, storage }


