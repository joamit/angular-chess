import {Piece} from "./piece";
import {Board} from "../board/board";
import {Alliance} from "../../alliance.enum";
import {Tile} from "../board/tile";
import {Move} from "../move/move";
import {BoardUtils} from "../board/board-utils";
import {AttackMove} from "../move/attack-move";
import {NormalMove} from "../move/normal-move";
import {PieceType} from "./piece-type.enum";
export class Knight extends Piece {

  private CANDIDATE_MOVE_COORDINATES: number[] = [-17, -15, -10, -6, 6, 10, 15, 17];

  constructor(piecePosition: number, pieceAlliance: Alliance) {
    super(piecePosition, pieceAlliance);
    this.pieceType = this.pieceAlliance === Alliance.BLACK ? PieceType.BlackKnight : PieceType.WhiteKnight;
  }

  public calculateLegalMoves(board: Board) {
    const legalMoves: Move[] = [];

    this.CANDIDATE_MOVE_COORDINATES.forEach((candidateCoordinateOffset) => {

      let candidateDestinationCoordinate: number = this.piecePosition + candidateCoordinateOffset;

      if (BoardUtils.isValidTileCoordinate(candidateDestinationCoordinate)
        && !(Knight.isFirstColumnExclusion(this.piecePosition, candidateCoordinateOffset) ||
        Knight.isSecondColumnExclusion(this.piecePosition, candidateCoordinateOffset) ||
        Knight.isSeventhColumnExclusion(this.piecePosition, candidateCoordinateOffset) ||
        Knight.isEighthColumnExclusion(this.piecePosition, candidateCoordinateOffset))) {

        let candidateTile: Tile = board.getTile(candidateDestinationCoordinate);

        if (candidateTile.isOccupied()) {
          const pieceAtDestination: Piece = candidateTile.getPiece();
          const pieceAllianceAtDestination: Alliance = pieceAtDestination.getAlliance();

          if (this.pieceAlliance != pieceAllianceAtDestination) {
            //this would mean we have enemy at this position
            legalMoves.push(new AttackMove(board, this, candidateDestinationCoordinate, pieceAtDestination));
          }
        } else {
          legalMoves.push(new NormalMove(board, this, candidateDestinationCoordinate));
        }
      }
    });
    return Object.freeze(legalMoves);
  }

  private static isFirstColumnExclusion(piecePosition: number, candidateCoordinateOffset: number) {
    return BoardUtils.FIRST_COLUMN[piecePosition] && ((candidateCoordinateOffset == -17) ||
      (candidateCoordinateOffset == -10) || (candidateCoordinateOffset == 6) ||
      (candidateCoordinateOffset == 15));
  }


  private static isSecondColumnExclusion(piecePosition: number, candidateCoordinateOffset: number) {
    return BoardUtils.SECOND_COLUMN[piecePosition] && ((candidateCoordinateOffset == -10) ||
      (candidateCoordinateOffset == 6));
  }

  private static isSeventhColumnExclusion(piecePosition: number, candidateCoordinateOffset: number) {
    return BoardUtils.SEVENTH_COLUMN[piecePosition] && ((candidateCoordinateOffset == -6) ||
      (candidateCoordinateOffset == 10));
  }

  private static isEighthColumnExclusion(piecePosition: number, candidateCoordinateOffset: number) {
    return BoardUtils.EIGHTH_COLUMN[piecePosition] && ((candidateCoordinateOffset == -6) ||
      (candidateCoordinateOffset == -15) || (candidateCoordinateOffset == 10) ||
      (candidateCoordinateOffset == 17));
  }

}
