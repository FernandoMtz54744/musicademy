import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../res/Logo.svg"

export default function () {
  return (
    <div>
        <header className='header header-black'>
        <img src={logo} className="logo" alt='logo'/>
        <div className='header-links'>
          <Link to="/acerca">Acerca de</Link>
          <Link to="/">Inicio</Link>
          <Link to="/Login">Login</Link>
          <Link to="/registro">Registro</Link>
        </div>
      </header>
      <div>
      <div className='acerca-container'>
        <p>
            <h1>¡Bienvenido a "Musicademy"!</h1>
            ¡Tu plataforma interactiva para el aprendizaje básico de teoría musical! Estamos emocionados 
            de ofrecerte una experiencia educativa única diseñada para introducirte en el fascinante mundo de la música de
            manera accesible y entretenida.
        </p>
        <p><h2>Nuestros Módulos Principales:</h2></p>
        <p className='acerca-teoria'>
            <h3>Teoría y Ejercicios:</h3>
            En este módulo, te sumergirás en los fundamentos esenciales de la teoría musical. Explorarás conceptos clave como notas, escalas, acordes y más, a través de contenido informativo y ejercicios didácticos. Nuestros videos te guiarán paso a paso, haciendo que la teoría musical sea fácil de entender, incluso si eres un principiante absoluto.
        </p>
        <p className='acerca-practicas'>
            <h3>Prácticas:</h3>
            La práctica es la clave para convertirte en un az de la teoría musical. En este módulo, te ofrecemos ejercicios que abarcan ritmo, armonía y acordes. Cada ejercicio está diseñado para poner tus propios límites.
        </p>
        <p className='acerca-evaluacion'>
            <h3>Evaluación:</h3>
            Ponte a prueba con nuestro módulo de evaluación. Desafía tus conocimientos adquiridos en cada sección de la teoría a través de cuestionarios con 10 preguntas cada uno. Recibirás retroalimentación instantánea para medir tu progreso y comprender las áreas que necesitas reforzar. ¡Es el paso perfecto para consolidar tu aprendizaje!
        </p>
        <h2>
            ¡Descubre el placer de aprender música de manera fácil y divertida! ¡Bienvenido a "Musicademy"!
        </h2>
        </div>
      </div>
    </div>
  )
}
