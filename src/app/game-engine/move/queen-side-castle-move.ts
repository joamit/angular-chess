import {Piece} from '../pieces/piece';
import {Board} from '../board/board';
import {CastleMove} from './castle-move';
import {Rook} from '../pieces/rook';
export class QueenSideCastleMove extends CastleMove {

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number,
              castleRook: Rook, castleRookPosition: number, castleRookDestination: number) {
    super(board, movedPiece, destinationCoordinate, castleRook, castleRookPosition, castleRookDestination);
  }
}
