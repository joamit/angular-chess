import {Move} from "./move";
import {Board} from "../board/board";
import {Piece} from "../pieces/piece";
export class AttackMove extends Move {

  attackedPiece: Piece;

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number, attackedPiece: Piece) {
    super(board, movedPiece, destinationCoordinate);
    this.attackedPiece = attackedPiece;
  }


  /**
   * This and all of its child classes are attack moves
   * @returns {boolean} true
   */
  isAttack(): boolean {
    return true;
  }

  /**
   * Overriding default implementation since this is an attack move and has access to the attacked piece
   * @returns {Piece} attacked piece
   */
  getAttackedPiece(): Piece {
    return this.attackedPiece;
  }
}
