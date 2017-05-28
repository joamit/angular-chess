export abstract class Tile {

  constructor(tileCoordinate: number) {
    this.tileCoordinate = tileCoordinate;
  }

  tileCoordinate: number;

  abstract isOccupied();

  abstract  getPiece();
}
