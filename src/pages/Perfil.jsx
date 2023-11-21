import React from 'react'
import Header from './Header'
import "../styles/perfil.css"

export default function Perfil({user}) {
  return (
    <div>
        <Header headerColor={"header-black"}/>
        <main className='main-perfil'>
            <h1>Perfíl</h1>
            <div className='form-container-perfil'>
                {user.photoURL?(
                   <img src={user.photoURL} className='user-picture-perfil-module' alt="usuario-picture" />
                ):(
                    <h2>Datos</h2>
                )}
                <form action="" className='perfil-form'>
                    <p>Correo: {user.email}</p>
                    <p>Usuario: {user.displayName}</p>    
                    <div className='button-container-perfil'>
                        <input className='input-button-pefil' type="submit" name='editar' value="Editar"/>
                    </div>
                </form>
            </div>
            <div>
                <h1>Estadísticas</h1>
            </div>
        </main>
    </div>
  )
}
