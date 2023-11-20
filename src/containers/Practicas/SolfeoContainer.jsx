import React, { useEffect, useState } from 'react'
import SolfeoConfiguration from '../../pages/Practicas/SolfeoConfiguration'
import Solfeo from '../../pages/Practicas/Solfeo';
import Header from '../../pages/Header';
import NoteDetector from '../../pages/Practicas/NoteDetector';
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getTrueKeys, getRandomNumber, getMajorScale} from '../../utils';

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
    const [note, setNote] = useState({}); //La nota que debe tocar
    const [finalNote, setFinalNote] = useState(); //Resultado de la nota tocada
    const [result, setResult] = useState();

    //Maneja el cambio de los inputs
    const handleChange = (e)=>{
        console.log(e.target.name +":" + e.target.value);
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
            generateNote();
        }else{
            console.log("Escalas : " + buttonName);
            const toggleData = !data.escalas[buttonName];
            setData({...data, escalas:{...data.escalas, [buttonName]: toggleData}});
        }
    }

    //Maneja el regreso a la configuración
    const handleBack = ()=>{
        setData({...data, isStart:false});
    }

    //Devuelve una nota generada al azar de acuerdo a los parámetros
    const generateNote = ()=>{
        const tempNote = {
            clef: "", //La clave [treble|bass] 
            tonic: "", //Tonica de la que se crea la escala
            note: "", //Alguna nota de esa escala
            chromatic: [] //Notas cromaticas de donde se obtiene la escala
        }
        //Se obtiene la clave al azar
        const posibleClef = getTrueKeys(data.claves);
        tempNote.clef =  posibleClef[getRandomNumber(posibleClef.length)].replace("sol", "treble").replace("fa", "bass");

        if(data.modo === "escalas"){
            const posibleTonic = getTrueKeys(data.escalas);//Las posibles escalas para escoger
            tempNote.tonic = posibleTonic[getRandomNumber(posibleTonic.length)].replace("Fsharp", "F#");
            const majorScale = getMajorScale(tempNote.tonic);//Se genera la escala
            tempNote.note = majorScale.notes[getRandomNumber(majorScale.notes.length)];//Se obtiene una nota al azar de esa escala
            tempNote.chromatic = majorScale.chromatic;
        }else{//alteraciones
            tempNote.tonic = "C"; //Escala de Do mayor
            const posibleAlterations = getTrueKeys(data.alteraciones); //Se obtiene una alteracion al azar de las activadas por el usuario (N, #, b)
            const alteration = posibleAlterations[getRandomNumber(posibleAlterations.length)];
            const majorScale = getMajorScale(tempNote.tonic);
            tempNote.note = majorScale.notes[getRandomNumber(majorScale.notes.length)];
            tempNote.chromatic = majorScale.chromatic;
            if(alteration === "sostenidos"){
                tempNote.note+="#";    
            }else if(alteration === "bemoles"){
                tempNote.note+="b";
            }//Si no entra a ninguno la nota se queda natural
            tempNote.chromatic = fixChromatic(tempNote.note, tempNote.chromatic);
        }
        setNote(tempNote);
        setResult({isCorrect: false, isPlayingNote: true, correctNote: finalNote})
    }

    //Ajusta la escala cromatica dependiendo la nota (para el modo alteraciones)
    const fixChromatic = (note, chromatic)=>{
        if(note.includes("b")){
            chromatic = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
        }
        //Ajusta los enarmónicos
        if(note === "E#"){
            chromatic[chromatic.indexOf("F")] = "E#";
        }else if(note === "B#"){
            chromatic[chromatic.indexOf("F")] = "E#";
            chromatic[chromatic.indexOf("C")] = "B#";
        }else if(note === "Cb"){
            chromatic[chromatic.indexOf("B")] = "Cb";
        }else if(note === "Fb"){
            chromatic[chromatic.indexOf("B")] = "Cb";
            chromatic[chromatic.indexOf("E")] = "Fb";
        }
        return chromatic;
    }

    useEffect(()=>{
        if(finalNote === note.note){
            setResult({...result, isCorrect: true, isPlayingNote: false})
            console.log("Correcto");
        }else{
            setResult({...result, isCorrect:false, isPlayingNote: false})
        }
    }, [finalNote]);

    
  return (
    <>
    {data.isStart?(
            <>
                <Header headerColor={"header-green"}/>
                <Solfeo note={note} generateNote={generateNote} handleBack={handleBack}></Solfeo>
                {result.isPlayingNote?(
                    <NoteDetector setFinalNote={setFinalNote} chromaticScale={note.chromatic}/>
                ):(
                <div className='center-result'>
                    <div className='noteDetector-container'>
                        <CircularProgressbar value={100} text={finalNote} 
                            styles={buildStyles({
                            textColor: result.isCorrect?"#2E7D32":"#D32F2F",
                            pathColor: result.isCorrect?"#2E7D32":"#D32F2F",
                            pathTransitionDuration: 0.2,
                            })}
                            />
                    </div>
                    <h3>{result.isCorrect?"Correcto":`Incorrecto: la nota correcta era ${note.note}`}</h3>
                </div>
                )}
            </>
        ):(
            <SolfeoConfiguration data={data} handleChange={handleChange} handleOnClick={handleOnClick}></SolfeoConfiguration>
        )}
    </>
  )
}
