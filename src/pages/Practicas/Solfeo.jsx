import React, { useEffect } from 'react'
import Vex from "vexflow"

export default function Solfeo({note, generateNote, handleBack}) {

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
    stave.setClef(note.clave);
    stave.setKeySignature(note.escala);
    stave.setContext(context).draw();
    const octava = note.clave === "treble"?4:3;
    const singleNote = new VF.StaveNote({ keys: [`${note.nota}/${octava}`], duration: "w", clef: note.clave });
    const voice = new VF.Voice().addTickables([singleNote]);
    if(note.escala === "C"){
      VF.Accidental.applyAccidentals([voice], 'C');
    }
    Vex.Formatter.FormatAndDraw(context, stave, [singleNote]);
}, [note]);


  return (
    <div>
      {/* <div>{note.clave}</div>
      <div>{note.escala}</div>
      <div>{note.nota}</div> */}
      <div className='sheetContainer'>
        <h2>Toca la nota mostrada a continuación</h2>
        <div name="RythmSheet" id='RythmSheet' className='sheet'/>
      </div>

      <footer className='footer-waves'>
        <div className='buttonRitmoContainer'>
            <button className="configurationButton" onClick={generateNote}>Siguiente</button>
            <button className='configurationButton' onClick={handleBack}>Regresar</button>
          </div>
      </footer>
      
    </div>
  )
}
