import {Player} from "./player";
import {Move} from "../move/move";
import {Board} from "../board/board";
import {Alliance} from "../../alliance.enum";
export class WhitePlayer extends Player {

  constructor(board: Board, legalMoves: Move[], opponentMoves: Move[]) {
    super(board, legalMoves, opponentMoves);
  }

  getActivePieces() {
    return this.board.whitePieces;
  }

  getAlliance() {
    return Alliance.WHITE;
  }

  getOpponent() {
    return this.board.blackPlayer;
  }
}
