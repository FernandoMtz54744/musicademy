import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firabase.config';
import { useAuth } from '../../context/AuthContext';
import Chart from 'react-google-charts';

export default function EstadisticasEvaluacion() {

    const [estadisticaEvaluacion,setEstadisticaEvaluacion] = useState({});
    const auth = useAuth();
    const submodulo = ["fundamentos", "melodia", "armonia", "ritmo"];
    const options = {
        legend: {position: "bottom"},
        backgroundColor: "#F5F5F5",
        titlePosition:"none"
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
  
  return (
    <div className='estadisticas-container'>
        {submodulo.map((submodulo)=>{
            let tiempoPromedio = 0;
            let correctasPromedio = 0;
            let incorrectasPromedio = 0;
            let cantidad = 0;
            if(estadisticaEvaluacion[submodulo]){
                cantidad = estadisticaEvaluacion[submodulo].numeroEvaluaciones;
                tiempoPromedio = estadisticaEvaluacion[submodulo].totalTiempo/cantidad;
                correctasPromedio = estadisticaEvaluacion[submodulo].totalCorrectas/cantidad;
                incorrectasPromedio = estadisticaEvaluacion[submodulo].totalIncorrectas/cantidad;

            }
           
            return(
                <div className='estadistica-container'>
                    <h2>{submodulo.toUpperCase()}</h2>
                    {tiempoPromedio? (
                        <>
                        <h4>Tiempo promedio: {tiempoPromedio} segundos</h4>
                        <h4>Evaluaciones: {cantidad}</h4>
                        <h4>Preguntas:</h4>
                        <Chart
                            chartType='PieChart'
                            data={[["Preguntas", "Cantidad"], ["Correctas", correctasPromedio], ["Incorrectas", incorrectasPromedio]]}
                            options={options}
                        />
                        </>
                    ):(
                        <center><h4>Realiza evaluaciones de este módulo para ver tus estadísticas</h4></center>
                    )}
                    
                </div>
            )
        })}
    </div>
  )
}
