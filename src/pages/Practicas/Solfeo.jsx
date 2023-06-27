import React from 'react'
import Header from '../Header'
import claveSol from "../../res/claveSol.png"
import claveFa from "../../res/claveFa.png"
import sostenido from "../../res/sostenido.png"
import bemol from "../../res/bemol.png"

export default function Solfeo() {
  return (
    <div>
        <div className='modulos'>
            <Header headerColor={"header-green"}/>
            <h1>Práctica de Solfeo</h1>
            <h2>Configura tu práctica</h2>
            <main className='configuration-container'>
                <div className='inputConfig-container'>
                  <p>Tempo:</p>
                  <input type="number" name='tempo' id='tempo' min="40" max="200"/>
                  <p>bpm</p>
                </div>
                

                <div className='inputConfig-container-group'>
                  <div className='inputConfig-container'>
                    <p>Clave: </p>
                    <button><img src={claveSol} alt='Clave de Sol'/></button>
                    <button><img  src={claveFa} alt='Clave de Fa'/></button>
                  </div>
                  <div className='inputConfig-container radio-container'>
                    <p>Instrumento</p>
                    <div>
                        <input type="radio" value="real" name='instrumento'/>Real (Piano, Guitarra, Flauta)
                    </div>
                    <div>
                        <input type="radio" value="virtual" name='instrumento'/>Virtual
                    </div>
                  </div>
                </div>
                
                <div className='inputConfig-container'>
                    <p>Alteraciones: </p>
                    <button><img src={sostenido} alt='sostenido'/></button>
                    <button><img src={bemol} alt='bemol'/></button>
                  </div>
                
                <div className='configurationButtonContainer'>
                  <button className='configurationButton'>Iniciar</button>
                </div>


            </main>
        </div>

        <footer className='footer-waves'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 181.3 1440 138.7">
          <path className="waves-black" fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-stroke waves-stroke-white' fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-cover waves-green' fill-opacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
        </svg>
      </footer>
    </div>
  )
}
