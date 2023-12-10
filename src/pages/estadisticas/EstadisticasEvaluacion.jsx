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
                            <h4>Tiempo total: {tiempo} segundos</h4>
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
    </div>
  )
}
