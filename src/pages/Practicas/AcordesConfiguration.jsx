import React from 'react'
import Header from '../Header'

export default function Acordes({data, handleChange, handleChecked, handleStart}) {
  return (
    <div>
        <div className='modulos'>
            <Header headerColor={"header-green"}/>
            <h1>Práctica de Acordes</h1>
            <h2>Configura tu práctica</h2>
            <main className='configuration-container'>

              <div className='inputConfig-container-group'>
                <div className='inputConfig-container radio-container'>
                  <p>Tipo de acordes</p>
                  <label htmlFor='mayores'>
                    <input type="checkbox" id='mayor' name='mayor' value="mayores" onChange={handleChecked} checked={data.acordes.mayores}/>Acordes mayores
                  </label>
                  <label htmlFor='menores'>
                    <input type="checkbox" id='menor' name='menor' value="mayores" onChange={handleChecked} checked={data.acordes.menores}/>Acordes menores
                  </label>
                  <label htmlFor='aumentados'>
                    <input type="checkbox" id='aumentado' name='aumentado' value="aumentados" onChange={handleChecked} checked={data.acordes.aumentados}/>Acordes aumentados
                  </label>
                  <label htmlFor='disminuidos'>
                    <input type="checkbox" id='disminuido' name='disminuido' value="disminuidos" onChange={handleChecked} checked={data.acordes.disminuidos}/>Acordes Disminuidos
                  </label>
                  <label htmlFor='septima'>
                    <input type="checkbox" id='septima' name='septima' value="septima" onChange={handleChecked} checked={data.acordes.septima}/>Acordes de septima
                  </label>
                  <label htmlFor='maj7'>
                    <input type="checkbox" id='maj7' name='maj7' value="maj7" onChange={handleChecked} checked={data.acordes.maj7}/>Acordes Maj7
                  </label>
                  <label htmlFor='m7'>
                    <input type="checkbox" id='m7' name='m7' value="m7" onChange={handleChecked} checked={data.acordes.m7}/>Acordes m7
                  </label>
                </div>
                
                <div className='inputConfig-container radio-container'>
                    <p>Instrumento</p>
                      <div>
                        <input type="radio" value="real" name='instrumento' onChange={handleChange}/>Real (Piano, Guitarra, Flauta)
                      </div>
                      <div>
                        <input type="radio" value="virtual" name='instrumento' onChange={handleChange}/>Virtual
                      </div>
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
