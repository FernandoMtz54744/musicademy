import React from 'react'
import Header from './Header'
import "../styles/perfil.css"

export default function Perfil() {
  return (
    <div>
        <Header headerColor={"header-black"}/>
        <main className='main-perfil'>
            <h1>Perfíl</h1>
            <div className='form-container-perfil'>
                <h2>Tus datos</h2>
                <form action="" className='perfil-form'>
                    <p>Correo: correo@example.com</p>
                    <p>Usuario: UsuarioName</p>    
                    <div className='button-container-perfil'>
                        <input className='input-button-pefil' type="submit" name='editar' value="Editar"/>
                    </div>
                </form>
            </div>
            <div>
                <h1>Estadisticas</h1>
            </div>
        </main>
    </div>
  )
}
