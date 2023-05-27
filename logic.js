let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");
let timervalue;

function getNewQuotation() {
  spinner.classList.remove("d-none");
  quoteDisplay.textContent = "";
  let url = "https://apis.ccbp.in/random-quote";
  let options = {
    method: "GET",
  };
  fetch(url, options)
    .then(function (response) {
      spinner.classList.add("d-none");
      return response.json();
    })
    .then(function (randomQuote) {
      quoteDisplay.textContent = randomQuote.content;
    });
}

getNewQuotation();

let counter = 0;

function startCounter() {
  timervalue = setInterval(function () {
    counter = counter + 1;
    timer.textContent = counter;
  }, 1000);
}
startCounter();

submitBtn.addEventListener("click", function () {
  let quotation = quoteDisplay.textContent;
  let userInput = quoteInput.value;
  if (quotation !== userInput) {
    result.textContent = "You typed incorrect sentence!";
  } else if (quotation === userInput) {
    clearInterval(timervalue);
    result.textContent = "You typed in " + counter + " seconds";
  }
});

resetBtn.addEventListener("click", function () {
  result.textContent = "";
  counter = 0;
  clearInterval(timervalue);
  getNewQuotation();
  startCounter();
});
