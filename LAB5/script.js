var result = document.querySelector('#result');
var expression = document.querySelector('#expression');
var num = document.querySelectorAll('.number:not(.equals)');
var operation = document.querySelectorAll('.operation');
var equals = document.querySelector('.equals');
var clear = document.querySelector('#clear');
var ce = document.querySelector('#ce');
var backspace = document.querySelector('#backspace');
var changeSign = document.querySelector('#changeSign')
var sqrt = document.querySelector("#sqrt")
var abs = document.querySelector("#abs")
var div = document.querySelector("#div")

let ex = ''; // the expression string to be eval'd
result.innerHTML = '0';


let onClickNumber = function () { // when we click on a number
  if(!ex || typeof(ex) === 'number' || ex === '0') {
    expression.innerHTML = this.id;
    ex = this.id;
  } else {
    expression.innerHTML += this.id;
    ex += this.id;
  }
  result.innerHTML = ex.split(/\/|\*|\+|-|=/).pop();
  checkLength(result.innerHTML);
};

let onClickOperation = function() { // when we click on an operation
  if(!ex) {
    return;
  }
  ex = ex.toString().replace(/=/, '');
  if (ex.match(/\/|\*|\+|-|=/)) {
    ex = eval(ex).toString();
  } 
  expression.innerHTML = expression.innerHTML.replace(/=/, '') + this.id;
  ex += this.id;
  result.innerHTML = this.id;
};

Array.from(num).forEach(function(element) { // assign appropriate function to all numbers and operations
      element.addEventListener('click', onClickNumber);
    });

Array.from(operation).forEach(function(element) {
      element.addEventListener('click', onClickOperation);
    });

// clear all on click
clear.addEventListener('click', () => {
  result.innerHTML = '';
  expression.innerHTML = '';
  ex = '';
})

// clear last entry on click
ce.addEventListener('click', () => {
  if (!expression.innerHTML.match(/=$/)) {
    
    expression.innerHTML = doCE(expression.innerHTML);
    ex = doCE(ex); 
    result.innerHTML = 0;
    
    function doCE(arg) {
      arg = arg.split(/([\/\*\+\-\=])/g);
      arg.splice(-1, 1);
      return arg.join('');
    }
  }
})

backspace.addEventListener('click', () => {
    if (!ex[ex.length - 1].match(/\/|\*|\+|-|=/)) {
        ex = expression.innerHTML.slice(0, -1)
        expression.innerHTML = expression.innerHTML.slice(0, -1)
        result.innerHTML = result.innerHTML.slice(0, -1)
    }
})

changeSign.addEventListener('click', () => {
    var tempres = result.innerHTML;
    result.innerHTML = "-" + result.innerHTML

    expression.innerHTML = expression.innerHTML.replace(new RegExp(tempres + '$'), result.innerHTML)
    ex = ex.replace(new RegExp(tempres + '$'), result.innerHTML)
})

sqrt.addEventListener('click', () => {
    var tempres = result.innerHTML;
    result.innerHTML = Math.sqrt(Number(result.innerHTML))

    expression.innerHTML = expression.innerHTML.replace(new RegExp(tempres + '$'), result.innerHTML)
    ex = ex.replace(new RegExp(tempres + '$'), result.innerHTML)
})

abs.addEventListener('click', () => {
    var tempres = result.innerHTML;
    result.innerHTML = Number(result.innerHTML) * Number(result.innerHTML)

    expression.innerHTML = expression.innerHTML.replace(new RegExp(tempres + '$'), result.innerHTML)
    ex = ex.replace(new RegExp(tempres + '$'), result.innerHTML)
})

div.addEventListener('click', () => {
    var tempres = result.innerHTML;
    result.innerHTML = 1 / Number(result.innerHTML)

    expression.innerHTML = expression.innerHTML.replace(new RegExp(tempres + '$'), result.innerHTML)
    ex = ex.replace(new RegExp(tempres + '$'), result.innerHTML)
})

// calculate the whole thing
equals.addEventListener('click', ()=> {
  if (!ex) {
    result.innerHTML = '0';
  } else {
    ex = eval(ex);
    expression.innerHTML += '=';
    result.innerHTML = trim12(ex);
  }
})

function checkLength(arg) { // if we enter a number that's too long 
  if (arg.toString().length > 14) {
    expression.innerHTML = 'number too long'.toUpperCase();
    result.innerHTML = '0';
    ex = '0';
  } 
}

function trim12(arg) { // if we calculate a number that's too long
  if (arg.toString().length > 14) {
    ex = parseFloat(arg.toPrecision(12));
    if (ex.toString().length > 14) { 
      ex = ex.toExponential(9);
    };
    return ex;
  } else {
    return arg;
  }
}