import {Alliance} from "../../alliance.enum";
import {Board} from "../board/board";
import {PieceType} from "./piece-type.enum";
import {Move} from "../move/move";
export abstract class Piece {

  protected piecePosition: number;
  protected pieceAlliance: Alliance;
  protected firstMove: boolean;
  protected pieceType: PieceType;


  constructor(piecePosition: number, pieceAlliance: Alliance) {
    this.piecePosition = piecePosition;
    this.pieceAlliance = pieceAlliance;
    //TODO: logic for first move for certain pieces
    this.firstMove = false;
  }

  abstract calculateLegalMoves(board: Board);

  abstract movePiece(move: Move);

  getAlliance() {
    return this.pieceAlliance;
  }

  isFirstMove() {
    return this.firstMove;
  }

  getPosition() {
    return this.piecePosition;
  }

  getPieceType() {
    return this.pieceType;
  };
}