import React, { useEffect, useRef, useState } from 'react'
import SolfeoConfiguration from '../../pages/Practicas/SolfeoConfiguration'
import SolfeoSheet from '../../pages/Practicas/SolfeoSheet';
import Header from '../../pages/Header';
import NoteDetector from '../../pages/Practicas/NoteDetector';
import 'react-circular-progressbar/dist/styles.css';
import FinishPage from '../../pages/FinishPage';
import { getTrueKeys, getRandomNumber, getRandomNoteByScale, getRandomNoteByAlteration} from '../../utils';

export default function SolfeoContainer() {

    //Datos iniciales de la configuración de solfeo
    const initialData = {
        claves: {
            sol: true,
            fa: true
        },
        alteraciones: {
            sostenidos: true,
            bemoles: true,
            naturales: true
        },
        escalas:{
            C: false,
            G: false,
            D: false,
            A: false,
            E: false,
            B: false,
            Fsharp: false,
            Db: false,
            Ab: false,
            Eb: false,
            Bb: false,
            F: false    
        }, 
        tiempo: 10,
        isStart: false,
        modo: "alteraciones"
    }

    const [data, setData] = useState(initialData); //Datos del formulario
    const [excercise, setExercise] = useState({clef: "", tonic: "", solfeoNotes: []}); //Maneja el ejercicio actual
    const [finalNote, setFinalNote] = useState(); //Resultado de la nota tocada
    const [excerciseControl, setExcerciseControl] = useState([]) //Controla el numero de ejercicios 
    const [result, setResult] = useState({isPlayingNote: true, notesPlayed: []}); //Maneja el resultado de las notas tocadas (por ejercicio)
    const allowNoteDetection = useRef(true); //Para que detecte una nota debe pasar por el estado "", así se evita el error de seguir detectando la misma varias veces porque sigue sonando
    const NUMBER_OF_NOTES = 7;
    const TOTAL_OF_EXCERCISES = 10;

    //Maneja el cambio de los inputs
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

        if(buttonName === "sol" || buttonName === "fa"){
            const toggleData = !data.claves[buttonName];
            setData({...data, claves:{...data.claves, [buttonName]: toggleData}});
        }else if(buttonName === "sostenidos" || buttonName === "bemoles"){
            const toggleData = !data.alteraciones[buttonName];
            setData({...data, alteraciones:{...data.alteraciones, [buttonName]: toggleData}});
        }else if(buttonName === "start"){
            setData({...data, isStart:true})
            generateExcercise();
        }else{
            console.log("Escalas : " + buttonName);
            const toggleData = !data.escalas[buttonName];
            setData({...data, escalas:{...data.escalas, [buttonName]: toggleData}});
        }
    }

    //Maneja el regreso a la configuración
    const handleBack = ()=>{
        setData({...data, isStart:false});
        setExcerciseControl([]);
        setResult({isPlayingNote: false, notesPlayed: []});
    }

    //Devuelve solo un ejercico correspondiente al solfeo (cada ejercicio tiene varias notas para solfear)
    const generateExcercise = ()=>{
        const excerciseTemp = {
            clef: "", //Clave [sol, fa]
            tonic: "", //Armadura
            solfeoNotes: [] //Conjunto de notas para solfear
        }
        //Se obtiene la clave al azar
        const posibleClef = getTrueKeys(data.claves);
        excerciseTemp.clef = posibleClef[getRandomNumber(posibleClef.length)].replace("sol", "treble").replace("fa", "bass"); //Se obtiene la clave

        if(data.modo === "escalas"){
            const posibleTonic = getTrueKeys(data.escalas);//Las posibles escalas para escoger
            excerciseTemp.tonic = posibleTonic[getRandomNumber(posibleTonic.length)].replace("Fsharp", "F#") //Se escoge la tonica al azar
            for(let i=0; i<NUMBER_OF_NOTES; i++){ //Se obtienen las notas que serán del ejercicio
                const nota = getRandomNoteByScale(excerciseTemp.tonic);
                excerciseTemp.solfeoNotes.push({note: nota.note, chromatic: nota.chromatic});
            }
        }else{//Modo alteraciones
            excerciseTemp.tonic = "C"; //Escala de Do mayor
            const posibleAlterations = getTrueKeys(data.alteraciones); //Se obtiene las alteraciones activadas por el usuario (sostenidos, bemoles, naturales)
            let alteration = posibleAlterations[getRandomNumber(posibleAlterations.length)];//Obtiene una alteración al azar (sostenidos, bemoles, naturales)
            alteration = alteration.replace("sostenidos", "#").replace("bemoles", "b").replace("naturales", "N");
            const randomAlteration = ["N", alteration];
            for(let i=0; i<NUMBER_OF_NOTES; i++){
                alteration = randomAlteration[getRandomNumber(randomAlteration.length)]; //Se escogen notas al azar entre naturales y una alteración seleccionada al azar de las activadas por el usuario
                const nota = getRandomNoteByAlteration(alteration);
                excerciseTemp.solfeoNotes.push({note: nota.note, chromatic: nota.chromatic});
            }
        }

        setExercise(excerciseTemp)
        setExcerciseControl([...excerciseControl, {number: excerciseControl.length+1, wasCorrect: false, totalNotesCorrect: 0, totalNotesWrong: 0}])
        setResult({isPlayingNote: true, notesPlayed: []})
    }
    

    const getNotesFromSolfeoNotes = (solfeoNotes)=>{
        return solfeoNotes.map((solfeoNote)=> solfeoNote.note);
    }

    useEffect(()=>{
        if(finalNote === ""){
            allowNoteDetection.current = true; //Ya pasó por la nota vacía
            return
        }
        if(excercise.solfeoNotes.length !==0 && allowNoteDetection){
            const resultTemp = {...result};
            if(finalNote === excercise.solfeoNotes[result.notesPlayed.length].note){ //Tocó la nota correcta
                resultTemp.notesPlayed.push({
                    note: finalNote,
                    isCorrect: true, 
                })
                setResult(resultTemp)
            }else{ //Se equivocó
                resultTemp.notesPlayed.push({
                    note: finalNote,
                    isCorrect: false,
                    correctNote: excercise.solfeoNotes[result.notesPlayed.length].note
                })
            }

            if(resultTemp.notesPlayed.length === NUMBER_OF_NOTES){//Ya toco todas las notas del ejercicio
                resultTemp.isPlayingNote = false;
                const correctNotes = resultTemp.notesPlayed.filter((notePlayed)=>notePlayed.isCorrect);
                const wrongNotes = resultTemp.notesPlayed.filter((notePlayed)=>!notePlayed.isCorrect);
                const excerciseControlTemp = [...excerciseControl];
                excerciseControlTemp[excerciseControl.length-1].totalNotesCorrect = correctNotes.length;
                excerciseControlTemp[excerciseControl.length-1].totalNotesWrong = wrongNotes.length;

                if(correctNotes.length === NUMBER_OF_NOTES){//Tuvo todas las notas correctas
                    excerciseControlTemp[excerciseControl.length-1].wasCorrect = true;
                }

                if(excerciseControlTemp.length === TOTAL_OF_EXCERCISES){
                    //Código para guardar la estadística (los datos los tiene excerciseControlTemp)
                }

                setExcerciseControl(excerciseControlTemp);
            }
            setResult(resultTemp);
            allowNoteDetection.current = false;

            
        }

    }, [finalNote]);
    
  return (
    data.isStart?(
        <>
            <Header headerColor={"header-green"}/>
            {excerciseControl.length <= TOTAL_OF_EXCERCISES?(
                <>
                    <div className='excercise-counter-container'>
                        <h4>Ejercicio {excerciseControl.length} de 10</h4>
                    </div>
                    <SolfeoSheet notes={getNotesFromSolfeoNotes(excercise.solfeoNotes)} clef={excercise.clef} 
                    tonic={excercise.tonic} generateExcercise={generateExcercise} handleBack={handleBack}
                    notesPlayed = {result.notesPlayed}></SolfeoSheet>
                    {result.isPlayingNote?(
                        <NoteDetector setFinalNote={setFinalNote} chromaticScale={excercise.solfeoNotes[result.notesPlayed.length].chromatic}/>
                        ):(
                        <center>
                            {excerciseControl[excerciseControl.length-1].wasCorrect?(
                                <h1>Respondiste bien todas las notas</h1>
                            ):(
                                <div>
                                    <h1>Te equivocaste en {excerciseControl[excerciseControl.length-1].totalNotesWrong  } notas</h1>    
                                    {result.notesPlayed.filter(notePlayed => !notePlayed.isCorrect).map(note => (
                                        <p>Tocaste {note.note} y era {note.correctNote}</p>
                                    ))}
                                </div>
                            )}
                        </center>
                    )}
                </>
            ):(
                <FinishPage handleBack={handleBack}>
                        <h3>{excerciseControl.filter(excercise => excercise.wasCorrect).length} ejercicios de {TOTAL_OF_EXCERCISES} tocados correctamente</h3>
                        <h3>{excerciseControl.reduce((cantidad, current) => cantidad+current.totalNotesCorrect, 0)} notas tocadas correctamente</h3>
                        <h3>{excerciseControl.reduce((cantidad, current) => cantidad+current.totalNotesWrong, 0)} notas tocadas incorrectamente</h3>
                </FinishPage>
            )}
        </>
        ):(
            <SolfeoConfiguration data={data} handleChange={handleChange} handleOnClick={handleOnClick}></SolfeoConfiguration>
        )
    )
}
