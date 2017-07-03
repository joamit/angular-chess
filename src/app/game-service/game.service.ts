import {EventEmitter, Injectable} from '@angular/core';
import {Board} from '../game-engine/board/board';
import {Alliance} from '../alliance.enum';
import {Move} from '../game-engine/move/move';
import {MoveLog} from '../game-engine/move/move-log';

@Injectable()
export class GameService {

  board: Board;
  activeAlliance: Alliance;
  allianceChanged$: EventEmitter<Alliance>;
  highLightMoves: boolean;
  highLightMovesChanged$: EventEmitter<boolean>;
  moveLog: MoveLog;

  constructor() {
    this.board = this.freshBoard();
    this.activeAlliance = Alliance.WHITE;
    this.highLightMoves = false;
    this.allianceChanged$ = new EventEmitter();
    this.highLightMovesChanged$ = new EventEmitter();
    this.moveLog = new MoveLog();
  }

  freshBoard(): Board {
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

  getMoveLog(): MoveLog {
    return this.moveLog;
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

  toggleHighLighting(highLightMoves: boolean) {
    this.highLightMoves = highLightMoves;
    this.highLightMovesChanged$.emit(this.highLightMoves);
  }

  highLightStatus(): boolean {
    return this.highLightMoves;
  }

  updateBoard(board: Board) {
    this.board = board;
  }

  addMoveToLog(newMove: Move) {
    this.moveLog.addMove(newMove);
  }
}
