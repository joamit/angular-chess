import {CastleMove} from './castle-move';
import {Piece} from '../pieces/piece';
import {Board} from '../board/board';
import {Rook} from '../pieces/rook';
export class KingSideCastleMove extends CastleMove {

  constructor(board: Board, movedPiece: Piece, destinationCoordinate: number,
              castleRook: Rook, castleRookPosition: number, castleRookDestination: number) {
    super(board, movedPiece, destinationCoordinate, castleRook, castleRookPosition, castleRookDestination);
  }
}
