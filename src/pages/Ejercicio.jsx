import React, { useEffect, useState } from 'react'
import { getEjercicio } from '../ejercicios';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firabase.config';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export default function Ejercicio({ejercicioState, titulo, setEjercicioState, subtema, submodulo}) {
    const ejercicioData = {
        id: "",
        pregunta: "",
        partitura: {
            display: true,
            escala: "",
            clave:"",
            notas:[]
        },
        opciones: [],
        correcta: 0
    }
    const [ejercicio, setEjercicio] = useState();
    const [userAnswer, setUserAnswer] = useState(0);
    const [isAnswering, setIsAnswering] = useState(false);
    const [result, setResult] = useState("incorrecto");
    const usuarioContext = useAuth();

    const generarEjercicio = ()=>{
        setEjercicio(getEjercicio(subtema));
        setEjercicioState("realizando")
        setIsAnswering(true);
    }

    const handleChange = (e)=>{
        if(isAnswering){
            setUserAnswer(Number(e.target.value));
        }
    }

    const validarEjercicio = ()=>{
        setIsAnswering(false);
        if(userAnswer === ejercicio.correcta){
            setResult("correcto");
            // Subir a BD
            guardarEjercicio(); 
            console.log(submodulo+"/"+subtema);

        }else{
            setResult("incorrecto");
        }
    }

    const guardarEjercicio = () =>{
        const collectionRef = collection(db, "Usuarios", usuarioContext.user.uid, "Teoria");
        addDoc(collectionRef, {
            submodulo: submodulo,
            ejercicio: submodulo+"/"+subtema
        }).then(()=>{
            console.log("Datos agregados");
        }).catch((error)=>{
            console.log("Error al agregar datos", error);
        })
    }

    const handleContinue = ()=>{
        if(result === "correcto"){
            setEjercicioState("realizado")
        }else{
            setEjercicioState("sin realizar")
        }
    }

    useEffect(()=>{
        const collectionRef = collection(db, "Usuarios", usuarioContext.user.uid, "Teoria");
        const q = query(collectionRef, where("ejercicio", "==", submodulo+"/"+subtema));
        let cantidad = 0;
        getDocs(q).then((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                cantidad++;
            })
            if(cantidad > 0){
                setEjercicioState("realizado")
            }
        });
    },[])

  return (
    ejercicioState === "sin realizar" || ejercicioState === "realizado"?(
        <div className='ejercicio-container'>
            <h2>Ejercicio de {titulo}</h2>
            <div className='ejercicio-button-state-container'>
                <div className='ejercicio-estado-container'>
                    <div className={`ejercicio-circle ${ejercicioState === "sin realizar"?"ejercicio-circle-red":"ejercicio-circle-green"}`}></div>
                    <h2>{ejercicioState === "sin realizar"?"Sin realizar":"Completado"}</h2>
                </div>
                    <button onClick={generarEjercicio}>{ejercicioState === "sin realizar"?"Realizar":"Volver a realizar"}</button>
            </div>
        </div>
    ):(
        <div className='ejercicio-container'>
            <h2>Ejercicio de {titulo}</h2>
            <h2>{ejercicio.pregunta}</h2>
            <div className='opciones-container-teoria'>
                {ejercicio.opciones.map((opcion, i)=>(
                    <label key={i} className={`opcion-container-teoria 
                    ${isAnswering?(userAnswer === i?"selected-op-teoria":""):(ejercicio.correcta === i?"ejercicio-correcta":
                    (userAnswer === i?"ejercicio-incorrecta":""))}`}>
                        
                        <input type='radio' name='opcion' value={i} className='radio-button-evaluation' onChange={handleChange}/>{opcion}
                    </label>
                ))}
            </div>
            <div className='ejercicio-button-container'>
                {isAnswering?(
                    <button onClick={validarEjercicio}>Responder ejercicio</button>
                ):(
                    <>
                    <button onClick={generarEjercicio}>Volver a responder</button>
                    <button onClick={handleContinue}>Continuar con la teoria</button>
                    </>
                )}
            </div>
        </div>
    ))
}
