import React, { useState } from 'react'
import Registro from '../pages/Registro'
import { useAuth } from '../context/AuthContext'

export default function RegistroContainer() {
  const inialData = {
    email: "",
    password: "",
  }
  const [data, setData] = useState(inialData);
  const auth = useAuth();

  const handleChange = (e)=>{
    setData({...data, [e.target.name]:e.target.value});
  }

  const handleRegister = (e)=>{
    e.preventDefault();
    auth.register(data.email, data.password);
  }

  return (
    <Registro data={data} handleChange={handleChange} handleRegister={handleRegister}/>
  )
}
