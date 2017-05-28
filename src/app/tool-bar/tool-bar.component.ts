import {Component, OnInit} from "@angular/core";
import {GameService} from "../game-service/game.service";
import {Board} from "../game-engine/board/board";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  private gameOver: boolean;
  gameService: GameService;
  currentPlayer: number;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit() {
    const gameBoard: Board = this.gameService.gameBoard();
    console.log(gameBoard);
    this.currentPlayer = gameBoard.currentPlayer.getAlliance()
  }

  isStarted() {
    return this.gameOver;
  }

  toggle() {
    this.gameOver = !this.gameOver;
  }

}
