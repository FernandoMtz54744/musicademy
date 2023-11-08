import React from 'react'

export default function Solfeo({note}) {
  return (
    <div>
      <div>{note.clave}</div>
      <div>{note.escala}</div>
      <div>{note.nota}</div>
    </div>
  )
}
