
import * as Translate from "./translate.js";

const header = document.getElementById("header");
const main = document.getElementById("main");
const inputArea = document.getElementById("input");
const translateButton = document.getElementById("translate");
const outputArea = document.getElementById("output");
const copyButton = document.getElementById("copy");

inputArea.value = "The message below is secret!\n\n" +
    "- .... .. ... / .. ... / .- / ... . -.-. .-. . - / -- . ... ... .- --. .";

/*
TODO:
Add a copy to clipboard button
Add a jest test script for my translate.js functions
Nice styles for the page 
*/

function runTranslation() {
    const inputLines = inputArea.value.toUpperCase().split(/\r?\n|\r/);

    const outputLines = inputLines.map((line) => {
        const textCode = Translate.checkTextForTranslationType(line);

        if (textCode === Translate.TEXT_CODE_TO_MORSE)
            return Translate.translateToMorseCode(line);

        if (textCode === Translate.TEXT_CODE_TO_ENGLISH)
            return Translate.translateToEnglish(line);

        if (textCode === Translate.TEXT_CODE_FAILURE)
            return Translate.translateFailure(line);

        return "ERROR";
    });
    outputArea.textContent = outputLines.join("\n");
}

function toClipboard() {
    navigator.clipboard.writeText(outputArea.textContent);
}

translateButton.addEventListener("click", runTranslation);
copyButton.addEventListener("click", toClipboard);



