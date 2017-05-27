import {Alliance} from "../alliance.enum";
import {BoardConfig} from "./board-config";
import {Piece} from "../pieces/piece";
import {Tile} from "./tile";
import {BoardUtils} from "./board-utils";
import {Rook} from "../pieces/rook";
import {Bishop} from "../pieces/bishop";
import {Knight} from "../pieces/knight";
import {Queen} from "../pieces/queen";
import {King} from "../pieces/king";
import {Pawn} from "../pieces/pawn";
import {Move} from "./move/move";
export class Board {

  boardConfig: BoardConfig[];
  nextMoveMaker: Alliance;
  gameBoard: Tile[];
  whitePieces: Piece[];
  blackPieces: Piece[];


  private createGameBoard(boardConfig: BoardConfig[]) {
    const tiles: Tile[] = Array(BoardUtils.NUM_TILES);
    for (let tileNumber = 0; tileNumber < BoardUtils.NUM_TILES; tileNumber++) {
      const config: BoardConfig = boardConfig.find((element) => {
        return element._position === tileNumber;
      });
      if (config && config._piece) {
        tiles.push(Tile.createTile(tileNumber, config._piece));
      } else {
        tiles.push(Tile.createTile(tileNumber, null));
      }
    }
    return tiles;
  }

  createStandardBoard() {
    this.boardConfig.push(new BoardConfig(0, new Rook(0, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(1, new Knight(1, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(2, new Bishop(2, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(3, new Queen(3, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(4, new King(4, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(5, new Bishop(5, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(6, new Knight(6, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(7, new Rook(7, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(8, new Pawn(8, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(9, new Pawn(9, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(10, new Pawn(10, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(11, new Pawn(11, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(12, new Pawn(12, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(13, new Pawn(13, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(14, new Pawn(14, Alliance.BLACK)));
    this.boardConfig.push(new BoardConfig(15, new Pawn(15, Alliance.BLACK)));


    this.boardConfig.push(new BoardConfig(48, new Pawn(48, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(49, new Pawn(49, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(50, new Pawn(50, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(51, new Pawn(51, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(52, new Pawn(52, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(53, new Pawn(53, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(54, new Pawn(54, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(55, new Pawn(55, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(56, new Rook(56, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(57, new Knight(57, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(58, new Bishop(58, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(59, new Queen(59, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(60, new King(60, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(61, new Bishop(61, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(62, new Knight(62, Alliance.WHITE)));
    this.boardConfig.push(new BoardConfig(63, new Rook(63, Alliance.WHITE)));

  }

  constructor() {
    this.boardConfig = [];
    this.createStandardBoard();
    this.nextMoveMaker = Alliance.WHITE;
    this.gameBoard = this.createGameBoard(this.boardConfig);

    this.whitePieces = this.calculateActivePieces(this.gameBoard, Alliance.WHITE);
    this.blackPieces = this.calculateActivePieces(this.gameBoard, Alliance.BLACK);

    const whiteStandardLegalMoves: Move[] = this.calculateLegalMoves(this.whitePieces);
    const blackStandartLegalMoves: Move[] = this.calculateLegalMoves(this.blackPieces);

  }

  private calculateLegalMoves(whitePieces: Piece[]) {
    let legalMoves: Move[] = [];
    whitePieces.forEach((piece) => {
      legalMoves = legalMoves.concat(piece.calculateLegalMoves(this));
    });
    return legalMoves;
  }

  private calculateActivePieces(gameBoard: Tile[], alliance: Alliance) {
    const pieces: Piece[] = [];
    gameBoard.forEach((tile) => {
      if (tile.isOccupied()) {
        const piece: Piece = tile.getPiece();
        if (piece.getAlliance() === alliance) {
          pieces.push(piece);
        }
      }
    });
    return pieces;
  }


  getTile(tileCoordinate: number) {
    return this.gameBoard[tileCoordinate];
  }

  setPiece(piece: Piece) {
    this.boardConfig.push(new BoardConfig(piece.getPosition(), piece));
  }

  setNextMoveMaker(nextMoveMaker: Alliance) {
    this.nextMoveMaker = nextMoveMaker;
  }

}
