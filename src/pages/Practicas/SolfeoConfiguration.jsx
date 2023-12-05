import React from 'react'
import Header from '../Header'
import claveSol from "../../res/claveSol.png"
import claveFa from "../../res/claveFa.png"
import sostenido from "../../res/sostenido.png"
import bemol from "../../res/bemol.png"

export default function SolfeoConfiguration({data, handleChange, handleOnClick}) {
  return (
    <div>
        <div className='modulos'>
            <Header headerColor={"header-green"}/>
            <h1>Práctica de Solfeo</h1>
            <h2>Configura tu práctica</h2>
            <main className='configuration-container'>
                {/* <div className='inputConfig-container'>
                  <p>Tiempo para responder:</p>
                  <input type="number" name='tiempo' id='tiempo' min="5" max="20" onChange={handleChange} value={data.tiempo}/>
                  <p>segundos</p>
                </div> */}
                

                <div className='inputConfig-container-group'>
                  <div className='inputConfig-container'>
                    <p>Clave: </p>
                    <button className={data.claves.sol?"active-button":""} name='sol' onClick={handleOnClick}><img src={claveSol} alt='Clave de Sol'/></button>
                    <button className={data.claves.fa?"active-button":""} name='fa' onClick={handleOnClick}><img  src={claveFa} alt='Clave de Fa'/></button>
                  </div>

                  <div className='inputConfig-container'>
                    <p>Instrumento:</p>
                    <select className="selectSubdivison" name="instrumento" id="instrumento" onChange={handleChange} value={data.instrumento}>
                      <option value="real">Real (Piano, Guitarra, Flauta)</option>
                      <option value="virtual" >Virtual</option>
                    </select>
                  </div>

                  <div className='inputConfig-container'>
                    <p>Modo:</p>
                    <select className="selectSubdivison" name="modo" id="modo" onChange={handleChange} value={data.modo}>
                      <option value="alteraciones">Alteraciones</option>
                      <option value="escalas" >Escalas</option>
                    </select>
                  </div>
                </div>

                <div className='keyScaleContainer'>
                  {data.modo ==="alteraciones"?(
                    <div className='inputConfig-container'>
                    <p>Alteraciones: </p>
                    <button className={data.alteraciones.sostenidos?"active-button":""} name='sostenidos' onClick={handleOnClick}><img src={sostenido} alt='sostenido'/></button>
                    <button className={data.alteraciones.bemoles?"active-button":""} name='bemoles' onClick={handleOnClick}><img src={bemol} alt='bemol'/></button>
                    </div>
                  ):(
                    <>
                    <p>Escalas:</p>
                    <button name="C" className={`escaleButton ${data.escalas.C?"active-button":""}`} onClick={handleOnClick}>C</button>
                    <button name="G" className={`escaleButton ${data.escalas.G?"active-button":""}`} onClick={handleOnClick}>G</button>
                    <button name="D" className={`escaleButton ${data.escalas.D?"active-button":""}`} onClick={handleOnClick}>D</button>
                    <button name="A" className={`escaleButton ${data.escalas.A?"active-button":""}`} onClick={handleOnClick}>A</button>
                    <button name="E" className={`escaleButton ${data.escalas.E?"active-button":""}`} onClick={handleOnClick}>E</button>
                    <button name="B" className={`escaleButton ${data.escalas.B?"active-button":""}`} onClick={handleOnClick}>B</button>
                    <button name="Fsharp" className={`escaleButton ${data.escalas.Fsharp?"active-button":""}`} onClick={handleOnClick}>F#</button>
                    <button name="Db" className={`escaleButton ${data.escalas.Db?"active-button":""}`} onClick={handleOnClick}>Db</button>
                    <button name="Ab" className={`escaleButton ${data.escalas.Ab?"active-button":""}`} onClick={handleOnClick}>Ab</button>
                    <button name="Eb" className={`escaleButton ${data.escalas.Eb?"active-button":""}`} onClick={handleOnClick}>Eb</button>
                    <button name="Bb" className={`escaleButton ${data.escalas.Bb?"active-button":""}`} onClick={handleOnClick}>Bb</button>
                    <button name="F" className={`escaleButton ${data.escalas.F?"active-button":""}`} onClick={handleOnClick}>F</button>
                    </>
                  )
                  
                }
                </div>
                <div className='configurationButtonContainer'>
                  <button className='configurationButton' name='start' onClick={handleOnClick}>Iniciar</button>
                </div>
            </main>
        </div>

        {/* <footer className='footer-waves'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 181.3 1400 138.7">
          <path className="waves-black" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-stroke waves-stroke-white' d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
          <path className='waves-cover waves-green' d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,224C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"/>
        </svg>
      </footer> */}
    </div>
  )
}
