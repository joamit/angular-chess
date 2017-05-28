export abstract class Tile {

  state: string;

  constructor(tileCoordinate: number) {
    this.tileCoordinate = tileCoordinate;
    this.state = 'inactive';
  }

  tileCoordinate: number;

  abstract isOccupied();

  abstract  getPiece();
}
