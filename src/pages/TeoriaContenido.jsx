import React, { useEffect, useRef, useState } from 'react'
import teoria from "../res/teoria.json"
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Ejercicio from './Ejercicio';
import { formatTiempo } from '../utils';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firabase.config';
import { useAuth } from '../context/AuthContext';

export default function TeoriaContenido() {
    const {submodulo, subtema} = useParams();
    const [etiquetas] = useState(Object.keys(teoria[submodulo][subtema]));
    const navigate = useNavigate();
    const [ejercicioState, setEjercicioState] = useState("sin realizar") //[sin realizar, realizando, realizado]
    const [time, setTime] = useState(0);
    const interval = useRef();
    const usuarioContext = useAuth();

    const handleBack = ()=>{
        navigate(`/Teoria/${submodulo}`)
        if(time !== 0){
            guardarTiempo();
        }
    }

    const startTime = ()=>{
        setTime(0);
        interval.current = setInterval(()=>{
            setTime(time => time + 1);
        }, 1000);
    }

    useEffect(()=>{
        startTime();
        return ()=>{
            clearInterval(interval.current);
        }
    }, []);

    const guardarTiempo = () =>{
        const collectionRef = collection(db, "Usuarios", usuarioContext.user.uid, "TeoriaTiempos");
        addDoc(collectionRef, {
            submodulo: submodulo,
            tiempo: time,
        }).then(()=>{
            console.log("Datos agregados");
        }).catch((error)=>{
            console.log("Error al agregar datos", error);
        })
        console.log("Guardado");
    }

  return (
    <div className='modulos'>
        <Header headerColor={"header-blue"}/>
        <div className='teoria-contenido-container'>
            <div className='timer-container-teoria'>
                Tiempo: {formatTiempo(time)}
            </div>
            {etiquetas.map((etiqueta, i)=>{
                const tipo = etiqueta.split("_")[0];
                if(tipo === "texto"){
                    return <p key={i}>{teoria[submodulo][subtema][etiqueta]}</p>
                }else if(tipo === "dibujo"){
                    return <div className='teoria-img-container' key={i}>
                            <img src={teoria[submodulo][subtema][etiqueta]} alt='imagen'/>
                        </div>
                }else if(tipo === "ejercicio"){
                    return <Ejercicio key={i} setEjercicioState={setEjercicioState} ejercicioState={ejercicioState} titulo={teoria[submodulo][subtema]["titulo_1"]} subtema={subtema} submodulo={submodulo}/>
                }else if(tipo === "ti   tulo"){
                    return <h1 key={i}>{teoria[submodulo][subtema][etiqueta]}</h1>
                }else if(tipo === "video"){
                    return(
                        <div className='video-container' key={i}>
                            <iframe width="560" height="315" src={teoria[submodulo][subtema][etiqueta].url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            <h4>Autor: {teoria[submodulo][subtema][etiqueta].canal}</h4>
                        </div>
                        )
                }else if(tipo === "subtitulo"){
                    return <h2 key={i}>{teoria[submodulo][subtema][etiqueta]}</h2>
                }else if(tipo === "titulo"){
                    return <h1 key={i}><center>{teoria[submodulo][subtema][etiqueta]}</center></h1>
                }else{
                    return <div key={i}>{etiqueta}</div>
                }
            })}

            
            <div className='teoria-contenido-button-container'>
                <button className='teoria-button-back' onClick={handleBack}>Regresar</button>
            </div>
        </div>
        
    </div>
  )
}
