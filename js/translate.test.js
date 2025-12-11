import * as Translate from "./translate.js";

test("Translation text is not properly sanitised", () => {
    // Bad input, should throw an error. 
    expect(() => Translate.translateLine("contains \newline")).toThrow(Translate.ERROR_LINE_NOT_SANITISED);
});

test("Get correct translation type", () => {
    expect(Translate.checkTextForTranslationType("**_WILL_GET_FAILURE_**")).toBe(Translate.TEXT_CODE_FAILURE);
    expect(Translate.checkTextForTranslationType("HELLO")).toBe(Translate.TEXT_CODE_TO_MORSE);
    expect(Translate.checkTextForTranslationType("-- --- .-. ... .")).toBe(Translate.TEXT_CODE_TO_ENGLISH);
});

test("Translate to Morse code", () => {
    // At this point the text is sanitised to capitals, numbers and a few bits of punctuation.
    expect(Translate.translateToMorseCode("HELLO")).toBe(".... . .-.. .-.. ---");
    // Filter out punctuation, except space.
    expect(Translate.translateToMorseCode("123 456")).toBe(".---- ..--- ...-- / ....- ..... -....");
    expect(Translate.translateToMorseCode("HI, LARRY!")).toBe(".... .. / .-.. .- .-. .-. -.--");
});

test("Translate to English", () => {
    // At this point the text is sanitised to dot, dash, slash and space.
    expect(Translate.translateToEnglish(".... . .-.. .-.. ---")).toBe("HELLO");
    expect(Translate.translateToEnglish(".---- ..--- ...-- / ....- ..... -....")).toBe("123 456");
    expect(Translate.translateToEnglish(".... .. / .-.. .- .-. .-. -.--")).toBe("HI LARRY");
});

test("Translation cannot be handled", () => {
    // An empty line just returns an empty line.
    expect(Translate.translateFailure("")).toBe("");
    // Text is too complicated.
    expect(Translate.translateFailure(".... . .-.. .-.. --- THERE")).toBe("ALERT: Cannot have both English and Morse Code in the same line.");
    expect(Translate.translateFailure("50% OF $1 IS 50C")).toBe("ALERT: Cannot translate characters: %, $");
});