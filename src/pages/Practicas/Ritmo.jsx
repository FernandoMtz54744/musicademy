import React, { useEffect} from 'react'
import RitmoSheet from './RitmoSheet'
import redonda from "../../res/redonda.png"
import blanca from "../../res/blanca.png"
import negra from "../../res/negra.png"
import corchea from "../../res/corchea.png"

export default function Ritmo({data, generateRhythmPattern, rhythmSheetData, handleBack, 
                              handleOnKeydown, timeReference, circleBeatCSS, setCircleBeatCSS, userAnswers}) {

  // const [circlesIndex, setCircleIndex] = useState([]); //Contiene la cantidad de circulos de [0,...,data.signaturaNumerador]

  //Actualiza los datos de handleOnKeydown cambia el tiempo de referencia
  useEffect(()=>{
    document.addEventListener("keydown",  handleOnKeydown);
    return ()=>document.removeEventListener("keydown", handleOnKeydown)
  }, [timeReference, handleOnKeydown])

  //Cada que se da un golpe se ejecuta esta funcion
  useEffect(()=>{
    setTimeout(()=>{
      setCircleBeatCSS("");
    }, 80);
  }, [circleBeatCSS, setCircleBeatCSS]);

  // //Cada que se cambia el numerado se actualiza el arreglo para desplegar los circulos
  // useEffect(()=>{
  //   const circleIndexes = [];
  //   for(let i=0; i < data.signaturaNumerador; i++){
  //     circleIndexes.push(i);
  //   }
  //   setCircleIndex(circleIndexes);
  // }, [data.signaturaNumerador])

  return (
    <>
        <div className='entered-configuration'>
          <div className='inputConfig-container'>
            <p>Tempo:</p>
            <div className='divSimulateInput'>{data.tempo}</div>
            <p>bpm</p>
          </div>

          <div className='inputConfig-container'>
            <p>Compases:</p>
            <div className='divSimulateInput'>{data.compases} </div>
          </div>

          <div className='inputConfig-container'>
            <p>Signatura de compás:</p>
            <div className='divSimulateInput'>{data.signaturaNumerador}</div>
            /
            <div className='divSimulateInput'>{data.signaturaDenominador}</div>
          </div>

          <div className='inputConfig-container'>
              <p>Figuras musicales: </p>
              {data.figuras.redonda && <div className="divSimulateButtonFigura" ><img src={redonda} alt='redonda'/></div>}
              {data.figuras.blanca && <div className="divSimulateButtonFigura" ><img src={blanca} alt='blanca'/></div>}
              {data.figuras.negra && <div className="divSimulateButtonFigura" ><img src={negra} alt='negra'/></div>}
              {data.figuras.corchea && <div className="divSimulateButtonFigura" ><img src={corchea} alt='corchea'/></div>}
          </div>
        </div>

        <div className='entered-configuration'>
          <p>Notas acertadas: </p>
          {userAnswers.map((answer, i) =>
            <div className={`circle-answer ${answer?"circle-green":"circle-red"}`} key={i}></div>
          )}
        </div>

        <div>
            <RitmoSheet rhythmSheetData={rhythmSheetData} data={data}/>
            <div className="circle-container">
              <div className={`circle-beat ${circleBeatCSS}`}></div>
              {/* {circlesIndex.map(i =>{
                return <div className={`circle ${"circleBeatCSS"}`} key={i}></div>
              })} */}
            </div>
        </div>
        <footer className='footer-waves'>
          <div className='buttonRitmoContainer'>
            <button onClick={handleBack} className='configurationButton'>Ir a configuración</button>
            <button onClick={generateRhythmPattern} className='configurationButton'>Siguiente</button>
          </div>
        </footer>
      
        
    </>
  )
}
