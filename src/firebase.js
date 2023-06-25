import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAnOzTOaBefZcOAZoohZRjvBqkQQGIV_jA",
    authDomain: "blog-colegio.firebaseapp.com",
    projectId: "blog-colegio",
    storageBucket: "blog-colegio.appspot.com",
    messagingSenderId: "807252001487",
    appId: "1:807252001487:web:5464185c0a1b1a2784adba"
  };
  
  const app=initializeApp(firebaseConfig)
  const auth=getAuth(app)
  const db=getFirestore(app)
  const storage=getStorage(app)

  export {auth,db,storage}