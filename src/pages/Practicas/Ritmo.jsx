import React from 'react'
import RitmoSheet from './RitmoSheet'
import redonda from "../../res/redonda.png"
import blanca from "../../res/blanca.png"
import negra from "../../res/negra.png"
import corchea from "../../res/corchea.png"
import FinishPage from '../FinishPage'

export default function Ritmo({data, generateRhythmPattern, handleBack, rhythm, fails, excerciseControl, NUMBER_OF_EXCERCISES, isPlaying, circleBeatCSS}) {

  return (
    <>
      <div className='entered-configuration'>
        <div className='inputConfig-container'>
          <p>Tempo:</p><div className='divSimulateInput'>{data.tempo}</div><p>bpm</p>
        </div>

        <div className='inputConfig-container'>
          <p>Compases:</p><div className='divSimulateInput'>{data.compases}</div>
        </div>

        <div className='inputConfig-container'>
          <p>Signatura de compás:</p><div className='divSimulateInput'>{data.signaturaNumerador}</div>/<div className='divSimulateInput'>{data.signaturaDenominador}</div>
        </div>

        <div className='inputConfig-container'>
            <p>Figuras musicales: </p>
            {data.figuras.redonda && <div className="divSimulateButtonFigura" ><img src={redonda} alt='redonda'/></div>}
            {data.figuras.blanca && <div className="divSimulateButtonFigura" ><img src={blanca} alt='blanca'/></div>}
            {data.figuras.negra && <div className="divSimulateButtonFigura" ><img src={negra} alt='negra'/></div>}
            {data.figuras.corchea && <div className="divSimulateButtonFigura" ><img src={corchea} alt='corchea'/></div>}
        </div>
        {excerciseControl.length <= NUMBER_OF_EXCERCISES && (
          <div className='inputConfig-container'>
            <p>Ejercicio: {excerciseControl.length} de {NUMBER_OF_EXCERCISES}</p>
          </div>
        )}
      </div>
      
      {excerciseControl.length <= NUMBER_OF_EXCERCISES?(
        <>
          <RitmoSheet rhythm={rhythm} data={data}/>
          {isPlaying?(
            <>
              <div className="circle-container">
              <div className={`circle-beat ${circleBeatCSS}`}></div>
            </div>
            </>
            ):(
              <center>
              <h2>Notas correctas: {excerciseControl[excerciseControl.length-1].totalNotesCorrect}</h2>
              </center>
            )}
          <footer className='footer-waves'>
            <div className='buttonRitmoContainer'>
              <button onClick={handleBack} className='configurationButton'>Ir a configuración</button>
              <center>
                <h2>Fallas: {fails}</h2>
              </center>
              <button onClick={generateRhythmPattern} className='configurationButton'>Siguiente</button>
            </div>
          </footer>   
        </>
      ):(
        <FinishPage handleBack={handleBack}>
            <h3>{excerciseControl.filter(excercise => excercise.wasCorrect).length} ejercicios de {NUMBER_OF_EXCERCISES} tocados correctamente</h3>
            <h3>{excerciseControl.reduce((cantidad, current) => cantidad+current.totalNotesCorrect, 0)} notas tocadas correctamente</h3>
            <h3>{excerciseControl.reduce((cantidad, current) => cantidad+current.totalNotesWrong, 0)} notas tocadas incorrectamente</h3>
        </FinishPage>
      )}
              
    </>
  )
}
