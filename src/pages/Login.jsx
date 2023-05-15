import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/main.css"
import "../styles/auth.css"

export default function Login() {
  return (
    <div>
      <header className='header header-black'>
        <p>Logo</p>
        <div className='header-links'>
          <Link>Acerca</Link>
          <Link to="/">Inicio</Link>
          <Link to="/Registro">Registrarse</Link>
        </div>
      </header>

      <main className='main-auth'>
        <div className='form-container-auth form-container-login-color'>
          <h1>Inicie sesión</h1>
          <form action="" className='form-auth form-login-border-color'>
            <h1>Musicademy</h1>
            <div className='inputs-container'>
              <div className='input-container'>
                <label htmlFor="correo">Correo</label>
                <input className="input-text" type="email" name='correo' id='correo'/>
              </div>
              <div className='input-container'>
                <label htmlFor="password">Contraseña</label>
                <input className='input-text input-text-login-color' type="password" name="password" id="password" />
              </div>
              <div className='input-container'>
                <input className='input-button input-button-login-color' type="submit" name='login' value="Login"/>
              </div>
              <div className='input-container'>
                <button>Iniciar sesión con Google</button>
              </div>
              <div className='input-container'>
                <Link to="/Registro" className='registrarse-link'>Registrarse</Link>
              </div>
            </div>
          </form>
        </div>
      </main>

      <footer className='footer-waves'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 161.3 1440 138.7">
          <path className="waves-black" fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-stroke waves-stroke-purple' fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-cover waves-black' fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
        </svg>
      </footer>
    </div>
  )
}
