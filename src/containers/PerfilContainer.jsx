import React, { useState } from 'react'
import Perfil from '../pages/Perfil'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from 'firebase/auth';

export default function PerfilContainer() {
  const auth = useAuth();
  const [estadisticaActual, setEstadisticaActual] = useState("");
  const [editState, setEditState] = useState("mostrando")
  const [data, setData] = useState({displayName: auth.user.displayName, password:"password"});

  const handleOnChange = (e)=>{
    setData({...data, [e.target.name]:e.target.value});
  }

  const handleOnClick = (modulo)=>{
    setEstadisticaActual(modulo);
  } 

  const handleEditar = (e)=>{
    e.preventDefault();
    if(editState === "mostrando"){
      setEditState("editando");
    }else{//Se guarda el usuario
      updateProfile(auth.user, {
        displayName: data.displayName
      }).then(()=>{
        console.log("DisplayName actualizado");
        if(data.password!="password"){
          auth.user.updatePassword(data.password).then(()=>{
            console.log("Password actualizada");
          }).catch((error)=>{
            console.log("Error al actualizar password", error);
          });
        }
      }).catch((error)=>{
        console.log("Error al actualizar displayName", error);
      })
      setEditState("mostrando");
    }
  }

  const handleCancelar = (e)=>{
    e.preventDefault();
    setEditState("mostrando");
  }
    
  return (
    <Perfil user={auth.user} handleOnClick={handleOnClick} estadisticaActual={estadisticaActual} 
    handleEditar={handleEditar}
    editState={editState} data={data} handleOnChange={handleOnChange} handleCancelar={handleCancelar}/>
  )
}
