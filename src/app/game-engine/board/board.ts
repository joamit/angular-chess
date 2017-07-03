import {BoardConfig} from './board-config';
import {Piece} from '../pieces/piece';
import {Tile} from './tile';
import {BoardUtils} from './board-utils';
import {Rook} from '../pieces/rook';
import {Bishop} from '../pieces/bishop';
import {Knight} from '../pieces/knight';
import {Queen} from '../pieces/queen';
import {King} from '../pieces/king';
import {Pawn} from '../pieces/pawn';
import {Move} from '../move/move';
import {Alliance} from '../../alliance.enum';
import {WhitePlayer} from '../player/white-player';
import {BlackPlayer} from '../player/black-player';
import {Player} from '../player/player';
import {TileUtils} from './tile-utils';
import {NullMove} from '../move/null-move';
import * as _ from 'underscore';

export class Board {

  boardConfig: BoardConfig[];
  nextMoveMaker: Alliance;
  gameBoard: Tile[];
  whitePieces: Piece[];
  blackPieces: Piece[];
  whitePlayer: WhitePlayer;
  blackPlayer: BlackPlayer;
  currentPlayer: Player;
  enPassantPawn: Pawn;
  transitionMove: Move;


  /**
   * Creates a board with 64 empty or occupied tiles. Uses board config to determine if tile
   * is empty or occupied.
   * @param boardConfig containing positions of all 32 pieces.
   * @returns {Tile[]} list of 64 tiles
   */
  private createGameBoard(boardConfig: BoardConfig[]): Tile[] {
    const tiles: Tile[] = [];
    for (let tileNumber = 0; tileNumber < BoardUtils.NUM_TILES; tileNumber++) {
      const config: BoardConfig = boardConfig.find((element) => {
        return element._position === tileNumber;
      });
      if (config && config._piece) {
        tiles.push(TileUtils.createTile(tileNumber, config._piece));
      } else {
        tiles.push(TileUtils.createTile(tileNumber, null));
      }
    }
    return tiles;
  }

  /**
   * Initializes board config at standard position(start position for both opponents)
   * This config will change subsequently when users start moving pieces.
   */
  createStandardBoard() {
    this.boardConfig.push(new BoardConfig(0, new Rook(0, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(1, new Knight(1, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(2, new Bishop(2, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(3, new Queen(3, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(4, new King(4, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(5, new Bishop(5, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(6, new Knight(6, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(7, new Rook(7, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(8, new Pawn(8, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(9, new Pawn(9, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(10, new Pawn(10, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(11, new Pawn(11, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(12, new Pawn(12, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(13, new Pawn(13, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(14, new Pawn(14, Alliance.BLACK, true)));
    this.boardConfig.push(new BoardConfig(15, new Pawn(15, Alliance.BLACK, true)));


    this.boardConfig.push(new BoardConfig(48, new Pawn(48, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(49, new Pawn(49, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(50, new Pawn(50, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(51, new Pawn(51, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(52, new Pawn(52, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(53, new Pawn(53, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(54, new Pawn(54, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(55, new Pawn(55, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(56, new Rook(56, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(57, new Knight(57, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(58, new Bishop(58, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(59, new Queen(59, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(60, new King(60, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(61, new Bishop(61, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(62, new Knight(62, Alliance.WHITE, true)));
    this.boardConfig.push(new BoardConfig(63, new Rook(63, Alliance.WHITE, true)));

  }

  constructor() {
    this.boardConfig = [];
    this.nextMoveMaker = Alliance.WHITE;
  }

  /**
   * Initializes board with white and black pieces using the board config.
   * Board Config contains position of all 32 pieces at any instant
   */
  initializeBoard() {
    this.gameBoard = this.createGameBoard(this.boardConfig);

    this.whitePieces = this.calculateActivePieces(this.gameBoard, Alliance.WHITE);
    console.log('White Pieces', this.whitePieces);
    this.blackPieces = this.calculateActivePieces(this.gameBoard, Alliance.BLACK);
    console.log('Black Pieces', this.blackPieces);
    const whiteStandardLegalMoves: Move[] = this.calculateLegalMoves(this.whitePieces);
    console.log('calculated legal moves for white player', whiteStandardLegalMoves);
    const blackStandardLegalMoves: Move[] = this.calculateLegalMoves(this.blackPieces);
    console.log('calculated legal moves for black player', blackStandardLegalMoves);

    this.whitePlayer = new WhitePlayer(this, whiteStandardLegalMoves, blackStandardLegalMoves);
    this.blackPlayer = new BlackPlayer(this, blackStandardLegalMoves, whiteStandardLegalMoves);

    this.currentPlayer = this.nextMoveMaker === Alliance.WHITE ? this.whitePlayer : this.blackPlayer;
    this.transitionMove = new NullMove();
  }

  /**
   * Calculate legal moves for given pieces
   * @param pieces white or black pieces
   * @returns {Move[]} list of all legal moves for every piece
   */
  private calculateLegalMoves(pieces: Piece[]): Move[] {
    let legalMoves: Move[] = [];
    pieces.forEach((piece) => {
      console.log('calculating legal moves for piece', piece);
      legalMoves = legalMoves.concat(piece.calculateLegalMoves(this));
      console.log('legal moves so far ', legalMoves.length);
    });
    return legalMoves;
  }

  /**
   * Calculate number of active pieces at a time in a given board for given alliance
   * @param gameBoard current state of tiles
   * @param alliance WHITE or BLACK
   * @returns {Piece[]} active pieces
   */
  private calculateActivePieces(gameBoard: Tile[], alliance: Alliance): Piece[] {
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
    this.boardConfig = _.filter(this.boardConfig, (boardConfig) => {
      return boardConfig._position !== piece.getPosition();
    });
    this.boardConfig.push(new BoardConfig(piece.getPosition(), piece));
  }

  setNextMoveMaker(nextMoveMaker: Alliance) {
    this.nextMoveMaker = nextMoveMaker;
  }

  /**
   * get all the legal moves possible for this board
   * @returns {Move[]} list of legal moves for both players
   */
  getAllLegalMoves(): Move[] {
    console.log('white player legal moves ', this.whitePlayer.legalMoves);
    console.log('black player legal moves ', this.blackPlayer.legalMoves);
    return this.whitePlayer.legalMoves.concat(this.blackPlayer.legalMoves);
  }

  setEnPassantPawn(movedPawn: Pawn) {
    this.enPassantPawn = movedPawn;
  }

  setTransitionMove(tMove: Move) {
    this.transitionMove = tMove;
  }

  getWhitePieces(): Piece[] {
    return this.whitePieces;
  }

  getBlackPieces(): Piece[] {
    return this.blackPieces;
  }
}
