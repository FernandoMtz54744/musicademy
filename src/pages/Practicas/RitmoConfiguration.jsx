import React from 'react'
import Header from '../Header'
import "../../styles/practicas.css"
import redonda from "../../res/redonda.png"
import blanca from "../../res/blanca.png"
import negra from "../../res/negra.png"
import corchea from "../../res/corchea.png"
import tresillo from "../../res/tresillo.png"
import silencio from "../../res/silencio.png"

export default function RitmoConfiguration({data, handleChange, handleOnClick, handleStart}) {
  return (
    <div>
        <div className='modulos'>
            <Header headerColor={"header-green"}/>
            <h1>Práctica de Ritmo</h1>
            <h2>Configura tu práctica</h2>
            <main className='configuration-container'>
                <div className='inputConfig-container'>
                  <p>Tempo:</p>
                  <input type="number" name='tempo' id='tempo' min="40" max="200" value={data.tempo} onChange={handleChange}/>
                  <p>bpm</p>
                </div>

                <div className='inputConfig-container-group'>
                  <div className='inputConfig-container'>
                    <p>Figuras musicales: </p>
                    <button className={data.figuras.redonda?"active-button":""} onClick={handleOnClick} name="redonda"><img src={redonda} alt='redonda'/></button>
                    <button className={data.figuras.blanca?"active-button":""} onClick={handleOnClick} name="blanca"><img src={blanca} alt='blanca'/></button>
                    <button className={data.figuras.negra?"active-button":""} onClick={handleOnClick} name="negra"><img src={negra} alt='negra'/></button>
                    <button className={data.figuras.corchea?"active-button":""} onClick={handleOnClick} name="corchea"><img src={corchea} alt='corchea'/></button>
                  </div>
                  <div className='inputConfig-container'>
                    <p>Compuestos:</p>
                    <button><img src={tresillo} alt='tresillo'/></button>
                  </div>

                  <div className='inputConfig-container'>
                    <p>Silencios:</p>
                    <button><img src={silencio} alt='silencio'/></button>
                  </div>
                </div>
                
                <div className='inputConfig-container'>
                  <p>Compases:</p>
                  <input type="number" name='compases' id='compases' min="2" max="6" value={data.compases} onChange={handleChange}/>
                </div>
                
                <div className='inputConfig-container'>
                  <p>Signatura de compás:</p>
                  <input type="number" name='signaturaNumerador' id='signaturaNumerador' min="2" max="12" value={data.signaturaNumerador} onChange={handleChange}/>
                  /
                  <input type="number" name='signaturaDenominador' id='signaturaDenominador' step="2" min="2" max="8" value={data.signaturaDenominador} onChange={handleChange}/>
                </div>
                
                <div className='configurationButtonContainer'>
                  <button className='configurationButton' onClick={handleStart}>Iniciar</button>
                </div>
            </main>
        </div>

        <footer className='footer-waves'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 181.3 1440 138.7">
          <path className="waves-black" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-stroke waves-stroke-white' d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-cover waves-green' d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
        </svg>
      </footer>
    </div>
  )
}
