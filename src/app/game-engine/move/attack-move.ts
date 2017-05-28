import {Move} from "./move";
import {Board} from "../board/board";
import {Piece} from "../pieces/piece";
export class AttackMove extends Move {

  attackedPiece: Piece;

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number, attackedPiece: Piece) {
    super(board, movedPiece, destinationCoordinate);
    this.attackedPiece = attackedPiece;
  }

}
