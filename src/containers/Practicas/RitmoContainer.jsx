import React, { useEffect, useState } from 'react'
import RitmoConfiguration from '../../pages/Practicas/RitmoConfiguration';
import Ritmo from '../../pages/Practicas/Ritmo';
import Header from '../../pages/Header';
import * as Tone from "tone"

export default function RitmoContainer() {

    const valoresIniciales = {
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
      isStart: false
    }

    const [data, setData] = useState(valoresIniciales); //Datos del formulario
    const [ritmoSheet, setRitmoSheet] = useState([]); //Patron ritmico en formato para desplegar en partitura 
    const [ritmoTimes, setRitmoTimes] = useState([]); //Patron ritmico en formato tiempo en ms
    const [referenceTime, setReferenceTime] = useState(0);
    const [timeMetronome, setTimeMetronome] = useState(0);
    const tolerance = 0.1;


    useEffect(()=>{//Iniciar el metronomo al mostrar formulario ritmo
      Tone.Transport.cancel();
      Tone.Transport.bpm.value = data.tempo;
      const osc = new Tone.Oscillator().toDestination();
      Tone.Transport.scheduleRepeat((time) => {
        osc.start(time).stop(time + 0.1);
        setTimeMetronome(Tone.now());
      }, `4n`, 0);
      Tone.Transport.start(0);
    },[data.tempo, data.signaturaDenominador]);
    
    const handleChange = (e)=>{ //Datos del formulario
      setData({...data, [e.target.name]:e.target.value})
    }

    const handleOnClick = (e)=>{//Click en imagenes de figuras
      let buttonName="";
      if(e.target.tagName === "IMG"){
        buttonName = e.target.parentNode.name;
      }else{
        buttonName = e.target.name;
      }
      const isFiguraActived = !data.figuras[buttonName];
      setData({...data, figuras:{...data.figuras, [buttonName]: isFiguraActived}});
    }

    const llenaTiempos = ()=>{
      const tiempos = [];
      if(data.figuras.corchea){tiempos.push(0.125);}
      if(data.figuras.negra){tiempos.push(0.25);}
      if(data.figuras.blanca){tiempos.push(0.5);}
      if(data.figuras.redonda){tiempos.push(1);}
      return tiempos;
    }

    const sumaElementos = (array) => {
      return array.reduce((partialSum, x) => partialSum + x, 0);
    };

    const generarRitmo = (compas, ritmo, tiempos) => { //Backtracking recursivo para generar ritmos al azar
      const decisiones = [];
      while (decisiones.length < tiempos.length) {
        const figura = tiempos[Math.trunc(Math.random() * tiempos.length)];
        if (decisiones.indexOf(figura) === -1) {
          decisiones.push(figura);
          ritmo.push(figura);
          if (sumaElementos(ritmo) < compas) {
            const valido = generarRitmo(compas, ritmo, tiempos);
            if (valido) {
              return true;
            } else {
              ritmo.pop();
            }
          } else if (sumaElementos(ritmo) === compas) {
            return true;
          } else {//Si es mayor se pasa y no es válido
            ritmo.pop();
          }
        }
      }
      return false;
    }

    const generarPatronRitmico = ()=>{
      const tiempos = llenaTiempos();
      const compas = Number(data.signaturaNumerador)/Number(data.signaturaDenominador);
      const patronRitmico = [];
      const ritmoSheetTemp = [];
      for(let i=0; i < data.compases; i++){
        const subRitmo = [];
        const valido = generarRitmo(compas, subRitmo, tiempos);
        if(valido){
          patronRitmico.push(...subRitmo)
          ritmoSheetTemp.push(...subRitmo)
          ritmoSheetTemp.push(-1)
        }else{
          break;
        }
      }
      ritmoSheetTemp.pop();//Eliminar el ultimo -1
      setRitmoSheet(ritmoSheetTemp);
      calculaTiemposRitmo(patronRitmico);
    }

    const calculaTiemposRitmo = (patronRitmico)=>{
        const pulsoCorchea = 60/(data.tempo*2); //Tiempo en ms de una corchea
        const ritmoTimesAux = [];
        patronRitmico.reduce((partialSum, nota)=>{
          const noteDuration  = pulsoCorchea * (nota/0.125);
          const sum = partialSum + noteDuration;
          ritmoTimesAux.push(sum);
          return sum;
        }, 0);
        setRitmoTimes(ritmoTimesAux);
        console.log(ritmoTimesAux);
    }

    const keyPressed = (e)=>{
      const time = Tone.now();
      console.log("diff: " + (Tone.now()-timeMetronome));
      if (referenceTime === 0) {
        setReferenceTime(timeMetronome+.2);
      } else {
        let correcto = false;
        const userRythmMs = time - referenceTime;
        for (let i = 0; i < ritmoTimes.length; i++) {
          if(userRythmMs >= ritmoTimes[i] - tolerance && userRythmMs <= ritmoTimes[i] + tolerance){
            correcto = true;
            break;
          }
        }
        correcto ? console.log("Correcto") : console.log("Incorrecto");
        console.log(time - referenceTime);
      }
  }

    const handleStart = ()=>{
      generarPatronRitmico();
      setData({...data, isStart:true});
    }

    const handleBack = ()=>{
      setData({...data, isStart:false});
      setReferenceTime(0);
      Tone.Transport.cancel();
    }

  return (
      <>
        {data.isStart?(
          <>
            <Header headerColor={"header-green"}/>
            <Ritmo data={data} generarPatronRitmico={generarPatronRitmico} ritmoSheet={ritmoSheet} handleBack={handleBack} keyPressed={keyPressed} referenceTime={referenceTime}/>      
          </>
        ):(
          <RitmoConfiguration data={data} handleChange={handleChange} handleOnClick={handleOnClick} handleStart={handleStart}/>
        )
        }
         
      </>
     
  )
}
