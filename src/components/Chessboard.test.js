import React from "react";
import renderer from "react-test-renderer";
import Chessboard from "./Chessboard";

describe("Chessboard", () => {
    it("renders correctly with default fen", () => {
        expect(renderer.create(<Chessboard />).toJSON()).toMatchSnapshot();
    });
    it("renders empty board", () => {
        expect(renderer.create(<Chessboard fen="8/8/8/8/8/8/8/8 w - - 0 1" />).toJSON()).toMatchSnapshot();
    });
    it("renders board full of black pawns", () => {
        expect(renderer.create(<Chessboard fen="pppppppp/pppppppp/pppppppp/pppppppp/pppppppp/pppppppp/pppppppp/pppppppp w - - 0 1" />).toJSON()).toMatchSnapshot();
    });
});
