import {Move} from './move';
import {Board} from '../board/board';
import {Piece} from '../pieces/piece';
import {Pawn} from '../pieces/pawn';
export class PawnJumpMove extends Move {

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number) {
    super(board, movedPiece, destinationCoordinate);
  }

  /**
   * Concrete move implementation for a pawn jump
   * @returns {Board} new board with pawn jump transition
   */
  execute(): Board {
    const transitionBoard: Board = new Board();
    this.board.currentPlayer.getActivePieces().forEach((activePiece) => {
      if (activePiece !== this.movedPiece) {
        transitionBoard.setPiece(activePiece);
      }
    });

    this.board.currentPlayer.getOpponent().getActivePieces().forEach((activePieces) => {
      transitionBoard.setPiece(activePieces);
    });

    const movedPawn: Pawn = this.movedPiece.movePiece(this);
    transitionBoard.setPiece(movedPawn);
    transitionBoard.setEnPassantPawn(movedPawn);
    transitionBoard.setNextMoveMaker(this.board.currentPlayer.getOpponent().getAlliance());
    transitionBoard.initializeBoard();
    return transitionBoard;
  }
}
