import {Board} from "../board/board";
import {Move} from "./move";
import {MoveStatus} from "./move-status";
export class MoveTransition {

  transitionBoard: Board;
  move: Move;
  moveStatus: MoveStatus;

  constructor(transitionBoard: Board, move: Move, moveStatus: MoveStatus) {
    this.transitionBoard = transitionBoard;
    this.move = move;
    this.moveStatus = moveStatus;
  }
}
