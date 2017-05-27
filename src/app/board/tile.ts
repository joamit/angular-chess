import {EmptyTile} from "./empty-tile";
import {Piece} from "../pieces/piece";
import {OccupiedTile} from "./occupied-tile";
import {BoardUtils} from "./board-utils";
export abstract class Tile {

  constructor(tileCoordinate: number) {
    this.tileCoordinate = tileCoordinate;
  }

  protected tileCoordinate: number;

  private EMPTY_TILES_CACHE = this.createEmptyTiles();

  private createEmptyTiles() {
    const emptyTiles = [];
    for (let i = 0; i < BoardUtils.NUM_TILES; i++) {
      emptyTiles.push({
        coordinate: i,
        tile: new EmptyTile(i)
      });
    }
    return Object.freeze(emptyTiles);
  }

  public createTile(tileCoordinate: number, pieceOnTile: Piece) {
    if (pieceOnTile == null) {
      return this.EMPTY_TILES_CACHE.find(tile => tile.coordinate == tileCoordinate).tile;
    } else {
      return new OccupiedTile(tileCoordinate, pieceOnTile);
    }
  }

  abstract isTileOccupied();

  abstract  getPiece();
}
