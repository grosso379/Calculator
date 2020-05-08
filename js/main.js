function getFormattedNumber(num) {
  if (num == "") {
    return num;
  } else {
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
  }
}

function getOriginalNumber(num) {
  var value = num.replace(/,/g, "");
  return value;
}

function getHistory() {
  return document.getElementById("entry").innerText;
}

function printHistory(num) {
  document.getElementById("entry").innerText = num;
}
function getResult() {
  return document.getElementById("result").innerText;
}

function printResult(num) {
  num = getFormattedNumber(num);
  document.getElementById("result").innerText = num;
}

var operators = document.getElementsByClassName("operator");
for (var i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function () {
    printHistory(getHistory() + this.innerText);
  });
}

var numbers = document.getElementsByClassName("number");
for (var j = 0; j < operators.length; j++) {
  numbers[j].addEventListener("click", function () {
    printHistory(getHistory() + this.innerText);
  });
}
