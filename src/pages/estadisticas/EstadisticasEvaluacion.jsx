import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firabase.config';
import { useAuth } from '../../context/AuthContext';
import Chart from 'react-google-charts';
import { formatTiempo } from '../../utils';

export default function EstadisticasEvaluacion() {

    const [estadisticaEvaluacion,setEstadisticaEvaluacion] = useState({});
    const auth = useAuth();
    const submodulo = ["fundamentos", "melodia", "armonia", "ritmo"];
    const options = {
        legend: {position: "bottom"},
        backgroundColor: "#F5F5F5",
        titlePosition:"none",
        width: '100%'
    }
    
    useEffect(()=>{
        const evaluacionStaTemp = {}
        const evaluacionCollection = collection(db, "Usuarios", auth.user.uid, "Evaluaciones");
        getDocs(evaluacionCollection).then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                const submodulo = doc.data().submodulo;
                console.log(submodulo);
                if (!evaluacionStaTemp[submodulo]) {
                    evaluacionStaTemp[submodulo] = {};
                }
        
                evaluacionStaTemp[submodulo].totalTiempo = (evaluacionStaTemp[submodulo].totalTiempo || 0) + doc.data().tiempo;
                evaluacionStaTemp[submodulo].totalCorrectas = (evaluacionStaTemp[submodulo].totalCorrectas || 0) + doc.data().correctas;
                evaluacionStaTemp[submodulo].totalIncorrectas = (evaluacionStaTemp[submodulo].totalIncorrectas || 0) + doc.data().incorrectas;
                evaluacionStaTemp[submodulo].numeroEvaluaciones = (evaluacionStaTemp[submodulo].numeroEvaluaciones || 0) + 1;
            });
            setEstadisticaEvaluacion(evaluacionStaTemp);
            console.log(evaluacionStaTemp);
        });
         
    },[]);

    const getTiempoTotal = ()=>{
        const suma = submodulo.reduce((suma, submodulo)=>{
            if(estadisticaEvaluacion[submodulo]){
                return suma+estadisticaEvaluacion[submodulo].totalTiempo;
            }else{
                return suma;
            }
        }, 0)
        return suma;
    }

    const getEvaluacionesTotal = ()=>{
        const suma = submodulo.reduce((suma, submodulo)=>{
            if(estadisticaEvaluacion[submodulo]){
                return suma+estadisticaEvaluacion[submodulo].numeroEvaluaciones;
            }else{
                return suma;
            }
        }, 0)
        return suma;
    }
  
  return (
    <div className='estadisticas-container'>
        {submodulo.map((submodulo)=>{
            let tiempo = 0;
            let correctas = 0;
            let incorrectas = 0;
            let cantidad = 0;
            if(estadisticaEvaluacion[submodulo]){
                cantidad = estadisticaEvaluacion[submodulo].numeroEvaluaciones;
                tiempo = estadisticaEvaluacion[submodulo].totalTiempo;
                correctas = estadisticaEvaluacion[submodulo].totalCorrectas;
                incorrectas = estadisticaEvaluacion[submodulo].totalIncorrectas;
            }
           
            return(
                <div className='estadistica-container'>
                    <div className='estadistica-modulo-titulo'>{submodulo.toUpperCase()}</div>
                    {tiempo? (
                        <>
                        <div>
                            <h4>Tiempo total: {formatTiempo(tiempo)} min</h4>
                            <h4>Evaluaciones: {cantidad}</h4>
                        </div>
                        <div className='grafica-container'>
                        <h4>Preguntas:</h4>
                            <Chart
                                chartType='PieChart'
                                data={[["Preguntas", "Cantidad"], ["Correctas", correctas], ["Incorrectas", incorrectas]]}
                                options={options}
                                width={200}
                            />
                        </div>
                        
                        </>
                    ):(
                        <center><p>Realiza evaluaciones de este módulo para ver tus estadísticas</p></center>
                    )}
                </div>
            )
        })}
        <div className='estadistica-container'>
            <div className='estadistica-modulo-titulo'>Tiempos</div>
            <div>
                <h4>Tiempo total en el módulo de evaluación: {formatTiempo(getTiempoTotal())} min</h4>
            </div>
            <div className='grafica-container'>
                <h4>Tiempo [s]:</h4>
                    <Chart
                        chartType='ColumnChart'
                        data={[["Submodulo", "Tiempo", { role: "style" }], 
                        ["Fundamentos", (estadisticaEvaluacion["fundamentos"]?.totalTiempo || 0),  "#1a237e"], 
                        ["Melodia", (estadisticaEvaluacion["melodia"]?.totalTiempo || 0), "#e65100"],
                        ["Armonia", (estadisticaEvaluacion["armonia"]?.totalTiempo || 0), "#311b92"],
                        ["Ritmo", (estadisticaEvaluacion["ritmo"]?.totalTiempo || 0), "#00c853"]]}
                        options={options}
                        width={500}
                    />
            </div>
        </div>
        <div className='estadistica-container'>
            <div className='estadistica-modulo-titulo'>Respuestas</div>
            <div>
                <h4>Has hecho {getEvaluacionesTotal()} evaluaciones en total</h4>
                <p>Relacion de respuestas correctas vs incorrectas en total para cada módulo</p>
            </div>
            <div className='grafica-container'>
                <h4>Preguntas:</h4>
                    <Chart
                        chartType='Bar'
                        data={[["Submodulo", "Correctas", "Incorrectas"], 
                        ["Fundamentos", (estadisticaEvaluacion["fundamentos"]?.totalCorrectas || 0), (estadisticaEvaluacion["fundamentos"]?.totalIncorrectas || 0)], 
                        ["Melodia", (estadisticaEvaluacion["melodia"]?.totalCorrectas || 0),(estadisticaEvaluacion["melodia"]?.totalIncorrectas || 0)],
                        ["Armonia", (estadisticaEvaluacion["armonia"]?.totalCorrectas || 0),(estadisticaEvaluacion["armonia"]?.totalIncorrectas || 0)],
                        ["Ritmo", (estadisticaEvaluacion["ritmo"]?.totalCorrectas || 0),(estadisticaEvaluacion["ritmo"]?.totalIncorrectas || 0)]]}
                        options={options}
                        width={500}
                    />
            </div>
        </div>
    </div>
  )
}
