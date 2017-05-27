import {Tile} from "./tile";
export class EmptyTile extends Tile {

  constructor(tileCoordinate: number) {
    super(tileCoordinate);
  }

  isTileOccupied() {
    return false;
  }

  getPiece() {
    return null;
  }
}
