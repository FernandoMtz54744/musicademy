import React from 'react'

export default function Login() {
  return (
    <div>
      <form action="">
        <label htmlFor="correo">Correo</label>
        <input type="email" name='correo' id='correo'/>
        <label htmlFor="usuario">Usuario</label>
        <input type="text" name='usuario' id='usuario'/>
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" />
        <input type="button" name='login' value="Login"/>
        <button>Registrarse</button>
      </form>
    </div>
  )
}
