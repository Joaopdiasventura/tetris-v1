import { COLS, ROWS } from "./index.js";
import { Shapes } from "./shapes.js";

export class Piece {
  constructor() {
    this.shape = Shapes[Math.floor(Math.random() * Shapes.length)];
    this.x = 4;
    this.y = 0;
  }

  rotate() {
    const rows = this.shape.length;
    const cols = this.shape[0].length;

    let newShape = Array.from({ length: cols }, () => Array(rows).fill(0));
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++)
        newShape[x][rows - y - 1] = this.shape[y][x];

    if (this.x == 0) this.x += 1;
    if (this.x == COLS - this.shape[0].length) this.x -= 1;

    this.shape = newShape;
  }

  canMove(board, dx, dy) {
    for (let y = 0; y < this.shape.length; y++)
      for (let x = 0; x < this.shape[y].length; x++)
        if (this.shape[y][x] !== 0) {
          const newX = this.x + x + dx;
          const newY = this.y + y + dy;
          if (newX < 0 || newX >= COLS || newY >= ROWS) return false;
          if (newY >= 0 && board[newY][newX] !== 0) return false;
        }

    return true;
  }

  draw(draws) {
    for (let y = 0; y < this.shape.length; y++)
      for (let x = 0; x < this.shape[y].length; x++)
        if (this.shape[y][x] != 0) {
          let drawX = this.x + x;
          let drawY = this.y + y;
          draws.drawCell(drawX, drawY, this.shape[y][x]);
        }
  }

  reset() {
    this.shape = Shapes[Math.floor(Math.random() * Shapes.length)];
    this.x = 4;
    this.y = 0;
  }
}
