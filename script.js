let numbs = document.querySelectorAll('.calculatorDiv-buttons-numbers-number');
let operators = document.querySelectorAll('.oper');
let acBtn = document.querySelector('.calculatorDiv-buttons-operator[value="AC"]');
let equalBtn = document.querySelector('.calculatorDiv-buttons-operator[value="="]');
let delBtn = document.querySelector('.calculatorDiv-buttons-operator[value="DEL"]');
let display = document.querySelector('.calculatorDiv-display p');

display.scrollLeft = display.scrollWidth;

let operation = [];
let numAux = '';
let resDisplayed = false;

const calculate = () => {
    console.log('arr', operation)

    let div = operation.indexOf('/');
    while(div != -1) {
        let res = operation[div - 1] / operation[div + 1];
        operation.splice(div - 1, 3, parseFloat(res.toFixed(3), 10));
        div = operation.indexOf('/');
    }

    let mul = operation.indexOf('*');
    while(mul != -1) {
        let res = operation[mul - 1] * operation[mul + 1];
        operation.splice(mul - 1, 3, parseFloat(res.toFixed(3), 10));
        mul = operation.indexOf('*');
    }

    let sum = operation.indexOf('+');
    while(sum != -1) {
        let res = operation[sum - 1] + operation[sum + 1];
        operation.splice(sum - 1, 3, parseFloat(res.toFixed(3), 10));
        sum = operation.indexOf('+');
    }

    let rest = operation.indexOf('-');
    while(rest != -1) {
        let res = operation[rest - 1] - operation[rest + 1];
        operation.splice(rest - 1, 3, parseFloat(res.toFixed(3), 10));
        rest = operation.indexOf('-');
    }

    if(operation.indexOf('NaN') != -1){
        display.textContent = 'Error';
        resDisplayed = true;
        return;
    }
    console.log(operation);
    if(Math.round(operation[0]) - operation[0] == 0 && operation[0].toString().indexOf('e') === -1) {
        operation[0] = parseInt(operation[0], 10);
    }
    display.textContent = operation;
    resDisplayed = true;
}

acBtn.addEventListener('click', () => {
    display.textContent = "";
    numAux = '';
    operation = [];
});

delBtn.addEventListener('click', () => {
    if(resDisplayed) {
        display.textContent = '';
        numAux = '';
        operation = [];
        return;
    }
    display.textContent = display.textContent.slice(0, -1);
    if(numAux) {
        numAux = numAux.slice(0, -1);
    } else {
        if(operation[operation?.length - 1].toString().length > 1) {
            operation[operation.length - 1] = parseFloat(operation[operation.length - 1].toString().slice(0, -1), 10);
        } else {
            operation.pop();
        }
    }
    console.log(numAux, operation)
})

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

            if(numAux) {operation.push(parseFloat(numAux, 10));}
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
        operation.push(parseFloat(numAux, 10)); numAux = '';
    }
    calculate();
});

document.addEventListener('keydown', (event) => {
    if(event.key >= 1 && event.key <= 9 || event.key == '.' || event.key == ','){
        document.querySelector(`.calculatorDiv-buttons-numbers-number[value="${event.key}"]`).click();
        return;
    } else if (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') {
        document.querySelector(`.oper[value="${event.key}"]`).click();
        return;
    } else if (event.key == 'Enter') {
        document.querySelector(`.calculatorDiv-buttons-operator[value="="]`).click();
        return;
    } else if (event.key == 'Backspace') {
        document.querySelector(`.calculatorDiv-buttons-operator[value="DEL"]`).click();
        return;
    }
    
})