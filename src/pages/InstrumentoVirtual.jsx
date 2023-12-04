import React, { useEffect, useRef, useState } from 'react'
import * as Tone from "tone"
import C4 from "../res/samples/C4.wav"
import Ds4 from "../res/samples/Dsharp4.wav"
import Fs4 from "../res/samples/Fsharp4.wav"
import A4 from "../res/samples/A4.wav"



export default function InstrumentoVirtual() {
    const [isLoaded, setIsLoaded] = useState(false);
    const isPlayingVInstrument = useRef(false);
    
    const synth = new Tone.Sampler({
        urls: {
            "C4": C4,
            "D#4": Ds4,
            "F#4": Fs4,
            "A4": A4
        },
        onload: ()=>{
            setIsLoaded(true);
        }
    }).toDestination();
    synth.volume.value = 12;

    useEffect(()=>{
        const handleOnKeyDown = (e)=>{
            if(!isPlayingVInstrument.current){
                const now = Tone.now();
                if(e.keyCode === 68){
                    synth.triggerAttack("C4", now);
                }else if(e.keyCode === 82){
                    synth.triggerAttack("C#4", now);  
                }else if(e.keyCode === 70){
                    synth.triggerAttack("D4", now);
                }else if(e.keyCode === 84){
                    synth.triggerAttack("D#4", now);
                }else if(e.keyCode === 71){
                    synth.triggerAttack("E4", now);
                }else if(e.keyCode === 72){
                    synth.triggerAttack("F4", now);
                }else if(e.keyCode === 85){
                    synth.triggerAttack("F#4", now);
                }else if(e.keyCode === 74){
                    synth.triggerAttack("G4", now);
                }else if(e.keyCode === 73){
                    synth.triggerAttack("G#4", now);
                }else if(e.keyCode === 75){
                    synth.triggerAttack("A4", now);
                }else if(e.keyCode === 79){
                    synth.triggerAttack("A#4", now);
                }else if(e.keyCode === 76){
                    synth.triggerAttack("B4", now);
                }
                isPlayingVInstrument.current = true;
            }
        }
        
        const handleKeyUp = (e)=>{
            const now = Tone.now();
            synth.releaseAll(now);
            isPlayingVInstrument.current = false;
        }

        document.addEventListener("keydown",  handleOnKeyDown);
        document.addEventListener("keyup",  handleKeyUp);
        console.log(isLoaded);

        return ()=> {document.removeEventListener("keydown", handleOnKeyDown);}
    }, [])

  return isLoaded ? (
    <div>
      <ul id="piano" className="piano">
        <div data-note="C4" className="key">
          <div data-note="C#4" className="black-key"><div className='text-piano'><p>Do#</p><p>[R]</p></div></div>
          <div className='text-piano'><p>Do</p><p>[D]</p></div>
        </div>
        <div data-note="D4" className="key">
          <div data-note="D#4" className="black-key"><div className='text-piano'><p>Re#</p><p>[T]</p></div></div>
          <div className='text-piano'><p>Re</p><p>[F]</p></div>
        </div>
        <div data-note="E4" className="key"><div className='text-piano'><p>Mi</p><p>[G]</p></div></div>
        <div data-note="F4" className="key">
          <div data-note="F#4" className="black-key"><div className='text-piano'><p>Fa#</p><p>[U]</p></div></div>
          <div className='text-piano'><p>Fa</p><p>[H]</p></div>
        </div>
        <div data-note="G4" className="key">
          <div data-note="G#4" className="black-key"><div className='text-piano'><p>Sol#</p><p>[I]</p></div></div>
          <div className='text-piano'><p>Sol</p><p>[J]</p></div>
        </div>
        <div data-note="A4" className="key">
          <div data-note="A#4" className="black-key"><div className='text-piano'><p>La#</p><p>[O]</p></div></div>
          <div className='text-piano'><p>La</p><p>[K]</p></div>
        </div>
        <div data-note="B4" className="key">
        <div className='text-piano'><p>Si</p><p>[L]</p></div>
        </div>
      </ul>
    </div>
  ) : (
    <div className="loading-virtual-instrument">
      <h2>Cargando Instrumento Virtual...</h2>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}
