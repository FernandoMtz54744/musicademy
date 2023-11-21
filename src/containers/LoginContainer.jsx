import React, { useState } from 'react'
import Login from '../pages/Login'
import { useAuth } from '../context/AuthContext';

export default function LoginContainer() {
  const inialData = {
    email: "",
    password: "",
  }
  const [data, setData] = useState(inialData);
  const auth = useAuth();

  const handleChange = (e)=>{
    setData({...data, [e.target.name]:e.target.value});
  }

  const handleLogin = (e)=>{
    e.preventDefault();
    auth.login(data.email, data.password);
  }

  const handleLoginGoogle = (e)=>{
    e.preventDefault();
    auth.loginWIthGoogle();
  }

  return (
    <Login data={data} handleChange={handleChange} handleLogin={handleLogin} handleLoginGoogle={handleLoginGoogle}/>
  )
}
