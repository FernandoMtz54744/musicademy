import React, { useState } from 'react'
import SolfeoConfiguration from '../../pages/Practicas/SolfeoConfiguration'
import Solfeo from '../../pages/Practicas/Solfeo';
import Header from '../../pages/Header';

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
    const [note, setNote] = useState({})
    const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"]; //Las 7 notas naturales 
    const sharpNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]; //Las 12 notas musicales en modo sostenidos
    const bemolNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]; //Las 12 notas en modo bemol
    const majorKeyPattern = [0,2,4,5,7,9,11] //Patrón T-T-ST-T-T-T de una escala mayor


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

    //Devuelve un número al azar
    const getRandomNumber = (max)=>{
        return Math.trunc(Math.random() * max);
    }

    //Devuelve un arreglo con las claves de un arreglo JSON cuyo valor sea true
    const getTrueKeys = (json)=>{
        const keys = Object.keys(json);
        const trueKeys = keys.filter(key => json[key])
        return trueKeys;
    }

    //Obtiene las notas de cierta escala
    const getNotesOfKey = (escala)=>{
        escala = "Cb"
        const notesOfKey = [];
        let notesToSearch = [];
        if(escala.includes("b") || escala === "F"){ //Busca en bemoles
            notesToSearch = bemolNotes;
        }else{ //Busca en sostenidos
            notesToSearch = sharpNotes;
        }
        //Obtiene las 7 notas
        let index = notesToSearch.indexOf(escala);
        if(escala === "Cb"){index = notesToSearch.indexOf("B")}
        for(let i=0; i < 7; i++){
            notesOfKey.push(notesToSearch[(index+majorKeyPattern[i])%12]);
        }
        //Se validan los enarmónicos para las escalas
        if(escala === "F#"){
            notesOfKey[notesOfKey.indexOf("F")] = "E#";
        }else if(escala === "C#"){
            notesOfKey[notesOfKey.indexOf("F")] = "E#";
            notesOfKey[notesOfKey.indexOf("C")] = "B#";
        }else if(escala === "Gb"){
            notesOfKey[notesOfKey.indexOf("B")] = "Cb";
        }else if(escala === "Cb"){
            notesOfKey[notesOfKey.indexOf("B")] = "Cb";
            notesOfKey[notesOfKey.indexOf("E")] = "Fb";
        }
        console.log(notesOfKey);
        return notesOfKey;
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
            const keyNotes = getNotesOfKey(tempNote.escala);//Se genera la escala
            tempNote.nota = keyNotes[getRandomNumber(keyNotes.length)];//Se obtiene una nota al azar de esa escala
        }else{//alteraciones
            tempNote.escala = "C"; //Escala de Do mayor
            const selectedAlteracion = getTrueKeys(data.alteraciones); //Se obtiene una alteracion al azar de las activadas por el usuario (N, #, b)
            let selectedNote = naturalNotes[getRandomNumber(naturalNotes.length)];
            if(selectedAlteracion === "sostenidos"){
                selectedNote+="#";
            }else if(selectedAlteracion === "bemoles"){
                selectedNote+="b";
            }//Si no entra a ninguno la nota se queda natural
            tempNote.nota = selectedNote;
        }
        setNote(tempNote);
    }

  return (
    <>
    {
        data.isStart?(
            <>
                <Header headerColor={"header-green"}/>
                <Solfeo note={note}></Solfeo>
            </>
        )
        :(
            <SolfeoConfiguration data={data} handleChange={handleChange} handleOnClick={handleOnClick}></SolfeoConfiguration>
        )
    }
        
    </>
  )
}
