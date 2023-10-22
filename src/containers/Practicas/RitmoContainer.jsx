import React, { useEffect, useState } from 'react'
import RitmoConfiguration from '../../pages/Practicas/RitmoConfiguration';
import Ritmo from '../../pages/Practicas/Ritmo';
import Header from '../../pages/Header';
import * as Tone from "tone"

export default function RitmoContainer() {

    const initialData = {
      tempo:60, 
      compases:4,
      figuras:{
        redonda:false,
        blanca: false,
        negra: true,
        corchea: false
      },
      signaturaNumerador: 4,
      signaturaDenominador: 4,
      isStart: false,
      subdivision: "4"
    }

    const [data, setData] = useState(initialData); //Datos del formulario
    const [rhythmSheetData, setRhythmSheetData] = useState([]); //Patron ritmico en formato para desplegar en partitura 
    const [rhythmTimesElapsed, setRhythmTimesElapsed] = useState([]); //Tiempos transcurridos de cada nota desde el tiempo 0
    const [timeReference, setTimeReference] = useState(0); //Tiempo de referencia desde donde se empieza a contar la duracion del patrón ritmico
    const [metronomeBeatTime, setMetronomeBeatTime] = useState(0); //Tiempo en el que el metronomo da el golpe
    const [circleBeatCSS, setCircleBeatCSS] = useState("") //Indica el CSS del circulo para indicar el golpe del metronomo
    const [userAnswers, setUserAnswers] = useState([]); //Mantiene cuales notas fueron acertadas por el usuario
    const [isDelaySynchronized, setIsDelaySynchronized] = useState(false); //Indica si ya se sincronizó el delay entre el beat y el sonido
    const [systemDelaysArray, setSystemDelaysArray] = useState([]); //Es el delay en segundos entre el beat y el sonido
    const [averageDelay, setAverageDelay] = useState(0);
    const USER_PULSE_MARGIN = 0.150; //Margen en segundos de que el usuario se puede equivocar al presionar el ritmo
    // const [ticks, setTicks] = useState(0); //Para el circulo que muestra el beat de forma visual

    //Iniciar el metronomo al mostrar formulario y al cambiar datos [tempo, signatura y subdivisión]
    useEffect(()=>{
      Tone.Transport.cancel();
      const osc = new Tone.Oscillator().toDestination();
      const osc2 = new Tone.Oscillator(300, "sine").toDestination();
      osc2.volume.value = -12;
      Tone.Transport.bpm.value = data.tempo;
      const ticksForCompass = 768/Number(data.signaturaDenominador) * data.signaturaNumerador; //Un compas mide 768 ticks

      Tone.Transport.scheduleRepeat((time)=>{
        setMetronomeBeatTime(Tone.now());
        if(Tone.Transport.getTicksAtTime(time) % ticksForCompass === 0){
          osc.start(time).stop(time + 0.1);
          setCircleBeatCSS("main-beat");
        }else{
          osc2.start(time).stop(time + 0.1);
          setCircleBeatCSS("secondary-beat")
        }
        // setTicks(Tone.Transport.getTicksAtTime(time))
      },`${data.subdivision}n`, 0);
      Tone.Transport.start();
    },[data.tempo, data.signaturaDenominador, data.signaturaNumerador, data.subdivision]);
    
    //Maneja el cambio de datos del formulario
    const handleChange = (e)=>{
      setData({...data, [e.target.name]:e.target.value})
    }

    //Maneja el click en las figuras musicales
    const handleOnClick = (e)=>{
      let buttonName="";
      if(e.target.tagName === "IMG"){
        buttonName = e.target.parentNode.name;
      }else{
        buttonName = e.target.name;
      }
      const toggleFiguraValue = !data.figuras[buttonName];
      setData({...data, figuras:{...data.figuras, [buttonName]: toggleFiguraValue}});
    }

    //Verifica cuales de las figuras musicales fueron activadas
    const verifyActivatedFiguras = ()=>{
      const activatedFiguras = [];
      if(data.figuras.corchea){activatedFiguras.push(0.125);}
      if(data.figuras.negra){activatedFiguras.push(0.25);}
      if(data.figuras.blanca){activatedFiguras.push(0.5);}
      if(data.figuras.redonda){activatedFiguras.push(1);}
      return activatedFiguras;
    }

    //Suma todos los elementos de un array
    const sumArray = (array) => {
      return array.reduce((partialSum, element) => partialSum + element, 0);
    };

    //Funcion Backtracking recursiva para generar ritmos al azar por compás
    const generateRhythm = (compass, rhythm, figuras) => {
      const takenDecisions = [];
      while (takenDecisions.length < figuras.length) {
        const figura = figuras[Math.trunc(Math.random() * figuras.length)];
        if (takenDecisions.indexOf(figura) === -1) {
          takenDecisions.push(figura);
          rhythm.push(figura);
          if (sumArray(rhythm) < compass) {
            const valid = generateRhythm(compass, rhythm, figuras);
            if (valid) {
              return true;
            } else {
              rhythm.pop();
            }
          } else if (sumArray(rhythm) === compass) {
            return true;
          } else {//Si es mayor se pasa y no es válido
            rhythm.pop();
          }
        }
      }
      return false;
    }

    //Calcula los tiempos en los que se debe pulsar una nota a partir de la primera pulsación
    const calculateRhythmTimesElapsed = (patronRitmico)=>{
      const corcheaPulse = 60/(data.tempo*2); //Tiempo en ms de una corchea
      const rhythmTimesElapsedTemp = [];
      rhythmTimesElapsedTemp.push(0);
      patronRitmico.reduce((partialSum, nota)=>{
        const noteDuration  = corcheaPulse * (nota/0.125);
        const sum = partialSum + noteDuration;
        rhythmTimesElapsedTemp.push(sum);
        return sum;
      }, 0);
      setRhythmTimesElapsed(rhythmTimesElapsedTemp);
      console.log("Tiempo en segundos de cada nota: [" +  rhythmTimesElapsedTemp.toString() +"]");
    }

    //Llena las respuestas con false, es true cuando el usuario acertó en el beat
    const fillUserAnswers = (rhythmPattern)=>{
      const userAnswersTemp = [];
      for(let i=0; i<rhythmPattern.length; i++){
        userAnswersTemp.push(false);
      }
      setUserAnswers(userAnswersTemp);
    }

    //Funcion que genera todo el patrón ritmico completo (todos los compases)
    const generateRhythmPattern = ()=>{
      const figuras = verifyActivatedFiguras();
      const compass = Number(data.signaturaNumerador)/Number(data.signaturaDenominador);
      const rhythmPattern = [];
      const rhythmSheetTemp = [];
      for(let i=0; i < data.compases; i++){
        const rhythmByCompass = [];
        const valid = generateRhythm(compass, rhythmByCompass, figuras);
        if(valid){
          rhythmPattern.push(...rhythmByCompass)
          rhythmSheetTemp.push(...rhythmByCompass)
          rhythmSheetTemp.push(-1)
        }else{
          break;
        }
      }
      rhythmSheetTemp.pop();//Eliminar el ultimo -1
      setRhythmSheetData(rhythmSheetTemp);
      setTimeReference(0);
      calculateRhythmTimesElapsed(rhythmPattern);
      fillUserAnswers(rhythmPattern);
    }

    const handleOnKeydown = (e)=>{
      const time = Tone.now();
      if(!isDelaySynchronized){
        if(e.keyCode === 83){
          if(systemDelaysArray.length < 10){
            const systemDelayTemp = [...systemDelaysArray];
            systemDelayTemp.push(time-metronomeBeatTime);
            setSystemDelaysArray(systemDelayTemp)
          }else{
            const averageDelay = sumArray(systemDelaysArray) / systemDelaysArray.length;
            if(averageDelay <= 0.250){
              setAverageDelay(averageDelay);
              setIsDelaySynchronized(true);
            }else{
              setSystemDelaysArray([]);
              console.log("Delay demasiado alto: " + averageDelay);
            }
          }
        }
      }else{
        if(e.keyCode === 32){
          if (timeReference === 0) {
            const realTimeReference = metronomeBeatTime+averageDelay;
            setTimeReference(realTimeReference);
            if(time-realTimeReference< USER_PULSE_MARGIN){
              const userAnswersTemp = [...userAnswers];
              userAnswersTemp[0] = true;
              setUserAnswers(userAnswersTemp);
              console.log("Correcto con: " + (time-realTimeReference));
            }else{
              console.log("Incorrecto con: " + (time-realTimeReference));
            }
          }else{
            let isCorrect = false;
            const userRythmMs = time - timeReference;
            for (let i = 0; i < rhythmTimesElapsed.length; i++) {
              if(userRythmMs >= rhythmTimesElapsed[i] - USER_PULSE_MARGIN && userRythmMs <= rhythmTimesElapsed[i] + USER_PULSE_MARGIN){
                isCorrect = true;
                const userAnswersTemp = [...userAnswers];
                userAnswersTemp[i] = true;
                setUserAnswers(userAnswersTemp);
                break;
              }
            }
            isCorrect?console.log("Correcto con: " + userRythmMs):console.log("Incorrecto con: " + userRythmMs);
          }
        }
      }
    }

    const handleStart = ()=>{
      generateRhythmPattern();
      setData({...data, isStart:true});
    }

    const handleBack = ()=>{
      setData({...data, isStart:false});
      setTimeReference(0);
    }

  return (
      <>
        {data.isStart?(
          <>
            <Header headerColor={"header-green"}/>
            <Ritmo data={data} generateRhythmPattern={generateRhythmPattern} rhythmSheetData={rhythmSheetData} 
                  handleBack={handleBack} handleOnKeydown={handleOnKeydown} timeReference={timeReference} 
                  circleBeatCSS={circleBeatCSS} setCircleBeatCSS={setCircleBeatCSS}
                  userAnswers={userAnswers} isDelaySynchronized={isDelaySynchronized} systemDelaysArray={systemDelaysArray}
                  averageDelay={averageDelay}/>
          </>
        ):(
          <RitmoConfiguration data={data} handleChange={handleChange} handleOnClick={handleOnClick} handleStart={handleStart}/>
        )
        }
      </>
  )
}
