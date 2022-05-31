import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAnZ3HDj4mDC-HzgwvYHxKH9-YHrP6sK68",
  authDomain: "koviti.firebaseapp.com",
  projectId: "koviti",
  storageBucket: "koviti.appspot.com",
  messagingSenderId: "645667232503",
  appId: "1:645667232503:web:a17ebfe26c370e692d51f2",
  measurementId: "G-MLD0K9EMH5",
}

let firebaseApp = initializeApp(firebaseConfig)
let firebaseAuth = getAuth(firebaseApp)
let firebaseDb = getDatabase()

export { firebaseAuth, firebaseDb }
