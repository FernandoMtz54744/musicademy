import React, { useEffect, useState } from 'react'
import FFT from 'fft.js';

export default function NoteDetector() {

  const [noteFFT, setNoteFFT] = useState();

  function noteFromPitch( frequency ) {
    const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
    return noteStrings[(Math.round( noteNum ) + 69)%12];
  }

  function noteDetection(setNoteFFT){
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(mediaStream){ //Pide permiso de micrófono
        // Se vincula el nodo de entrada con el micrófono
        const audioContext = new AudioContext();
        const inputNode = audioContext.createMediaStreamSource(mediaStream);
  
        // Se configura el nodo de analisis y se vincula con nodo de entrada
        const analyserNode = audioContext.createAnalyser();
        analyserNode.minDecibels = -100;
        analyserNode.maxDecibels = -10;
        analyserNode.smoothingTimeConstant = 0.85;
        inputNode.connect(analyserNode);
  
        // Creando el buffer de datos
        const bufferLength = analyserNode.fftSize;
        const buffer = new Float32Array(bufferLength);
  
        setInterval(function(){
            analyserNode.getFloatTimeDomainData(buffer); //Se obtiene la señal en el dominio del tiempo (normalizado de -1 a 1)
            autocorrelation(buffer, audioContext.sampleRate, setNoteFFT); //Se realiza la autocorrelación con ambos métodos
        }, 100)
        }).catch(function(error) {
          console.log("Error al hacer autoccrelación: " + error);
        });
  }

  function autocorrelation(buffer, sampleRate, setNotaFFT) {
    // Obteniendo la RMS para saber si la amplitud eficaz es suficiente
    let SIZE = buffer.length;
    let sumOfSquares = 0;
    for (let i=0; i < SIZE; i++){
      let val = buffer[i];
      sumOfSquares += val * val;
    }
    let rms = Math.sqrt(sumOfSquares/SIZE)
    if (rms < 0.02) { //La señal no es suficiente para hacer análisis, es decir, no hay sonido
      setNotaFFT("Silencio");
      return;
    }
    const freqFFT = fftAutocorrelation(buffer, SIZE, sampleRate);
    setNotaFFT(noteFromPitch(freqFFT) + " : " + freqFFT);
  }

  // ******************** FFT AUTOCORRELATION *********************************
function fftAutocorrelation(buffer, SIZE, sampleRate) { //Autocorrelacion con el método FFT
  const start = performance.now();
  const f = new FFT(SIZE);
  const fftResult = f.createComplexArray();
  f.realTransform(fftResult, buffer); //Aplica FFT
  f.completeSpectrum(fftResult);

  for (let i = 0; i < fftResult.length; i += 2) { //Multiplica por su conjugado (Obtiene el espectro de potencia)
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
  var d = 0;
  while (c[d] > c[d+1]) {
    d++;
  }

  // Itera desde el valle hasta la mitad para encontrar el pico máximo (mitad porque es simétrica)
  var maxValue = -1;
  var maxIndex = -1;
  for (var i = d; i < SIZE/2; i++) {
    if (c[i] > maxValue) {
      maxValue = c[i];
      maxIndex = i;
    }
  }

  // Aplica interpolación para mayor precisión
  var T0 = maxIndex;
  var x1 = c[T0 - 1];
  var x2 = c[T0];
  var x3 = c[T0 + 1]

  var a = (x1 + x3 - 2 * x2) / 2;
  var b = (x3 - x1) / 2
  if (a) {
    T0 = T0 - b / (2 * a);
  }

  const end = performance.now();
  const executionTime = end-start;
  console.log("FFT Autocorrelation: " + executionTime + " ms");
  return sampleRate/T0;
}

useEffect(()=>{
  noteDetection(setNoteFFT);
}, [noteFFT]);

  return (
    <div>NoteDetector
      <div>{noteFFT}</div>
    </div>
  )
}
