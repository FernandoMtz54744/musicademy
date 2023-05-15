import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({headerColor}) {
  return (
    <header className={`header ${headerColor}`}>
        <p>Logo</p>
        <div className='header-links'>
          <Link to="/Perfil">Nombre</Link>
          <Link to="/">Logout</Link>
        </div>
      </header>
  )
}
