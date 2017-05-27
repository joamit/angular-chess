export class BoardUtils {

  private constructor() {
    //can not use this constructor
  }

  public static NUM_TILES: number = 64;
  public static NUM_TILES_PER_ROW: number = 8;

  private static initColumn(number: number) {
    const columns: boolean[] = Array(BoardUtils.NUM_TILES).fill(false);
    for (let i = number; i < BoardUtils.NUM_TILES; i = i + BoardUtils.NUM_TILES_PER_ROW) {
      columns[i] = true;
    }
    return columns;
  }

  static FIRST_COLUMN: boolean[] = BoardUtils.initColumn(0);
  static SECOND_COLUMN: boolean[] = BoardUtils.initColumn(1);
  static SEVENTH_COLUMN: boolean[] = BoardUtils.initColumn(6);
  static EIGHTH_COLUMN: boolean[] = BoardUtils.initColumn(7);

  static isValidTileCoordinate(tileCoordinate: number) {
    return tileCoordinate >= 0 && tileCoordinate < BoardUtils.NUM_TILES;
  }

  private static initRow(number: number) {
    const rows: boolean[] = Array(BoardUtils.NUM_TILES);
    do {
      rows[number] = true;
      number++;
    } while (number % BoardUtils.NUM_TILES_PER_ROW != 0);
    return rows;
  }

  static SECOND_ROW: boolean[] = BoardUtils.initRow(8);
  static SEVENTH_ROW: boolean[] = BoardUtils.initRow(48);
}
