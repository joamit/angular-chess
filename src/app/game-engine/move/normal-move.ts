import {Move} from "./move";
import {Board} from "../board/board";
import {Piece} from "../pieces/piece";
export class NormalMove extends Move {

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number) {
    super(board, movedPiece, destinationCoordinate);
  }

  execute() {
    const transitionBoard: Board = new Board();
    //copy all current player's active pieces as they are to new board, except the piece which is being moved
    this.board.currentPlayer.getActivePieces().forEach((activePiece) => {
      if (this.movedPiece !== activePiece) {
        transitionBoard.setPiece(activePiece);
      }
    });

    //copy enemy player's all active pieces as it is
    this.board.currentPlayer.getOpponent().getActivePieces().forEach((activePiece) => {
      transitionBoard.setPiece(activePiece);
    });

    //set the moved piece now
    transitionBoard.setPiece(null);
    transitionBoard.setNextMoveMaker(this.board.currentPlayer.getOpponent().getAlliance());

    //initialize the board now
    transitionBoard.initializeBoard();
    return transitionBoard;
  }
}
