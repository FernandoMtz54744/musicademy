import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from './Header';
import indice from "../res/indice.json"

export default function Indice() {
    const {submodulo} = useParams();
    const [links] = useState(Object.keys(indice[submodulo]));
    const navigate = useNavigate();

    const handleBack = ()=>{
      navigate("/Teoria")
    }

  return (
    <div className='modulos'>
        <Header headerColor={"header-blue"}/>
        <h2>Índice de {submodulo.charAt(0).toUpperCase() + submodulo.slice(1)}</h2>
        <div className='links-indice-container'>
            {links.map((link, i) =>
                <Link to={indice[submodulo][link].url} key={i} className='link-indice'>{indice[submodulo][link].contenido}</Link>
            )}
            <div className='teoria-contenido-button-container'>
                <button className='teoria-button-back' onClick={handleBack}>Regresar</button>
            </div>
        </div>
        
    </div>
  )
}
