import {Player} from "./player";
import {Move} from "../board/move/move";
import {Board} from "../board/board";
export class WhitePlayer extends Player {

  constructor(board: Board, legalMoves: Move[], opponentMoves: Move[]) {
    super(board, legalMoves, opponentMoves);
  }

  getActivePieces() {
    return this.board.whitePieces;
  }
}
