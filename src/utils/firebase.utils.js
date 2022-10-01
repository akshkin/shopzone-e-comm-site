// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD3w136M87e-c8IBfJHSvn2A-yUp95YJyo",
  authDomain: "shopzone-9d510.firebaseapp.com",
  projectId: "shopzone-9d510",
  storageBucket: "shopzone-9d510.appspot.com",
  messagingSenderId: "70311853274",
  appId: "1:70311853274:web:bd52232f5d1065775479e3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore()

export const createUserDocumentFromAuth = async(userAuth, additionalInfo={}) => {
  if(!userAuth) return

  const userDocRef = doc(db, "users", userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef , {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
    } catch (error){
      console.log(error)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async() => await signOut(auth)

export const onAuthStateChangedListener = (callback) =>  onAuthStateChanged(auth, callback)
