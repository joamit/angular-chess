import {Tile} from "./tile";
import {Piece} from "../pieces/piece";
export class OccupiedTile extends Tile {

  private pieceOnTile: Piece;

  constructor(tileCoordinate: number, pieceOnTile: Piece) {
    super(tileCoordinate);
    this.pieceOnTile = pieceOnTile;
  }

  isTileOccupied() {
    return true;
  }

  getPiece() {
    return this.pieceOnTile;
  }
}
