import React, { useState } from 'react'
import { getEjercicio } from '../ejercicios';

export default function Ejercicio({ejercicioState, titulo, setEjercicioState, subtema}) {
    const ejercicioData = {
        id: "",
        pregunta: "",
        partitura: {
            display: true,
            escala: "",
            clave:"",
            notas:[]
        },
        opciones: [],
        correcta: 0
    }
    const [ejercicio, setEjercicio] = useState();
    const [userAnswer, setUserAnswer] = useState(0);
    const [isAnswering, setIsAnswering] = useState(false);
    const [result, setResult] = useState("incorrecto");

    const generarEjercicio = ()=>{
        setEjercicio(getEjercicio(subtema));
        setEjercicioState("realizando")
        setIsAnswering(true);
    }

    const handleChange = (e)=>{
        if(isAnswering){
            setUserAnswer(Number(e.target.value));
        }
    }

    const validarEjercicio = ()=>{
        setIsAnswering(false);
        if(userAnswer === ejercicio.correcta){
            setResult("correcto");
            // Subir a BD
        }else{
            setResult("incorrecto");
        }
    }

    const handleContinue = ()=>{
        if(result === "correcto"){
            setEjercicioState("realizado")
        }else{
            setEjercicioState("sin realizar")
        }
    }

  return (
    ejercicioState === "sin realizar" || ejercicioState === "realizado"?(
        <div className='ejercicio-container'>
            <h2>Ejercicio de {titulo}</h2>
            <div className='ejercicio-button-state-container'>
                <div className='ejercicio-estado-container'>
                    <div className={`ejercicio-circle ${ejercicioState === "sin realizar"?"ejercicio-circle-red":"ejercicio-circle-green"}`}></div>
                    <h2>{ejercicioState === "sin realizar"?"Sin realizar":"Completado"}</h2>
                </div>
                    <button onClick={generarEjercicio}>{ejercicioState === "sin realizar"?"Realizar":"Volver a realizar"}</button>
            </div>
        </div>
    ):(
        <div className='ejercicio-container'>
            <h2>Ejercicio de {titulo}</h2>
            <h2>{ejercicio.pregunta}</h2>
            <div className='opciones-container-teoria'>
                {ejercicio.opciones.map((opcion, i)=>(
                    <label key={i} className={`opcion-container-teoria 
                    ${isAnswering?(userAnswer === i?"selected-op-teoria":""):(ejercicio.correcta === i?"ejercicio-correcta":
                    (userAnswer === i?"ejercicio-incorrecta":""))}`}>
                        
                        <input type='radio' name='opcion' value={i} className='radio-button-evaluation' onChange={handleChange}/>{opcion}
                    </label>
                ))}
            </div>
            <div className='ejercicio-button-container'>
                {isAnswering?(
                    <button onClick={validarEjercicio}>Responder ejercicio</button>
                ):(
                    <>
                    <button onClick={generarEjercicio}>Volver a responder</button>
                    <button onClick={handleContinue}>Continuar con la teoria</button>
                    </>
                )}
            </div>
        </div>
    ))
}
