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
                <h1>Seleccione el módulo para ver sus estadísticas</h1>
                <div className='module-select-container'>
                    <div className='module-button teoria-button-stadistic'>Teoria y Ejercicios</div>
                    <div className='module-button practicas-button-stadistic'>Prácticas</div>
                    <div className='module-button evaluaciones-button-stadistic'>Evaluaciones</div>
                    <div className='module-button minijuegos-button-stadistic'>Minijuegos</div>
                </div>
            </div>
        </main>
    </div>
  )
}
