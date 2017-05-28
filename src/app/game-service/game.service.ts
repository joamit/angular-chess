import {Injectable} from "@angular/core";
import {Board} from "../game-engine/board/board";

@Injectable()
export class GameService {

  board: Board;

  constructor() {
    this.board = new Board();
    this.board.createStandardBoard();
    this.board.initializeBoard();
  }

  gameBoard(): Board {
    return this.board;
  }

}
