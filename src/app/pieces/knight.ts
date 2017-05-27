import {Piece} from "./piece";
import {Board} from "../board/board";
import {Alliance} from "../alliance.enum";
import {Tile} from "../board/tile";
import {Move} from "../board/move";
export class Knight extends Piece {

  private CANDIDATE_MOVE_COORDINATES: number[] = [-17, -15, -10, -6, 6, 10, 15, 17];

  constructor(piecePosition: number, pieceAlliance: Alliance) {
    super(piecePosition, pieceAlliance);
  }

  public calculateLegalMoves(board: Board) {
    const legalMoves: Move[] = [];
    let candidateDestinationCoordinate: number;

    this.CANDIDATE_MOVE_COORDINATES.forEach((candidateCoordinate) => {

      candidateDestinationCoordinate = this.piecePosition + candidateCoordinate;

      if (this.isValidTileCoordinate(candidateDestinationCoordinate)) {
        let candidateTile: Tile = board.getTile(candidateDestinationCoordinate);

        if (candidateTile.isTileOccupied()) {
          const pieceAtDestination: Piece = candidateTile.getPiece();
          const pieceAllianceAtDestination: Alliance = pieceAtDestination.getAlliance();

          if (this.pieceAlliance != pieceAllianceAtDestination) {
            //this would mean we have enemy at this position
            legalMoves.push(new Move());
          }
        } else {
          legalMoves.push(new Move());
        }
      }
    });
    return Object.freeze(legalMoves);
  }

  private isValidTileCoordinate(tileCoordinate: number) {
    return tileCoordinate >= 0 && tileCoordinate < 64;
  }

}
