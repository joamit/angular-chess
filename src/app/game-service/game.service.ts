import {Injectable} from "@angular/core";
import {Board} from "../game-engine/board/board";

@Injectable()
export class GameService {

  board: Board;
  rows: any[];

  constructor() {
    this.board = new Board();
    this.board.initializeBoard();
    //get eight rows with eight columns in each row
    this.rows = this.board.gameBoard.reduce((rows, key, index) => (index % 8 == 0 ? rows.push([key])
      : rows[rows.length - 1].push(key)) && rows, []);
  }

  gameBoard(): Board {
    return this.board;
  }

}
