import {Move} from "./move";
import {Piece} from "../pieces/piece";
import {Board} from "../board/board";
export class PawnMove extends Move {

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number) {
    super(board, movedPiece, destinationCoordinate);
  }
}
