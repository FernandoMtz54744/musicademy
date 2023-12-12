import { auth } from "../firebase/firabase.config";
import { db } from "../firebase/firabase.config";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
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
            if(!currentUser || !currentUser.emailVerified){
                setUser("");
            }else{
                setUser(currentUser);
                console.log(currentUser);
                //Se verifica si existe un documento en firestore para ese usuario
                const docRef = doc(db,"Usuarios", currentUser.uid);
                getDoc(docRef).then((docSnap) =>{
                    if(!docSnap.exists()){
                        setDoc(docRef, {}).then(()=>{
                            console.log("Colección creada para uid: " + currentUser.uid);
                        }).catch((error)=>{
                            console.log("Error al crear la colección", error);
                        })
                    }else{
                        console.log("La colección ya existe con uid: " + currentUser.uid);
                    }
                })
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

