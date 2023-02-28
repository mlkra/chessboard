import { isDigit } from "./charUtils";

describe("isDigit", () => {
    test.each(["0", "9"])('%s is a digit', (digit) => {
        expect(isDigit(digit)).toBe(true);
    });
    test.each(["\0", "/", ":", String.fromCharCode(127)])("%s is not a digit", (char) => {
        expect(isDigit(char)).toBe(false);
    });
});
