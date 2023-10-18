import React, { useEffect } from 'react'
import Vex from "vexflow"

export default function RythmSheet({data, ritmoSheet}) {
    
    useEffect(()=>{
        // Elimina una partitura si la hay
        const rythmSheet = document.getElementById("RythmSheet");
        if(rythmSheet.hasChildNodes()){
            rythmSheet.removeChild(rythmSheet.childNodes[0]);
        }

        // Crea el render de la partitura
        const VF = Vex.Flow;
        const renderer = new VF.Renderer(rythmSheet, VF.Renderer.Backends.SVG);
        renderer.resize(1000, 350);
        var context = renderer.getContext();
        context.setViewBox(80, 20, 200, 200); //size


        // Crea un Stave
        const stave = new Vex.Stave(10, 10, 400);
        stave.options.line_config = [
            { visible: false },
            { visible: false },
            { visible: true }, // show middle
            { visible: false },
            { visible: false },
        ]
        stave.addTimeSignature(`${data.signaturaNumerador}/${data.signaturaDenominador}`);
        stave.setContext(context).draw();
        const notes = [];
        const ties = [];
        const tiesIndex = [];
        console.log("Patron ritmico");
        console.log(ritmoSheet);
        for(let i=0; i<ritmoSheet.length; i++){
            if(ritmoSheet[i] === 0.125){
                notes.push(new Vex.StaveNote({ keys: ["b/4"], duration: "8" }))
            }else if(ritmoSheet[i] === 0.25){
                notes.push(new Vex.StaveNote({ keys: ["b/4"], duration: "q" }))
            }else if(ritmoSheet[i] === 0.5){
                notes.push(new Vex.StaveNote({ keys: ["b/4"], duration: "h" }))
            }else if(ritmoSheet[i] === 1){
                notes.push(new Vex.StaveNote({ keys: ["b/4"], duration: "w" }))
            }else if(ritmoSheet[i] === -1){
                notes.push(new Vex.Flow.BarNote())
            }else if(ritmoSheet[i] === -2){
                tiesIndex.push(i-tiesIndex.length);
            }
        }

        tiesIndex.forEach((i)=>{
                ties.push(new Vex.StaveTie({
                    first_note: notes[i-1],
                    last_note: notes[i+1],
                    first_indices: [0],
                    last_indices: [0],
                }));
        })
        Vex.Formatter.FormatAndDraw(context, stave, notes);
        ties.forEach((t) => {
            t.setContext(context).draw();
        });
    }, [ritmoSheet, data]);
        
  return (
    <div className='sheetContainer'>
        <div name="RythmSheet" id='RythmSheet' className='sheet'></div>
    </div>
  )
}
