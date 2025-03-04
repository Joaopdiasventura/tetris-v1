import { Board } from "./board.js";
import { Draws } from "./draws.js";
import { Piece } from "./piece.js";

export const COLS = 10;
export const ROWS = 20;
export const CELL_SIZE = 50;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const board = new Board();
const draws = new Draws(ctx, CELL_SIZE);

let currentPiece = new Piece();
let points = 0;

canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

function updateDraws() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draws.drawMap(board.board);
  currentPiece.draw(draws);
}

function movePiece(x, y) {
  if (currentPiece.canMove(board.board, x, y)) {
    currentPiece.x += x;
    currentPiece.y += y;
    updateDraws();
  }
}

function rotatePiece() {
  currentPiece.rotate();
  updateDraws();
}

setInterval(() => movePiece(0, 1), 500);

setInterval(() => {
  if (!currentPiece.canMove(board.board, 0, 1)) {
    board.mergePiece(currentPiece);
    currentPiece.reset();
    updateDraws();
    points += 100;
    document.getElementById("points").innerHTML = points;
  }
  if (board.board[0].some((cell) => cell != 0)) {
    alert("Você perdeu");
    board.reset();
    currentPiece.reset();
    points = 0;
    document.getElementById("points").innerHTML = points;
  }
}, 1);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      rotatePiece();
      break;
    case "ArrowLeft":
      movePiece(-1, 0);
      break;
    case "ArrowRight":
      movePiece(1, 0);
      break;
    case "ArrowDown":
      movePiece(0, 1);
      break;
  }
});

updateDraws();

window.movePiece = movePiece;
window.rotatePiece = rotatePiece;
