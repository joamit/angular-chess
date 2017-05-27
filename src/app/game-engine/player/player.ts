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

  isMoveLegal(move: Move) {
    return this.legalMoves.find((legalMove) => {
        return legalMove === move;
      }) !== null;
  }

  //TODO: concrete method implementations
  isInCheck() {
    return false;
  }

  isInCheckMate() {
    return false;
  }

  isInStaleMate() {
    return false;
  }

  isCastled() {
    return false;
  }

  makeMove(move: Move) {
    return null;
  }

  abstract getAlliance();

  abstract getActivePieces();

  abstract getOpponent();
}
