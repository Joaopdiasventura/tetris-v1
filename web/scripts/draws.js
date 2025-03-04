import { CELL_SIZE } from "./index.js";

const colors = {
  0: "#000000",
  1: "#FF0D72",
  2: "#0DC2FF",
  3: "#0DFF72",
  4: "#F538FF",
  5: "#FF8E0D",
};

export class Draws {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawCell(x, y, value) {
    this.ctx.fillStyle = colors[value];
    this.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  drawMap(board) {
    for (let y = 0; y < board.length; y++)
      for (let x = 0; x < board[y].length; x++)
        this.drawCell(x, y, board[y][x]);
  }
}
