import {Piece} from "../pieces/piece";
import {Board} from "../board/board";
import {AttackMove} from "./attack-move";
export class PawnAttackMove extends AttackMove {

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number, attackedPiece: Piece) {
    super(board, movedPiece, destinationCoordinate, attackedPiece);
  }

}
