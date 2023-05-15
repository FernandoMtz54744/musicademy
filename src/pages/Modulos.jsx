import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/modulos.css"
import Header from './Header'

export default function Modulos() {
  return (
    <div className='modulos'>
      <Header headerColor={"header-black"}/>
       <h1>Selecciona el módulo que te interese</h1>
      <main className='main-modulos'>
        <div className='modulo-card teoria-card'>
          <p>Teoría y ejercicios</p>
          <Link className='modulo-card-button teoria-button' to="/Teoria">Comenzar</Link>
        </div>
        <div className='modulo-card practicas-card'>
          <p>Prácticas</p>
          <Link className='modulo-card-button practicas-button'>Comenzar</Link>
        </div>
        <div className='modulo-card evaluaciones-card'>
          <p>Evaluaciones</p>
          <Link className='modulo-card-button evaluaciones-button'>Comenzar</Link>
        </div>
        <div className='modulo-card minijuegos-card'>
          <p>Minijuegos</p>
          <Link className='modulo-card-button minijuegos-button'>Comenzar</Link>
        </div>
      </main>

      <footer className='footer-waves'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 181.3 1440 138.7">
          <path className="waves-black" fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-stroke waves-stroke-white' fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-cover waves-black' fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
        </svg>
      </footer>
    </div>
  )
}
