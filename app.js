const words = [
    "Courage",  "Bleak",  "Theory",  "Atrocity", 'ladder', "abandoned","able","absolute","adorable","adventurous","academic","acceptable","acclaimed","accomplished",
		"accurate","aching","acidic","acrobatic","active","actual","adept","admirable","admired","adolescent",
		"adorable","adored","advanced","afraid","affectionate","aged","aggravating","aggressive","agile","agitated",
		"agonizing","agreeable","ajar","alarmed","alarming","alert","alienated","alive","all","altruistic","amazing",
		"ambitious","ample","amused","amusing","anchored","ancient","angelic","angry","anguished","animated","annual",
		"another","antique","anxious","any","apprehensive","appropriate","apt","arctic","arid","aromatic","artistic",
		"ashamed","assured","astonishing","athletic","attached","attentive","attractive","austere","authentic",
		"authorized","automatic","avaricious","average","aware","awesome","awful","awkward","babyish","bad","back",
		"baggy","bare","barren","basic","beautiful","belated","beloved","beneficial","better","best","bewitched","big",
		"bighearted","biodegradable","bitesized","bitter","black"
    
]

const resetBtn = document.getElementById("reset__btn")
const randomBtn = document.getElementById("random__btn")
const inputContainer = document.querySelector(".input_container")
const circles = document.querySelectorAll(".circle");
const triesCounter = document.querySelector(".counter");
const wordContainer = document.querySelector(".random_word")
const mistakeContainer = document.querySelector(".mistakes");
const winCard = document.querySelector(".win_card");
const closeCards = document.querySelectorAll(".icon");
const levelContainer = document.querySelector(".level")
const loseCard = document.querySelector(".lose_card");
const lostLevel = document.querySelector(".lost")



let level = 0;
let winningWord = '';
let word = '';
let wordLetters = '';
let tries = -1;
let mistakes = [];
let correctGuess = [];
let wrongGuess = [];
let wordArray = [];
let letterArray = [];
let correctWord = '';
let letterValue = '';
let currentStep = -2;



function shuffleWord () {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    winningWord = randomWord;
    console.log(winningWord)
    const shuffled = randomWord.split('').sort(function(){return 0.5-Math.random()}).join('').toLowerCase();
    word = shuffled
    document.querySelector(".random_word").innerHTML = word
    console.log(word)
}

// onload 

window.addEventListener("DOMContentLoaded", function (){
    shuffleWord()
    document.querySelector(".random_word").innerHTML = word;
    makeInput();
    eventListeners();
});

// inputs

function makeInput () {
    removePrevInput();
    letterArray = [...word]
    console.log(letterArray)
    letterArray.forEach(() => {
        letterInput = document.createElement('input')
        letterInput.classList.add("input_active");
        letterInput.maxLength = 1;
        letterInput.autofocus = true;
        inputContainer.appendChild(letterInput)
    })
}

// event listeners

function eventListeners () {
  const letterInputs = document.querySelectorAll(".input_active");
    letterInputs.forEach((letter, index) => {
        letter.addEventListener("input", () => {
            
            const nextInput = letterInputs[index + 1];
            letterValue = letter.value;
                wordArray = winningWord.split("")
                if (inputContainer.lastElementChild.value === wordArray[wordArray.length -1]) {
                    level++
                    checkWinner();
                }
                if(letterValue === wordArray[index].toLowerCase()) {
                  nextInput.focus() 
                  correctGuess.push(letterValue)
                  correctGuess[index] = letterValue
                  
                }
                if(letterValue !== wordArray[index].toLowerCase()) {
                    wrongGuess.push(letterValue)
                    mistakes.push(letter.value)
                     handleTries();
                     progressStep();
                     handleMistakes();
                     letter.value = ''
                }
        })
    })
}

randomBtn.addEventListener("click", function () {
    shuffleWord();
    makeInput();
    eventListeners();
    
})

resetBtn.addEventListener("click", function () {
    resetGame();
})



function checkWinner () {
    document.querySelector(".random_word").innerHTML = winningWord.toLowerCase();
    winCard.classList.add("active");
    levelContainer.textContent = `Level: ${level}. Word was: ${winningWord}`;
    lostLevel.textContent = `You reached level: ${level}`;
}
    
closeCards.forEach((closeCard) => {
    closeCard.addEventListener("click", () => {
    winCard.classList.remove("active");
    loseCard.classList.remove("active");
    });
});


function removePrevInput () {
    inputContainer.innerHTML = '';
}



function handleTries () {
    let attempts = tries++
    triesCounter.textContent = `Tries: ${attempts+2}/5`;
    if(tries > 4) {
        loseCard.classList.add("active");
         resetGame();
    } 

}

function handleMistakes () {
   
   if(mistakes.length > 5) {
     mistakeContainer.innerHTML = `<h4>Mistakes:</h4>`
   } else {
     mistakeContainer.innerHTML = `<h4 class="mistakes">Mistakes: <span class="mistake_letters">${mistakes}</span></h4>`
   }
}


function progressStep () {
    currentStep++
    circles.forEach((circle, index) => {
        circle.classList.toggle("active", index === currentStep+1);
    });
}


function resetGame () {
   removePrevInput();
   winningWord = '';
    word = '';
    wordLetters = '';
    tries = -1;
    mistakes = [];
    correctGuess = [];
    wrongGuess = [];
    wordArray = [];
    letterArray = [];
    correctWord = '';
    letterValue = '';
    currentStep = -2;
    level = 0;
   wordContainer.textContent = " ";
   triesCounter.textContent = `Tries: 0/5`;
   mistakeContainer.textContent = `Mistakes:`
   
}











