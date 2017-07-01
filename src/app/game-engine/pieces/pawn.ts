import {Piece} from './piece';
import {Alliance} from '../../alliance.enum';
import {Board} from '../board/board';
import {Move} from '../move/move';
import {BoardUtils} from '../board/board-utils';
import {NormalMove} from '../move/normal-move';
import {AttackMove} from '../move/attack-move';
import {PieceType} from './piece-type.enum';
export class Pawn extends Piece {

  private CANDIDATE_MOVE_COORDINATES: number[] = [7, 8, 9, 16];

  constructor(piecePosition: number, pieceAlliance: Alliance, firstMove: boolean) {
    super(piecePosition, pieceAlliance, firstMove);
    this.pieceType = this.pieceAlliance === Alliance.BLACK ? PieceType.BlackPawn : PieceType.WhitePawn;
  }

  /**
   * Calculate legal moves for a pawn.
   * @param board current board layout
   * @returns {Move[]} total legal moves
   */
  calculateLegalMoves(board: Board) {
    const legalMoves: Move[] = [];
    console.log('Calculating legal moves for Pawn');

    this.CANDIDATE_MOVE_COORDINATES.forEach((candidateCoordinateOffset) => {

      const candidateDestinationCoordinate = this.piecePosition + (this.pieceAlliance * candidateCoordinateOffset);
      if (BoardUtils.isValidTileCoordinate(candidateDestinationCoordinate)) {

        if (candidateCoordinateOffset === 8 && !board.getTile(candidateDestinationCoordinate).isOccupied()) {
          // this is normal pawn move
          legalMoves.push(new NormalMove(board, this, candidateDestinationCoordinate));
        } else if (candidateCoordinateOffset === 16 && this.isFirstMove() &&
          ((BoardUtils.SECOND_ROW[this.piecePosition] && this.pieceAlliance === Alliance.BLACK) ||
          BoardUtils.SEVENTH_ROW[this.piecePosition] && this.pieceAlliance === Alliance.WHITE)) {
          // check if both front tiles are not occupied for the jump
          const behindCandidateCoordinate = this.piecePosition + (this.pieceAlliance * 8);
          if (!board.getTile(behindCandidateCoordinate).isOccupied() && !board.getTile(candidateDestinationCoordinate).isOccupied()) {
            legalMoves.push(new NormalMove(board, this, candidateDestinationCoordinate));
          }
        } else if (candidateCoordinateOffset === 7 &&
          !((BoardUtils.FIRST_COLUMN[this.piecePosition] && this.pieceAlliance === Alliance.BLACK) ||
          (BoardUtils.EIGHTH_COLUMN[this.piecePosition] && this.pieceAlliance === Alliance.WHITE))) {
          if (board.getTile(candidateDestinationCoordinate).isOccupied()) {
            // pawn can attack here if this tile is occupied and has enemy piece
            const destinationPiece: Piece = board.getTile(candidateDestinationCoordinate).getPiece();
            const destinationAlliance: Alliance = destinationPiece.getAlliance();
            if (this.pieceAlliance !== destinationAlliance) {
              legalMoves.push(new AttackMove(board, this, candidateDestinationCoordinate, destinationPiece));
            }
          }
        } else if (candidateCoordinateOffset === 9 &&
          !((BoardUtils.FIRST_COLUMN[this.piecePosition] && this.pieceAlliance === Alliance.WHITE) ||
          (BoardUtils.EIGHTH_COLUMN[this.piecePosition] && this.pieceAlliance === Alliance.BLACK))) {
          if (board.getTile(candidateDestinationCoordinate).isOccupied()) {
            // pawn can attack here if this tile is occupied and has enemy piece
            const destinationPiece: Piece = board.getTile(candidateDestinationCoordinate).getPiece();
            const destinationAlliance: Alliance = destinationPiece.getAlliance();
            if (this.pieceAlliance !== destinationAlliance) {
              legalMoves.push(new AttackMove(board, this, candidateDestinationCoordinate, destinationPiece));
            }
          }
        }
      }
    });
    return Object.freeze(legalMoves);
  }

  movePiece(move: Move) {
    return new Pawn(move.destinationCoordinate, move.movedPiece.getAlliance(), false);
  }
}
