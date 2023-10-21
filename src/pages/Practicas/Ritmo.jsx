import React, { useEffect } from 'react'
import RythmSheet from './RythmSheet'

export default function Ritmo({data, generarPatronRitmico, ritmoSheet, handleBack, keyPressed, referenceTime}) {
  useEffect(()=>{
    document.addEventListener("keydown",  keyPressed);
    return ()=>document.removeEventListener("keydown", keyPressed)
  }, )

  return (
    <>
        <div className='entered-configuration'>
            <div>Tempo: {data.tempo}</div>
            <div>Compases: {data.compases} </div>
            <div>Signatura: {data.signaturaNumerador}/{data.signaturaDenominador}</div>
            <div>Figuras: {Object.keys(data.figuras).map(figura=>data.figuras[figura]?`${figura}, `:"")}</div>
        </div>
        <div>
            Aqui se muestra el ritmo a seguir 
            <RythmSheet ritmoSheet={ritmoSheet} data={data}/>
        </div>
        <button onClick={generarPatronRitmico} className='configurationButton'>Siguiente</button>
        <button onClick={handleBack} className='configurationButton'>Atras</button>
    </>
  )
}
