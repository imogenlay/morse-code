import * as Translate from "./translate.js";

const inputArea = document.getElementById("input");
const translateButton = document.getElementById("translate");
const outputArea = document.getElementById("output");
const copyButton = document.getElementById("copy");

function translateButtonEvent() {
    const inputLines = inputArea.value.split(/\r?\n|\r/);
    const outputLines = inputLines.map((line) => Translate.translateLine(line));
    outputArea.textContent = outputLines.join("\n");
}

function clipboardButtonEvent() {
    navigator.clipboard.writeText(outputArea.textContent);
}

translateButton.addEventListener("click", translateButtonEvent);
copyButton.addEventListener("click", clipboardButtonEvent);



