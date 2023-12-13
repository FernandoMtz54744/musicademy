import {getRandomNumber, suffle} from "../src/utils.js"

// const ejercicio = {
//     id: "",
//     pregunta: "",
//     partitura: {
//         display: true,
//         escala: "",
//         clave:"",
//         notas:[{nota: "C", duracion: "w", octava: 4}], 
//     },
//     opciones: [],
//     correcta: 0
// }

export const getEjercicio = (submodulo)=>{
    if(submodulo === "notas_musicales"){
        return ejercicio_notas_musicales();
    }else if(submodulo === "figuras_musicales"){
        return ejercicio_figuras_musicales();
    }else if(submodulo === "pentagrama"){
        return ejercicio_pentagrama();
    }else if(submodulo === "claves"){
        return ejercicio_claves();
    }else if(submodulo === "solfeo"){
        return ejercicio_solfeo();
    }else if(submodulo === "intervalos"){
        if(getRandomNumber(2) == 0){
            return ejercicio_intervalos();
        }else{
            return ejercicio_intervalos2();
        }
    }else if(submodulo === "grados"){
        return ejercicio_grados();
    }else if(submodulo === "modos"){
        return ejercicio_modos();
    }else if(submodulo === "compases"){
        return ejercicio_compases();
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

const ejercicio_figuras_musicales = ()=>{
    const ejercicio = {}
    ejercicio.id = "figuras_musicales";
    ejercicio.partitura = {
        display: true,
        escala: "C",
        clave: "treble",
        notas: [{nota: "A", duracion: "w", octava: 4}]
    }
    ejercicio.opciones = suffle( ["Redonda", "Blanca", "Negra", "Corchea"]);
    ejercicio.correcta = getRandomNumber(ejercicio.opciones.length);
    if(ejercicio.opciones[ejercicio.correcta] === "Redonda"){
        ejercicio.partitura.notas[0].duracion = "w";
    }else if(ejercicio.opciones[ejercicio.correcta] === "Blanca"){
        ejercicio.partitura.notas[0].duracion = "h";
    }else if(ejercicio.opciones[ejercicio.correcta] === "Negra"){
        ejercicio.partitura.notas[0].duracion = "q";
    }else{
        ejercicio.partitura.notas[0].duracion = "8";
    }
    ejercicio.pregunta = "¿Cuál es el nombre de la siguiente figura musical?";
    return ejercicio;
}

const ejercicio_pentagrama = ()=>{
    const ejercicio = {
        id: "pentagrama",
        pregunta: "¿En qué linea o espacio se encuentra la nota?",
        partitura: {
            display: true,
            escala: "C",
            clave: "treble",
            notas: [{nota: "C", duracion: "w", octava: 4}]
        },
        opciones: []
    }
    const notasLineas = [{nota:"E",octava:4}, {nota:"G",octava:4}, {nota:"B",octava:4}, {nota:"D",octava:5}, {nota:"F",octava:5}];
    const notasEspacios = [{nota:"F",octava:4}, {nota:"A",octava:4}, {nota:"C",octava:5}, {nota:"E",octava:5}];
    const tipo = ["linea", "espacio"][getRandomNumber(2)];
    const linea_espacio_index = tipo === "linea"? getRandomNumber(5): getRandomNumber(4);

    if(tipo === "linea"){
        ejercicio.partitura.notas[0].nota = notasLineas[linea_espacio_index].nota;
        ejercicio.partitura.notas[0].octava = notasLineas[linea_espacio_index].octava;
    }else{
        ejercicio.partitura.notas[0].nota = notasEspacios[linea_espacio_index].nota;
        ejercicio.partitura.notas[0].octava = notasEspacios[linea_espacio_index].octava;
    }

    let opcionesIndex = [0,1,2,3,4];
    if(tipo === "espacio"){
        opcionesIndex.pop();
    }
    suffle(opcionesIndex);
    opcionesIndex.slice(0,4);

    ejercicio.correcta = opcionesIndex.indexOf(linea_espacio_index);
    if(ejercicio.correcta === -1){
        opcionesIndex[getRandomNumber(4)] = linea_espacio_index;
    }
    
    for(let i=0; i<4; i++){
        ejercicio.opciones[i] = `${tipo} ${opcionesIndex[i]+1}`;
    }

    return ejercicio;
}

const ejercicio_claves = ()=>{
    const ejercicio = {
        id: "claves",
        pregunta: "¿Qué clave tiene el siguiente pentagrama?",
        partitura: {
            display: true,
            escala: "C",
            clave: "treble",
            notas: [{nota: "C", duracion: "q", octava: 4},{nota: "D", duracion: "q", octava: 4},{nota: "E", duracion: "q", octava: 4}, {nota: "F", duracion: "q", octava: 4}]
        },
        opciones: [],
        correcta: 0
    }

    const opciones = ["Sol", "Fa", "Do"];
    suffle(opciones);
    ejercicio.correcta = getRandomNumber(opciones.length);
    if(opciones[ejercicio.correcta] === "Fa"){
        ejercicio.partitura.clave = "bass";
        for(let i = 0; i<ejercicio.partitura.notas.length; i++){
            ejercicio.partitura.notas[i].octava = 3;
        }
    }else if(opciones[ejercicio.correcta] === "Do"){
        ejercicio.partitura.clave = "alto";
    }
    
    for(let i=0; i<opciones.length; i++){
        ejercicio.opciones.push(opciones[i].replace("Sol", "Clave de Sol").replace("Fa", "Clave de Fa").replace("Do", "Clave de Do"))
    }

    return ejercicio;
}

const ejercicio_solfeo = ()=>{
    const ejercicio = {
        id: "solfeo",
        pregunta: "¿Qué nota es la siguiente?",
        partitura: {
            display: true,
            escala: "C",
            clave: "treble",
            notas: [{nota: "C", duracion: "q", octava: 4}]
        },
        opciones: [],
        correcta: 0
    }
    
    let notas = ["C", "D", "E", "F", "G", "A", "B"];
    ejercicio.partitura.clave = ["treble", "bass"][getRandomNumber(2)];
    suffle(notas);
    notas = notas.slice(0,4);
    ejercicio.correcta = getRandomNumber(4);
    ejercicio.partitura.notas[0].nota = notas[ejercicio.correcta];
    if(ejercicio.partitura.clave === "bass"){
        ejercicio.partitura.notas[0].octava = 3;  
    }
    ejercicio.opciones = notas;

    return ejercicio;
}

const ejercicio_intervalos = ()=>{
    const ejercicio = {
        id: "intervalos",
        pregunta: "¿Qué intervalo hay entre estas dos notas?",
        partitura: {
            display: true,
            escala: "C",
            clave: "treble",
            notas: [{nota: "C", duracion: "q", octava: 4}, {nota: "", duracion: "q", octava: 4}]
        },
        opciones: [],
        correcta: 0
    }

    const posiblesNotas = ["D", "E", "F", "G", "A", "B"];
    const nombreIntervalos = ["2da Mayor", "3ra Mayor", "4ta Justa", "5ta Justa", "6ta Mayor", "7ma Mayor"];

    const opcionesTemp = suffle(posiblesNotas.slice()).slice(0,4);
    ejercicio.correcta = getRandomNumber(4);
    ejercicio.partitura.notas[1].nota = opcionesTemp[ejercicio.correcta];

    for(let i=0; i<opcionesTemp.length; i++){
        ejercicio.opciones.push(nombreIntervalos[posiblesNotas.indexOf(opcionesTemp[i])]);
    }

    return ejercicio;
}

const ejercicio_intervalos2 = ()=>{
    const ejercicio = {
        id: "intervalos",
        pregunta: "",
        partitura: {
            display: false,
        },
        opciones: [],
        correcta: 0
    }

    const nombreIntervalos = ["2da Mayor", "3ra Mayor", "4ta Justa", "5ta Justa", "6ta Mayor", "7ma Mayor"];
    const tonos = ["1 Tono", "2 Tonos", "2 Tonos + 1 Semitono", "3 Tonos + 1 Semitono", "4 Tonos + 1 Semitono", "5 Tonos + 1 Semitono"];

    const opciones = suffle(nombreIntervalos.slice()).slice(0,4);
    ejercicio.correcta = getRandomNumber(4);
    ejercicio.pregunta = `¿Cuántos tonos y semitonos hay entre un intervalo de ${opciones[ejercicio.correcta]}?`;

    for(let i=0; i<opciones.length; i++){
        ejercicio.opciones.push(tonos[nombreIntervalos.indexOf(opciones[i])]);
    }

    return ejercicio;
}

const ejercicio_grados = ()=>{
    const ejercicio = {
        id: "grados",
        pregunta: "",
        partitura: {
            display: false,
        },
        opciones: [],
        correcta: 0
    }

    const gradosNumeros = ["I", "II", "III", "IV", "V", "VI", "VII"];
    const gradosNombres = ["Tónica", "Supertónica", "Mediante", "Subdominante", "Dominante", "Superdominante o Submediante", "Sensible"];

    const opcionesTemp = suffle(gradosNumeros.slice()).slice(0,4);
    ejercicio.correcta = getRandomNumber(4);
    ejercicio.pregunta = `¿Al grado ${opcionesTemp[ejercicio.correcta]} también se le llama?`
    for(let i=0; i<opcionesTemp.length; i++){
        ejercicio.opciones.push(gradosNombres[gradosNumeros.indexOf(opcionesTemp[i])]);
    } 

    return ejercicio;
}

const ejercicio_modos = ()=>{
    const ejercicio = {
        id: "modos",
        pregunta: "",
        partitura: {
            display: false,
        },
        opciones: [],
        correcta: 0
    }

    const grados = ["PRIMER", "SEGUNDO", "TERCER", "CUARTO", "QUINTO", "SEXTO", "SÉPTIMO"];
    const nombreModo = ["Jónico o Iónico", "Dórico", "Frigio", "Lidio", "Mixolidio", "Eólico", "Locrio"];

    const opcionesTemp = suffle(grados.slice()).slice(0,4);
    ejercicio.correcta = getRandomNumber(4);
    ejercicio.pregunta = `Al modo que comienza el ${opcionesTemp[ejercicio.correcta]} grado de la escala diatónca mayor también se le llama...`;

    for(let i=0; i<opcionesTemp.length; i++){
        ejercicio.opciones.push(nombreModo[grados.indexOf(opcionesTemp[i])]);
    }

    return ejercicio;
}

const ejercicio_compases = ()=>{
    const ejercicio = {
        id: "compases",
        pregunta: "",
        partitura: {
            display: false,
        },
        opciones: [],
        correcta: 0
    }
    const compases = ["4/4", "C", "2/2", "2/4", "3/4"];
    const definicion = ["Compás más utilizado en la música occidental, es el patrón rítmico de muchas de las canciones de la actualidad",
                        "Es otra forma de representar al compás de 4/4 y su símbolo significa 'tiempo común'",
                        "Compás también conocido como tiempo cortado, tiene dos tiempos o pulsos de blanca por compás y suena casi igual que el 4/4, salvo que tiene un acento más fuerte en el tercer tiempo de cada compás (la segunda blanca)",
                        "Compás especialmente popular en polcas, marchas y otros géneros de música bailable",
                        "Compás que se caracteriza por ser del elegante vals y de muchas canciones populares y pop"];

    const opcionesTemp = suffle(compases.slice()).slice(0,4);
    ejercicio.correcta = getRandomNumber(4);
    ejercicio.pregunta = definicion[compases.indexOf(opcionesTemp[ejercicio.correcta])]
    ejercicio.opciones = opcionesTemp;
    return ejercicio;
}