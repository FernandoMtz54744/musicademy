import React from 'react'

export default function Acorde({chord, generateChord, handleBack}) {
  return (
    <div>
        <p>tipo: {chord.type}</p>
        <p>tonica: {chord.tonic}</p>
        <p>Nombre: {chord.name}</p>
        <p>Notas del acorde: {chord.notes}</p>
        <p>Cromatica: {chord.chromatic}</p>

        <button onClick={handleBack}>Regresar</button>
        <button onClick={generateChord}>Siguiente</button>
    </div>
  )
}
