import React from 'react'

export default function Evaluation({evaluacion, handleChange, handleSubmit, data, userAnswer, isAnswering, handleBack}) {
   

  return (
      <form action="" className='evaluacion-form'>
        {evaluacion.map((pregunta, i)=>(
          <div className='pregunta-container' key={i}>
            <div className='pregunta-text'>
              {i+1}.- {pregunta.pregunta}
            </div>
            <div className='opciones-container'>
              {pregunta.opciones.map((opcion, j)=>(
                <label htmlFor={`${i}-${j}`} 
                  className={`opcion-container ${Number(data[`pregunta_${i}`]) === j?"selected-option":""} 
                  ${isAnswering?"":Number(data[`pregunta_${i}`]) === j?(userAnswer[i]?"correct":"incorrect"):""}`} 
                  key={j} >
                  <input type='radio' name={`pregunta_${i}`} id={`${i}-${j}`} 
                  value={j} onChange={handleChange} className='radio-button-evaluation'
                  />{opcion}
                </label>
              ))}
            </div>
          </div>
          ))}
        {isAnswering?(
          <input type="button" value="Terminar Evaluación" onClick={handleSubmit} className='button-finish-evaluation'/>
        ):(
          <button onClick={handleBack} className='button-finish-evaluation'>Regresar</button>
        )}
      </form>
  )
}
