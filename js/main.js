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

let position = ["0", "1", "2", "3", "4", "5", "6", "7"];

position = position.concat(position); //extending table by same numbers

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
let setInt;

function shuffle(array) {
  //randomizing the cards
  let current = array.length,
    temp,
    random;

  while (0 !== current) {
    //it will continue till all cards will be shuffled
    random = Math.floor(Math.random() * current);
    current -= 1;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }

  return array;
}

function createGrid() {
  //shuffle colors of cards
  for (i = 1; i < 17; i++) {
    document.getElementById("c" + i).style.backgroundColor =
      colors[position[i - 1]];
    console.log(colors[position[i - 1]]);
  }
}

function start() {
  //hiding frame with start button and showing both game frame and score frame
  var x = document.getElementById("startFrame");
  x.style.display = "none";
  var x = document.getElementById("game");
  x.style.display = "block";
  var x = document.getElementById("endFrame");
  x.style.display = "block";
  //starting game (counting)
  startGame();
}

function startGame() {
  //starting game
  shuffle(position); //shuffling position of cards
  createGrid();

  console.log(colors);
  console.log(position);

  setInt = setInterval(function() {
    //changing state of variables every 1 second
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

function cardClick(i) {
  if (wait === 0) {
    setTimeout(function() {
      //turning picked card
      cardTurn(i);
    }, 0);
  }
  setTimeout(function() {
    //dissabling ability to open another card for 0.35 s
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
    //adding moves, 2 card clicks account as 1 click so added value equals 0.5
    moves = moves + 0.5;
    console.log(moves + " moves");
    document.getElementById("moves2").innerHTML = moves.toFixed(0);

    if (content === 0) {
      //opening cards
      content++;
      d.className = "cardcontent active";
    } else {
      content = 0;
      d.className = "cardcontent active";
    }

    if (content != 0) {
      //if there is no picked card, picked card id will go into a holder to see if the next card will be a match
      holder = i;
      console.log("holder");
    } else {
      //checking if card is a match, (-1) is because array starts 1 diggit earlier
      if (colors[position[i - 1]] != colors[position[holder - 1]]) {
        //giving time of 0.35 s for card to turn around and in case of not match return to previous state
        setTimeout(function() {
          d = document.getElementById("cc" + i);
          d.className = "cardcontent";
          d = document.getElementById("cc" + holder);
          d.className = "cardcontent";
        }, 350);
      } else {
        cardsLeft--;
        if (cardsLeft === 0) {
          //if there is no cards left, game will stop and div with the game will dissapear
          isGameStarted = 0;
          var x = document.getElementById("game");
          x.style.display = "none";
        }
      }
    }
  }
}
