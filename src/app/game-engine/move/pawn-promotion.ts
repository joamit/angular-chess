import {PawnMove} from './pawn-move';
import {Piece} from '../pieces/piece';
import {Move} from './move';
import {Board} from '../board/board';
import {BoardConfig} from '../board/board-config';
export class PawnPromotion extends PawnMove {
  decoratedMove: Move;
  promotedPawn: Piece;
  promotionPiece: Piece;


  constructor(decoratedMove: Move, promotionPiece: Piece) {
    super(decoratedMove.getBoard(), decoratedMove.getMovedPiece(), decoratedMove.getDestinationCoordinate());
    this.decoratedMove = decoratedMove;
    this.promotedPawn = decoratedMove.getMovedPiece();
    this.promotionPiece = promotionPiece;
  }


  execute(): Board {
    const pawnMovedBoard: Board = this.decoratedMove.execute();
    const pawnPromotedBoard: Board = new Board();
    pawnMovedBoard.currentPlayer.getActivePieces().forEach((activePiece) => {
      if (this.promotedPawn !== activePiece) {
        pawnPromotedBoard.boardConfig.push(new BoardConfig(activePiece.getPosition(), activePiece));
      }
    });

    pawnMovedBoard.currentPlayer.getOpponent().getActivePieces().forEach((activePiece) => {
      pawnMovedBoard.boardConfig.push(new BoardConfig(activePiece.getPosition(), activePiece));
    });

    pawnPromotedBoard.setPiece(this.promotionPiece.movePiece(this));
    // after pawn promotion, the current player remains the active player
    pawnPromotedBoard.setNextMoveMaker(pawnPromotedBoard.currentPlayer.getAlliance());
    pawnPromotedBoard.setTransitionMove(this);
    pawnPromotedBoard.initializeBoard();
    return pawnPromotedBoard;
  }
}
