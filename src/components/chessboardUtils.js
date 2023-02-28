import { isDigit } from "../charUtils";

export function convertFENToInternalRepresentation(fen) {
    const splitFEN = fen.substring(0, fen.indexOf(" ")).split("/");
    const board = [];
    for (const line of splitFEN) {
        const row = [];
        for (var i = 0; i < line.length; i++) {
            const char = line[i];
            if (isDigit(char)) {
                for (var j = 0; j < parseInt(char); j++) {
                    row.push(null);
                }
            } else {
                row.push(char);
            }
        }
        board.push(row);
    }
    return board;
}

export function calculateBoardCoordsFromMouseEvent(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
        x: Math.floor((event.clientX - rect.x) / Math.floor(rect.width / 8)),
        y: Math.floor((event.clientY - rect.y) / Math.floor(rect.height / 8)),
    };
}

export function convertBoardCoordsToCoordinateNotation(coords) {
    return `${String.fromCharCode(97 + coords.x)}${8 - coords.y}`;
}
