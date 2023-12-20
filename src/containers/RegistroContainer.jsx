import React, { useState } from 'react'
import Registro from '../pages/Registro'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function RegistroContainer() {
  const inialData = {
    email: "",
    usuario: "", //Display name
    password: "",
  }
  const [data, setData] = useState(inialData);
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  const handleChange = (e)=>{
    setData({...data, [e.target.name]:e.target.value});
  }

  const handleRegister = (e)=>{
    e.preventDefault();
    if(!data.email.includes("@") || !data.email.includes(".com")){
      toast.error("El correo debe tener el formato correcto");
      return;
    }else if(!(/^[a-zA-Z0-9 ]{2,12}$/.test(data.usuario))){
      toast.error("El nombre de usuario debe tener entre 2 y 12 caracteres alfanuméricos");
      return;
    }else if(!passwordRegex.test(data.password)){
      toast.error("La contraseña debe tener al menos 6 caracteres (al menos una mayúsculas, minusculas, numeros y caracteres especiales)");
      return;
    }
    auth.register(data.email, data.password).then((userCredential)=>{
      updateProfile(userCredential.user, {
        displayName: data.usuario
      }).then(()=>{
        console.log("Nombre de usuario actualizado");
        console.log(auth.user);
        sendEmailVerification(userCredential.user).then(()=>{
          toast.success("Email de verificación enviado")
        }).catch((error)=>{
          console.log("Error al enviar email de verificación", error);
          toast.error("Error al enviar email de verificación");
        })
      }).catch((error)=>{
        console.log(error);
      });
      
      navigate("/Modulos");
    }).catch((error)=>{
      console.log(error);
      if(error.code === "auth/invalid-email"){
        setError("Email no válido");
        toast.error("Email no válido")
      }else if(error.code === "auth/email-already-exists"){  
        setError("El email ingresado ya está registrado")
        toast.error("El email ingresado ya está registrado")
      }else if(error.code === "auth/invalid-password"){
        setError("Contraseña no valida [debe ser al menos 6 caracteres]")
        toast.error("Contraseña no valida [debe ser al menos 6 caracteres]")
      }else if(error.code === "auth/weak-password"){
        setError("Contraseña débil [debe ser al menos 6 caracteres]")
        toast.error("Contraseña débil [debe ser al menos 6 caracteres]")
      }else if(error.code === "auth/email-already-in-use"){
        setError("Este email ya está en uso")
        toast.error("Este email ya está en uso")
      }else{
        setError(error.code);
        toast.error(error.code);
      }
    })
  }

  return (
    <Registro data={data} handleChange={handleChange} handleRegister={handleRegister} error={error}/>
  )
}
