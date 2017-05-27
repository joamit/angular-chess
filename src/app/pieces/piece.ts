import {Alliance} from "../alliance.enum";
import {Board} from "../board/board";
export abstract class Piece {

  protected piecePosition: number;
  protected pieceAlliance: Alliance;


  constructor(piecePosition: number, pieceAlliance: Alliance) {
    this.piecePosition = piecePosition;
    this.pieceAlliance = pieceAlliance;
  }

  public abstract calculateLegalMoves(board: Board);

  public getAlliance() {
    return this.pieceAlliance;
  }
}
