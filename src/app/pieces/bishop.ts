import {Piece} from "./piece";
import {Board} from "../board/board";
import {Alliance} from "../alliance.enum";
import {Move} from "../board/move/move";
import {BoardUtils} from "../board/board-utils";
import {Tile} from "../board/tile";
import {AttackMove} from "../board/move/attack-move";
import {NormalMove} from "../board/move/normal-move";
import {PieceType} from "./piece-type.enum";
export class Bishop extends Piece {
  private CANDIDATE_MOVE_COORDINATES: number[] = [-9, -7, 7, 9];

  constructor(piecePosition: number, pieceAlliance: Alliance) {
    super(piecePosition, pieceAlliance);
    this.pieceType = this.pieceAlliance === Alliance.BLACK ? PieceType.BlackBishop : PieceType.WhiteBishop;
  }

  calculateLegalMoves(board: Board) {
    const legalMoves: Move[] = [];
    this.CANDIDATE_MOVE_COORDINATES.forEach((destinationCoordinateOffset) => {
      let candidateDestinationCoordinate = this.piecePosition;

      //Bishop can move freely in the diagonals, calculating all such coordinates
      while (BoardUtils.isValidTileCoordinate(candidateDestinationCoordinate)) {
        //check for exclusions where the algorithm doesn't apply
        if (Bishop.isFirstColumnExclusion(candidateDestinationCoordinate, destinationCoordinateOffset) ||
          Bishop.isEighthColumnExclusion(candidateDestinationCoordinate, destinationCoordinateOffset)) {
          break;
        }
        candidateDestinationCoordinate += destinationCoordinateOffset;
        if (BoardUtils.isValidTileCoordinate(candidateDestinationCoordinate)) {
          const candidateTile: Tile = board.getTile(candidateDestinationCoordinate);
          if (candidateTile.isOccupied()) {
            const pieceAtDestination: Piece = candidateTile.getPiece();
            const pieceAllianceAtDestination: Alliance = pieceAtDestination.getAlliance();

            if (this.pieceAlliance != pieceAllianceAtDestination) {
              //this will be an attack move
              legalMoves.push(new AttackMove(board, this, candidateDestinationCoordinate, candidateTile.getPiece()));
            }
            //we want to break out of this vector when any diagonal tile is occupied by friendly or enemy piece
            break;
          } else {
            legalMoves.push(new NormalMove(board, this, candidateDestinationCoordinate));
          }
        }
      }

    });
    return Object.freeze(legalMoves);
  }

  private static isFirstColumnExclusion(piecePosition: number, candidateOffset: number) {
    return BoardUtils.FIRST_COLUMN[piecePosition] && (candidateOffset == 7 ||
      candidateOffset == -9);
  }

  private static isEighthColumnExclusion(piecePosition: number, candidateOffset: number) {
    return BoardUtils.EIGHTH_COLUMN[piecePosition] && (candidateOffset == -7 ||
      candidateOffset == 9);
  }
}

