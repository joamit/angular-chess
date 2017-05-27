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

  public abstract calculateLegalMoves(board: Board);

  public getAlliance() {
    return this.pieceAlliance;
  }

  public isFirstMove() {
    return this.firstMove;
  }
}
