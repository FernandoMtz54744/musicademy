const bemolNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]; //Las 12 notas en modo bemol
const sharpNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]; //Las 12 notas musicales en modo sostenidos
const majorScales = ["C", "G", "D", "A", "E", "B", "F#", "C#", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"] //Todas las 15 escalas mayores
const minorScales = ["A", "E", "B", "F#", "C#", "G#", "D#", "A#", "D", "G", "C", "F", "Bb", "Eb", "Ab"] //Todas las 15 escalas menores
const majorKeyPattern = [0,2,4,5,7,9,11] //Patrón T-T-ST-T-T-T de una escala mayor
const triadPattern = [0,2,4] //Patron de un acorde (1ra, 3ra y 5ta) de la escala mayor/menor
const seventhPattern = [0,2,4,6] //Patrón de un acorde menor (1ra, 3ra y 5ta, 7ma) de la escala mayor/menor

//Devuelve un arreglo con las claves de un objeto JSON cuyo valor sea true
export const getTrueKeys = (json)=>{
    const keys = Object.keys(json);
    const trueKeys = keys.filter(key => json[key])
    return trueKeys;
}

//Devuelve un número entero al azar del 0 a max
export const getRandomNumber = (max)=>{
    return Math.trunc(Math.random() * max);
}

//Genera las notas que componen una escala 
export const getMajorKey = (escala)=>{
    const majorKey = [];
    let notesToSearch = [];
    if(escala.includes("b") || escala === "F"){ //Busca en bemoles
        notesToSearch = bemolNotes;
    }else{ //Busca en sostenidos
        notesToSearch = sharpNotes;
    }
    //Obtiene las 7 notas
    let index = notesToSearch.indexOf(escala);
    if(escala === "Cb"){index = notesToSearch.indexOf("B")}
    for(let i=0; i < 7; i++){
        majorKey.push(notesToSearch[(index+majorKeyPattern[i])%12]);
    }
    //Se validan los enarmónicos para las escalas
    if(escala === "F#"){
        majorKey[majorKey.indexOf("F")] = "E#";
    }else if(escala === "C#"){
        majorKey[majorKey.indexOf("F")] = "E#";
        majorKey[majorKey.indexOf("C")] = "B#";
    }else if(escala === "Gb"){
        majorKey[majorKey.indexOf("B")] = "Cb";
    }else if(escala === "Cb"){
        majorKey[majorKey.indexOf("B")] = "Cb";
        majorKey[majorKey.indexOf("E")] = "Fb";
    }
    return majorKey;
}

//Obtiene la escala empezando por cierta nota
export const getScaleStartingByNote = (note, scale)=>{
    const index = scale.indexOf(note);
    return scale.slice(index).concat(scale.slice(0, index));
}

//Obtiene una escala menor
export const getMinorKey = (escala)=>{
    const index = minorScales.indexOf(escala);
    const relativeMajorScale = getMajorKey(majorScales[index]);
    return getScaleStartingByNote(escala, relativeMajorScale);
}

//Obtiene la escala cromática (en bemoles o sostenidos dependiendo la escala) empezando en C
export const getChromaticScale = (escala, nota)=>{
    let chromaticScale = [];
    if(escala.includes("b") || escala === "F" || nota.includes("b")){ //Busca en bemoles
        chromaticScale = bemolNotes;
    }else{ //Busca en sostenidos
        chromaticScale = sharpNotes;
    }
    //Ajusta los enarmónicos
    if(escala === "F#"){
        chromaticScale[chromaticScale.indexOf("F")] = "E#";
    }else if(escala === "C#"){
        chromaticScale[chromaticScale.indexOf("F")] = "E#";
        chromaticScale[chromaticScale.indexOf("C")] = "B#";
    }else if(escala === "Gb"){
        chromaticScale[chromaticScale.indexOf("B")] = "Cb";
    }else if(escala === "Cb"){
        chromaticScale[chromaticScale.indexOf("B")] = "Cb";
        chromaticScale[chromaticScale.indexOf("E")] = "Fb";
    }
    
    console.log("La escala organizada es: " + chromaticScale);
    return chromaticScale;
} 

//Obtiene una escala musical aleatoria
export const getRandomKey= (type)=>{
    if(type === "mayor" || type === "maj7" || type === "septima"){
        return majorScales[getRandomNumber(majorScales.length)];
    }if (type === "menor" || type === "m7"){
        return minorScales[getRandomNumber(minorScales.length)];
    }
}

export const getChord = (fundamentalNote, type)=>{
    const chord = {
        key: fundamentalNote,
        name: getNameOfChord(fundamentalNote, type),
        type: type
    }
    console.log(chord);
    const notesOfChord = [];
    if(type === "mayor"){
        const majorScale = getMajorKey(fundamentalNote);
        for(let i=0; i<triadPattern.length; i++){
            notesOfChord.push(majorScale[triadPattern[i]]);
        }
        chord.chromaticScale = getChromaticScale(fundamentalNote, fundamentalNote);
        console.log(chord.chromaticScale);
    }else if(type === "menor"){
        const minorScale = getMinorKey(fundamentalNote);
        for(let i=0; i<triadPattern.length; i++){
            notesOfChord.push(minorScale[triadPattern[i]]);
        }
        chord.chromaticScale = getChromaticScale(majorScales[minorScale.indexOf(fundamentalNote)], majorScales[minorScale.indexOf(fundamentalNote)]);
    }else if(type === "aumentado"){
        
    }else if(type === "disminuido"){
        
    }else if(type === "septima"){
        const fourthDegreeNote = getMajorKey(fundamentalNote)[3];
        const majorScale = getMajorKey(fourthDegreeNote);
        const rotatedScale = getScaleStartingByNote(fundamentalNote, majorScale);
        console.log("SV: " + rotatedScale);
        for(let i=0; i<seventhPattern.length; i++){
            notesOfChord.push(rotatedScale[seventhPattern[i]]);
        }
        chord.chromaticScale = getChromaticScale(fundamentalNote, fundamentalNote);
    }else if(type === "maj7"){
        const majorScale = getMajorKey(fundamentalNote);
        console.log(majorScale);
        for(let i=0; i<seventhPattern.length; i++){
            notesOfChord.push(majorScale[seventhPattern[i]]);
        }
        chord.chromaticScale = getChromaticScale(fundamentalNote, fundamentalNote);
    }else if(type === "m7"){
        const minorScale = getMinorKey(fundamentalNote);
        for(let i=0; i<seventhPattern.length; i++){
            notesOfChord.push(minorScale[seventhPattern[i]]);
        }
        chord.chromaticScale = getChromaticScale(majorScales[minorScale.indexOf(fundamentalNote)], majorScales[minorScale.indexOf(fundamentalNote)]);
    }

    chord.notesOfChord = notesOfChord;
    return chord;
}

//Obtiene el nombre del acorde
export const getNameOfChord = (fundamentalNote, type)=>{
    let name = fundamentalNote;
    if(type === "menor"){
        name = name + "m";
    }else if(type === "aumentado"){
        name = name + "aug";
    }else if(type === "disminuido"){
        name = name + "dim";
    }else if(type === "septima"){
        name = name + "7";
    }else if(type === "maj7"){
        name = name + "Maj7";
    }else if(type === "m7"){
        name = name + "m7";
    }
    return name;
}