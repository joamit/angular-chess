import {Component, OnInit} from "@angular/core";
import {GameService} from "../game-service/game.service";
import {Alliance} from "../alliance.enum";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  private gameOver: boolean;
  gameService: GameService;
  currentPlayer: number;
  currentAlliance: Alliance;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit() {
    this.currentAlliance = this.gameService.currentAlliance();
  }

  isStarted() {
    return this.gameOver;
  }

  toggle() {
    this.gameOver = !this.gameOver;
  }

  flipBoard() {
    this.currentAlliance = this.currentAlliance === Alliance.WHITE ? Alliance.BLACK : Alliance.WHITE;
    this.gameService.changeDirection(this.currentAlliance);
  }

}
