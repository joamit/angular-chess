import {Component, OnInit} from "@angular/core";
import {GameService} from "../game-service/game.service";
import {COLORS} from "../app.constants";
import {Board} from "../game-engine/board/board";
import {Tile} from "../game-engine/board/tile";
import {transition, style, state, trigger, animate} from "@angular/animations";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  animations: [
    trigger('tileState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#faa009',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class GameBoardComponent implements OnInit {

  board: Board;
  rows: any[];
  snackBar: MdSnackBar;

  constructor(private gameService: GameService, snackBar: MdSnackBar) {
    this.board = this.gameService.board;
    this.rows = this.gameService.rows;
    this.snackBar = snackBar;
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

  onTileClick(clickedTile: Tile) {
    this.rows.forEach((row: Tile[]) => {
      row.forEach((tile: Tile) => {
        if (tile !== clickedTile) {
          tile.state = 'inactive';
        }
      });
    });
    if (clickedTile.isOccupied()) {
      if (clickedTile.getPiece().getAlliance() === this.board.currentPlayer.getAlliance()) {
        clickedTile.state = clickedTile.state === 'active' ? 'inactive' : 'active';
      } else {
        const currentAlliance = this.board.currentPlayer.getAlliance() === -1 ? 'White' : 'Black';
        this.snackBar.open(`${currentAlliance} Moves`, '', {
          duration: 1000,
        });
      }
    }
  }

}
