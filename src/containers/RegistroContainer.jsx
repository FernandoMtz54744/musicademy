import React, { useState } from 'react'
import Registro from '../pages/Registro'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';

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

  const handleChange = (e)=>{
    setData({...data, [e.target.name]:e.target.value});
  }

  const handleRegister = (e)=>{
    e.preventDefault();
    auth.register(data.email, data.password).then((userCredential)=>{
      updateProfile(userCredential.user, {
        displayName: data.usuario
      }).then(()=>{
        console.log("Nombre de usuario actualizado");
      }).catch((error)=>{
        console.log(error);
      });
      navigate("/Modulos");
    }).catch((error)=>{
      console.log(error);
      if(error.code === "auth/invalid-email"){
        setError("Email no válido");
      }else if(error.code === "auth/email-already-exists"){  
        setError("El email ingresado ya está registrado")
      }else if(error.code === "auth/invalid-password"){
        setError("Contraseña no valida [debe ser al menos 6 caracteres]")
      }else if(error.code === "auth/weak-password"){
        setError("Contraseña débil [debe ser al menos 6 caracteres]")
      }
    })
  }

  return (
    <Registro data={data} handleChange={handleChange} handleRegister={handleRegister} error={error}/>
  )
}
