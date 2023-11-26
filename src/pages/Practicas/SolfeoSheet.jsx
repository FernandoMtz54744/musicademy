import React, { useEffect } from 'react'
import Vex from "vexflow"
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';

export default function Solfeo({notes, generateExcercise, handleBack, clef, tonic, notesPlayed}) {

  useEffect(()=>{
    // Elimina una partitura si la hay
    const rythmSheet = document.getElementById("RythmSheet");
    if(rythmSheet.hasChildNodes()){
        rythmSheet.removeChild(rythmSheet.childNodes[0]);
    }

    // // Crea el render de la partitura
    const VF = Vex.Flow;
    const renderer = new VF.Renderer(rythmSheet, VF.Renderer.Backends.SVG);
    renderer.resize(1000, 250);
    var context = renderer.getContext();
    context.scale(2,2);
    // context.setViewBox(105, 20, 200, 200); 

    // // Crea un Stave
    const stave = new Vex.Stave(50, 0, 400);
    stave.setClef(clef);
    stave.setKeySignature(tonic);
    stave.setContext(context).draw();
    const octava = clef === "treble"?4:3;
    
    const vexFlowNotes = notes.map((note)=>{
      return new VF.StaveNote({ keys: [`${note}/${octava}`], duration: "w", clef: clef });
    });

    for(let i=0; i<notesPlayed.length; i++){
      if(notesPlayed[i].isCorrect){
        vexFlowNotes[i].setKeyStyle(0, {fillStyle: "green", strokeStyle: "green"})
      }else{
        vexFlowNotes[i].setKeyStyle(0, {fillStyle: "red", strokeStyle: "red"})
      }
    }

    const voice = new VF.Voice().setStrict(false).addTickables(vexFlowNotes);
    if(tonic === "C"){
      VF.Accidental.applyAccidentals([voice], 'C');
    }
    Vex.Formatter.FormatAndDraw(context, stave, vexFlowNotes);
}, [notes]);


  return (
    <div className='chord-page-container'>
        <h2>Toca las notas mostradas a continuación</h2>
        <div className='chord-container'>
          <div className='left-chord-page'>
            {notesPlayed.filter(notePlayed => notePlayed.isCorrect).map(note => (
              <div className='correct-note-chord-container-solfeo'>
                <CircularProgressbar value={100} text={note.note} 
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
            <div className='sheetContainer'>
              <div name="RythmSheet" id='RythmSheet' className='sheet'/>
            </div>
          </div>

          <div className='rigth-chord-page'>
            {notesPlayed.filter(notePlayed => !notePlayed.isCorrect).map(note => (
              <div className='wrong-note-chord-container-solfeo'>
                <CircularProgressbar value={100} text={note.note} 
                    styles={buildStyles({
                    textColor: "#D32F2F",
                    pathColor: "#D32F2F",
                    pathTransitionDuration: 0.2,
                    textSize: 40
                    })}
                />
              </div>
            ))}
        </div>  
        </div>
     

      <footer className='footer-waves'>
        <div className='buttonRitmoContainer'>
            <button className='configurationButton' onClick={handleBack}>Regresar</button>
            <button className="configurationButton" onClick={generateExcercise}>Siguiente</button>
          </div>
      </footer>
      
    </div>
  )
}
