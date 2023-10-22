import React, { useEffect } from 'react'
import Vex from "vexflow"

export default function RitmoSheet({data, rhythmSheetData}) {
    
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
        context.setViewBox(105, 20, 200, 200); //size

        // Crea un Stave
        const stave = new Vex.Stave(0, 50, 400);
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

        for(let i=0; i<rhythmSheetData.length; i++){
            if(rhythmSheetData[i] === 0.125){
                notes.push(new Vex.StaveNote({ keys: ["b/4"], duration: "8" }))
            }else if(rhythmSheetData[i] === 0.25){
                notes.push(new Vex.StaveNote({ keys: ["b/4"], duration: "q" }))
            }else if(rhythmSheetData[i] === 0.5){
                notes.push(new Vex.StaveNote({ keys: ["b/4"], duration: "h" }))
            }else if(rhythmSheetData[i] === 1){
                notes.push(new Vex.StaveNote({ keys: ["b/4"], duration: "w" }))
            }else if(rhythmSheetData[i] === -1){
                notes.push(new Vex.Flow.BarNote())
            }
        }

        Vex.Formatter.FormatAndDraw(context, stave, notes);
    }, [rhythmSheetData, data.signaturaNumerador, data.signaturaDenominador]);
        
  return (
    <div className='sheetContainer'>
        <div name="RythmSheet" id='RythmSheet' className='sheet'></div>
    </div>
  )
}
