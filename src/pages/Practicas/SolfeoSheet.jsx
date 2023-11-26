import React, { useEffect } from 'react'
import Vex from "vexflow"

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
    renderer.resize(1000, 350);
    var context = renderer.getContext();
    context.setViewBox(105, 20, 200, 200); //size

    // // Crea un Stave
    const stave = new Vex.Stave(0, 50, 400);
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
    <div>
      <div className='sheetContainer'>
        <h2>Toca la nota mostrada a continuación</h2>
        <div name="RythmSheet" id='RythmSheet' className='sheet'/>
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
