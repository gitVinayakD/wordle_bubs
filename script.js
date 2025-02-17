import { WORDS } from "./words.js";

const gHex = "#538d4e";
const yHex = "#b59f3b";
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = "marry";

console.log(rightGuessString);

function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === gHex) {
        return;
      }

      if (oldColor === yHex && color !== gHex) {
        return;
      }
      animateCSS(elem, "pulse");
      elem.style.backgroundColor = color;
      elem.style.borderColor = color;
      elem.style.color = "white"; 
      break;
    }
  }
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}

function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
    toastr.error("Not enough letters!");
    return;
  }

  if (!WORDS.includes(guessString)) {
    toastr.error("Word not in list!");
    return;
  }

  var letterColor = ["gray", "gray", "gray", "gray", "gray"];

  //check green
  for (let i = 0; i < 5; i++) {
    if (rightGuess[i] == currentGuess[i]) {
      letterColor[i] = gHex;
      rightGuess[i] = "#";
    }
  }

  //check yellow
  //checking guess letters
  for (let i = 0; i < 5; i++) {
    if (letterColor[i] == gHex) continue;

    //checking right letters
    for (let j = 0; j < 5; j++) {
      if (rightGuess[j] == currentGuess[i]) {
        letterColor[i] = yHex;
        rightGuess[j] = "#";
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    let box = row.children[i];
    let delay = 250 * i;
    setTimeout(() => {
      //flip box
      animateCSS(box, "flipInX");
      //shade box
      box.style.backgroundColor = letterColor[i];
      box.style.borderColor = letterColor[i];
      box.style.color = "white";
      
      shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
    }, delay);
  }
checkWord(guessString);
  
}

function checkWord(guessStr){
  let guessString = guessStr;
  if (guessString === rightGuessString) {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    setTimeout(animateCSSVinayak,1500,row,"heartBeat");
    setTimeout(animateWin,2200);
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      let row = document.getElementsByClassName("letter-row")[5];
      setTimeout(() => {
        animateCSS(row,"headShake");
      },1500);
      guessesRemaining=1;
      setTimeout(() => {
        let box = row.children[0];
        // animateCSSVinayak(box, "flipInX");
        box.style.backgroundColor = "white";
        box.style.borderColor = "#d3d6da";
        box.textContent = "";
        box.style.color = "black";

        box = row.children[1];
        // animateCSSVinayak(box, "flipInX");
        box.style.backgroundColor = "white";
        box.style.borderColor = "#d3d6da";
        box.textContent = "";
        box.style.color = "black";

        box = row.children[2];
       // animateCSSVinayak(box, "flipInX");
        box.style.backgroundColor = "white";
        box.style.borderColor = "#d3d6da";
        box.textContent = "";
        box.style.color = "black";

        box = row.children[3];
        //animateCSSVinayak(box, "flipInX");
        box.style.backgroundColor = "white";
        box.style.borderColor = "#d3d6da";
        box.textContent = "";
        box.style.color = "black";

        box = row.children[4];
        // animateCSSVinayak(box, "flipInX");
        box.style.backgroundColor = "white";
        box.style.borderColor = "#d3d6da";
        box.textContent = "";
        box.style.color = "black";

        toastr.info("Try again ❤️");
      },2300);
    }
  }
}

