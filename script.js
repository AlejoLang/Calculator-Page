let numbs = document.querySelectorAll('.calculatorDiv-buttons-numbers-number');
let operators = document.querySelectorAll('.oper');
let acBtn = document.querySelector('.calculatorDiv-buttons-operator[value="AC"]');
let equalBtn = document.querySelector('.calculatorDiv-buttons-operator[value="="]');
let display = document.querySelector('.calculatorDiv-display p');

display.scrollLeft = display.scrollWidth;

let operation = [];
let numAux = '';
let resDisplayed = false;

const calculate = () => {
    console.log(operation)

    let div = operation.indexOf('/');
    while(div != -1) {
        let res = parseFloat(operation[div - 1], 10) / parseFloat(operation[div + 1], 10);
        operation.splice(div - 1, 3, res.toFixed(3).toString());
        div = operation.indexOf('/');
    }

    let mul = operation.indexOf('*');
    while(mul != -1) {
        let res = parseFloat(operation[mul - 1], 10) * parseFloat(operation[mul + 1], 10);
        operation.splice(mul - 1, 3, res.toFixed(3).toString());
        mul = operation.indexOf('*');
    }

    let sum = operation.indexOf('+');
    while(sum != -1) {
        let res = parseFloat(operation[sum - 1], 10) + parseFloat(operation[sum + 1], 10);
        operation.splice(sum - 1, 3, res.toFixed(3).toString());
        sum = operation.indexOf('+');
    }

    let rest = operation.indexOf('-');
    while(rest != -1) {
        let res = parseFloat(operation[rest - 1], 10) - parseFloat(operation[rest + 1], 10);
        operation.splice(rest - 1, 3, res.toFixed(3).toString());
        rest = operation.indexOf('-');
    }

    if(operation.indexOf(NaN)){
        display.textContent = 'Error';
        resDisplayed = true;
    }
    console.log(operation);
    if(Math.round(parseFloat(operation[0], 10)) - parseFloat(operation[0], 10) == 0 && operation[0].indexOf('e') === -1) {
        operation[0] = parseInt(operation[0], 10).toString();
        console.log(operation);
    }
    display.textContent = operation;
    resDisplayed = true;
}

acBtn.addEventListener('click', () => {
    display.textContent = ""; 
    operation = [];
});

Object.values(numbs)
        .map(num => num.addEventListener('click', (event) => {
            if(resDisplayed) {
                display.textContent = "";
                operation = [];
                numAux = '';
                resDisplayed = false;
            }

            display.textContent += event.target.value;
            numAux += event.target.value.toString();
            display.scrollLeft = display.scrollWidth;
        }));

Object.values(operators)
        .map(op => op.addEventListener('click', (event) => {
            resDisplayed = false;
            display.textContent += event.target.value;

            if(numAux) {operation.push(numAux);}
            numAux = '';

            if( operation[operation.length - 1] == '+' || operation[operation.length - 1] == '-' ||
                operation[operation.length - 1] == '/' || operation[operation.length - 1] == '*' ||
                !operation[operation.length - 1])
            {
                numAux += event.target.value.toString();
            } else {
                operation.push(event.target.value.toString());
            }

            display.scrollLeft = display.scrollWidth;
        }));

equalBtn.addEventListener('click', () => {
    if(numAux){ 
        operation.push(numAux); numAux = '';
    }
    calculate();
});

