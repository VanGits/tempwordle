let popUpOpen = false;


function popUp() {
  if (popUpOpen){
    popUpOpen = false
    return document.body.classList.remove("popUp")
  }
  popUpOpen = true;
  document.body.classList += " popUp"
}
function closePopUp() {
  var popUpNoti = document.getElementById("popUp")
  if (popUpNoti.style.display === "none"){
    popUpNoti.style.display = "flex"
  } else {
    popUpNoti.style.display = "none"
  }
  console.log("wassup")

}


document.addEventListener("DOMContentLoaded", () => {
  createSquares();

  let guessedWords = [[]];
  let availableSpace = 1;

  let word = "lotti";
  let guessedWordCount = 0;
  const keys = document.querySelectorAll(".keyboard__row button");
  const container = document.querySelector(".fireworks-container");
  const fireworks = new Fireworks(container);
  
 
  

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));
      availableSpace = availableSpace + 1;

      availableSpaceEl.textContent = letter;
    }
  }

  function getTileColor(letter, index) {
    const isCorrectLetter = word.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(58,58,60)";
    }

    const letterInPosition = word.charAt(index);
    const correctPosition = letter === letterInPosition;

    if (correctPosition) {
      return "rgb(83,141,78)";
    }

    return "rgb(181,159,59)";
  }

  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length < 5) {
      window.alert("Not enough letters");
      window.location.reload();
    }

    const currentWord = currentWordArr.join("");

    const firstLetterId = guessedWordCount * 5 + 1;

    const interval = 500;

    currentWord.length === 5 &&
      currentWordArr.forEach((letter, index) => {
        setTimeout(() => {
          const tileColor = getTileColor(letter, index);

          const letterId = firstLetterId + index;
          const letterEl = document.getElementById(letterId);
          letterEl.classList.add("animate__flipInX");
          letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
        }, interval * index);
      });

    guessedWordCount += 1;

    if (currentWord === word) {
      window.alert("Congratulations!");
      fireworks.start();
    }

    if (guessedWords.length === 6) {
      window.alert("You have lost, try again next time.");
      window.location.reload();
    }
    guessedWords.push([]);
  }
  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  function handleDeleteLetter() {
    const currentWordArr = getCurrentWordArr();
    const removedLetter = currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;
    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
  }

  for (let i = 0; i < keys.length; i++) {
    
    keys[i].onclick = ({ target }) => {
      
      const letter = target.getAttribute("data-key");
      
      if (letter === "enter") {
        handleSubmitWord();
        return;
      }

      if (letter === "del") {
        handleDeleteLetter();
        return;
      }
      updateGuessedWords(letter);
    };
  }
  for (let i = 0; i < keys.length; i++) {
    
    keys[i].onkeydown = ({ target }) => {
      
      const letter = target.getAttribute("data-key");
      
      if (letter === "enter") {
        handleSubmitWord();
        return;
      }

      if (letter === "del") {
        handleDeleteLetter();
        return;
      }
      updateGuessedWords(letter);
    };
  }
  window.addEventListener('keydown', checkKeyDown, false)
  
  function checkKeyDown(e){
    if(e.key){
      console.log(e.key)
    }
  }



    

});
