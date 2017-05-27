import {Board} from "../board/board";
import {Move} from "../board/move/move";
import {King} from "../pieces/king";
import {Piece} from "../pieces/piece";
import {PieceType} from "../pieces/piece-type.enum";
export abstract class Player {

  board: Board;
  playerKing: King;
  legalMoves: Move[];
  opponentMoves: Move[];


  constructor(board: Board, legalMoves: Move[], opponentMoves: Move[]) {
    this.board = board;
    this.legalMoves = legalMoves;
    this.opponentMoves = opponentMoves;
    this.playerKing = this.establishKing();
  }

  private establishKing() {
    this.getActivePieces().forEach((piece: Piece) => {
      if (piece.getPieceType() === PieceType.BlackKing ||
        piece.getPieceType() === PieceType.WhiteKing) {
        return piece;
      }
    });
    return null;
  }

  abstract getActivePieces();
}
