import React, { useEffect, useRef, useState } from 'react'
import Evaluation from '../pages/Evaluation'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../pages/Header';
import preguntasJSON from "../res/evaluacion.json"
import { getRandomNumber, suffle } from '../utils';
import "../styles/evaluacion.css"

export default function EvaluationContainer() {

    const {submodulo} = useParams();
    const [evaluacion, setEvaluacion] = useState([]);
    const NUMBER_OF_QUESTIONS = 10;
    const [data, setData] = useState({});
    const [userAnswer, setUserAnswer] = useState([]);
    const [isAnswering, setIsAnswering] = useState(true);
    const [time, setTime] = useState(null);
    const interval = useRef();
    const navigate = useNavigate();

    const handleChange = (e)=>{
        if(isAnswering){
            setData({...data, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const userAnswerTemp = [];
        for(let i=0; i<NUMBER_OF_QUESTIONS; i++){
            if(evaluacion[i].correcta === Number(data[`pregunta_${i}`])){
                userAnswerTemp[i] = true;
            }else{
                userAnswerTemp[i] = false;
            }
        }
        setUserAnswer(userAnswerTemp);
        setIsAnswering(false);
        clearInterval(interval.current);
        window.scroll(0,0);

        //Conectarse a bd y subir a estadísticas
    }



    const handleBack = () =>{
        navigate("/Evaluaciones")
    }

    useEffect(()=>{
        let preguntas = suffle(Object.keys(preguntasJSON[submodulo]));
        const indexes = [];
        let i = 0;
        const evaluacionTemp = [];
        while(i < NUMBER_OF_QUESTIONS){
            const randomIndex = getRandomNumber(preguntas.length);
            if(!indexes.includes(randomIndex)){
                indexes.push(randomIndex);
                const preguntaRandom = preguntasJSON[submodulo][preguntas[randomIndex]];
                preguntaRandom.opciones = suffle(preguntaRandom.opciones);
                for(let i=0; i<preguntaRandom.opciones.length; i++){
                    if(preguntaRandom.opciones[i].includes("$")){
                        preguntaRandom.correcta = i;
                        preguntaRandom.opciones[i] = preguntaRandom.opciones[i].replace("$", "");
                    }
                }
                evaluacionTemp.push(preguntaRandom);
                i++;
            }
        }

        const dataTemp = {} 
        for(let i=0; i<NUMBER_OF_QUESTIONS; i++){
            dataTemp[`pregunta_${i}`] = 0;
        }
        setEvaluacion(evaluacionTemp);
        setData(dataTemp);
    }, [submodulo])

    const handleStart = ()=>{
        setTime(0);
        interval.current = setInterval(()=>{
            setTime(time => time + 1);
        }, 1000);
    }

    useEffect(()=>{
        if(time === 120){
            document.getElementById("finish-evaluation").click();
        }
    }, [time])
    
    const formatTiempo = (segundos)=> {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
      
        const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos;
        const formatoSegundos = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
      
        return `${formatoMinutos}:${formatoSegundos}`;
    }

    return (
        <>
            <Header headerColor={"header-purple"}/>
            {time === null?(
                <div className='instrucciones-container'>
                    <div className='instrucciones-evaluacion'>
                        <center>
                        <h2>Bienvenido a la evaluación de {submodulo.toUpperCase()}<br/>
                        Da click en el botón de iniciar, posteriormente lee las preguntas y selecciona la opción que consideres correcta</h2>
                        </center>
                        <button onClick={handleStart} className='start-evaluation-button'>INICIAR</button>
                    </div>
                </div>
            ):(

                <div className='evaluacion-container'>
                    <div className='timer-container'>
                        Tiempo {formatTiempo(time)}
                    </div>
                    <center><h2>Evaluación de {submodulo.toUpperCase()}</h2></center>
                    {!isAnswering && (<center><h2>Tuviste {userAnswer.filter(answer => answer).length} de {NUMBER_OF_QUESTIONS} respuestas correctas en un tiempo de {formatTiempo(time)} min</h2></center>)}
                    <Evaluation submodulo={submodulo} evaluacion={evaluacion} 
                    handleChange={handleChange} handleBack={handleBack} handleSubmit={handleSubmit} 
                    data={data} userAnswer={userAnswer} isAnswering={isAnswering}/>
                    
                </div>
            )}
        </>
  )
}
