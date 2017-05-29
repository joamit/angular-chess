import {Component, OnInit} from "@angular/core";
import {GameService} from "../game-service/game.service";
import {COLORS} from "../app.constants";
import {Board} from "../game-engine/board/board";
import {Tile} from "../game-engine/board/tile";
import {transition, style, state, trigger, animate} from "@angular/animations";
import {MdSnackBar} from "@angular/material";
import {Piece} from "../game-engine/pieces/piece";
import {Move} from "../game-engine/move/move";
import {MoveTransition} from "../game-engine/move/move-transition";
import {MoveStatus} from "../game-engine/move/move-status";
import {MoveFactory} from "../game-engine/move/move-factory";
import {NullMove} from "../game-engine/move/null-move";
import {Alliance} from "../alliance.enum";

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
  sourceTile: Tile;
  destinationTile: Tile;
  humanMovedPiece: Piece;
  boardDirection: Alliance;

  constructor(private gameService: GameService, snackBar: MdSnackBar) {
    this.gameService.allianceChanged$.subscribe((changedAlliance) => this.onAllianceChanged(changedAlliance))
    this.board = this.gameService.board; //get eight rows with eight columns in each row
    this.setupTileRows(this.board.gameBoard);
    this.snackBar = snackBar;
    this.boardDirection = Alliance.WHITE;
  }

  /**
   * Setup 64 tiles in 8 rows with each row containing 8 columns
   * @param tiles list of board tiles
   */
  private setupTileRows(tiles: Tile[]) {
    this.rows = tiles.reduce((rows, key, index) => (index % 8 == 0 ? rows.push([key])
      : rows[rows.length - 1].push(key)) && rows, []);
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

    if (clickedTile.getPiece() && clickedTile.getPiece().getAlliance() === this.board.currentPlayer.getAlliance()) {
      clickedTile.state = clickedTile.state === 'active' ? 'inactive' : 'active';

      if (this.sourceTile) {
        this.destinationTile = clickedTile;
        this.moveThePiece();

        //reset source and destination tile now
        this.sourceTile = null;
        this.destinationTile = null;
        this.humanMovedPiece = null;

      } else {
        this.sourceTile = clickedTile;
        this.humanMovedPiece = clickedTile.getPiece();
      }
    } else {
      this.destinationTile = clickedTile;
      this.moveThePiece();

      //reset source and destination tile now
      this.sourceTile = null;
      this.destinationTile = null;
      this.humanMovedPiece = null;
    }

  }

  private moveThePiece() {
    console.log('Creating a move');
    const moveToMake: Move = MoveFactory.createMove(this.board, this.sourceTile.tileCoordinate, this.destinationTile.tileCoordinate);
    console.log('Move created', moveToMake);
    if (moveToMake instanceof NullMove) {
      this.openSnackBar('Illegal move. Could not find any suitable moves for this piece', '');
    } else {
      console.log('Making move now');
      const moveTransition: MoveTransition = this.board.currentPlayer.makeMove(moveToMake);
      console.log('Move Transition', moveTransition);
      if (moveTransition.moveStatus === MoveStatus.Done) {
        this.board = moveTransition.transitionBoard;
        this.setupTilesAsPerAlliance(this.boardDirection, this.board);
      } else {
        this.openSnackBar('This move can not be executed!!', `${moveTransition.moveStatus}`)
      }
    }
  }

  private openSnackBar(description: string, action: string) {
    this.snackBar.open(description, action, {
      duration: 1000,
    });
  }

  private onAllianceChanged(changedAlliance: Alliance) {
    this.boardDirection = changedAlliance;
    this.setupTilesAsPerAlliance(this.boardDirection, GameService.freshBoard());
  }

  private setupTilesAsPerAlliance(boardDirection: Alliance, currentBoard: Board) {
    if (boardDirection === Alliance.BLACK) {
      this.setupTileRows(currentBoard.gameBoard.reverse());
    } else {
      this.setupTileRows(currentBoard.gameBoard);
    }
  }
}
