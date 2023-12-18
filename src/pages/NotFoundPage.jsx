import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className='notfound-container'>
        <h1>Ups... página no encontrada ☹️🎶</h1>
        <Link to="/">Regresar al inicio</Link>
    </div>
  )
}
