import React from 'react'
import Header from '../Header'
import manual from "../../res/manuales/Acordes.pdf";

export default function Acordes({data, handleChange, handleChecked, handleStart}) {
  return (
    <div>
        <div className='modulos'>
            <Header headerColor={"header-green"} manual={manual}/>
            <h1>Práctica de Acordes</h1>
            <h2>Configura tu práctica</h2>
            <main className='configuration-container'>

              <div className='inputConfig-container-group'>
                <div className='chord-type-container'>
                  <h4>Selecciona tus tipos de acordes</h4>
                  <div className='chord-type-group'>
                    <button className={`chord-button ${data.acordes.mayor?"checked-chord":""}`} onClick={handleChecked} name="mayor">
                      Mayores
                    </button>
                    <button className={`chord-button ${data.acordes.menor?"checked-chord":""}`} onClick={handleChecked} name="menor">
                      Menores
                    </button>
                  </div>
                  <div className='chord-type-group'>
                    {/* <button className={`chord-button ${data.acordes.aumentado?"checked-chord":""}`} onClick={handleChecked} name="aumentado">
                      Aumentados
                    </button>
                    <button className={`chord-button ${data.acordes.disminuido?"checked-chord":""}`} onClick={handleChecked} name="disminuido">
                      Disminuidos
                    </button> */}
                    <button className={`chord-button ${data.acordes.sus4?"checked-chord":""}`} onClick={handleChecked} name="sus4">
                      Sus4
                    </button>
                    <button className={`chord-button ${data.acordes.sus2?"checked-chord":""}`} onClick={handleChecked} name="sus2">
                      Sus2
                    </button>
                  </div>  
                  <div className='chord-type-group'>
                    <button className={`chord-button ${data.acordes.septima?"checked-chord":""}`} onClick={handleChecked} name="septima">
                      Séptima dominante
                    </button>
                    <button className={`chord-button ${data.acordes.maj7?"checked-chord":""}`} onClick={handleChecked} name="maj7">
                      Mayor séptima
                    </button>
                    <button className={`chord-button ${data.acordes.m7?"checked-chord":""}`} onClick={handleChecked} name="m7">
                      Menor séptima
                    </button>
                  </div>
                </div>

                <div className='inputConfig-container'>
                  <p>Instrumento:</p>
                  <select className="selectSubdivison" name="instrumento" id="instrumento" onChange={handleChange} value={data.instrumento}>
                    <option value="real">Real (Piano, Guitarra, Flauta)</option>
                    <option value="virtual" >Virtual</option>
                  </select>
                </div>
              </div>
              
              <div className='configurationButtonContainer'>
                <button className='configurationButton' onClick={handleStart}>Iniciar</button>
              </div>
            </main>
        </div>

        <footer className='footer-waves'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 181.3 1440 138.7">
          <path className="waves-black" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-stroke waves-stroke-white'  d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-cover waves-green' d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
        </svg>
      </footer>
    </div>
  )
}
