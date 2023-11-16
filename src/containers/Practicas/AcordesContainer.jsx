import React, { useState } from 'react'
import AcordesConfiguration from '../../pages/Practicas/AcordesConfiguration';
import {getTrueKeys, getRandomNumber, getRandomKey, getChromaticScale, getNotesOfChord, getNameOfChord, getChord} from "../../utils"
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

    const [data, setData] = useState(initialData);
    const [chord, setChord] = useState({});

    const handleChecked = (e)=>{
        const toggle = !data.acordes[e.target.name];  
        setData({...data, acordes:{...data.acordes, [e.target.name]:toggle}})
    }

    const handleChange = (e)=>{
        setData({...data, [e.target.name]:e.target.value})
        console.log(data);
    }

    const handleStart = ()=>{
        setData({...data, isStart:true})
        generateChord();
    }

    const generateChord = ()=>{
        const chordTypesOptions = getTrueKeys(data.acordes);
        const chordType = chordTypesOptions[getRandomNumber(chordTypesOptions.length)];
        const fundamentalNote = getRandomKey(chordType);
        const chord = getChord(fundamentalNote, chordType);
        setChord(chord);
    }

  return (
    
        data.isStart?(
            <Acorde chord={chord} generateChord={generateChord}/>
        ):(
            <AcordesConfiguration data={data} handleChange={handleChange} handleChecked={handleChecked} handleStart={handleStart}/>
        )
  )
}
