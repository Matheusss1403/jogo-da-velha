let board = [];

const buttons = document.querySelectorAll(".btn-board");
const btnStart = document
  .getElementById("btn-start")
  .addEventListener("click", initializeGame);

let currentPlayer = "";

let currentSymbol = "X";

function updateTitle() {
  const playerInput = document.getElementById(currentPlayer);
  document.getElementById("currentPlayer").innerText = playerInput.value;
}

function clickBtnBoard(ev) {
  const btn = ev.currentTarget;
  const row = btn.dataset.row;
  const col = btn.dataset.col;

  if (currentPlayer === "playerOne") {
    btn.innerText = "X";
    board[row][col] = "X";
  } else {
    btn.innerText = "O";
    board[row][col] = "O";
  }

  btn.disabled = true;

  const winRegions = getWinRegions();

  if (winRegions.length > 0) {
    handelWin(winRegions);
  } else if (board.flat().includes("")) {
    currentPlayer = currentPlayer === "playerOne" ? "playerTwo" : "playerOne";
    updateTitle();
  } else {
    document.querySelector("#message").innerHTML = "Empate!";
  }

  console.log(board);
}

function initializeGame() {
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  currentPlayer = "playerOne";
  document.getElementById("message").innerHTML =
    'Vez de: <span id="currentPlayer"></span>';
  updateTitle();

  buttons.forEach(function (btn) {
    btn.classList.remove("win");
    btn.innerText = "";
    btn.disabled = false;
    btn.addEventListener("click", clickBtnBoard);
  });
}

function getWinRegions() {
  const winRegions = [];
  if (board[0][0] && board[0][0] === board[0][1] && board[0][0] === board[0][2])
    winRegions.push("0.0", "0.1", "0.2");
  if (board[1][0] && board[1][0] === board[1][1] && board[1][0] === board[1][2])
    winRegions.push("1.0", "1.1", "1.2");
  if (board[2][0] && board[2][0] === board[2][1] && board[2][0] === board[2][2])
    winRegions.push("2.0", "2.1", "2.2");
  if (board[0][0] && board[0][0] === board[1][0] && board[0][0] === board[2][0])
    winRegions.push("0.0", "1.0", "2.0");
  if (board[0][1] && board[0][1] === board[1][1] && board[0][1] === board[2][1])
    winRegions.push("0.1", "1.1", "2.1");
  if (board[0][2] && board[0][2] === board[1][2] && board[0][2] === board[2][2])
    winRegions.push("0.2", "1.2", "2.2");
  if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2])
    winRegions.push("0.0", "1.1", "2.2");
  if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0])
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

function handelWin(regions) {
  regions.forEach(function (region) {
    const regionRowColumnPair = region.split(".");
    const row = regionRowColumnPair[0];
    const col = regionRowColumnPair[1];
    document
      .querySelector(`[data-row="${row}"][data-col="${col}"]`)
      .classList.add("win");
  });
  const player = document.getElementById(currentPlayer).value;
  //console.log(player)
  document.querySelector("#message").innerText = player + " venceu!";
}
