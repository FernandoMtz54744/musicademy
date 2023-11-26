const bemolNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]; //Las 12 notas en modo bemol
const sharpNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]; //Las 12 notas musicales en modo sostenidos
const majorScales = ["C", "G", "D", "A", "E", "B", "F#", "C#", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"] //Todas las 15 escalas mayores
const minorScales = ["A", "E", "B", "F#", "C#", "G#", "D#", "A#", "D", "G", "C", "F", "Bb", "Eb", "Ab"] //Todas las 15 escalas menores
const diminishedChords = ["B", "F#", "C#", "G#", "D#", "A#", "E#", "B#", "E", "A", "D", "G", "C", "F", "Bb"] //Todos los 15 acordes disminuidos
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

//Obtiene una escala musical aleatoria
export const getRandomKey= (type)=>{
    if(type === "mayor" || type === "maj7" || type === "septima"){
        return majorScales[getRandomNumber(majorScales.length)];
    }if (type === "menor" || type === "m7"){
        return minorScales[getRandomNumber(minorScales.length)];
    }if(type === "disminuido"){
        return diminishedChords[getRandomNumber(diminishedChords.length)];
    }
}

//Genera las notas que componen una escala 
export const getMajorScale = (tonic)=>{
    const majorScale = {
        tonic: tonic, //La nota fundamental de la escala
        notes: [], //Arreglo de las notas que componen la escala
        chromatic: [], //Arreglo de las notas cromaticas de donde se toma la escala
    }
    if(tonic.includes("b") || tonic === "F"){ //Busca en bemoles
        majorScale.chromatic = [...bemolNotes];
    }else{ //Busca en sostenidos
        majorScale.chromatic = [...sharpNotes];
    }
    //Se validan los enarmónicos para las escalas
    if(tonic === "F#"){
        majorScale.chromatic[majorScale.chromatic.indexOf("F")] = "E#";
    }else if(tonic === "C#"){
        majorScale.chromatic[majorScale.chromatic.indexOf("F")] = "E#";
        majorScale.chromatic[majorScale.chromatic.indexOf("C")] = "B#";
    }else if(tonic === "Gb"){
        majorScale.chromatic[ majorScale.chromatic.indexOf("B")] = "Cb";
    }else if(tonic === "Cb"){
        majorScale.chromatic[ majorScale.chromatic.indexOf("B")] = "Cb";
        majorScale.chromatic[ majorScale.chromatic.indexOf("E")] = "Fb";
    }
    //Se obtiene el indice de la tonica
    let index = majorScale.chromatic.indexOf(tonic);
    
    //Se agregan las notas
    for(let i=0; i < 7; i++){
        majorScale.notes.push(majorScale.chromatic[(index+majorKeyPattern[i])%12]);
    }
    return majorScale;
}

//Obtiene la escala empezando por cierta nota
export const getScaleStartingByNote = (note, scale)=>{
    const index = scale.indexOf(note);
    return scale.slice(index).concat(scale.slice(0, index));
}

//Obtiene una escala menor
export const getMinorScale = (tonic)=>{
    const minorScale = {
        tonic: tonic, //La nota fundamental de la escala
        notes: [], //Arreglo de las notas que componen la escala
        chromatic: [], //Arreglo de las notas cromaticas de donde se toma la escala
    }
    const index = minorScales.indexOf(tonic);
    const relativeMajorScale = getMajorScale(majorScales[index]);
    minorScale.notes = getScaleStartingByNote(tonic, relativeMajorScale.notes);
    minorScale.chromatic = relativeMajorScale.chromatic;
    return minorScale;
}

export const getChord = (tonic, type)=>{
    const chord = {
        type: type, //Tipo de acorde
        tonic: tonic, //Tonica de la escala de donde se puede formar con las mismas notas
        name: getChordName(tonic, type), //Nombre del acorde
        notes: [], //Notas que componen el acorde
        chromatic: [] //Escala cromatica de donde sale el acorde
    }
    if(type === "mayor"){
        const majorScale = getMajorScale(tonic);
        console.log(majorScale.notes);
        chord.chromatic = majorScale.chromatic;
        for(let i=0; i<triadPattern.length; i++){
            chord.notes.push(majorScale.notes[triadPattern[i]]);
        }
    }else if(type === "menor"){
        const minorScale = getMinorScale(tonic);
        chord.chromatic = minorScale.chromatic;
        for(let i=0; i<triadPattern.length; i++){
            chord.notes.push(minorScale.notes[triadPattern[i]]);
        }
    }else if(type === "aumentado"){
        
    }else if(type === "disminuido"){
        chord.tonic = majorScales[diminishedChords.indexOf(tonic)]; //Tonica de la escala mayor de donde el sale el acorde disminuido (septimo grado)
        const majorScale = getMajorScale(chord.tonic);
        chord.chromatic = majorScale.chromatic;
        majorScale.notes = getScaleStartingByNote(tonic, majorScale.notes); //Se ajusta las notas de la escala mayor para que empiecen desde el septimo grado
        for(let i=0; i<triadPattern.length; i++){
            chord.notes.push(majorScale.notes[triadPattern[i]]);
        }
    }else if(type === "septima"){ //Septima dominante
        const fourthDegreeNote = getMajorScale(tonic).notes[3]; //Se obtiene el cuarto grado de la escala mayor formada desde la tonica
        const majorScale = getMajorScale(fourthDegreeNote); //Se obtiene la escala mayor tomando como tónica el cuarto grado
        chord.chromatic = majorScale.chromatic;
        majorScale.notes = getScaleStartingByNote(tonic, majorScale.notes); //Se ajusta para que la escala mayor del cuarto grado empiece desde la tonica del acorde de séptima que se busca 
        for(let i=0; i<seventhPattern.length; i++){
            chord.notes.push(majorScale.notes[seventhPattern[i]]);
        }
    }else if(type === "maj7"){
        const majorScale = getMajorScale(tonic);
        chord.chromatic = majorScale.chromatic;
        for(let i=0; i<seventhPattern.length; i++){
            chord.notes.push(majorScale.notes[seventhPattern[i]]);
        }
    }else if(type === "m7"){
        const minorScale = getMinorScale(tonic);
        chord.chromatic = minorScale.chromatic;
        for(let i=0; i<seventhPattern.length; i++){
            chord.notes.push(minorScale.notes[seventhPattern[i]]);
        }
    }
    return chord;
}

//Obtiene el nombre del acorde
export const getChordName = (tonic, type)=>{
    let name = tonic;
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

// Obtiene una nota al azar de una escala
export const getRandomNoteByScale = (tonic)=>{
    const note = {
        tonic: tonic,
        note: "",
        chromatic: []
    }
    const majorScale = getMajorScale(note.tonic);//Se genera la escala
    note.chromatic = majorScale.chromatic; //Obtiene la escala cromática de donde se genera la escala
    note.note = majorScale.notes[getRandomNumber(majorScale.notes.length)];//Se obtiene una nota al azar de esa escala
    return note;
}

// Obtiene una nota al azar dependiendo de las alteraciones posibles (N, #, b)
export const getRandomNoteByAlteration = (alteration)=>{
    const note = {
        tonic: "C",
        note: "",
        chromatic: []
    }
    const majorScale = getMajorScale(note.tonic); //Se obtiene la escala de Do mayor
    note.note = majorScale.notes[getRandomNumber(majorScale.notes.length)]; //Se obtiene una nota al azar de C
    note.chromatic = majorScale.chromatic;
    if(alteration !== "N"){//Se le adjunta la alteración
        note.note+=alteration;    
    }
    note.chromatic = fixChromatic(note.note, note.chromatic); //Se ajusta la escala cromatica dependiendo la nota
    return note;
}

//Ajusta la escala cromatica dependiendo la nota (para getRandomNoteByAlteration)
const fixChromatic = (note, chromatic)=>{
    if(note.includes("b")){
        chromatic = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    }
    //Ajusta los enarmónicos
    if(note === "E#"){
        chromatic[chromatic.indexOf("F")] = "E#";
    }else if(note === "B#"){
        chromatic[chromatic.indexOf("F")] = "E#";
        chromatic[chromatic.indexOf("C")] = "B#";
    }else if(note === "Cb"){
        chromatic[chromatic.indexOf("B")] = "Cb";
    }else if(note === "Fb"){
        chromatic[chromatic.indexOf("B")] = "Cb";
        chromatic[chromatic.indexOf("E")] = "Fb";
    }
    return chromatic;
}