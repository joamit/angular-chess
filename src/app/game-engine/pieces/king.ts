import {Piece} from "./piece";
import {Board} from "../board/board";
import {Alliance} from "../../alliance.enum";
import {Move} from "../board/move/move";
import {BoardUtils} from "../board/board-utils";
import {AttackMove} from "../board/move/attack-move";
import {NormalMove} from "../board/move/normal-move";
import {PieceType} from "./piece-type.enum";
export class King extends Piece {
  private CANDIDATE_MOVE_COORDINATES: number[] = [-9, -8, -7, -1, 1, 7, 8, 9];

  constructor(piecePosition: number, pieceAlliance: Alliance) {
    super(piecePosition, pieceAlliance);
    this.pieceType = this.pieceAlliance === Alliance.BLACK ? PieceType.BlackKing : PieceType.WhiteKing;
  }

  calculateLegalMoves(board: Board) {
    const legalMoves: Move[] = [];

    this.CANDIDATE_MOVE_COORDINATES.forEach((candidateCoordinateOffset) => {

      const candidateDestinationCoordinate = this.piecePosition + candidateCoordinateOffset;
      if (BoardUtils.isValidTileCoordinate(candidateDestinationCoordinate) && !(King.isFirstColumnExclusion(this.piecePosition, candidateCoordinateOffset) ||
        King.isEighthColumnExclusion(this.piecePosition, candidateCoordinateOffset))) {
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

  private static isFirstColumnExclusion(piecePosition: number, candidateCoordinateOffset: number) {
    return BoardUtils.FIRST_COLUMN[piecePosition] && (candidateCoordinateOffset == -9 ||
      candidateCoordinateOffset == -1 || candidateCoordinateOffset == 7);
  }

  private static isEighthColumnExclusion(piecePosition: number, candidateCoordinateOffset: number) {
    return BoardUtils.EIGHTH_COLUMN[piecePosition] && (candidateCoordinateOffset == 9 ||
      candidateCoordinateOffset == 1 || candidateCoordinateOffset == -7);
  }
}
