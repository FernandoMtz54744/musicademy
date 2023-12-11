import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/main.css"
import "../styles/auth.css"
import googleIcon from "../res/googleIcon.png"
import logo from "../res/Logo.svg"
import manual from "../res/manuales/Login.pdf";

export default function Login({data, handleChange, handleLogin, handleLoginGoogle, error}) {
  return (
    <div>
      <header className='header header-black'>
        <img src={logo} className="logo" alt='logo'/>
        <div className='header-links'>
          <Link>Acerca de</Link>
          <Link to="/">Inicio</Link>
          <Link to="/Registro">Registrarse</Link>
          <Link to={manual} target='_blank'>Manual</Link>
        </div>
      </header>

      <main className='main-auth'>
        <div className='form-container-auth form-container-login-color'>
          <h1>Iniciar sesión</h1>
          <form action="" className='form-auth form-login-border-color'>
            <h1>Musicademy</h1>
            <div className='inputs-container'>
              <div className='input-container'>
                <label htmlFor="email">Correo</label>
                <input className="input-text" type="email" name='email' id='email' onChange={handleChange} value={data.email}/>
              </div>
              <div className='input-container'>
                <label htmlFor="password">Contraseña</label>
                <input className='input-text input-text-login-color' type="password" name="password" id="password" onChange={handleChange} value={data.password}/>
              </div>
              <div className='input-container'>
                <input className='input-button input-button-login-color' onClick={handleLogin} type="submit" name='login' value="Login"/>
              </div>
              <div className='input-container'>
                <button onClick={handleLoginGoogle} className='google-button'>
                  <img src={googleIcon} alt="Icono de google" className='google-icon'/>Sign in with Google</button>
              </div>
              <div className='input-container'>
                <Link to="/Registro" className='registrarse-link'>Registrarse</Link>
              </div>
            </div>
            <center className='error-form'>
              {error}
            </center>
          </form>
        </div>
      </main>

      <footer className='footer-waves'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 161.3 1440 138.7">
          <path className="waves-black" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-stroke waves-stroke-purple'  d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-cover waves-black'  d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
        </svg>
      </footer>
    </div>
  )
}
