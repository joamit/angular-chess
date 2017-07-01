import {OccupiedTile} from './occupied-tile';
import {Piece} from '../pieces/piece';
import {EmptyTile} from './empty-tile';
export class BoardUtils {

  public static NUM_TILES = 64;
  public static NUM_TILES_PER_ROW = 8;

  static FIRST_COLUMN: boolean[] = BoardUtils.initColumn(0);
  static SECOND_COLUMN: boolean[] = BoardUtils.initColumn(1);
  static SEVENTH_COLUMN: boolean[] = BoardUtils.initColumn(6);
  static EIGHTH_COLUMN: boolean[] = BoardUtils.initColumn(7);

  static SECOND_ROW: boolean[] = BoardUtils.initRow(8);
  static SEVENTH_ROW: boolean[] = BoardUtils.initRow(48);

  private static EMPTY_TILES_CACHE = BoardUtils.createEmptyTiles();

  private static initColumn(number: number) {
    const columns: boolean[] = Array(BoardUtils.NUM_TILES).fill(false);
    for (let i = number; i < BoardUtils.NUM_TILES; i = i + BoardUtils.NUM_TILES_PER_ROW) {
      columns[i] = true;
    }
    return columns;
  }

  static isValidTileCoordinate(tileCoordinate: number) {
    return tileCoordinate >= 0 && tileCoordinate < BoardUtils.NUM_TILES;
  }

  private static initRow(number: number) {
    const rows: boolean[] = Array(BoardUtils.NUM_TILES);
    do {
      rows[number] = true;
      number++;
    } while (number % BoardUtils.NUM_TILES_PER_ROW !== 0);
    return rows;
  }

  static createEmptyTiles() {
    const emptyTiles = [];
    for (let i = 0; i < BoardUtils.NUM_TILES; i++) {
      emptyTiles.push({
        coordinate: i,
        tile: new EmptyTile(i)
      });
    }
    return Object.freeze(emptyTiles);
  }

  static createTile(tileCoordinate: number, pieceOnTile: Piece) {
    if (pieceOnTile == null) {
      return this.EMPTY_TILES_CACHE.find(tile => tile.coordinate === tileCoordinate).tile;
    } else {
      return new OccupiedTile(tileCoordinate, pieceOnTile);
    }
  }

  private constructor() {
    // can not use this constructor
  }
}
