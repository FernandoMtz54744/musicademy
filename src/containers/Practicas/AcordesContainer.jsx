import React, { useState } from 'react'
import AcordesConfiguration from '../../pages/Practicas/AcordesConfiguration';
import {getTrueKeys, getRandomNumber, getRandomKey, getChord} from "../../utils"
import Acorde from '../../pages/Practicas/Acorde';

export default function AcordesContainer() {
    const initialData = {
        acordes:{
            mayor: false,
            menor: false,
            aumentado: false,
            disminuido: false,
            septima: false,
            maj7: false,
            m7: false
        },
        modo: "nombre",
        instrumento: "real",
        isStart: false
    }

    const [data, setData] = useState(initialData); //Contiene los datos de la configuración de la práctica
    const [chord, setChord] = useState({}); //Contiene el acorde a tocar

    //Valida que tipo de acordes se han seleccionado (checkbox)
    const handleChecked = (e)=>{
        const toggle = !data.acordes[e.target.name];  
        setData({...data, acordes:{...data.acordes, [e.target.name]:toggle}})
    }

    //Maneja el cambio de los inputs
    const handleChange = (e)=>{
        setData({...data, [e.target.name]:e.target.value})
    }

    //Maneja el evento de click en el botón iniciar
    const handleStart = ()=>{
        setData({...data, isStart:true})
        generateChord();
    }

    const handleBack = ()=>{
        setData({...data, isStart:false})
    }

    const generateChord = ()=>{
        const posibleChordType = getTrueKeys(data.acordes);
        const chordType = posibleChordType[getRandomNumber(posibleChordType.length)];
        const tonic = getRandomKey(chordType);
        const chord = getChord(tonic, chordType);
        setChord(chord);
    }

  return (
    
        data.isStart?(
            <Acorde chord={chord} generateChord={generateChord} handleBack={handleBack}/>
        ):(
            <AcordesConfiguration data={data} handleChange={handleChange} handleChecked={handleChecked} handleStart={handleStart}/>
        )
  )
}
