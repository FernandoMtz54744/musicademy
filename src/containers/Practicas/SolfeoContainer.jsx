import React, { useEffect, useState } from 'react'
import SolfeoConfiguration from '../../pages/Practicas/SolfeoConfiguration'
import Solfeo from '../../pages/Practicas/Solfeo';
import Header from '../../pages/Header';
import NoteDetector from '../../pages/Practicas/NoteDetector';
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getTrueKeys, getRandomNumber, getChromaticScale, getMajorKey} from '../../utils';

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
    const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"]; //Las 7 notas naturales 

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
        const tempNote = {}
        //Se obtiene la clave al azar
        const selectedClaves = getTrueKeys(data.claves);
        tempNote.clave =  selectedClaves[getRandomNumber(selectedClaves.length)].replace("sol", "treble").replace("fa", "bass");

        if(data.modo === "escalas"){
            const selectedEscala = getTrueKeys(data.escalas);//Se obtiene una escala al azar
            tempNote.escala = selectedEscala[getRandomNumber(selectedEscala.length)].replace("Fsharp", "F#");
            const keyNotes = getMajorKey(tempNote.escala);//Se genera la escala
            tempNote.nota = keyNotes[getRandomNumber(keyNotes.length)];//Se obtiene una nota al azar de esa escala
        }else{//alteraciones
            tempNote.escala = "C"; //Escala de Do mayor
            const selectedAlteracion = getTrueKeys(data.alteraciones); //Se obtiene una alteracion al azar de las activadas por el usuario (N, #, b)
            const alteracion = selectedAlteracion[getRandomNumber(selectedAlteracion.length)];
            let selectedNote = naturalNotes[getRandomNumber(naturalNotes.length)];
            if(alteracion === "sostenidos"){
                selectedNote+="#";
            }else if(alteracion === "bemoles"){
                selectedNote+="b";
            }//Si no entra a ninguno la nota se queda natural
            tempNote.nota = selectedNote;
        }

        tempNote.chromaticScale = getChromaticScale(tempNote.escala, tempNote.nota);
        setNote(tempNote);
        setResult({isCorrect: false, isPlayingNote: true, correctNote: finalNote})
    }

    useEffect(()=>{
        if(finalNote === note.nota){
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
                    <NoteDetector setFinalNote={setFinalNote} chromaticScale={note.chromaticScale}/>
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
                    <h3>{result.isCorrect?"Correcto":`Incorrecto: la nota correcta era ${note.nota}`}</h3>
                </div>
                )}
            </>
        ):(
            <SolfeoConfiguration data={data} handleChange={handleChange} handleOnClick={handleOnClick}></SolfeoConfiguration>
        )}
    </>
  )
}
