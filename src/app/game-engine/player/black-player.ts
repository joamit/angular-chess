import {Board} from "../board/board";
import {Move} from "../board/move/move";
import {Player} from "./player";
export class BlackPlayer extends Player {

  constructor(board: Board, legalMoves: Move[], opponentMoves: Move[]) {
    super(board, legalMoves, opponentMoves);
  }

  getActivePieces() {
    return this.board.blackPieces;
  }
}
