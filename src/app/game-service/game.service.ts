import {Injectable} from '@angular/core';
import {BOARD_SIZE} from "../app.constants";

@Injectable()
export class GameService {

    gameBoard: boolean[][];

    constructor() {
        this.gameBoard = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.gameBoard[i] = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                this.gameBoard[i][j] = false;
            }
        }
    }

}
