export abstract class Tile {

  constructor(tileCoordinate: number) {
    this.tileCoordinate = tileCoordinate;
  }

  protected tileCoordinate: number;

  abstract isOccupied();

  abstract  getPiece();
}
