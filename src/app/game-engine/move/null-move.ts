import {Move} from './move';
import {Board} from '../board/board';
export class NullMove extends Move {

  constructor() {
    super(null, null, -1);
  }

  /**
   * Null move should not return any board, instead throw an error
   */
  execute(): Board {
    throw new Error('Null Move');
  }


}
