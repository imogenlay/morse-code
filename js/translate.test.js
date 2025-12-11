import * as Translate from "./translate.js";

test("Translation text is properly sanitised", () => {
    // Bad input, should throw an error.
    expect(() => Translate.checkTextForTranslationType("contains lowercase letters")).toThrow(Translate.ERROR_LINE_NOT_SANITISED);
    expect(() => Translate.checkTextForTranslationType("contains \newline")).toThrow(Translate.ERROR_LINE_NOT_SANITISED);
});

test("Get correct translation type", () => {
    expect(Translate.checkTextForTranslationType("**_WILL_FAIL_**")).toBe(Translate.TEXT_CODE_FAILURE);
    expect(Translate.checkTextForTranslationType("HELLO")).toBe(Translate.TEXT_CODE_TO_MORSE);
    expect(Translate.checkTextForTranslationType("-- --- .-. ... .")).toBe(Translate.TEXT_CODE_TO_ENGLISH);
});
