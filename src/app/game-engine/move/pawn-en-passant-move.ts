import {PawnAttackMove} from "./pawn-attack-move";
import {Piece} from "../pieces/piece";
import {Board} from "../board/board";
export class PawnEnPassantMove extends PawnAttackMove {

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number, attackedPiece: Piece) {
    super(board, movedPiece, destinationCoordinate, attackedPiece);
  }

}
