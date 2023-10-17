import React, { useState } from 'react'
import RitmoConfiguration from '../../pages/Practicas/RitmoConfiguration';
import Ritmo from '../../pages/Practicas/Ritmo';
import Header from '../../pages/Header';
import { log } from 'vexflow';

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
      tied: true
    }

    const [data, setData] = useState(valoresIniciales);
    const [patronRitmico, setPatronRitmico] = useState({patronNumber: 0});

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

    const generarRitmo = ()=>{
      const tiempos = llenaTiempos();
      const compas = Number(data.signaturaNumerador)/Number(data.signaturaDenominador);
      const ritmo = [];
      const ritmoSheet = [];
      if(data.tied){//Con ligadura
        // Se genera el ritmo
        let sumaRitmo = 0;
        let totalRitmo = compas*data.compases;
        while(sumaRitmo<totalRitmo){
          const randomIndex = Math.trunc(Math.random()*tiempos.length);
          const figura = tiempos[randomIndex];
          if(sumaRitmo+figura<=totalRitmo){
            ritmo.push(figura);
            sumaRitmo+=figura;
          }
        }
        console.log("Ritmo original:");
        console.log(ritmo)
        // Se genera la partitura
        let sumaCompas = 0;
        let barCount = 0;
        for(let i=0; i<ritmo.length; i++){
          if(sumaCompas+ritmo[i] <= compas){
            ritmoSheet.push(ritmo[i]);
            sumaCompas+=ritmo[i];
            if(sumaCompas === compas && barCount<data.compases-1){
              ritmoSheet.push(-1); 
              barCount++       
              sumaCompas = 0;
            }
          }else{
            const subRitmo1 = compas-sumaCompas;
            const subRitmo2 = sumaCompas+ritmo[i]-compas;
            ritmoSheet.push(subRitmo1);
            ritmoSheet.push(-2);//tied
            ritmoSheet.push(-1); //bar
            barCount++;
            ritmoSheet.push(subRitmo2);
            sumaCompas = subRitmo2;
          }
        }
      }else{//Sin ligadura

      }
      setPatronRitmico(ritmoSheet);
      console.log("Ritmo Sheet: ");
      console.log(ritmoSheet);
    }

     

    const handleStart = ()=>{
      generarRitmo();
      setData({...data, isStart:true});
    }

  return (
      <>
        {data.isStart?(
          <>
            <Header headerColor={"header-green"}/>
            <Ritmo data={data} generarRitmo={generarRitmo} patronRitmico={patronRitmico}/>
          </>
        ):(
          <RitmoConfiguration data={data} handleChange={handleChange} handleOnClick={handleOnClick} handleStart={handleStart}/>
        )
        }
         
      </>
     
  )
}
