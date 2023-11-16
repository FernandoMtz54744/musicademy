import React from 'react'

export default function Acorde({chord, generateChord}) {
  return (
    <div>
        <p>tipo: {chord.type}</p>
        <p>Key: {chord.key}</p>
        <p>Notas: {chord.chromaticScale}</p>
        <p>Notas del acorde: {chord.notesOfChord}</p>
        <p>Nombre: {chord.name}</p>

        <button >Regresar</button>
        <button onClick={generateChord}>Siguiente</button>
    </div>
  )
}
