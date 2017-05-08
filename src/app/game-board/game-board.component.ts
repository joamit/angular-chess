import {Component, OnInit} from '@angular/core';
import {GameService} from "../game-service/game.service";
import {COLORS} from "../app.constants";

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

    gameBoard: boolean[][];

    constructor(private gameService: GameService) {
        this.gameBoard = this.gameService.gameBoard;
    }

    ngOnInit() {
    }

    getStyling(row: number, col: number) {
        if ((row + col) % 2) {
            return COLORS.WHITE;
        } else {
            return COLORS.BLACK;
        }
    }

}
