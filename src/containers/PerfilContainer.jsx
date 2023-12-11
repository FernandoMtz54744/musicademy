import React, { useState } from 'react'
import Perfil from '../pages/Perfil'
import { useAuth } from '../context/AuthContext'

export default function PerfilContainer() {
  const auth = useAuth();
  const [estadisticaActual, setEstadisticaActual] = useState("");

  const handleOnClick = (modulo)=>{
    setEstadisticaActual(modulo);
  } 

  const handleSubmit = ()=>{
    
  }

  return (
    <Perfil user={auth.user} handleOnClick={handleOnClick} estadisticaActual={estadisticaActual}/>
  )
}
