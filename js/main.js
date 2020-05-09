// Format result to separate with comas each 3 digits
var getFormattedNumber = function (num) {
  if (num == "") {
    return num;
  } else {
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
  }
};

// Transform formatted number into regular number to calculate te result
var getOriginalNumber = function (num) {
  var value = num.replace(/,/g, "");
  return value;
};

// Changing multiplication, division and percentage symbols to make them work correctly
var getEvaluableHistory = function (string) {
  var value = string.replace(/×/g, "*");
  value = value.replace(/÷/g, "/");
  value = value.replace(/%/g, "*0.01*");
  return value;
};

var getHistory = function () {
  return document.getElementById("entry").innerText;
};

var printHistory = function (char) {
  document.getElementById("entry").innerText = char;
};

var getResult = function () {
  return document.getElementById("result").innerText;
};

var printResult = function (num) {
  num = getFormattedNumber(num);
  document.getElementById("result").innerText = num;
};

// Code for the functioning of the calculator

var operators = document.getElementsByClassName("operator");
for (let i = 0; i < operators.length; i++) {
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
      printResult(math.evaluate(history));
      printHistory("");
    } else {
      printHistory(getResult() + getHistory() + this.innerText);
      printResult("");
    }
  });
}

// Add numbers pressed to the history
var numbers = document.getElementsByClassName("number");
for (let j = 0; j < numbers.length; j++) {
  numbers[j].addEventListener("click", function () {
    printResult("");
    printHistory(getHistory() + this.innerText);
  });
}
