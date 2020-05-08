// Format result to separate with comas each 3 digits
function getFormattedNumber(num) {
  if (num == "") {
    return num;
  } else {
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
  }
}

// Transform formatted number into regular number to calculate te result
function getOriginalNumber(num) {
  var value = num.replace(/,/g, "");
  return value;
}

function getEvaluableHistory(string) {
  var value = string.replace(/×/g, "*");
  value = value.replace(/÷/g, "/");
  return value;
}

function getHistory() {
  return document.getElementById("entry").innerText;
}

function printHistory(char) {
  document.getElementById("entry").innerText = char;
}

function getResult() {
  return document.getElementById("result").innerText;
}

function printResult(num) {
  num = getFormattedNumber(num);
  document.getElementById("result").innerText = num;
}

// Code for the functioning of the calculator

var operators = document.getElementsByClassName("operator");
for (var i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function () {
    // Define behavior for operators pressed (AC:clear history ; C:Delete las char ; =:Evaluate history; Other operators add them to the history)
    if (this.id == "clear") {
      printHistory("");
      printResult("");
    } else if (this.id == "backspace") {
      printHistory(getHistory().slice(0, -1));
    } else if (this.id == "equal") {
      var history = getOriginalNumber(getHistory());
      history = getEvaluableHistory(history);
      printResult(eval(history));
      printHistory("");
    } else {
      printHistory(getResult() + getHistory() + this.innerText);
      printResult("");
    }
  });
}

// Add numbers pressed to the history
var numbers = document.getElementsByClassName("number");
for (var j = 0; j < operators.length; j++) {
  numbers[j].addEventListener("click", function () {
    printHistory(getHistory() + this.innerText);
  });
}
