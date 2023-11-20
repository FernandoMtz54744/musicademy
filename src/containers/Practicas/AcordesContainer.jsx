import React, { useEffect, useState } from 'react'
import AcordesConfiguration from '../../pages/Practicas/AcordesConfiguration';
import {getTrueKeys, getRandomNumber, getRandomKey, getChord} from "../../utils"
import Acorde from '../../pages/Practicas/Acorde';
import Header from '../../pages/Header';
import NoteDetector from '../../pages/Practicas/NoteDetector';

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
    const [chord, setChord] = useState({type: "", tonic: "", name: "", notes: [], chromatic: []}); //Contiene el acorde a tocar
    const [finalNote, setFinalNote] = useState(); //Resultado de la nota tocada
    const [result, setResult] = useState({notesPlayed: [], isPlayingNote: true});

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

    //Maneja el evento de regresar a la configuración
    const handleBack = ()=>{
        setData({...data, isStart:false})
    }

    //Genera el acorde de acuerdo a la configuración ingresada
    const generateChord = ()=>{
        const posibleChordType = getTrueKeys(data.acordes);
        const chordType = posibleChordType[getRandomNumber(posibleChordType.length)];
        const tonic = getRandomKey(chordType);
        const chord = getChord(tonic, chordType);
        setChord(chord);
        setResult({notesPlayed:[], isPlayingNote: true})
    }

    //Valida si la nota tocada es parte del acorde
    useEffect(()=>{
        const resultTemp = {...result}; //Se crea una copia del state result
        if(!resultTemp.notesPlayed.includes(finalNote)){
            resultTemp.notesPlayed.push(finalNote);
        }

        const correctPlayed = resultTemp.notesPlayed.filter(note => chord.notes.includes(note));
        if(correctPlayed.length === chord.notes.length){ //Ya se tocaron todas las correctas
            resultTemp.isPlayingNote = false;
        }
        
        setResult(resultTemp);
    }, [finalNote]);

  return (

        data.isStart?(
            <>
                <Header headerColor={"header-green"}/>
                <Acorde chord={chord} generateChord={generateChord} handleBack={handleBack} result={result}/>
                {result.isPlayingNote?(
                    <NoteDetector setFinalNote={setFinalNote} chromaticScale={chord.chromatic}/>
                ):(
                    <center>
                        <h1>Has respondido bien las notas</h1>
                    </center>
                )}
            </>
        ):(
            <AcordesConfiguration data={data} handleChange={handleChange} handleChecked={handleChecked} handleStart={handleStart}/>
        )
  )
}
