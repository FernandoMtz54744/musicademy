import React, { useState } from 'react'
import Login from '../pages/Login'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function LoginContainer() {
  const inialData = {
    email: "",
    password: "",
  }
  const [data, setData] = useState(inialData);
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setData({...data, [e.target.name]:e.target.value});
  }

  const handleLogin = (e)=>{
    e.preventDefault();
    auth.login(data.email, data.password).then((userCredential)=>{
      if(userCredential.user.emailVerified){
        navigate("/Modulos");
      }else{
        setError("Verifique su email")
        toast.error("Verifique su email")
      }
    }).catch((error)=>{
      console.log(error);
      if(error.code === "auth/invalid-email"){
        setError("Email no válido");
        toast.error("Email no válido")
      }else if(error.code === "auth/invalid-login-credentials"){  
        setError("Email o contraseña incorrectos")
        toast.error("Email o contraseña incorrectos")
      }
    });
  }

  const handleLoginGoogle = (e)=>{
    e.preventDefault();
    auth.loginWIthGoogle().then(()=>{
      navigate("/Modulos")
    }).catch((error)=>{
      console.log("Error al iniciar con Google");
      console.log(error);
    });
  }

  return (
    <Login data={data} handleChange={handleChange} handleLogin={handleLogin} handleLoginGoogle={handleLoginGoogle} error={error}/>
  )
}
