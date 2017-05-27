export class BoardUtils {

  private constructor() {
    //can not use this constructor
  }

  static isValidTileCoordinate(tileCoordinate: number) {
    return tileCoordinate >= 0 && tileCoordinate < 64;
  }
}
