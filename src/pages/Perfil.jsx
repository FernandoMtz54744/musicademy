import React from 'react'
import Header from './Header'
import "../styles/perfil.css"
import EstadisticasEvaluacion from './estadisticas/EstadisticasEvaluacion'
import EstadisticasTeoria from './estadisticas/EstadisticasTeoria'
import EstadisticasPracticas from './estadisticas/EstadisticasPracticas'
import EstadisticasMinijuegos from './estadisticas/EstadisticasMinijuegos'

export default function Perfil({user, handleOnClick, estadisticaActual}) {
  return (
    <div>
        <Header headerColor={"header-black"}/>
        <main className='main-perfil'>
            <h1>Perfil y Estadísticas</h1>
            <div className='form-container-perfil'>
                {user.photoURL?(
                   <img src={user.photoURL} className='user-picture-perfil-module' alt="usuario-picture" />
                ):(
                    <h2>Datos</h2>
                )}
                <form action="" className='perfil-form'>
                    <p>Correo: {user.email}</p>
                    <p>Usuario: {user.displayName}</p>    
                    <div className='button-container-perfil'>
                        <input className='input-button-pefil' type="submit" name='editar' value="Editar"/>
                    </div>
                </form>
            </div>
            <div>
                <h1>Seleccione el módulo para ver sus estadísticas</h1>
                <div className='module-select-container'>
                    <div className={`module-button teoria-button-stadistic ${estadisticaActual === "teoria"?"teoria-button-stadistic-active":""}`} onClick={()=>handleOnClick("teoria")}>Teoría y Ejercicios</div>
                    <div className={`module-button practicas-button-stadistic ${estadisticaActual === "practicas"?"practicas-button-stadistic-active":""}`} onClick={()=>handleOnClick("practicas")}>Prácticas</div>
                    <div className={`module-button evaluaciones-button-stadistic ${estadisticaActual === "evaluaciones"?"evaluaciones-button-stadistic-active":""}`} onClick={()=>handleOnClick("evaluaciones")}>Evaluaciones</div>
                    <div className={`module-button minijuegos-button-stadistic ${estadisticaActual === "minijuegos"?"minijuegos-button-stadistic-active":""}`} onClick={()=>handleOnClick("minijuegos")}>Minijuegos</div>
                </div>
                {estadisticaActual && <center><h2>Tus estadísticas de {estadisticaActual.replace("teoria", "teoría").replace("practicas", "prácticas")}</h2></center>}
            </div>
            {estadisticaActual === "teoria"?(
                <EstadisticasTeoria/>
            ):(estadisticaActual === "practicas"?(
                <EstadisticasPracticas/>
            ):(estadisticaActual === "evaluaciones"?(
                <EstadisticasEvaluacion/>
            ):(estadisticaActual === "minijuegos"?(
                <EstadisticasMinijuegos/>
            ):(
                <></>
            ))))}
        </main>
    </div>
  )
}
