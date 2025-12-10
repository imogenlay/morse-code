const letters = [
    ".-",    // A
    "-...",  // B
    "-.-.",  // C
    "-..",   // D
    ".",     // E
    "..-.",  // F
    "--.",   // G
    "....",  // H
    "..",    // I
    ".---",  // J
    "-.-",   // K
    ".-..",  // L
    "--",    // M
    "-.",    // N
    "---",   // O
    ".--.",  // P
    "--.-",  // Q
    ".-.",   // R
    "...",   // S
    "-",     // T
    "..-",   // U
    "...-",  // V
    ".--",   // W
    "-..-",  // X
    "-.--",  // Y
    "--..",  // Z
];

const numbers = [
    "-----", // 0
    ".----", // 1
    "..---", // 2
    "...--", // 3
    "....-", // 4
    ".....", // 5
    "-....", // 6
    "--...", // 7
    "---..", // 8
    "----.", // 9
];

const MORSE_SPACE = "/";
const CHAR_CODE_OF_A = 65;
const CHAR_CODE_OF_0 = 48;

export const TEXT_CODE_TO_MORSE = 0;
export const TEXT_CODE_TO_ENGLISH = 1;
export const TEXT_CODE_FAILURE = 2;

export function checkTextForTranslationType(line) {

    const isMorseCode = /^[./\- ]+$/.test(line)
    if (isMorseCode)
        return TEXT_CODE_TO_ENGLISH;

    const isEnglish = /^[0-9A-Z .,!?]+$/.test(line)
    if (isEnglish)
        return TEXT_CODE_TO_MORSE;

    return TEXT_CODE_FAILURE;
}

export function translateToMorseCode(line) {

    let output = "";

    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === "." || c === "," || c === "!" || c === "?") {
            // Skip translating these.
            continue;
        }

        if (i !== 0) {
            // All letters have a space between in morse code.
            output += " ";
        }

        if (c === " ") {
            // Words use a slash as a 'space' in morse code.
            output += MORSE_SPACE;
            continue;
        }

        const charCode = c.charCodeAt(0);
        if (charCode >= CHAR_CODE_OF_A) {
            // The unicode characters already exist in alphabetical order, 
            // meaning that subtracting the char code of "A" from the
            // char code of the current letter, will give us the array index.
            output += letters[charCode - CHAR_CODE_OF_A];
        }
        else
            // Same goes for the numbers, but subtract the char code of "0".
            output += numbers[charCode - CHAR_CODE_OF_0];
    }

    return output;
}

export function translateToEnglish(line) {
    const morseCharacters = line.split(' ').filter(Boolean);
    let output = "";

    for (let i = 0; i < morseCharacters.length; i++) {
        const c = morseCharacters[i];

        if (c === MORSE_SPACE) {
            output += " ";
            continue;
        }

        let arrayIndex = letters.indexOf(c);
        if (arrayIndex >= 0) {
            output += String.fromCharCode(CHAR_CODE_OF_A + arrayIndex);
            continue;
        }

        arrayIndex = numbers.indexOf(c);
        if (arrayIndex >= 0) {
            output += String.fromCharCode(CHAR_CODE_OF_0 + arrayIndex);
            continue;
        }

        output += "?";
    }

    return output;
}

export function translateFailure(line) {

    if (!line)
        return "";
    const filteredSet = new Set(line.match(/[^0-9A-Z./\- ]/g));
    return "Cannot translate characters: " + [...filteredSet].join(", ");
}