import {Piece} from "../pieces/piece";
import {Board} from "../board/board";
import {CastleMove} from "./castle-move";
export class QueenSideCastleMove extends CastleMove {

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number) {
    super(board, movedPiece, destinationCoordinate);
  }
}
