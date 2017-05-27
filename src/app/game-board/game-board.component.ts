import {Component, OnInit} from "@angular/core";
import {GameService} from "../game-service/game.service";
import {COLORS} from "../app.constants";
import {Board} from "../board/board";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  board: Board;
  rows: any[];

  constructor(private gameService: GameService) {
    this.board = this.gameService.board;
    this.rows = this.gameService.rows;
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
