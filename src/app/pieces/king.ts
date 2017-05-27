import {Piece} from "./piece";
import {Board} from "../board/board";
import {Alliance} from "../alliance.enum";
import {Move} from "../board/move/move";
import {BoardUtils} from "../board/board-utils";
import {AttackMove} from "../board/move/attack-move";
import {NormalMove} from "../board/move/normal-move";
export class King extends Piece {
  private CANDIDATE_MOVE_COORDINATES: number[] = [-9, -8, -7, -1, 1, 7, 8, 9];

  constructor(piecePosition: number, pieceAlliance: Alliance) {
    super(piecePosition, pieceAlliance);
  }

  calculateLegalMoves(board: Board) {
    const legalMoves: Move[] = [];

    this.CANDIDATE_MOVE_COORDINATES.forEach((candidateCoordinateOffset) => {

      const candidateDestinationCoordinate = this.piecePosition + candidateCoordinateOffset;
      if (BoardUtils.isValidTileCoordinate(candidateDestinationCoordinate)) {
        if (board.getTile(candidateDestinationCoordinate).isOccupied()) {
          const destinationPiece: Piece = board.getTile(candidateDestinationCoordinate).getPiece();
          const destinationAlliance: Alliance = destinationPiece.getAlliance();
          if (this.pieceAlliance != destinationAlliance) {
            //we can attack this piece
            legalMoves.push(new AttackMove(board, this, candidateDestinationCoordinate, destinationPiece));
          }
        } else {
          //this is a normal move
          legalMoves.push(new NormalMove(board, this, candidateDestinationCoordinate));
        }
      }
    });
    return legalMoves;
  }
}
