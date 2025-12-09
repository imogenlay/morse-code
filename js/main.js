const header = document.getElementById("header");
const main = document.getElementById("main");
const inputArea = document.getElementById("input");
const translateButton = document.getElementById("translate");
const outputArea = document.getElementById("output");

const letters =
{
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--.."
};

function translateToMorseCode(line) {
    return line + " to Morse";
}

function translateToEnglish(line) {
    const letters = line.split(' ').filter(Boolean);
    return line + " to English";
}

function runTranslation() {
    const inputLines = inputArea.value.toUpperCase().split(/\r?\n|\r/);

    const outputLines = inputLines.map((line) => {

        const isMorseCode = /^[./\- ]+$/.test(line)
        const isEnglish = /^[A-Z .]+$/.test(line)
        console.log(line);
        if (isMorseCode)
            return translateToEnglish(line);
        if (isEnglish)
            return translateToMorseCode(line);

        const filteredSet = new Set(line.match(/[^A-Z./\- ]/g));

        return "Cannot translate characters: " + [...filteredSet].join(", ");

    });
    outputArea.textContent = outputLines.join("\n");
}

translateButton.addEventListener("click", runTranslation);






