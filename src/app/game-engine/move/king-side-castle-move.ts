import {CastleMove} from "./castle-move";
import {Piece} from "../pieces/piece";
import {Board} from "../board/board";
export class KingSideCastleMove extends CastleMove {

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number) {
    super(board, movedPiece, destinationCoordinate);
  }
}
