let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector("#msg");

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

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  document.querySelector(".container").classList.add("blur");
  disableboxes();
  isGameOver = true;
};

const showDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
   document.querySelector(".container").classList.add("blur");
  disableboxes();
  isGameOver = true;
};

const checkWinner = () => {
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

const resetGame = () => {
  turnX = true;
  isGameOver = false;
  enableboxes();
  msgContainer.classList.add("hide");
  document.querySelector(".container").classList.remove("blur");
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
