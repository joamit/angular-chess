import {Piece} from '../pieces/piece';
export class BoardConfig {

  _position: number;
  _piece: Piece;

  public constructor(position: number, piece: Piece) {
    this._position = position;
    this._piece = piece;
  }
}
