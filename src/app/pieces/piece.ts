import {Alliance} from "../alliance.enum";
import {Board} from "../board/board";
export abstract class Piece {

  protected piecePosition: number;
  protected pieceAlliance: Alliance;
  protected firstMove: boolean;


  constructor(piecePosition: number, pieceAlliance: Alliance) {
    this.piecePosition = piecePosition;
    this.pieceAlliance = pieceAlliance;
    //TODO: logic for first move for certain pieces
    this.firstMove = false;
  }

  abstract calculateLegalMoves(board: Board);

  getAlliance() {
    return this.pieceAlliance;
  }

  isFirstMove() {
    return this.firstMove;
  }

  getPosition() {
    return this.piecePosition;
  }
}
