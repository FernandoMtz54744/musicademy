import React from 'react'
import RythmSheet from './RythmSheet'

export default function Ritmo({data, generarRitmo, patronRitmico}) {
  return (
    <>
        <div className='entered-configuration'>
            <div>Tempo: {data.tempo}</div>
            <div>Compases: {data.compases} </div>
            <div>Signatura: {data.signaturaNumerador}/{data.signaturaDenominador}</div>
            <div>Figuras: {Object.keys(data.figuras).map(figura=>data.figuras[figura]?`${figura}, `:"")}</div>
        </div>
        <div>
            Aqui se muestra el ritmo a seguir {patronRitmico.patronNumber}
            <RythmSheet patronRitmico={patronRitmico} data={data}/>
        </div>
        <button onClick={generarRitmo} className='configurationButton'>Siguiente</button>
    </>
  )
}
