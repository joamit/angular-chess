import {TileUtils} from './tile-utils';
export class BoardUtils {

  public static NUM_TILES = 64;
  public static NUM_TILES_PER_ROW = 8;

  static FIRST_COLUMN: boolean[] = TileUtils.initColumn(0);
  static SECOND_COLUMN: boolean[] = TileUtils.initColumn(1);
  static SEVENTH_COLUMN: boolean[] = TileUtils.initColumn(6);
  static EIGHTH_COLUMN: boolean[] = TileUtils.initColumn(7);

  static SECOND_ROW: boolean[] = TileUtils.initRow(8);
  static SEVENTH_ROW: boolean[] = TileUtils.initRow(48);

  static EMPTY_TILES_CACHE = TileUtils.createEmptyTiles();

  private constructor() {
    // can not use this constructor
  }
}
