import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firabase.config';
import Chart from 'react-google-charts';
import { formatTiempo } from '../../utils';
import ProgressBar from "@ramonak/react-progress-bar";

export default function EstadisticasTeoria() {
  const [estadisticas,setEstadisticas] = useState({});
    const auth = useAuth();
    const submodulo = ["fundamentos", "melodia", "armonia", "ritmo"];
    const options = {
        legend: {position: "bottom"},
        backgroundColor: "#F5F5F5",
        titlePosition:"none",
        width: '100%'
    }

    const NUMERO_EJERCICIOS={
      fundamentos: 6,
      melodia: 2,
      armonia: 1,
      ritmo: 1
    }
 

    useEffect(()=>{
      const estadisticasTemp = {}
      const collectionRef = collection(db, "Usuarios", auth.user.uid, "Teoria");
      const ejerciciosHechosTemp = [];
      getDocs(collectionRef).then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
              const submodulo = doc.data().submodulo;
              if (!estadisticasTemp[submodulo]) {
                estadisticasTemp[submodulo] = {};  
              }
              estadisticasTemp[submodulo].ejercicios = (estadisticasTemp[submodulo].ejercicios || 0) + 1;
              if(ejerciciosHechosTemp.indexOf(doc.data().ejercicio) === -1){
                estadisticasTemp[submodulo].ejerciciosCompletados = (estadisticasTemp[submodulo].ejerciciosCompletados || 0) + 1;
                ejerciciosHechosTemp.push(doc.data().ejercicio);
              }
          });
          setEstadisticas(estadisticasTemp);
          console.log(estadisticasTemp);
      });
       
  },[]);

  const getEjerciciosTotal = ()=>{
    const suma = submodulo.reduce((suma, submodulo)=>{
        if(estadisticas[submodulo]){
            return suma+estadisticas[submodulo].ejercicios;
        }else{
            return suma;
        }
    }, 0)
    return suma;
}

  return (
    <div className='estadisticas-container'>
        {submodulo.map((submodulo)=>{
            let ejercicios = 0;
            let ejerciciosCompletados = 0;
            let tiempo = 1;
            if(estadisticas[submodulo]){
                ejercicios = estadisticas[submodulo].ejercicios;
                ejerciciosCompletados = estadisticas[submodulo].ejerciciosCompletados;
            }
           
            return(
                <div className='estadistica-container'>
                    <div className='estadistica-modulo-titulo'>{submodulo.toUpperCase()}</div>
                    {tiempo? (
                        <>
                        <div>
                            <h4>Tiempo total: {tiempo} segundos</h4>
                            <h4>Ejercicios: {ejerciciosCompletados} de {NUMERO_EJERCICIOS[submodulo]}</h4>
                        </div>
                        <div className='grafica--bar-container'>
                        <h4>Progreso de ejercicios:</h4>
                          <ProgressBar completed={Number((ejerciciosCompletados*100/NUMERO_EJERCICIOS[submodulo]).toFixed(2))}/>
                        </div>
                        
                        </>
                    ):(
                        <center><p>Revisa la teoría de este módulo para obtener tus estadísticas</p></center>
                    )}
                </div>
            )
        })}
    <div className='estadistica-container'>
        <div className='estadistica-modulo-titulo'>Ejercicios</div>
        <div>
            <h4>Ejercicios realizados: {getEjerciciosTotal()}</h4>
            <p>Si has realizado un ejercicio más de de una vez aquí puedes ver tu estadística</p>
        </div>
        <div className='grafica-container'>
            <h4>Ejercicios:</h4>
                <Chart
                    chartType='ColumnChart'
                    data={[["Submodulo", "Ejercicios"], 
                    ["Fundamentos", (estadisticas["fundamentos"]?.ejercicios || 0)], 
                    ["Melodia", (estadisticas["melodia"]?.ejercicios || 0)],
                    ["Armonia", (estadisticas["armonia"]?.ejercicios || 0)],
                    ["Ritmo", (estadisticas["ritmo"]?.ejercicios || 0)]]}
                    options={options}
                    width={500}
                />
        </div>
    </div>
  </div>
    
  )
}
