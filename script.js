let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector("#msg");
const gif = document.querySelector("#winner-gif");
const container = document.querySelector(".container")

const scoreXDisplay = document.getElementById("score-x");
const scoreODisplay = document.getElementById("score-o");
let scoreX = parseInt(sessionStorageStorage.getItem("scoreX")) || 0;
let scoreO = parseInt(sessionStorageStorage.getItem("scoreO")) || 0;


scoreXDisplay.textContent = scoreX;
scoreODisplay.textContent = scoreO;


let turnX = true; // playerX playerO
let isGameOver = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!isGameOver) {
      if (turnX) {
        box.innerText = "X";
        turnX = false;
      } else {
        box.innerText = "O";
        turnX = true;
      }
      box.disabled = true;
      checkWinner();
    }
  });
});

function showWinner(winner) {
  msg.innerText = `🎉Congratulation Winner: Player ${winner}`;
  gif.classList.remove("hide");

  msgContainer.classList.remove("hide");
   document.querySelector(".game").classList.add("blur");
   resetbtn.classList.add("hide");
  isGameOver = true;

  disableboxes();
  updateScore(winner);
}

function showDraw() {
  msg.innerText = "It's a Draw!";
  gif.classList.add("hide");
  msgContainer.classList.remove("hide");
 document.querySelector(".game").classList.add("blur");

  isGameOver = true;
  disableboxes();
  updateScore("Draw");
}

function checkWinner() {
  let winnerFound = false;

  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        winnerFound = true;
        return;
      }
    }
  }

  // Check for draw only if no winner
  let filledBoxes = 0;
  boxes.forEach((box) => {
    if (box.innerText !== "") {
      filledBoxes++;
    }
  });

  if (filledBoxes === 9 && !winnerFound) {
    showDraw();
  }
};

const disableboxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableboxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

function resetGame() {
  turnX = true;
  isGameOver = false;
  enableboxes();
  msgContainer.classList.add("hide");
  gif.classList.add("hide");
document.querySelector(".game").classList.remove("blur");

}
 



function updateScore(result) {
  if (result === "X") {
    scoreX++;
    sessionStorageStorage.setItem("scorex" , scoreX);
    scoreXDisplay.textContent = scoreX;
  } else if (result === "O") {
    scoreO++;
    sessionStorageStorage.setItem("scoreo" , scoreO);
    scoreODisplay.textContent = scoreO;
  } 
  
}


newGamebtn.addEventListener("click", () => {
  resetbtn.classList.remove("hide");
  resetGame();
});
resetbtn.addEventListener("click", resetGame);


