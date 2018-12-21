let colors = [
  "#006633",
  "#336699",
  "#333399",
  "#33aa00",
  "#66aacc",
  "#9966aa",
  "#cc99aa",
  "#00aaff"
];

// let signs = ["★", "❀", "ヅ", "❤", "♫", "✼", "❂", "✧"];

let position = [
  "0",
  "0",
  "1",
  "1",
  "2",
  "2",
  "3",
  "3",
  "4",
  "4",
  "5",
  "5",
  "6",
  "6",
  "7",
  "7"
];

// let clicked = 0; //checking if clicked or not

let moves = 0; //keeping on track number of moves
let content = 0; //checking if clicked or not
let holder = 0; //checking if any card is open right now
let wait = 0; //checking if function is still waiting for cards to close
let cardsLeft = 8; //number of pairs left

let isGameStarted = 1;

let score = 999999;
let seconds = 0;
let stars = 5;

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (0 !== current) {
    random = Math.floor(Math.random() * current);
    current -= 1;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }

  return array;
}

function createGrid() {
  for (i = 1; i < 17; i++) {
    document.getElementById("c" + i).style.backgroundColor =
      colors[position[i - 1]];
    console.log(colors[position[i - 1]]);
  }
}

function start() {
  var x = document.getElementById("startFrame");
  x.style.display = "none";
  var x = document.getElementById("game");
  x.style.display = "block";
  var x = document.getElementById("endFrame");
  x.style.display = "block";
}

function startGame() {
  // shuffle(colors);
  // shuffle(backgrounds);
  shuffle(position);
  createGrid();

  console.log(colors);
  // console.log(backgrounds);
  console.log(position);

  setInterval(function() {
    if (isGameStarted === 1) {
      seconds++;
      if (score < 200000 && score >= 100000) {
        document.getElementById("stars2").innerHTML = "★★★★";
      } else if (score < 100000 && score >= 50000) {
        document.getElementById("stars2").innerHTML = "★★★";
      } else if (score < 50000 && score >= 25000) {
        document.getElementById("stars2").innerHTML = "★★";
      } else if (score < 25000) {
        document.getElementById("stars2").innerHTML = "★";
      }
      if (moves < 1) {
        score = 100000000 / 1 / seconds;
      } else {
        score = 100000000 / moves / seconds;
      }
      document.getElementById("seconds2").innerHTML = seconds;
      document.getElementById("score2").innerHTML = score.toFixed(0);
    }
  }, 1000);
}

startGame();

function cardClick(i) {
  if (wait === 0) {
    setTimeout(function() {
      cardTurn(i);
    }, 0);
  }
  setTimeout(function() {
    wait = 0;
  }, 350);
}

function cardTurn(i) {
  var d = document.getElementById("cc" + i);
  wait = 1;

  if (d.classList.contains("active")) {
    //in case you click opened card

    console.log("stop");
  } else {
    moves = moves + 0.5;
    console.log(moves + " moves");
    document.getElementById("moves2").innerHTML = moves.toFixed(0);

    //opening cards

    if (content === 0) {
      content++;
      d.className = "cardcontent active";
      console.log("ping");
    } else {
      content = 0;
      d.className = "cardcontent active";
      console.log("pong");
      console.log(colors[position[i - 1]]);
    }

    if (content != 0) {
      holder = i;
      console.log("holder");

      //checking what card is opened
    } else {
      if (colors[position[i - 1]] != colors[position[holder - 1]]) {
        setTimeout(function() {
          d = document.getElementById("cc" + i);
          d.className = "cardcontent";
          d = document.getElementById("cc" + holder);
          d.className = "cardcontent";
        }, 350);
      } else {
        cardsLeft--;
        if (cardsLeft === 0) {
          isGameStarted = 0;
          var x = document.getElementById("game");
          x.style.display = "none";
        }
      }
    }
  }

  // d = document.getElementById("cc" + i);
  // d.className = "cardcontent";
}
