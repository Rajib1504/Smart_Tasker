
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase/Firebase";
export const AuthContext= createContext(null)
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
const AuthProvider = ({children}) => {
      const [user, setUser] = useState(null);
      const [Loading, setLoading] = useState(true);
const googleLogin = ()=>{
      setLoading(true)
      return signInWithPopup(auth,provider)
}
const logOut = ()=>{
      setLoading(true)
      return signOut(auth)
}
useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false)
      })
      return ()=>{unsubscribe()}
},[])
      const authInfo = {
            user,
            setUser,
            Loading,
            setLoading,
            googleLogin,
            logOut
      }
      return (
          <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
      );
};

export default AuthProvider;