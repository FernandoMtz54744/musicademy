import React, { useState } from 'react'
import teoria from "../res/teoria.json"
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';

export default function TeoriaContenido() {
    const {submodulo, subtema} = useParams();
    const [etiquetas] = useState(Object.keys(teoria[submodulo][subtema]));
    const navigate = useNavigate();

    const handleBack = ()=>{
        navigate(`/Teoria/${submodulo}`)
    }

  return (
    <div className='modulos'>
        <Header headerColor={"header-blue"}/>
        <div className='teoria-contenido-container'>
            {etiquetas.map((etiqueta, i)=>{
                const tipo = etiqueta.split("_")[0];
                if(tipo === "texto"){
                    return <p key={i}>{teoria[submodulo][subtema][etiqueta]}</p>
                }else if(tipo === "dibujo"){
                    return <div className='teoria-img-container' key={i}>
                            <img src={teoria[submodulo][subtema][etiqueta]} alt='imagen'/>
                        </div>
                }else if(tipo === "ejercicio"){
                    return <h1 key={i}>Aqui va un ejercicio</h1>
                }else if(tipo === "titulo"){
                    return <h1>{teoria[submodulo][subtema][etiqueta]}</h1>
                }else{
                    return <div>Etiqueta no encontrada</div>
                }
            })}

            
            <div className='teoria-contenido-button-container'>
                <button className='teoria-button-back' onClick={handleBack}>Regresar</button>
            </div>
        </div>
    </div>
  )
}
