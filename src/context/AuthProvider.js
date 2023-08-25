import React, { createContext, useContext, useEffect , useState} from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () =>{
  return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (email, password) =>{
    try{
      await createUserWithEmailAndPassword(auth, email, password);
    }catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    }
    
  }

  const login = async (email, password) =>{
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    }
  }

  const logout = async () =>{
    try {
      await signOut(auth);

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      setCurrentUser(user);
    })

    return unsubscribe;
  }, [])
  
  const values ={currentUser,signup, login, logout}

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider