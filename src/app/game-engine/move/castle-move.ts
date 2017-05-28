import {Move} from "./move";
import {Piece} from "../pieces/piece";
import {Board} from "../board/board";
import {Rook} from "../pieces/rook";
export abstract class CastleMove extends Move {

  castleRook: Rook;
  castleRookPosition: number;
  castleRookDestination: number;

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number,
              castleRook: Rook, castleRookPosition: number, castleRookDestination: number) {
    super(board, movedPiece, destinationCoordinate);
    this.castleRook = castleRook;
    this.castleRookPosition = castleRookPosition;
    this.castleRookDestination = castleRookDestination;
  }

  /**
   * Move Execution implementation for castle move,
   * King and Rook will interchange their positions provided necessary conditions are met
   * @returns {Board} transition board with king and rook's positions updated
   */
  execute(): Board {
    const transitionBoard: Board = new Board();
    this.board.currentPlayer.getActivePieces().forEach((activePiece) => {
      //check if these active pieces are not king(actively being moved) and castle rook
      if (activePiece !== this.castleRook && activePiece !== this.movedPiece) {
        transitionBoard.setPiece(activePiece);
      }
    });

    //copy enemy player's all active pieces as it is
    this.board.currentPlayer.getOpponent().getActivePieces().forEach((activePiece) => {
      transitionBoard.setPiece(activePiece);
    });

    transitionBoard.setPiece(this.movedPiece.movePiece(this));
    transitionBoard.setPiece(new Rook(this.castleRook.getPosition(), this.castleRook.getAlliance()));

    transitionBoard.setNextMoveMaker(this.board.currentPlayer.getOpponent().getAlliance());
    transitionBoard.initializeBoard();
    return transitionBoard;
  }

  /**
   * Return true since this is a castling move
   * @returns {boolean} true
   */
  isCastelingMove(): boolean {
    return true;
  }
}
