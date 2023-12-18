import React, { useEffect } from 'react'
import Vex from "vexflow"

export default function RitmoSheet({data, rhythm}) {
    
    useEffect(()=>{
        // Elimina una partitura si la hay
        const rythmSheet = document.getElementById("RythmSheet");
        if(rythmSheet.hasChildNodes()){
            rythmSheet.removeChild(rythmSheet.childNodes[0]);
        }

        // Crea el render de la partitura
        const VF = Vex.Flow;
        const renderer = new VF.Renderer(rythmSheet, VF.Renderer.Backends.SVG);
        renderer.resize(1000, 200);
        var context = renderer.getContext();
        context.scale(2,2);
        if(window.innerWidth <= 1000){
            renderer.resize(500, 100);
            context.scale(0.25,0.25)
        }

        // Crea un Stave
        let stave = new Vex.Stave(50, 0, 400);
        if(window.innerWidth <= 900){
            stave = new Vex.Stave(40, 0, 300);
        }
        stave.options.line_config = [
            { visible: false },
            { visible: false },
            { visible: true }, // show middle
            { visible: false },
            { visible: false },
        ]
        stave.addTimeSignature(`${data.signaturaNumerador}/${data.signaturaDenominador}`);
        stave.setContext(context).draw();
        
        const notes = rhythm.map((nota)=>{
            if(nota.tipo === "nota"){
                let vexflowNote;
                if(nota.figura === 0.125){
                    vexflowNote = new VF.StaveNote({ keys: ["b/4"], duration: "8" })
                }else if(nota.figura === 0.25){
                    vexflowNote = new VF.StaveNote({ keys: ["b/4"], duration: "q" })
                }else if(nota.figura === 0.5){
                    vexflowNote = new VF.StaveNote({ keys: ["b/4"], duration: "h" })
                }else {
                    vexflowNote = new VF.StaveNote({ keys: ["b/4"], duration: "w" })
                }

                if(nota.tocado === "correcto"){
                    vexflowNote.setKeyStyle(0, {fillStyle: "green", strokeStyle: "green"})
                }else if(nota.tocado === "incorrecto"){
                    vexflowNote.setKeyStyle(0, {fillStyle: "red", strokeStyle: "red"})
                }else if(nota.tocado === "sonando"){
                    vexflowNote.setKeyStyle(0, {fillStyle: "blue", strokeStyle: "blue"})
                }

                if(nota.punto){
                    const annotation = new Vex.Flow.Annotation(".");
                    annotation.setFont("Arial", 30, 15); 
                    annotation.setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.CENTER);
                    vexflowNote.addModifier(annotation, 0);
                }

                return vexflowNote;

            }else{ //Es una barra de compás
                return new Vex.Flow.BarNote()
            }
        })

        Vex.Formatter.FormatAndDraw(context, stave, notes);
    }, [rhythm]);
        
  return (
    <div className='sheetContainer'>
        <h2>Presiona la tecla "Espacio" al ritmo aquí mostrado</h2>
        <div name="RythmSheet" id='RythmSheet' className='sheet'></div>
    </div>
  )
}
