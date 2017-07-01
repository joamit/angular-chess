import {BoardUtils} from './board-utils';
import {EmptyTile} from './empty-tile';
import {OccupiedTile} from './occupied-tile';
import {Piece} from '../pieces/piece';
/**
 * Created by joamit on 7/1/2017.
 */
export class TileUtils {

  static initColumn(number: number) {
    const columns: boolean[] = Array(BoardUtils.NUM_TILES).fill(false);
    for (let i = number; i < BoardUtils.NUM_TILES; i = i + BoardUtils.NUM_TILES_PER_ROW) {
      columns[i] = true;
    }
    return columns;
  }

  static isValidTileCoordinate(tileCoordinate: number) {
    return tileCoordinate >= 0 && tileCoordinate < BoardUtils.NUM_TILES;
  }

  static initRow(number: number) {
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
      return BoardUtils.EMPTY_TILES_CACHE.find(tile => tile.coordinate === tileCoordinate).tile;
    } else {
      return new OccupiedTile(tileCoordinate, pieceOnTile);
    }
  }

  private constructor() {
    // can not use utility class' constructor
  }
}
