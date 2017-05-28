import {Board} from "../board/board";
import {Piece} from "../pieces/piece";
export abstract class Move {

  board: Board;
  movedPiece: Piece;
  destinationCoordinate: number;

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number) {
    this.board = board;
    this.movedPiece = movedPiece;
    this.destinationCoordinate = destinationCoordinate;
  }

  execute() {
    const transitionBoard: Board = new Board();
    //copy all current player's active pieces as they are to new board, except the piece which is being moved
    this.board.currentPlayer.getActivePieces().forEach((activePiece) => {
      //TODO: check equality logic, it might not work properly
      if (this.movedPiece !== activePiece) {
        transitionBoard.setPiece(activePiece);
      }
    });

    //copy enemy player's all active pieces as it is
    this.board.currentPlayer.getOpponent().getActivePieces().forEach((activePiece) => {
      transitionBoard.setPiece(activePiece);
    });

    //set the moved piece now
    transitionBoard.setPiece(this.movedPiece.movePiece(this));
    transitionBoard.setNextMoveMaker(this.board.currentPlayer.getOpponent().getAlliance());

    //initialize the board now
    transitionBoard.initializeBoard();
    return transitionBoard;
  }
}
