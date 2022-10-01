import { useState, useEffect, createContext } from "react"
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "../utils/firebase.utils"

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser : ()=> null
})

export function UserProvider({children}){
  const [currentUser, setCurrentUser] = useState(null)

 
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if(user) {
        createUserDocumentFromAuth(user)
      }
      console.log(user)
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  const value = {currentUser, setCurrentUser}
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}