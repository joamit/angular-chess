import {Component, OnInit} from '@angular/core';
import {Piece} from '../game-engine/pieces/piece';
import {Alliance} from '../alliance.enum';
import {GameService} from '../game-service/game.service';
import {Move} from '../game-engine/move/move';

@Component({
  selector: 'app-taken-pieces',
  templateUrl: './taken-pieces.component.html',
  styleUrls: ['./taken-pieces.component.css']
})
export class TakenPiecesComponent implements OnInit {

  whiteTakenPieces: Piece[];
  blackTakenPieces: Piece[];

  constructor(gameService: GameService) {
    this.whiteTakenPieces = [];
    this.blackTakenPieces = [];
    gameService.moveLogUpdated$.subscribe((newMove) => this.onMoveMade(newMove));
  }

  ngOnInit() {
  }

  private onMoveMade(newMove: Move) {
    console.log('Received move log updated event!!');
    const piece: Piece = newMove.getAttackedPiece();
    if (piece !== null && piece) {
      if (piece.getAlliance() === Alliance.BLACK) {
        this.blackTakenPieces.push(piece);
      } else {
        this.whiteTakenPieces.push(piece);
      }
    } else {
      console.log('Move was not an attack move. ', newMove);
    }
  }
}
