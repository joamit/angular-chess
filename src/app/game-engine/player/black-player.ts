import {Board} from "../board/board";
import {Move} from "../move/move";
import {Player} from "./player";
import {Alliance} from "../../alliance.enum";
import {Tile} from "../board/tile";
import {PieceType} from "../pieces/piece-type.enum";
import {QueenSideCastleMove} from "../move/queen-side-castle-move";
import {KingSideCastleMove} from "../move/king-side-castle-move";
export class BlackPlayer extends Player {

  constructor(board: Board, legalMoves: Move[], opponentMoves: Move[]) {
    super(board, legalMoves, opponentMoves);
  }

  getActivePieces() {
    return this.board.blackPieces;
  }

  getAlliance() {
    return Alliance.BLACK;
  }

  getOpponent() {
    return this.board.whitePlayer;
  }

  /**
   * Calculate king castle moves for white player
   * @param playerLegalMoves current player's legal moves
   * @param opponentLegalMoves opponent's legal moves
   * @returns {Move[]} available legal castling moves
   */
  calculateKingCastles(playerLegalMoves: Move[], opponentLegalMoves: Move[]): Move[] {
    const kingCastles: Move[] = [];
    if (this.playerKing.isFirstMove() && !this.inCheck) {
      //calculate king side castle
      if (!this.board.getTile(5).isOccupied() && !this.board.getTile(6).isOccupied()) {
        const rookTile: Tile = this.board.getTile(7);
        if (rookTile.isOccupied() && rookTile.getPiece().isFirstMove()) {
          if (Player.calculateAttacksOnTile(5, opponentLegalMoves).length === 0 &&
            Player.calculateAttacksOnTile(6, opponentLegalMoves).length === 0 &&
            rookTile.getPiece().getPieceType() === PieceType.BlackRook) {
            kingCastles.push(new KingSideCastleMove(this.board, this.playerKing, 6, rookTile.getPiece(), rookTile.tileCoordinate, 5));
          }
        }
      }

      //calculate queen side castle here
      if (!this.board.getTile(1).isOccupied() && !this.board.getTile(2).isOccupied() && !this.board.getTile(3).isOccupied()) {
        const rookTile: Tile = this.board.getTile(0);
        if (rookTile.isOccupied() && rookTile.getPiece().isFirstMove()) {
          if (Player.calculateAttacksOnTile(1, opponentLegalMoves).length === 0 &&
            Player.calculateAttacksOnTile(2, opponentLegalMoves).length === 0 &&
            Player.calculateAttacksOnTile(3, opponentLegalMoves).length === 0 &&
            rookTile.getPiece().getPieceType() === PieceType.WhiteRook) {
            kingCastles.push(new QueenSideCastleMove(this.board, this.playerKing, 2, rookTile.getPiece(), rookTile.tileCoordinate, 3));
          }
        }
      }
    }

    return kingCastles;
  }
}