function animateWin(){
    let delay = 600;
    let delayCount = 2;

    let fireworks = document.querySelector("#overlay");
    setTimeout(() => {
    animateCSSVinayak(fireworks, "fadeIn");
    fireworks.style.setProperty("display","flex");
    },delay*delayCount);
    delayCount=delayCount+3;
    setTimeout(() => {
      animateCSSVinayak(fireworks, "fadeOut");
      fireworks.style.setProperty("display","none");
    },delay*delayCount);
    delayCount=delayCount+1;

    let row = document.getElementsByClassName("letter-row")[0];
    let box = row.children[0];

    setTimeout(() => {
      row = document.getElementsByClassName("letter-row")[0];
      box = row.children[0];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = yHex;
      box.style.borderColor = yHex;
      box.style.color = "white";
      box.textContent = "W";
    
      box = row.children[1];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = yHex;
      box.style.borderColor = yHex;
      box.style.color = "white";
      box.textContent = "I";

      box = row.children[2];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = yHex;
      box.style.borderColor = yHex;
      box.style.color = "white";
      box.textContent = "L";
    
      box = row.children[3];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = yHex;
      box.style.borderColor = yHex;
      box.style.color = "white";
      box.textContent = "L";
   
      box = row.children[4];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";

    }, delay*delayCount);

    delayCount = delayCount+1;

    setTimeout(() => {
      row = document.getElementsByClassName("letter-row")[1];
      box = row.children[0];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = yHex;
      box.style.borderColor = yHex;
      box.style.color = "white";
      box.textContent = "Y";
    
      box = row.children[1];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = yHex;
      box.style.borderColor = yHex;
      box.style.color = "white";
      box.textContent = "O";

      box = row.children[2];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = yHex;
      box.style.borderColor = yHex;
      box.style.color = "white";
      box.textContent = "U";
    
      box = row.children[3];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";
   
      box = row.children[4];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";

    }, delay*delayCount);

    delayCount = delayCount+1;

    setTimeout(() => {
      row = document.getElementsByClassName("letter-row")[2];
      box = row.children[0];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = gHex;
      box.style.borderColor = gHex;
      box.style.color = "white";
      box.textContent = "M";
    
      box = row.children[1];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = gHex;
      box.style.borderColor = gHex;
      box.style.color = "white";
      box.textContent = "A";

      box = row.children[2];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = gHex;
      box.style.borderColor = gHex;
      box.style.color = "white";
      box.textContent = "R";
    
      box = row.children[3];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = gHex;
      box.style.borderColor = gHex;
      box.style.color = "white";
      box.textContent = "R";
   
      box = row.children[4];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = gHex;
      box.style.borderColor = gHex;
      box.style.color = "white";
      box.textContent = "Y";

    }, delay*delayCount);

    delayCount = delayCount+1;

    setTimeout(() => {
      row = document.getElementsByClassName("letter-row")[3];
      box = row.children[0];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = yHex;
      box.style.borderColor = yHex;
      box.style.color = "white";
      box.textContent = "M";
    
      box = row.children[1];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = yHex;
      box.style.borderColor = yHex;
      box.style.color = "white";
      box.textContent = "E";

      box = row.children[2];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = yHex;
      box.style.borderColor = yHex;
      box.style.color = "white";
      box.textContent = "?";
    
      box = row.children[3];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";
   
      box = row.children[4];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";
    }, delay*delayCount);
    delayCount = delayCount + 1; 

    setTimeout(() => {
      row = document.getElementsByClassName("letter-row")[4];
      box = row.children[0];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";

      box = row.children[1];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";

      box = row.children[2];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";

      box = row.children[3];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";

      box = row.children[4];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";

      row = document.getElementsByClassName("letter-row")[5];
      box = row.children[0];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";

      box = row.children[1];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";

      box = row.children[2];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "💍";

      box = row.children[3];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";

      box = row.children[4];
      animateCSSVinayak(box, "flipInX");
      box.style.backgroundColor = "white";
      box.style.borderColor = "#d3d6da";
      box.textContent = "";
    
      

      // row = document.createElement("div");
      // row.className = "letter-row";
      // let bhawana = document.createElement("div");
      // bhawana.className = "bhawana";
      // bhawana.textContent= " ";
      // bhawana.style.backgroundColor = "white";
      // row.appendChild(bhawana);
      // let board = document.getElementById("game-board");
      // board.appendChild(row);
      // animateCSSVinayak(row,"flipInX");
      // row = document.createElement("div");
      // row.className = "letter-row";
      // let blank = document.createElement("div");
      // blank.className='bhawana';
      // blank.textContent="💍";
      // blank.style.textAlign = "center";
      // row.appendChild(blank);
      // board = document.getElementById("game-board");
      // board.appendChild(row);
      // animateCSSVinayak(row,"flipInX");
    }, delay*delayCount);
      
    delayCount = delayCount + 1; 

    setTimeout(() => {
     

    }, delay*delayCount);
}

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}

const animateCSS = (element, animation, prefix = "animate__") => {
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty("--animate-duration", "0.8s");

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}

const animateCSSVinayak = (element, animation, prefix = "animate__") => {
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty("--animate-duration", "1.5s");
    node.classList.add(`${prefix}animated`, animationName);
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}

document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    checkGuess();
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

initBoard();
