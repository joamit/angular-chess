import {Board} from "../board/board";
import {Move} from "../move/move";
import {Player} from "./player";
import {Alliance} from "../../alliance.enum";
export class BlackPlayer extends Player {

  constructor(board: Board, legalMoves: Move[], opponentMoves: Move[]) {
    super(board, legalMoves, opponentMoves);
  }

  getActivePieces() {
    return this.board.blackPieces;
  }

  getAlliance() {
    return Alliance.BLACK;
  }

  getOpponent() {
    return this.board.whitePlayer;
  }
}
