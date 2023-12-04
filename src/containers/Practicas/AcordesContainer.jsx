import React, { useEffect, useState } from 'react'
import AcordesConfiguration from '../../pages/Practicas/AcordesConfiguration';
import {getTrueKeys, getRandomNumber, getRandomKey, getChord} from "../../utils"
import Acorde from '../../pages/Practicas/Acorde';
import Header from '../../pages/Header';
import NoteDetector from '../../pages/Practicas/NoteDetector';
import FinishPage from '../../pages/FinishPage';
import InstrumentoVirtual from '../../pages/InstrumentoVirtual';

export default function AcordesContainer() {
    const initialData = {
        acordes:{
            mayor: true,
            menor: false,
            aumentado: false,
            disminuido: false,
            septima: false,
            maj7: false,
            m7: false
        },
        modo: "nombre",
        instrumento: "real",
        isStart: false, 

    }

    const [data, setData] = useState(initialData); //Contiene los datos de la configuración de la práctica
    const [chord, setChord] = useState({type: "", tonic: "", name: "", notes: [], chromatic: []}); //Contiene el acorde a tocar
    const [finalNote, setFinalNote] = useState(); //Resultado de la nota tocada
    const [result, setResult] = useState({notesPlayed: [], isPlayingNote: true}); //Resultado de las notas tocadas
    const [excerciseControl, setExcerciseControl] = useState([]) //Controla el numero de ejercicios 
    const TOTAL_OF_EXCERCISES = 10;
    const PERMITED_ERRORS = 3;

    //Valida que tipo de acordes se han seleccionado (checkbox)
    const handleChecked = (e)=>{
        console.log(e.target.name);
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
        setData({...data, isStart:false});
        setExcerciseControl([]);
        setResult({notesPlayed: [], isPlayingNote: true});
    }

    //Genera el acorde de acuerdo a la configuración ingresada
    const generateChord = ()=>{
        const posibleChordType = getTrueKeys(data.acordes);
        const chordType = posibleChordType[getRandomNumber(posibleChordType.length)];
        const tonic = getRandomKey(chordType);
        const chord = getChord(tonic, chordType);
        setChord(chord);
        setResult({notesPlayed:[], isPlayingNote: true})
        setExcerciseControl([...excerciseControl, {number: excerciseControl.length+1, wasCorrect: false, totalNotesCorrect: 0, totalNotesWrong: 0}])
    }

    //Valida si la nota tocada es parte del acorde
    useEffect(()=>{
        if(finalNote === ""){
            return
        }
        const resultTemp = {...result}; //Se crea una copia del state result
        const excerciseControlTemp = [...excerciseControl]; //Se copia el state excerciseNumber

        if(!resultTemp.notesPlayed.includes(finalNote)){
            resultTemp.notesPlayed.push(finalNote);
        }

        const correctPlayed = resultTemp.notesPlayed.filter(note => chord.notes.includes(note));
        if(correctPlayed.length === chord.notes.length && chord.notes.length!==0){ //Ya se tocaron todas las correctas
            resultTemp.isPlayingNote = false;
            excerciseControlTemp[excerciseControlTemp.length-1].wasCorrect = true;
            excerciseControlTemp[excerciseControlTemp.length-1].totalNotesCorrect = correctPlayed.length;
            excerciseControlTemp[excerciseControlTemp.length-1].totalNotesWrong = resultTemp.notesPlayed.length-correctPlayed.length;
        }

        const wrongPlayed = resultTemp.notesPlayed.filter(note => !chord.notes.includes(note));
        if(wrongPlayed.length === PERMITED_ERRORS){ //Ya se equivocó 3 veces
            resultTemp.isPlayingNote = false;
            excerciseControlTemp[excerciseControlTemp.length-1].wasCorrect = false;
            excerciseControlTemp[excerciseControlTemp.length-1].totalNotesWrong = wrongPlayed.length;
            excerciseControlTemp[excerciseControlTemp.length-1].totalNotesCorrect = resultTemp.notesPlayed.length-wrongPlayed.length;
        }
        if(excerciseControlTemp.length === TOTAL_OF_EXCERCISES){
            //Código para guardar la estadística (los datos los tiene excerciseControlTemp)
        }
        setResult(resultTemp);
        setExcerciseControl(excerciseControlTemp);
        
    }, [finalNote]);

  return (

        data.isStart?(
            <>
                <Header headerColor={"header-green"}/>
                {excerciseControl.length<=TOTAL_OF_EXCERCISES?(
                    <>
                        <div className='excercise-counter-container'>
                            <h4>Ejercicio {excerciseControl.length} de 10</h4>
                        </div>
                        <Acorde chord={chord} generateChord={generateChord} handleBack={handleBack} result={result}/>
                        {result.isPlayingNote?(
                            <>
                                <NoteDetector setFinalNote={setFinalNote} chromaticScale={chord.chromatic}/>
                                {data.instrumento === "virtual" && (
                                <InstrumentoVirtual/>
                            )}
                            </>
                        ):(
                            <center>
                                {excerciseControl[excerciseControl.length-1].wasCorrect?(
                                    <h1>Has respondido bien las notas</h1>
                                ):(
                                    <h1>Te equivocaste demasiadas veces</h1>
                                )}
                            </center>
                        )}
                    </>
                ):(
                    <FinishPage handleBack={handleBack}>
                            <h3>{excerciseControl.filter(excercise => excercise.wasCorrect).length} acordes de {TOTAL_OF_EXCERCISES} tocados correctamente</h3>
                            <h3>{excerciseControl.reduce((cantidad, current) => cantidad+current.totalNotesCorrect, 0)} notas tocadas correctamente</h3>
                            <h3>{excerciseControl.reduce((cantidad, current) => cantidad+current.totalNotesWrong, 0)} notas tocadas incorrectamente</h3>
                    </FinishPage>
                )}
                
            </>

        ):(
            <AcordesConfiguration data={data} handleChange={handleChange} handleChecked={handleChecked} handleStart={handleStart}/>
        )
  )
}
