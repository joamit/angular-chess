import {Injectable, EventEmitter} from "@angular/core";
import {Board} from "../game-engine/board/board";
import {Alliance} from "../alliance.enum";

@Injectable()
export class GameService {

  board: Board;
  activeAlliance: Alliance;
  allianceChanged$: EventEmitter<Alliance>;

  constructor() {
    this.board = GameService.freshBoard();
    this.activeAlliance = Alliance.WHITE;
    this.allianceChanged$ = new EventEmitter();
  }

  static freshBoard(): Board {
    const board = new Board();
    board.createStandardBoard();
    board.initializeBoard();
    return board;
  }

  /**
   * Fetch instance of current game board
   * @returns {Board}
   */
  gameBoard(): Board {
    return this.board;
  }

  /**
   * Changes board direction to the current alliance player (bottom up view)
   * @param changedAlliance of the player
   */
  changeDirection(changedAlliance: Alliance) {
    this.activeAlliance = changedAlliance;
    this.allianceChanged$.emit(this.activeAlliance);
  }

  currentAlliance(): Alliance {
    return this.activeAlliance;
  }
}
