import React, { useEffect, useRef, useState } from 'react'
import FFT from 'fft.js';
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function NoteDetector({chromaticScale, setFinalNote, virtualNote, instrumento}){

  const [noteFFT, setNoteFFT] = useState({nota: "Silencio", repeticiones: 0}) //Nota obtenida por el método FFT Autocorrelation
  const [noteProgressDetector, setNoteProgressDetector] = useState({}); //Mantiene el historial de notas para obtener la nota final
  const intervals = useRef([]); //Controla los ID's de los setInterval creados para ser detenidos
  const streams = useRef([]); //Controla los stream de audios creados para ser cerrados
  const numberOfRepetitions = 12; //Numero de detección de la misma nota para determinar que es la nota final
  const chromatic = useRef([]);
  const allowDetection = useRef(true); //Control para no detectar por notas hasta que vuelva estado a silencio

  //Obtiene la nota musical a partir de la frecuencia
  function noteFromPitch(frequency) {
    const noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
    return chromatic.current[(Math.round( noteNum ) + 69)%12];
  }

  useEffect(()=>{
    chromatic.current = chromaticScale;
  }, [chromaticScale]);

  useEffect(()=>{
    if(virtualNote){
      setFinalNote(noteFromPitch(virtualNote));
    }else{
      setFinalNote("");
    } 
  },[virtualNote])

  //Función para la detección de notas
  const noteDetection = ()=>{
      if(instrumento === "virtual")
        return
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function(mediaStream){  //Pide permiso de micrófono
      // Se vincula el nodo de entrada con el micrófono
      const audioContext = new AudioContext();
      const inputNode = audioContext.createMediaStreamSource(mediaStream);
      streams.current.push(mediaStream);
      // Se configura el nodo de analisis y se vincula con nodo de entrada
      const analyserNode = audioContext.createAnalyser();
      analyserNode.minDecibels = -100;
      analyserNode.maxDecibels = -10;
      analyserNode.smoothingTimeConstant = 0.85;
      inputNode.connect(analyserNode);
      // Creando el buffer de datos
      const bufferLength = analyserNode.fftSize;
      const buffer = new Float32Array(bufferLength);
      //Se crean los eventos para obtener muestras de audio
      const idInterval = setInterval(()=>{
        analyserNode.getFloatTimeDomainData(buffer); //Se obtiene la señal en el dominio del tiempo (normalizado de -1 a 1)
        autocorrelation(buffer, audioContext.sampleRate); //Se realiza la autocorrelación
      }, 50);
      //Se crean los intervalos para obtener las muestras de audio
      intervals.current.push(idInterval);
      console.log(`Se creó interval (${idInterval})`);
      }).catch(function(error) {
        console.log("Error al detectar la nota: " + error);
      });
  }

  //Función para llevar a cabo la autocorrelación
  const autocorrelation  = (buffer, sampleRate)=>{
    // Obteniendo la RMS para saber si la amplitud eficaz es suficiente
    let SIZE = buffer.length;
    let sumOfSquares = 0;
    for (let i=0; i < SIZE; i++){
      let val = buffer[i];
      sumOfSquares += val * val;
    }
    let rms = Math.sqrt(sumOfSquares/SIZE)
    if (rms < 0.02) { //La señal no es suficiente para hacer análisis, es decir, no hay sonido
      setNoteFFT({nota: "Silencio", frecuencia: 0});
      allowDetection.current = true; //Hasta que pase por silencio es cuando se permite detectar nuevamente la nota
      setFinalNote("");
      return;
    }
    //LLeva a cabo la autocorrelación por FFT
    const freqFFT = fftAutocorrelation(buffer, SIZE, sampleRate);
    setNoteFFT({nota: noteFromPitch(freqFFT),  frecuencia: freqFFT});
  }

// Autocorrelación con el método FFT
function fftAutocorrelation(buffer, SIZE, sampleRate) { //Autocorrelacion con el método FFT
  const start = performance.now();
  const f = new FFT(SIZE);
  const fftResult = f.createComplexArray();
  f.realTransform(fftResult, buffer); //Aplica FFT
  f.completeSpectrum(fftResult);
  //Multiplica por su conjugado (Obtiene el espectro de potencia)
  for (let i = 0; i < fftResult.length; i += 2) { 
    const real = fftResult[i];
    const imag = fftResult[i + 1];
    fftResult[i] = real * real + imag * imag;
    fftResult[i + 1] = 0;
  }

  let ifftResult = f.createComplexArray();
  f.inverseTransform(ifftResult, fftResult); //Obtiene su inversa
  let c = new Array(f.size);
  f.fromComplexArray(ifftResult, c); //Filtra solo la parte Real (la imaginaria es 0)
  
   // Buscando el último indice donde el valor es mayor al siguiente (el valle)
  let d = 0;
  while (c[d] > c[d+1]) {
    d++;
  }

  // Itera desde el valle hasta la mitad para encontrar el pico máximo (mitad porque es simétrica)
  let maxValue = -1;
  let maxIndex = -1;
  for (let i = d; i < SIZE/2; i++) {
    if (c[i] > maxValue) {
      maxValue = c[i];
      maxIndex = i;
    }
  }

  // Aplica interpolación para mayor precisión
  let T0 = maxIndex;
  let x1 = c[T0-1];
  let x2 = c[T0];
  let x3 = c[T0+1]

  let a = (x1+x3-2*x2)/2;
  let b = (x3-x1)/2
  if (a){
    T0 = T0-b/(2 * a);
  }

  const end = performance.now();
  const executionTime = end-start;
  console.log("FFT Autocorrelation: " + executionTime + " ms");
  return sampleRate/T0;
}

//Se mantiene el control de historial de notas para obtener el veredicto final de la nota tocada
useEffect(()=>{
  if((noteProgressDetector.note === noteFFT.nota)){
    setNoteProgressDetector(noteProgress => ({...noteProgress, repeticiones: noteProgress.repeticiones+1}))
  }else{
    setNoteProgressDetector({note: noteFFT.nota, repeticiones: 0})
    // setFinalNote("");
  }
}, [noteFFT.frecuencia, noteFFT.nota, noteProgressDetector.note]);

//Se obtiene la nota tocada
useEffect(()=>{
  if(noteProgressDetector.repeticiones > numberOfRepetitions && allowDetection.current){
    setFinalNote(noteProgressDetector.note);
    allowDetection.current = false;
  }
}, [noteProgressDetector]);

//Cada que se monta el componente empieza la detección de notas
useEffect(()=>{
  noteDetection();
  return () => {
      intervals.current.forEach(idInterval=>{
        clearInterval(idInterval);
        console.log(`ClearInterval(${idInterval})`);
      })
      streams.current.forEach(stream=>{
        stream.getTracks().forEach((track) => track.stop() )
      })
  }
},[]);

  return (
    instrumento === "real" &&
    <div className='noteDetector-container'>
        {/* <div>Rep: {noteProgressDetector.repeticiones}</div> */}
        <CircularProgressbar value={noteProgressDetector.repeticiones} text={`${noteProgressDetector.note}`} 
        maxValue={numberOfRepetitions}
        styles={buildStyles({
          textColor: "#42006A",
          pathColor: "#42006A",
          pathTransitionDuration: 0.2,
          })}
        />
    </div>
  )
}
