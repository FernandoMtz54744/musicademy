import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

export default function Teoria() {
  return (
    <div>
        <div className='modulos'>
            <Header headerColor={"header-blue"}/>
            <h1>Selecciona el tema de tu interés</h1>
            <main className='main-modulos'>
                <div className='modulo-card teoria-card'>
                <p>Fundamentos</p>
                <Link className='modulo-card-button teoria-button' to="/Teoria">Comenzar</Link>
                </div>
                <div className='modulo-card teoria-card'>
                <p>Melodia</p>
                <Link className='modulo-card-button teoria-button'>Comenzar</Link>
                </div>
                <div className='modulo-card teoria-card'>
                <p>Armonía</p>
                <Link className='modulo-card-button teoria-button'>Comenzar</Link>
                </div>
                <div className='modulo-card teoria-card'>
                <p>Ritmo</p>
                <Link className='modulo-card-button teoria-button'>Comenzar</Link>
                </div>
            </main>
        </div>

        <footer className='footer-waves'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 181.3 1440 138.7">
          <path className="waves-black" fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-stroke waves-stroke-white' fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-cover waves-blue' fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
        </svg>
      </footer>
    </div>
  )
}
