import {getRandomNumber, suffle} from "../src/utils.js"

// const ejercicio = {
//     id: "",
//     pregunta: "",
//     partitura: {
//         display: true,
//         escala: "",
//         clave:"",
//         notas:[]
//     },
//     opciones: [],
//     correcta: 0
// }

export const getEjercicio = (submodulo)=>{
    if(submodulo === "notas_musicales"){
        return ejercicio_notas_musicales();
    }else if(submodulo === ""){

    }

}

const ejercicio_notas_musicales = ()=>{
    const notasIngles = ["C", "D", "E", "F", "G", "A", "B"];
    const notasEsp = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];
    const ejercicio = {};
    ejercicio.id = "notas_musicales"; 
    ejercicio.partitura = {display: false};
    const suffleNotes = suffle(notasEsp.slice());
    ejercicio.opciones = [];
    for (let i=0; i < 4; i++) {
        ejercicio.opciones.push(suffleNotes[i]);
    }
    ejercicio.correcta = getRandomNumber(ejercicio.opciones.length); 
    ejercicio.pregunta = `La nota ${notasIngles[notasEsp.indexOf(ejercicio.opciones[ejercicio.correcta])]} en el sistema inglés corresponde a la nota...`
    console.log(ejercicio);
    return ejercicio;
}