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

  /**
   * Execute a move, default implementation, child classed may override it
   * @returns {Board} new transitioned board with updated piece location
   */
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

  /**
   * Default implementation, the implementation will change based on move type
   * @returns {boolean} true or false
   */
  isAttack(): boolean {
    return false;
  }

  /**
   * Default implementation, may be overridden as per needs
   * @returns {boolean} true or false
   */
  isCastelingMove(): boolean {
    return false;
  }

  /**
   * Default implementation, may e overridden as per needs
   * @returns {null} no piece being attacked here
   */
  getAttackedPiece(): Piece {
    return null;
  }
}
