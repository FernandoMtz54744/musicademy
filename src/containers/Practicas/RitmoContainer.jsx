import React, { useEffect, useRef, useState } from 'react'
import RitmoConfiguration from '../../pages/Practicas/RitmoConfiguration';
import Ritmo from '../../pages/Practicas/Ritmo';
import Header from '../../pages/Header';
import * as Tone from "tone"
import { getTrueKeys } from '../../utils';

export default function RitmoContainer() {

    const initialData = {
      tempo:60, 
      compases:4,
      figuras:{ redonda:false, blanca: false, negra: true, corchea: false},
      signaturaNumerador: 4,
      signaturaDenominador: 4,
      isStart: false,
      subdivision: "4"
    }
    
    const USER_PULSE_MARGIN = 0.150; //Margen en segundos de que el usuario se puede equivocar al presionar el ritmo
    const [data, setData] = useState(initialData); //Datos del formulario
    const [circleBeatCSS, setCircleBeatCSS] = useState("") //Indica el CSS del circulo para indicar el golpe del metronomo
    const metronomeBeatTime = useRef(); //Tiempo en el que el metronomo da el golpe
    const timeReference = useRef(0); //Tiempo de referencia desde donde se empieza a contar la duracion del patrón ritmico
    const [excerciseControl, setExcerciseControl] = useState([]) //Controla el numero de ejercicios
    const [rhythm, setRhythm] = useState([{tipo: "", figura:0, segundo:0, tocado:"", punto: true}]); //Maneja todo el ritmo del ejercicio
    const [isPlaying, setIsPlaying] = useState(true);
    const [fails, setFails] = useState(0);
    const NUMBER_OF_EXCERCISES = 10;

    //Iniciar el metronomo al mostrar formulario y al cambiar datos [tempo, signatura y subdivisión]
    useEffect(()=>{
      Tone.Transport.cancel();
      const osc = new Tone.Oscillator().toDestination();
      const osc2 = new Tone.Oscillator(300, "sine").toDestination();
      osc2.volume.value = -12;
      Tone.Transport.bpm.value = data.tempo;
      const ticksForCompass = 768/Number(data.signaturaDenominador) * data.signaturaNumerador; //Un compas mide 768 ticks

      Tone.Transport.scheduleRepeat((time)=>{
        if(Tone.Transport.getTicksAtTime(time) % ticksForCompass === 0){
          osc.start(time).stop(time + 0.1);
          setCircleBeatCSS("main-beat");
        }else{
          setCircleBeatCSS("secondary-beat")
          osc2.start(time).stop(time + 0.1);
        }
        metronomeBeatTime.current = Tone.immediate();
        if(timeReference.current !== 0){
          if(isPlaying){
            const timeTemp = time - timeReference.current;
            const rhythmTemp = [...rhythm];
            for(let i=0; i<rhythmTemp.length; i++){
              if(rhythmTemp[i].tipo === "nota"){
                if(rhythmTemp[i].segundo < timeTemp && rhythmTemp[i].tocado === ""){
                  rhythmTemp[i].punto = true;
                }
                if(rhythmTemp[i].segundo > timeTemp){
                  break;
                }
              }
              if(i+1 === rhythm.length){//Ya llegó al final
                setTimeout(()=>{
                  setIsPlaying(false);
                  let extraWrongCount = 0;
                  for(let i=0; i<rhythmTemp.length; i++){
                    if(rhythmTemp[i].tipo === "nota" && rhythmTemp[i].tocado ===""){
                      rhythmTemp[i].tocado = "incorrecto";
                      extraWrongCount++;
                    }
                }
                setFails(fails => fails+extraWrongCount);
                },USER_PULSE_MARGIN*1000)
              }
            }
            setRhythm(rhythmTemp)
          }
        }
      },`${data.subdivision}n`, 0);
      
      Tone.Transport.start();
      return ()=>{
        Tone.Transport.cancel();
      }
    },[data.tempo, data.signaturaDenominador, data.signaturaNumerador, data.subdivision, rhythm[0]]); 
    
    //Maneja el cambio de datos del formulario
    const handleChange = (e)=>{
      setData({...data, [e.target.name]:e.target.value})
    }

    useEffect(()=>{
      if(!isPlaying){
        const excerciseControlTemp = [...excerciseControl];
        const index = excerciseControlTemp.length - 1;
        excerciseControlTemp[index].totalNotesCorrect = rhythm.filter(r => r.tocado === "correcto").length;
        excerciseControlTemp[index].totalNotesWrong = fails;
        console.log(excerciseControlTemp[index].totalNotesCorrect + "===" + rhythm.filter(r => r.tipo === "nota").length)
        if(excerciseControlTemp[index].totalNotesCorrect === rhythm.filter(r => r.tipo === "nota").length){//Tuvo todas correctas
          excerciseControlTemp[index].wasCorrect = true;
        }else{
          excerciseControlTemp[index].wasCorrect = false;
        }
        console.log(excerciseControlTemp);
        setExcerciseControl(excerciseControlTemp);

        if(excerciseControlTemp.length === NUMBER_OF_EXCERCISES){//Guardar en BD

        }
      }
    }, [isPlaying]);

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
    const calculateRhythmTimesElapsed = (rhythm)=>{
      const corcheaPulse = 60/(data.tempo*2); //Tiempo en ms de una corchea
      rhythm.reduce((partialSum, nota)=>{
        if(nota.tipo === "nota"){
          nota.segundo = partialSum;
          const noteDuration  = corcheaPulse * (nota.figura/0.125);
          const sum = partialSum + noteDuration;
          return sum;
        }else{
          return partialSum;
        }
      }, 0);
    }

    //Funcion que genera todo el patrón ritmico completo (todos los compases)
    const generateRhythmPattern = ()=>{
      //Obtiene las figuras activadas por el usuario
      const figuras = getTrueKeys(data.figuras).map((figura) =>
        Number(figura.replace("corchea", "0.125").replace("negra", "0.25").replace("blanca", "0.5").replace("redonda", "1"))
      )
      //Obtiene el compás
      const compass = Number(data.signaturaNumerador)/Number(data.signaturaDenominador);
      const numericRhythm = []; //Maneja los patrones ritmicos ex. [0.5, 0.125, 0.125, -1, 0.5, 0.5] (-1 indica una barra de compás)
      for(let i=0; i < data.compases; i++){
        const rhythmByCompass = [];
        const valid = generateRhythm(compass, rhythmByCompass, figuras);
        if(valid){
          numericRhythm.push(...rhythmByCompass)
          numericRhythm.push(-1)
        }else{//No hay se puede generar un patrón ritmico con los parámetros del usuario
          break;
        }
      }
      numericRhythm.pop();//Eliminar el ultimo -1
      const rhythmTemp = numericRhythm.map((rhythm)=>{
        if(rhythm !==-1){
          return {tipo: "nota", figura: rhythm, segundo:0, tocado:"", punto: false}
        }else{
          return {tipo: "barra"}
        }
      });

      calculateRhythmTimesElapsed(rhythmTemp); //Le asigna a cada nota su valor en segundos en el que debe ser pulsado
      setRhythm(rhythmTemp)
      timeReference.current = 0;
      setIsPlaying(true);
      setExcerciseControl([...excerciseControl, {number: excerciseControl.length+1, wasCorrect: false, totalNotesCorrect: 0, totalNotesWrong: 0}])
      setFails(0);
    }

    const handleOnKeydown = (e)=>{
      const time = Tone.immediate();
      const rhythmTemp = [...rhythm];
        if(e.keyCode === 32 && isPlaying){
          if (timeReference.current === 0) {
            const realTimeReference = metronomeBeatTime.current;
            // setTimeReference(realTimeReference);
            timeReference.current = realTimeReference;
            if(time-realTimeReference < USER_PULSE_MARGIN){
              rhythmTemp[0].tocado = "correcto";
              rhythmTemp[0].punto = true;
              console.log("Correcto con: " + (time-realTimeReference));
            }else{
              rhythmTemp[0].tocado = "incorrecto";
              rhythmTemp[0].punto = true;
              console.log("Incorrecto con: " + (time-realTimeReference));
              setFails(fails => fails + 1);
            }
          }else{
            let isCorrect = false;
            let failsTemp = fails; 
            let didntChangeIncorrect = true;
            const userRythmMs = time - timeReference.current;
            for (let i = 0; i < rhythm.length; i++){
              if(rhythmTemp[i].tipo === "nota"){
                if(userRythmMs >= rhythmTemp[i].segundo - USER_PULSE_MARGIN && userRythmMs <= rhythmTemp[i].segundo + USER_PULSE_MARGIN){
                  isCorrect = true;
                  rhythmTemp[i].tocado = "correcto";
                  rhythmTemp[i].punto = true;
                  break;
                }else{
                  if(rhythmTemp[i].tocado === "" && rhythmTemp[i].segundo < userRythmMs){ //Ya paso esta nota y es incorrecta
                    rhythmTemp[i].tocado = "incorrecto";
                    rhythmTemp[i].punto = true;
                    failsTemp++;
                    didntChangeIncorrect = false
                  }
                }
              }
            }
            if(!isCorrect && didntChangeIncorrect){
              failsTemp++;
            }
            setFails(failsTemp);
            isCorrect?console.log("Correcto con: " + userRythmMs):console.log("Incorrecto con: " + userRythmMs);
          }
          setRhythm(rhythmTemp)
        }
    }

    const handleStart = ()=>{
      generateRhythmPattern();
      setData({...data, isStart:true});
    }

    const handleBack = ()=>{
      setData({...data, isStart:false});
      timeReference.current = 0;
      setFails(0);
      setExcerciseControl([])
    }

    //Cada que se da un golpe se ejecuta esta funcion
    useEffect(()=>{
      setTimeout(()=>{
        setCircleBeatCSS("");
      }, 80);
    }, [circleBeatCSS, setCircleBeatCSS]);

      //Actualiza los datos de handleOnKeydown cambia el tiempo de referencia
  useEffect(()=>{
    document.addEventListener("keydown",  handleOnKeydown);
    return ()=>document.removeEventListener("keydown", handleOnKeydown)
  }, [handleOnKeydown])


  return (
      <>
        {data.isStart?(
          <>
            <Header headerColor={"header-green"}/>
            <Ritmo data={data} generateRhythmPattern={generateRhythmPattern}
                  handleBack={handleBack} handleOnKeydown={handleOnKeydown} 
                  circleBeatCSS={circleBeatCSS} setCircleBeatCSS={setCircleBeatCSS}
                  rhythm={rhythm} fails={fails} excerciseControl={excerciseControl}
                  NUMBER_OF_EXCERCISES= {NUMBER_OF_EXCERCISES} isPlaying={isPlaying}/>
          </>
        ):(
          <RitmoConfiguration data={data} handleChange={handleChange} handleOnClick={handleOnClick} handleStart={handleStart}/>
        )
        }
      </>
  )
}
