import { COLS, ROWS } from "./index.js";

export class Board {
  constructor() {
    this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  mergePiece(piece) {
    for (let y = 0; y < piece.shape.length; y++)
      for (let x = 0; x < piece.shape[y].length; x++)
        if (piece.shape[y][x] != 0)
          this.board[piece.y + y][piece.x + x] = piece.shape[y][x];
    this.removeFullLines();
  }

  removeFullLines() {
    while (this.board.some((line) => line.every((cell) => cell != 0)))
      for (let y = this.board.length - 1; y >= 0; y--)
        if (this.board[y].every((cell) => cell != 0)) {
          this.board.splice(y, 1);
          this.board.unshift(Array(COLS).fill(0));
        }
  }

  reset() {
    this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}
