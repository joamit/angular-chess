import {Move} from './move';
import * as _ from 'underscore';

export class MoveLog {

  moves: Move[];

  constructor() {
    this.moves = [];
  }

  public getMoves(): Move[] {
    return this.moves;
  }

  public addMove(move: Move) {
    this.moves.push(move);
  }

  public size(): number {
    return this.moves.length;
  }

  public clear() {
    this.moves = [];
  }

  public removeMove(move: Move) {
    this.moves = _.filter(this.moves, (m) => {
      return m !== move;
    });
  }
}
