import {Tile} from './tile';
export class EmptyTile extends Tile {

  constructor(tileCoordinate: number) {
    super(tileCoordinate);
  }

  isOccupied() {
    return false;
  }

  getPiece() {
    return null;
  }
}
