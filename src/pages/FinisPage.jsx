import React from 'react'

export default function FinisPage({handleBack, children}) {
  return (
    <div className='finish-page-container'>
        <div className='puntaje-container'>
            <h1>Has finalizado tu práctica</h1>
            {children}
        </div>
        <button className="configurationButton"  onClick={handleBack}>Regresar</button>
    </div>
  )
}
