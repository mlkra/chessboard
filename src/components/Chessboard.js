import React from "react";
import "./Chessboard.css";
import { calculateBoardCoordsFromMouseEvent, convertBoardCoordsToCoordinateNotation, convertFENToInternalRepresentation } from "./chessboardUtils";
import pieces from "./pieces";

export default function Chessboard({ 
    fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1",
    onSquareSelected = () => {},
}) {
    const board = convertFENToInternalRepresentation(fen);

    let draggedPiece;

    function handleMouseDown(event) {
        console.log("down");
        draggedPiece = event.target;
        const coords = calculateBoardCoordsFromMouseEvent(event)
        onSquareSelected(convertBoardCoordsToCoordinateNotation(coords))
        event.preventDefault();
    }

    function handleMouseMove(event) {
        console.log("move");
        if (draggedPiece) {
            draggedPiece.style.transform = `translate(${event.pageX - draggedPiece.x - draggedPiece.width / 2}px,${event.pageY - draggedPiece.y - draggedPiece.height / 2}px)`;
        }
        event.preventDefault();
    }

    function handleMouseUp(event) {
        draggedPiece = null;
        const coords = calculateBoardCoordsFromMouseEvent(event)
        onSquareSelected(convertBoardCoordsToCoordinateNotation(coords))
        event.preventDefault();
    }

    return (
        <div className="chessboard" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            {board.map((row, rowIndex) => <div key={rowIndex} className="chessboard__row">
                {row.map((square, columnIndex) => {
                    const color = getSquareColor(rowIndex, columnIndex);
                    const piece = getSquarePiece(square);
                    return (
                        <div key={columnIndex} className={`chessboard__square chessboard__square--${color}`}>
                            {piece}
                        </div>
                    );
                })}
            </div>)}
        </div>
    );
}

function getSquareColor(rowIndex, columnIndex) {
    let color = "dark";
    if ((rowIndex + columnIndex) % 2 === 0) {
        color = "light";
    }
    return color;
}

function getSquarePiece(square) {
    if (square) {
        return <img className="chessboard__piece" src={pieces[square]} draggable="false"></img>;
    }
}
