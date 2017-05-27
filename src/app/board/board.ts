import {Alliance} from "../alliance.enum";
import {BoardConfig} from "./board-config";
import {Piece} from "../pieces/piece";
import {Tile} from "./tile";
import {BoardUtils} from "./board-utils";
export class Board {

  boardConfig: BoardConfig[];
  nextMoveMaker: Alliance;
  gameBoard: Tile[];


  private createGameBoard(boardConfig: BoardConfig[]) {
    const tiles: Tile[] = Array(BoardUtils.NUM_TILES);
    for (let i = 0; i < BoardUtils.NUM_TILES; i++) {
      tiles.push(Tile.createTile(i, boardConfig.find((element) => {
        return element._position === i;
      })._piece));
    }
    return tiles;
  }

  createStandardBoard() {

  }

  constructor(boardConfig: BoardConfig[], nextMoveMaker: Alliance) {
    this.boardConfig = boardConfig;
    this.nextMoveMaker = nextMoveMaker;
    this.gameBoard = this.createGameBoard(this.boardConfig);
  }


  getTile(tileCoordinate: number) {
    return null;
  }

  setPiece(piece: Piece) {
    this.boardConfig.push(new BoardConfig(piece.getPosition(), piece));
  }

  setNextMoveMaker(nextMoveMaker: Alliance) {
    this.nextMoveMaker = nextMoveMaker;
  }

}
