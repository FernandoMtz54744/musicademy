import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firabase.config';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import Chart from 'react-google-charts';

export default function EstadisticasPracticas() {
  
  const [estadisticas,setEstadisticas] = useState({});
    const auth = useAuth();
    const options = {
        legend: {position: "bottom"},
        backgroundColor: "#F5F5F5",
        titlePosition:"none",
        width: '100%' 
    }

    useEffect(()=>{
      const buildStadistic = async ()=>{
      const estadisticasTemp = {
        ritmo:{}, solfeo:{}, acordes:{}, melodia:{}
      }
      // Ritmo
      let collectionRef = collection(db, "Usuarios", auth.user.uid, "Ritmo");
      let querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc)=>{
        estadisticasTemp.ritmo.notasCorrectas = (estadisticasTemp.ritmo.notasCorrectas || 0) + doc.data().notasCorrectas;
        estadisticasTemp.ritmo.notasIncorrectas = (estadisticasTemp.ritmo.notasIncorrectas || 0) + doc.data().notasIncorrectas;
        estadisticasTemp.ritmo.ritmosCorrectos = (estadisticasTemp.ritmo.ritmosCorrectos || 0) + doc.data().ritmosCorrectos;
        estadisticasTemp.ritmo.ritmosIncorrectos = (estadisticasTemp.ritmo.ritmosIncorrectos || 0) + doc.data().ritmosIncorrectos;
        estadisticasTemp.ritmo.cantidad = (estadisticasTemp.ritmo.cantidad || 0) + 1;
      });
      // Solfeo
      collectionRef = collection(db, "Usuarios", auth.user.uid, "Solfeo");
      querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc)=>{
        estadisticasTemp.solfeo.notasCorrectas = (estadisticasTemp.solfeo.notasCorrectas || 0) + doc.data().notasCorrectas;
        estadisticasTemp.solfeo.notasIncorrectas = (estadisticasTemp.solfeo.notasIncorrectas || 0) + doc.data().notasIncorrectas;
        estadisticasTemp.solfeo.solfeosCorrectos = (estadisticasTemp.solfeo.solfeosCorrectos || 0) + doc.data().solfeosCorrectos;
        estadisticasTemp.solfeo.solfeosIncorrectos = (estadisticasTemp.solfeo.solfeosIncorrectos || 0) + doc.data().solfeosIncorrectos;
        estadisticasTemp.solfeo.cantidad = (estadisticasTemp.solfeo.cantidad || 0) + 1;
      });
      // Acordes
      collectionRef = collection(db, "Usuarios", auth.user.uid, "Acordes");
      querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc)=>{
        estadisticasTemp.acordes.notasCorrectas = (estadisticasTemp.acordes.notasCorrectas || 0) + doc.data().notasCorrectas;
        estadisticasTemp.acordes.notasIncorrectas = (estadisticasTemp.acordes.notasIncorrectas || 0) + doc.data().notasIncorrectas;
        estadisticasTemp.acordes.acordesCorrectos = (estadisticasTemp.acordes.acordesCorrectos || 0) + doc.data().acordesCorrectos;
        estadisticasTemp.acordes.acordesIncorrectos = (estadisticasTemp.acordes.acordesIncorrectos || 0) + doc.data().acordesIncorrectos;
        estadisticasTemp.acordes.cantidad = (estadisticasTemp.acordes.cantidad || 0) + 1;
      });
      console.log(estadisticasTemp);
      setEstadisticas(estadisticasTemp)
    }
    buildStadistic();
  },[]);

  return (
    <div className='estadisticas-container'>
      <div className='estadistica-container'>
        <div className='estadistica-modulo-titulo'>Práctica de Ritmo</div>
          {estadisticas.ritmo?.cantidad?(
            <>
            <h4>Prácticas realizadas: {estadisticas.ritmo.cantidad}</h4>
            <div className='grafica-container'>
            <h4>Ritmos: </h4>
            <Chart
              chartType='PieChart'
              data={[["Ritmos", "Cantidad"], ["Correctos", estadisticas.ritmo.ritmosCorrectos], 
                    ["Incorrectos", estadisticas.ritmo.ritmosIncorrectos]]}
              options={options}
              width={200}
            />
            </div>
            <div className='grafica-container'>
            <h4>Notas:</h4>
            <Chart
              chartType='PieChart'
              data={[["Notas", "Cantidad"], ["Correctas", estadisticas.ritmo.notasCorrectas], ["Incorrectas", estadisticas.ritmo.notasIncorrectas]]}
              options={options}
              width={200}
            />
            </div>
            </>
            ):(<center><p>Realiza prácticas de este ritmos para ver tus estadísticas</p></center>)}
      </div>

      <div className='estadistica-container'>
        <div className='estadistica-modulo-titulo'>Práctica de solfeo</div>
          {estadisticas.solfeo?.cantidad?(
            <>
            <h4>Prácticas realizadas: {estadisticas.solfeo.cantidad}</h4>
            <div className='grafica-container'>
            <h4>Solfeos: </h4>
            <Chart
              chartType='PieChart'
              data={[["Solfeos", "Cantidad"], ["Correctos", estadisticas.solfeo.solfeosCorrectos], 
                    ["Incorrectos", estadisticas.solfeo.solfeosIncorrectos]]}
              options={options}
              width={200}
            />
            </div>
            <div className='grafica-container'>
            <h4>Notas:</h4>
            <Chart
              chartType='PieChart'
              data={[["Notas", "Cantidad"], ["Correctas", estadisticas.solfeo.notasCorrectas], ["Incorrectas", estadisticas.solfeo.notasIncorrectas]]}
              options={options}
              width={200}
            />
            </div>
            </>
            ):(<center><p>Realiza prácticas de solfeos para ver tus estadísticas</p></center>)}
      </div>

      <div className='estadistica-container'>
        <div className='estadistica-modulo-titulo'>Práctica de Acordes</div>
          {estadisticas.acordes?.cantidad?(
            <>
            <h4>Prácticas realizadas: {estadisticas.acordes.cantidad}</h4>
            <div className='grafica-container'>
            <h4>Acordes: </h4>
            <Chart
              chartType='PieChart'
              data={[["Acordes", "Cantidad"], ["Correctos", estadisticas.acordes.acordesCorrectos], 
                    ["Incorrectos", estadisticas.acordes.acordesIncorrectos]]}
              options={options}
              width={200}
            />
            </div>
            <div className='grafica-container'>
            <h4>Notas:</h4>
            <Chart
              chartType='PieChart'
              data={[["Notas", "Cantidad"], ["Correctas", estadisticas.acordes.notasCorrectas], ["Incorrectas", estadisticas.acordes.notasIncorrectas]]}
              options={options}
              width={200}
            />
            </div>
            </>
            ):(<center><p>Realiza evaluaciones de acordes para ver tus estadísticas</p></center>)}
      </div>
            
    </div>
  )
}
