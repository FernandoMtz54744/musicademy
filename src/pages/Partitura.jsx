import React, { useEffect } from 'react'
import Vex from "vexflow"
export default function Partitura({partitura}) {

    useEffect(()=>{
        if(!partitura.escala){
            return;
        }

        // Elimina una partitura si la hay
        const partituraDiv = document.getElementById("partitura");
        if(partituraDiv.hasChildNodes()){
            partituraDiv.removeChild(partituraDiv.childNodes[0]);
        }

        // Crea el render de la partitura
        const VF = Vex.Flow;
        const renderer = new VF.Renderer(partituraDiv, VF.Renderer.Backends.SVG);
        renderer.resize(650, 200);
        var context = renderer.getContext();
        context.scale(2,2);

        // Crea un Stave
        const stave = new Vex.Stave(20, 0, 300 );
        stave.setClef(partitura.clave);
        stave.setKeySignature(partitura.escala);
        stave.setContext(context).draw();
        
        const vexFlowNotes = partitura.notas.map((nota)=>{
        return new VF.StaveNote({ keys: [`${nota.nota}/${nota.octava}`], duration: nota.duracion, clef: partitura.clave });
        });

        const voice = new VF.Voice().setStrict(false).addTickables(vexFlowNotes);
        if(partitura.escala === "C"){
            VF.Accidental.applyAccidentals([voice], 'C');
        }
        Vex.Formatter.FormatAndDraw(context, stave, vexFlowNotes);

        },[partitura]);

  return (
    <div className='partitura-container'>
        <div name="partitura" id='partitura' className='partitura'/>
    </div>
  )
}
