import React from 'react'
import Perfil from '../pages/Perfil'
import { useAuth } from '../context/AuthContext'

export default function PerfilContainer() {
  const auth = useAuth();
  

  return (
    <Perfil user={auth.user}/>
  )
}
