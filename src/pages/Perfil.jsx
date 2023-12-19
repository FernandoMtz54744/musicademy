import React, { useState } from 'react'
import Header from './Header'
import "../styles/perfil.css"
import EstadisticasEvaluacion from './estadisticas/EstadisticasEvaluacion'
import EstadisticasTeoria from './estadisticas/EstadisticasTeoria'
import EstadisticasPracticas from './estadisticas/EstadisticasPracticas'
import EstadisticasMinijuegos from './estadisticas/EstadisticasMinijuegos'

export default function Perfil({user, handleOnClick, estadisticaActual, handleEditar, editState, data, handleOnChange, handleCancelar}) {

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
                    {editState === "mostrando"?(
                        <p>Usuario: {user.displayName}</p>    
                    ):(
                        <>
                        Usuario:<input type="text" value={data.displayName} name='displayName' onChange={handleOnChange} className='input-text'/>
                            {user.providerData[0].providerId !== "google.com" &&
                            <input type='password' value={data.password} name='password' onChange={handleOnChange}/>
                            }
                        </>
                    )}
                    <div className='button-container-perfil'>
                        <input className='input-button-pefil' type="submit" name='editar' value="Editar" onClick={handleEditar}/>
                        {editState === "editando" && <button className='input-button-pefil' onClick={handleCancelar}>Cancelar</button>}
                    </div>
                </form>
            </div>
            <div>
                <h1>Seleccione el módulo para ver sus estadísticas</h1>
                <div className='module-select-container'>
                    <div className={`module-button teoria-button-stadistic ${estadisticaActual === "teoria"?"teoria-button-stadistic-active":""}`} onClick={()=>handleOnClick("teoria")}>Teoría y Ejercicios</div>
                    <div className={`module-button practicas-button-stadistic ${estadisticaActual === "practicas"?"practicas-button-stadistic-active":""}`} onClick={()=>handleOnClick("practicas")}>Prácticas</div>
                    <div className={`module-button evaluaciones-button-stadistic ${estadisticaActual === "evaluaciones"?"evaluaciones-button-stadistic-active":""}`} onClick={()=>handleOnClick("evaluaciones")}>Evaluaciones</div>
                    {/* <div className={`module-button minijuegos-button-stadistic ${estadisticaActual === "minijuegos"?"minijuegos-button-stadistic-active":""}`} onClick={()=>handleOnClick("minijuegos")}>Minijuegos</div> */}
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
