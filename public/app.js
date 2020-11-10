let connectRow = document.getElementsByTagName("tr");
let connectCell = document.getElementsByTagName("td");
let connectSlot = document.querySelectorAll(".slot");
const playerTurn = document.querySelector(".player-turn");
const reset = document.querySelector(".reset");

for (let i = 0; i < connectCell.length; i++) {
  connectCell[i].addEventListener("click", (e) =>
    console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`)
  );
}

while (!playerOne) {
  var playerOne = prompt("Player One: Give me your Name. You are the Red Tile");
}

playerOneColor = "red";

while (!playerTwo) {
  var playerTwo = prompt(
    "Player Two: Give me your Name. You are the Yellow Tile"
  );
}

playerTwoColor = "yellow";

let currentPlayer = 1;
playerTurn.textContent = `${playerOne}'s turn!`;

const changeColor = (e) => {
  let column = e.target.cellIndex;
  let row = [];

  for (let i = 5; i > -1; i--) {
    if (connectRow[i].children[column].style.backgroundColor == "white") {
      row.push(connectRow[i].children[column]);
      if (currentPlayer === 1) {
        row[0].style.backgroundColor = playerOneColor;
        if (
          horizontalCheck() ||
          verticalCheck() ||
          diagonalCheckOne() ||
          diagonalCheckTwo()
        ) {
          playerTurn.textContent = `${playerOne} WINS!!`;
          playerTurn.style.color = playerOneColor;
          return alert(`${playerOne} Wins`);
        } else if (drawCheck()) {
          playerTurn.textContent = "DRAW";
          return alert("DRAW!!");
        } else {
          playerTurn.textContent = `${playerTwo}'s turn!`;
          return (currentPlayer = 2);
        }
      } else {
        row[0].style.backgroundColor = playerTwoColor;
        if (
          horizontalCheck() ||
          verticalCheck() ||
          diagonalCheckOne() ||
          diagonalCheckTwo()
        ) {
          playerTurn.textContent = `${playerTwo} WINS!!`;
          playerTurn.style.color = "blue";
          return alert(`${playerTwo} WINS`);
        } else if (drawCheck()) {
          playerTurn.textContent = "DRAW";
          return alert("DRAW!!");
        } else {
          playerTurn.textContent = `${playerOne}'s turn!`;
          return (currentPlayer = 1);
        }
      }
    }
  }
};

Array.prototype.forEach.call(connectCell, (cell) => {
  cell.addEventListener("click", changeColor);
  cell.style.backgroundColor = "white";
});

const colorCheck = (one, two, three, four) => {
  return one == two && one == three && one == four && one !== "white";
};

const horizontalCheck = () => {
  for (let row = 0; row < connectRow.length; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        colorCheck(
          connectRow[row].children[col].style.backgroundColor,
          connectRow[row].children[col + 1].style.backgroundColor,
          connectRow[row].children[col + 2].style.backgroundColor,
          connectRow[row].children[col + 3].style.backgroundColor
        )
      ) {
        return true;
      }
    }
  }
};

const verticalCheck = () => {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        colorCheck(
          connectRow[row].children[col].style.backgroundColor,
          connectRow[row + 1].children[col].style.backgroundColor,
          connectRow[row + 2].children[col].style.backgroundColor,
          connectRow[row + 3].children[col].style.backgroundColor
        )
      ) {
        return true;
      }
    }
  }
};

const diagonalCheckOne = () => {
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        colorCheck(
          connectRow[row].children[col].style.backgroundColor,
          connectRow[row + 1].children[col + 1].style.backgroundColor,
          connectRow[row + 2].children[col + 2].style.backgroundColor,
          connectRow[row + 3].children[col + 3].style.backgroundColor
        )
      ) {
        return true;
      }
    }
  }
};

const diagonalCheckTwo = () => {
  for (let col = 0; col < 4; col++) {
    for (let row = 5; row > 2; row--) {
      if (
        colorCheck(
          connectRow[row].children[col].style.backgroundColor,
          connectRow[row - 1].children[col + 1].style.backgroundColor,
          connectRow[row - 2].children[col + 2].style.backgroundColor,
          connectRow[row - 3].children[col + 3].style.backgroundColor
        )
      ) {
        return true;
      }
    }
  }
};

const drawCheck = () => {
  let fullSlot = [];
  for (let i = 0; i < connectCell.length; i++) {
    if (connectCell[i].style.backgroundColor !== "white") {
      fullSlot.push(connectCell[i]);
    }
  }

  if (fullSlot.length === connectCell.length) {
    return true;
  }
};

reset.addEventListener("click", () => {
  connectSlot.forEach((slot) => {
    slot.style.backgroundColor = "white";
  });
  playerTurn.style.color = "black";
  return currentPlayer === 1
    ? (playerTurn.textContent = `${playerOne}'s turn`)
    : (playerTurn.textContent = `${playerTwo}'s turn`);
});
