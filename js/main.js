//Check if keyboard input is valid or not
function isValidChar(tecla) {
  let ch = tecla.key;
  let pattern = /[0-9]|\%|\/|\*|\+|\-/;
  if (ch == "Enter") {
    solveExpression();
  } else if (pattern.test(ch)) {
    printHistory(getResult() + getHistory());
    printResult("");
  } else {
    tecla.preventDefault();
  }
}

// Keep focus on input
const entrada = document.getElementById("entry");
entrada.onblur = function () {
  entrada.focus();
};

//Function for getting rhe result
const solveExpression = function () {
  let history = getOriginalNumber(getHistory());
  history = getEvaluableHistory(history);
  try {
    printResult(math.evaluate(history));
  } catch (err) {
    alert("The expresion inserted can't be evaluated");
  }
  printHistory("");
};

// Format result to separate with comas each 3 digits
const getFormattedNumber = function (num) {
  if (num == "") {
    return num;
  } else {
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
  }
};

// Transform formatted number into regular number to calculate te result
const getOriginalNumber = function (num) {
  let value = num.replace(/,/g, "");
  return value;
};

// Changing multiplication, division and percentage symbols to make them work correctly
const getEvaluableHistory = function (string) {
  let value = string.replace(/×/g, "*");
  value = value.replace(/÷/g, "/");
  value = value.replace(/%/g, "*0.01*");
  return value;
};

const getHistory = function () {
  return document.getElementById("entry").value;
};

const printHistory = function (char) {
  document.getElementById("entry").value = char;
};

const getResult = function () {
  // if result has NaN on it return empty string, otherwise return what's in result
  let text = document.getElementById("result").innerText;
  if (text == NaN) {
    return "";
  } else {
    return text;
  }
};

const printResult = function (num) {
  num = getFormattedNumber(num);
  document.getElementById("result").innerText = num;
};

// Operators functioning

let operators = document.getElementsByClassName("operator");
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function () {
    // Define behavior for operators pressed (AC:clear history ; C:Delete las char ; =:Evaluate history; Other operators add them to the history)
    if (this.id == "clear") {
      printHistory("");
      printResult("");
    } else if (this.id == "backspace") {
      printHistory(getHistory().slice(0, -1));
    } else if (this.id == "equal") {
      solveExpression();
    } else {
      printHistory(getResult() + getHistory() + this.innerText);
      printResult("");
    }
  });
}

// Add numbers pressed to the history
let numbers = document.getElementsByClassName("number");
for (let j = 0; j < numbers.length; j++) {
  numbers[j].addEventListener("click", function () {
    printResult("");
    printHistory(getHistory() + this.innerText);
  });
}

//Resolve when enter is pressed
