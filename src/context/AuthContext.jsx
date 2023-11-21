import { auth } from "../firebase/firabase.config";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    GoogleAuthProvider, signInWithPopup,
    signOut, onAuthStateChanged} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () =>{
    const context = useContext(authContext);
    if(!context){
        console.log("Error al crear el contexto de autenticación");
    }
    return context;
}

export function AuthProvider({children}){
    const [user, setUser] = useState("");
    useEffect(()=>{
        const suscribed = onAuthStateChanged(auth, (currentUser)=>{   
            if(!currentUser){
                setUser("");
            }else{
                setUser(currentUser);
                console.log(currentUser);
            }         
        })
        return ()=>suscribed();
    }, []);

    const register = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWIthGoogle = ()=>{
            const responseGoogle = new GoogleAuthProvider();
            return signInWithPopup(auth, responseGoogle)
    }
    const logout = async ()=>{
        const response = await signOut(auth);
        console.log(response);
    }

    return <authContext.Provider
        value={{
            register,
            login,
            loginWIthGoogle,
            logout,
            user
        }}
    >{children}</authContext.Provider>
}

