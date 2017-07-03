import {Component, OnInit} from '@angular/core';
import {Piece} from '../game-engine/pieces/piece';
import {MoveLog} from '../game-engine/move/move-log';
import {Alliance} from '../alliance.enum';
import {GameService} from '../game-service/game.service';

@Component({
  selector: 'app-taken-pieces',
  templateUrl: './taken-pieces.component.html',
  styleUrls: ['./taken-pieces.component.css']
})
export class TakenPiecesComponent implements OnInit {

  whiteTakenPieces: Piece[];
  blackTakenPieces: Piece[];
  moveLog: MoveLog;

  constructor(gameService: GameService) {
    this.moveLog = gameService.getMoveLog();
    this.moveLog.getMoves().forEach((move) => {
      const piece: Piece = move.getAttackedPiece();
      if (piece.getAlliance() === Alliance.BLACK) {
        this.blackTakenPieces.push(piece);
      } else {
        this.whiteTakenPieces.push(piece);
      }
    });
  }

  ngOnInit() {
  }

}
