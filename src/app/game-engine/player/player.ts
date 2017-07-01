import {Board} from '../board/board';
import {Move} from '../move/move';
import {King} from '../pieces/king';
import {Piece} from '../pieces/piece';
import {PieceType} from '../pieces/piece-type.enum';
import {MoveTransition} from '../move/move-transition';
import {MoveStatus} from '../move/move-status';
import {Alliance} from '../../alliance.enum';
export abstract class Player {

  board: Board;
  playerKing: King;
  legalMoves: Move[];
  opponentMoves: Move[];
  inCheck: boolean;


  /**
   * Check if current player's king is being attacked by the opponent player's any piece
   * @param kingPosition current player's king
   * @param opponentMoves legal moves opponent player currently has
   * @returns {Move[]} list of valid moves which can attack current player's king
   */
  static calculateAttacksOnTile(kingPosition: number, opponentMoves: Move[]) {
    const attackMoves: Move[] = [];
    opponentMoves.forEach((opponentMove) => {
      if (kingPosition === opponentMove.destinationCoordinate) {
        attackMoves.push(opponentMove);
      }
    });
    return attackMoves;
  }

  constructor(board: Board, legalMoves: Move[], opponentMoves: Move[]) {
    this.board = board;
    this.opponentMoves = opponentMoves;
    this.playerKing = this.establishKing();
    this.legalMoves = legalMoves.concat(this.calculateKingCastles(legalMoves, opponentMoves));
    // if any of the opponent's legal moves have a valid attack on current player's king, it will be in check
    this.inCheck = Player.calculateAttacksOnTile(this.playerKing.getPosition(), this.opponentMoves).length !== 0;
  }

  private establishKing(): King {
    let kingPiece: any = null;
    this.getActivePieces().forEach((piece: Piece) => {
      if (piece.getPieceType() === PieceType.BlackKing ||
        piece.getPieceType() === PieceType.WhiteKing) {
        kingPiece = piece;
      }
    });
    return kingPiece;
  }

  /**
   * Check if the passed move is legal for current player or not
   * @param move to check
   * @returns {boolean} result
   */
  isMoveLegal(move: Move) {
    return this.legalMoves.find((legalMove) => {
        return legalMove === move;
      }) !== null;
  }

  isInCheck() {
    return this.inCheck;
  }

  isInCheckMate() {
    return this.isInCheck() && !this.hasEscapeMoves();
  }

  isInStaleMate() {
    return !this.isInCheck() && !this.hasEscapeMoves();
  }

  isCastled() {
    return false;
  }

  /**
   * Make a new move for current player
   * @param move new move to make
   * @returns {MoveTransition} move transition result
   */
  makeMove(move: Move) {
    let moveTransition: MoveTransition;
    // if move is not legal, we won't create a new board and mark move status as illegal
    if (!this.isMoveLegal(move)) {
      moveTransition = new MoveTransition(this.board, move, MoveStatus.Illegal_Move);
    } else {
      // execute the move now
      const transitionBoard: Board = move.execute();
      // if we execute the move and see if current player's king ends up in check
      const kingAttacks: Move[] = Player.calculateAttacksOnTile(transitionBoard.currentPlayer.getOpponent().getPlayerKing().getPosition(),
        transitionBoard.currentPlayer.legalMoves);

      // this means king is going to end up in check by opponent if this move is made
      if (kingAttacks && kingAttacks.length !== 0) {
        moveTransition = new MoveTransition(this.board, move, MoveStatus.Leaves_Player_In_Check);
      } else {
        // make a new move and transition the piece
        moveTransition = new MoveTransition(transitionBoard, move, MoveStatus.Done);
      }
    }
    return moveTransition;
  }

  abstract getAlliance(): Alliance;

  abstract getActivePieces(): Piece[];

  abstract getOpponent();

  abstract calculateKingCastles(playerLegalMoves: Move[], opponentLegalMoves: Move[]): Move[];

  /**
   * If any of current player's legal moves allow its king to escape current check, return true
   */
  protected hasEscapeMoves() {
    this.legalMoves.forEach((legalMove) => {
      const moveTransition: MoveTransition = this.makeMove(legalMove);
      if (moveTransition.moveStatus === MoveStatus.Done) {
        return true;
      }
    });
    return false;
  }

  /**
   * Fetch current player's king
   * @returns {King} king
   */
  getPlayerKing(): King {
    return this.playerKing;
  }
}
