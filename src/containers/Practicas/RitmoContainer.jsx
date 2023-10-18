import React, { useState } from 'react'
import RitmoConfiguration from '../../pages/Practicas/RitmoConfiguration';
import Ritmo from '../../pages/Practicas/Ritmo';
import Header from '../../pages/Header';

export default function RitmoContainer() {

    const valoresIniciales = {
      tempo:80, 
      compases:4,
      figuras:{
        redonda:true,
        blanca: true,
        negra: true,
        corchea: true
      },
      signaturaNumerador: 4,
      signaturaDenominador: 4,
      isStart: false, 
      tied: false
    }

    const [data, setData] = useState(valoresIniciales);
    const [patronRitmico, setPatronRitmico] = useState([]);
    const [ritmoSheet, setRitmoSheet] = useState([]);

    const handleChange = (e)=>{
      setData({...data, [e.target.name]:e.target.value})
      console.log(data);
    }
    const handleOnClick = (e)=>{
      let buttonName="";
      if(e.target.tagName === "IMG"){
        buttonName = e.target.parentNode.name;
      }else{
        buttonName = e.target.name;
      }
      const newValue = !data.figuras[buttonName];
      setData({...data, figuras:{...data.figuras, [buttonName]: newValue}});
      console.log(data)
    }

    const llenaTiempos = ()=>{
      const tiempos = [];
      if(data.figuras.corchea){
        tiempos.push(0.125);
      }
      if(data.figuras.negra){
        tiempos.push(0.25);
      }
      if(data.figuras.blanca){
        tiempos.push(0.5);
      }
      if(data.figuras.redonda){
        tiempos.push(1);
      }
      return tiempos;
    }

    const sumaElementos = (array) => {
      return array.reduce((partialSum, x) => partialSum + x, 0);
    };

    const generarRitmo = (compas, ritmo, tiempos) => {
      const decisiones = [];
      while (decisiones.length < tiempos.length) {
        const figura = tiempos[Math.trunc(Math.random() * tiempos.length)];
        if (decisiones.indexOf(figura) === -1) {
          decisiones.push(figura);
          ritmo.push(figura);
          if (sumaElementos(ritmo) < compas) {
            const valido = generarRitmo(compas, ritmo, tiempos);
            if (valido) {
              return true;
            } else {
              ritmo.pop();
            }
          } else if (sumaElementos(ritmo) === compas) {
            return true;
          } else {//Si es mayor se pasa y no es válido
            ritmo.pop();
          }
        }
      }
      return false;
    }

    const generarPatronRitmico = ()=>{
      const tiempos = llenaTiempos();
      const compas = Number(data.signaturaNumerador)/Number(data.signaturaDenominador);
      let patronRitmicoTemp = [];
      let ritmoSheetTemp = [];
      for(let i=0; i < data.compases; i++){
        const subRitmo = [];
        const valido = generarRitmo(compas, subRitmo, tiempos);
        if(valido){
          patronRitmicoTemp.push(...subRitmo)
          ritmoSheetTemp.push(...subRitmo)
          ritmoSheetTemp.push(-1)
        }else{
          break;
        }
      }
      ritmoSheetTemp.pop();//Eliminar el ultimo -1
      setPatronRitmico([...patronRitmicoTemp]);
      setRitmoSheet(ritmoSheetTemp);
    }

    const handleStart = ()=>{
      generarPatronRitmico();
      setData({...data, isStart:true});
    }

    const handleBack = ()=>{
      setData({...data, isStart:false});
      console.log(data);
    }

  return (
      <>
        {data.isStart?(
          <>
            <Header headerColor={"header-green"}/>
            <Ritmo data={data} generarPatronRitmico={generarPatronRitmico} ritmoSheet={ritmoSheet} handleBack={handleBack}/>
          </>
        ):(
          <RitmoConfiguration data={data} handleChange={handleChange} handleOnClick={handleOnClick} handleStart={handleStart}/>
        )
        }
         
      </>
     
  )
}
