const boxes = document.querySelectorAll(".box");
let arrayOfBoxes = [];
let randomNumber = 0;
let mineIsFound = false;
const btn = document.getElementById("btn");
const btn3x3 = document.getElementById("btn-3x3");
const btn4x4 = document.getElementById("btn-4x4");
const btn5x5 = document.getElementById("btn-5x5");
const gridContainer = document.getElementById("container");
let numberOfMoves = 0;
const moves = document.getElementById("moves");

const title = document.getElementById("title");
// reset button event listener
btn.addEventListener("click", handleReset);
// 3x3 button event listener
btn3x3.addEventListener("click", threeByThree);
// 4x4 button event listener
btn4x4.addEventListener("click", fourByFour);
// 5x5 button event listener
btn5x5.addEventListener("click", fiveByFive);

// 3x3 playfield
function threeByThree() {
  const playfield = 9;
  handleReset();
  hideBoxes(playfield);
  gridContainer.classList.add("three-by-three");
  gridContainer.classList.remove("four-by-four");
  gridContainer.classList.remove("five-by-five");

  if (arrayOfBoxes.length !== 9) {
    arrayOfBoxes = [];
    for (i = 0; i < 9; i++) {
      arrayOfBoxes.push(boxes[i]);
      boxes[i].classList.remove("hide");
      console.log(boxes[i]);
    }
    title.innerText = "Avoid the mine";
    addListeners();
    generateRandomNumber();
  }
}
// 4x4 playfield
function fourByFour() {
  const playfield = 16;
  handleReset();
  hideBoxes(playfield);
  gridContainer.classList.add("four-by-four");
  gridContainer.classList.remove("three-by-three");
  gridContainer.classList.remove("five-by-five");
  if (arrayOfBoxes.length !== 16) {
    arrayOfBoxes = [];
    for (i = 0; i < 16; i++) {
      arrayOfBoxes.push(boxes[i]);
      boxes[i].classList.remove("hide");
      console.log(boxes[i]);
    }

    title.innerText = "Avoid the mine";

    addListeners();
    generateRandomNumber();
  }
}

// 5x5 playfield
function fiveByFive() {
  const playfield = 25;
  handleReset();
  hideBoxes(playfield);

  gridContainer.classList.add("five-by-five");
  gridContainer.classList.remove("four-by-four");
  gridContainer.classList.remove("three-by-three");
  if (arrayOfBoxes.length !== 25) {
    arrayOfBoxes = [];
    for (i = 0; i < 25; i++) {
      arrayOfBoxes.push(boxes[i]);
      boxes[i].classList.remove("hide");
      console.log(boxes[i]);
    }

    addListeners();
    generateRandomNumber();
  }
}

// add boxes into an array
for (i = 0; i < boxes.length; i++) {
  if (boxes[i].classList.value.includes("hide")) {
    continue;
  }
  arrayOfBoxes.push(boxes[i]);
}

// add event listeners to all boxes
function addListeners() {
  arrayOfBoxes.forEach((box) => box.addEventListener("click", placeMine));
}
// Main function to change the boxes
function placeMine() {
  numberOfMoves++;
  moves.innerText = `you have made ${numberOfMoves} moves`;

  let placedMine = document.querySelector(`.box-${randomNumber}`);
  console.log(placedMine);
  if (mineIsFound) {
    return;
  }

  if (this.classList === placedMine.classList) {
    this.classList.add("mine");
    this.innerHTML = "Mine!";
    btn.classList.remove("hide");
    mineIsFound = true;
  } else {
    this.classList.add("safe");
    this.innerText = "Safe";
  }
}

// generate a random number
function generateRandomNumber() {
  return (randomNumber = Math.floor(Math.random() * arrayOfBoxes.length + 1));
}
// hide boxes
function hideBoxes(playfieldSize) {
  if (arrayOfBoxes.length === playfieldSize) {
    return;
  } else {
    boxes.forEach((box) => box.classList.add("hide"));
  }
}
// reset button
function handleReset() {
  numberOfMoves = 0;
  moves.innerText = "you have made 0 moves";
  mineIsFound = false;
  btn.classList.add("hide");
  arrayOfBoxes.forEach((box) => box.classList.remove("mine"));
  arrayOfBoxes.forEach((box) => box.classList.remove("safe"));
  arrayOfBoxes.forEach((box, idx) => (box.innerText = idx + 1));
  generateRandomNumber();
}

threeByThree();
