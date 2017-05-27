import {Board} from "../board";
import {Piece} from "../../pieces/piece";
export abstract class Move {

  board: Board;
  movedPiece: Piece;
  destinationCoordinate: number;


  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number) {
    this.board = board;
    this.movedPiece = movedPiece;
    this.destinationCoordinate = destinationCoordinate;
  }
}
