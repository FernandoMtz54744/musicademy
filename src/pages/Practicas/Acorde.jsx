import React from 'react'
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';

export default function Acorde({chord, generateChord, handleBack, result}) {
  return (
    <div className='chord-page-container'>
      <h1>Toca las notas que constituyen el siguiente acorde</h1>
      <div className='chord-container'>
        <div className='left-chord-page'>
          {chord.notes.filter(note => result.notesPlayed.includes(note)).map(note => (
            <div className='correct-note-chord-container'>
              <CircularProgressbar value={100} text={note} 
                  styles={buildStyles({
                  textColor:"#2E7D32",
                  pathColor:"#2E7D32",
                  pathTransitionDuration: 0.2,
                  textSize: 40
                  })}
              />
          </div>
          ))}
        </div>
        <div className='center-chord-page'>
            <p className='chord-name'>{chord.name}</p>
        </div>
        <div className='rigth-chord-page'>
          {result.notesPlayed.filter(note => !chord.notes.includes(note)).map(note => (
            <div className='wrong-note-chord-container'>
              <CircularProgressbar value={100} text={note} 
                  styles={buildStyles({
                  textColor: "#D32F2F",
                  pathColor: "#D32F2F",
                  pathTransitionDuration: 0.2,
                  })}
              />
            </div>
          ))}
        </div>  
      </div>
      <footer className='footer-waves'>
        <div className='buttonRitmoContainer'>
            <button className="configurationButton"  onClick={handleBack}>Regresar</button>
            <button className='configurationButton' onClick={generateChord}>Siguiente</button>
        </div>
      </footer>
    </div>
  )
}
