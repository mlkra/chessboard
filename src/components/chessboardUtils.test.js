import { calculateBoardCoordsFromMouseEvent, convertBoardCoordsToCoordinateNotation, convertFENToInternalRepresentation } from "./chessboardUtils";

describe("convertFENToInternalRepresentation", () => {
    test("empty board", () => {
        const board = convertFENToInternalRepresentation("8/8/8/8/8/8/8/8 w - - 0 1");
        board.map(row => row.map(piece => expect(piece).toBeNull()));
    });
    test("starting board", () => {
        const expectedBoard = [
            ["r", "n", "b", "q", "k", "b", "n", "r"],
            Array(8).fill("p"),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill("P"),
            ["R", "N", "B", "Q", "K", "B", "N", "R"],
        ];
        const board = convertFENToInternalRepresentation("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1");
        expect(board).toEqual(expectedBoard);
    });
    test("board full of black pawns", () => {
        const expectedBoard = Array(8).fill(Array(8).fill("p"));
        const board = convertFENToInternalRepresentation("pppppppp/pppppppp/pppppppp/pppppppp/pppppppp/pppppppp/pppppppp/pppppppp w - - 0 1");
        expect(board).toEqual(expectedBoard);
    });
});

describe("calculateBoardCoordsFromMouseEvent", () => {
    function createFakeEvent({ rectX = 0, rectY = 0, rectWidth = 80, rectHeight = 80, clientX, clientY }) {
        return {
            currentTarget: {
                getBoundingClientRect: () => {
                    return {
                        x: rectX,
                        y: rectY,
                        width: rectWidth,
                        height: rectHeight,
                    };
                }
            },
            clientX: clientX,
            clientY: clientY,
        };
    }

    it("takes client coords into account", () => {
        let event;
        let coords;

        event = createFakeEvent({ clientX: 0, clientY: 0 });
        coords = calculateBoardCoordsFromMouseEvent(event);
        expect(coords.x).toEqual(0);
        expect(coords.y).toEqual(0);

        event = createFakeEvent({ clientX: 0, clientY: 79 });
        coords = calculateBoardCoordsFromMouseEvent(event);
        expect(coords.x).toEqual(0);
        expect(coords.y).toEqual(7);

        event = createFakeEvent({ clientX: 79, clientY: 79 });
        coords = calculateBoardCoordsFromMouseEvent(event);
        expect(coords.x).toEqual(7);
        expect(coords.y).toEqual(7);

        event = createFakeEvent({ clientX: 45, clientY: 45 });
        coords = calculateBoardCoordsFromMouseEvent(event);
        expect(coords.x).toEqual(4);
        expect(coords.y).toEqual(4);
    });
    it("takes board size into account", () => {
        let event;
        let coords;

        event = createFakeEvent({ rectWidth: 80, rectHeight: 80, clientX: 10, clientY: 10 });
        coords = calculateBoardCoordsFromMouseEvent(event);
        expect(coords.x).toEqual(1);
        expect(coords.y).toEqual(1);

        event = createFakeEvent({ rectWidth: 40, rectHeight: 40, clientX: 10, clientY: 10 });
        coords = calculateBoardCoordsFromMouseEvent(event);
        expect(coords.x).toEqual(2);
        expect(coords.y).toEqual(2);
    });
    it("takes board position into account", () => {
        let event;
        let coords;

        event = createFakeEvent({ rectX: 80, rectY: 80, clientX: 90, clientY: 90 });
        coords = calculateBoardCoordsFromMouseEvent(event);
        expect(coords.x).toEqual(1);
        expect(coords.y).toEqual(1);

        event = createFakeEvent({ rectX: 40, rectY: 40, clientX: 50, clientY: 50 });
        coords = calculateBoardCoordsFromMouseEvent(event);
        expect(coords.x).toEqual(1);
        expect(coords.y).toEqual(1);
    });
});

describe("convertBoardCoordsToCoordinateNotation", () => {
    test("extreme cases", () => {
        expect(convertBoardCoordsToCoordinateNotation({x: 0, y: 0})).toEqual("a8");
        expect(convertBoardCoordsToCoordinateNotation({x: 7, y: 7})).toEqual("h1");
        expect(convertBoardCoordsToCoordinateNotation({x: 0, y: 7})).toEqual("a1");
        expect(convertBoardCoordsToCoordinateNotation({x: 7, y: 0})).toEqual("h8");
    });
    test("middle of the board", () => {
        expect(convertBoardCoordsToCoordinateNotation({x: 3, y: 3})).toEqual("d5");
        expect(convertBoardCoordsToCoordinateNotation({x: 4, y: 4})).toEqual("e4");
        expect(convertBoardCoordsToCoordinateNotation({x: 3, y: 4})).toEqual("d4");
        expect(convertBoardCoordsToCoordinateNotation({x: 4, y: 3})).toEqual("e5");
    });
});
