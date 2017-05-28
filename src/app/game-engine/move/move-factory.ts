import {Board} from "../board/board";
import {Move} from "./move";
import {NullMove} from "./null-move";
export class MoveFactory {

  /**
   * Creates a move given a board, current and destination position.
   * @param board to fetch all possible legal moves
   * @param currentCoordinate for piece to be moved from
   * @param destinationCoordinate for piece to be moved to
   * @returns {Move} a legal move or a null move
   */
  static createMove(board: Board, currentCoordinate: number, destinationCoordinate: number): Move {
    let legalMove: Move = new NullMove();
    console.log('In move Factory. Legal Moves: ', board.getAllLegalMoves());
    board.getAllLegalMoves().forEach((move: Move) => {
      if (move.destinationCoordinate === destinationCoordinate &&
        move.movedPiece.getPosition() === currentCoordinate) {
        console.log('Found legal move that matches current and destination coordinate.', currentCoordinate, destinationCoordinate);
        legalMove = move;
      }
    });
    return legalMove;
  }
}
