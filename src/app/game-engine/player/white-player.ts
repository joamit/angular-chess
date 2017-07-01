import {Player} from './player';
import {Move} from '../move/move';
import {Board} from '../board/board';
import {Alliance} from '../../alliance.enum';
import {Tile} from '../board/tile';
import {PieceType} from '../pieces/piece-type.enum';
import {KingSideCastleMove} from '../move/king-side-castle-move';
import {QueenSideCastleMove} from '../move/queen-side-castle-move';
export class WhitePlayer extends Player {

  constructor(board: Board, legalMoves: Move[], opponentMoves: Move[]) {
    super(board, legalMoves, opponentMoves);
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
      // calculate king side castle
      if (!this.board.getTile(61).isOccupied() && !this.board.getTile(62).isOccupied()) {
        const rookTile: Tile = this.board.getTile(63);
        if (rookTile.isOccupied() && rookTile.getPiece().isFirstMove()) {
          if (Player.calculateAttacksOnTile(61, opponentLegalMoves).length === 0 &&
            Player.calculateAttacksOnTile(62, opponentLegalMoves).length === 0 &&
            rookTile.getPiece().getPieceType() === PieceType.WhiteRook) {
            kingCastles.push(new KingSideCastleMove(this.board, this.playerKing, 62, rookTile.getPiece(), rookTile.tileCoordinate, 61));
          }
        }
      }

      // calculate queen side castle here
      if (!this.board.getTile(59).isOccupied() && !this.board.getTile(58).isOccupied() && !this.board.getTile(57).isOccupied()) {
        const rookTile: Tile = this.board.getTile(56);
        if (rookTile.isOccupied() && rookTile.getPiece().isFirstMove()) {
          if (Player.calculateAttacksOnTile(59, opponentLegalMoves).length === 0 &&
            Player.calculateAttacksOnTile(58, opponentLegalMoves).length === 0 &&
            Player.calculateAttacksOnTile(57, opponentLegalMoves).length === 0 &&
            rookTile.getPiece().getPieceType() === PieceType.WhiteRook) {
            kingCastles.push(new QueenSideCastleMove(this.board, this.playerKing, 58, rookTile.getPiece(), rookTile.tileCoordinate, 59));
          }
        }
      }
    }

    return kingCastles;
  }

  getActivePieces() {
    return this.board.whitePieces;
  }

  getAlliance() {
    return Alliance.WHITE;
  }

  getOpponent() {
    return this.board.blackPlayer;
  }
}
