import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from './Header';
import indice from "../res/indice.json"

export default function Indice() {
    const {submodulo} = useParams();
    const [links, setLinks] = useState(Object.keys(indice[submodulo]));


  return (
    <div className='modulos'>
        <Header headerColor={"header-blue"}/>
        <h2>Índice de {submodulo.charAt(0).toUpperCase() + submodulo.slice(1)}</h2>
        <div className='links-indice-container'>
            {links.map(link =>
                <Link to={indice[submodulo][link].url}>{indice[submodulo][link].contenido}</Link>
            )}
        </div>
    </div>
  )
}
