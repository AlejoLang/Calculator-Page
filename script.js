let numbs = document.querySelectorAll('.calculatorDiv-buttons-numbers-number');
let operators = document.querySelectorAll('.oper');
let acBtn = document.querySelector('.calculatorDiv-buttons-operator[value="AC"]');
let equalBtn = document.querySelector('.calculatorDiv-buttons-operator[value="="]');
let display = document.querySelector('.calculatorDiv-display');

let operation = [];
let numAux = '';

const calculate = () => {
    console.log(operation)

    let div = operation.indexOf('/');
    while(div != -1) {
        let res = parseFloat(operation[div - 1], 10) / parseFloat(operation[div + 1], 10);
        operation[div + 1] = res.toFixed(3).toString();
        operation.splice(div - 1, 2);
        div = operation.indexOf('/');
    }

    let mul = operation.indexOf('*');
    while(mul != -1) {
        let res = parseFloat(operation[mul - 1], 10) * parseFloat(operation[mul + 1], 10);
        operation[mul + 1] = res.toFixed(3).toString();
        operation.splice(mul - 1, 2);
        mul = operation.indexOf('*');
    }

    let sum = operation.indexOf('+');
    while(sum != -1) {
        let res = parseFloat(operation[sum - 1], 10) + parseFloat(operation[sum + 1], 10);
        operation[sum + 1] = res.toFixed(3).toString();
        operation.splice(sum - 1, 2);
        sum = operation.indexOf('+');
    }

    let rest = operation.indexOf('-');
    while(rest != -1) {
        let res = parseFloat(operation[rest - 1], 10) - parseFloat(operation[rest + 1], 10);
        operation[rest + 1] = res.toFixed(3).toString();
        operation.splice(rest - 1, 2);
        rest = operation.indexOf('-');
    }
    if(Math.round(parseFloat(operation[0], 10)) - parseFloat(operation[0], 10) == 0) {
        operation[0] = parseInt(operation[0], 10).toString();
    }
    display.textContent = operation;
}

acBtn.addEventListener('click', () => {
                                        display.textContent = ""; 
                                        operation = [];
                                    });

Object.values(numbs).map(num => num.addEventListener('click', (event) => 
                                                    {
                                                        display.textContent += event.target.value;
                                                        numAux += event.target.value.toString();
                                                    }));

Object.values(operators).map(op => op.addEventListener('click', (event) => 
                                                    {
                                                        display.textContent += event.target.value;
                                                        if(numAux) {operation.push(numAux);}
                                                        numAux = '';
                                                        operation.push(event.target.value.toString());
                                                    }));

equalBtn.addEventListener('click', () => {
                                            if(numAux){ operation.push(numAux); numAux = '';}
                                            calculate();
                                        });

