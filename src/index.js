const OPERATORS = ["+", "-", "×", "÷"];

const keys = document.querySelectorAll("input");
const currentDisplay = document.querySelector(".current");
const historicalDisplay = document.querySelector(".historical");
let input = "";

console.log("currentDisplay", currentDisplay.innerHTML);
console.log("historicalDisplay", historicalDisplay.innerHTML);
console.log("input:", input);

for (let key of keys) {
    const keyValue = key.value;
    console.log("keyValue:", keyValue);

    key.addEventListener("click", () => {
        if (keyValue === "C") {
            input = "";
            currentDisplay.innerHTML = "";
            historicalDisplay.innerHTML = "";
        } else if (keyValue === "CE") {
            input = "";
            currentDisplay.innerHTML = "";
        } else if (keyValue === "←") {
            input = input.slice(0, -1);
            currentDisplay.innerHTML = input;
        } else if (keyValue === "+/-") {
            const result = HandlePlusMinus(
                input,
                currentDisplay.innerHTML,
                historicalDisplay.innerHTML
            );

            input = result.newCurrent;
            currentDisplay.innerHTML = result.newCurrent;
            historicalDisplay.innerHTML = result.newHistorical;
        } else if (keyValue === ":)") {
            console.log("V-(~_^)v");
        } else if (keyValue === "x²") {
            // do something
        } else if (keyValue === "xⁿ") {
            // do something
        } else if (keyValue === "+/-") {
            // do something
        } else if (keyValue === "=") {
        } else {
            // finally handle numbers, decimals, and + - * / operators
            // when operator pressed, keep current display but input should be reset to 0
        }
    });
}

function HandlePlusMinus(input, current, historical) {
    const endValue = historical.slice(-1);
    const splitHistorical = historical.split(" ");
    const operators = ["+", "-", "×", "÷"];

    let newCurrent = eval(current * -1);
    let newHistorical = historical;

    if (operators.includes(endValue) && input === "") {
        newHistorical = `${historical} (${newCurrent})`;
    } else if (endValue === "=") {
        newHistorical = `(${newCurrent})`;
    } else if (endValue === ")") {
        splitHistorical[splitHistorical.length - 1] = `(${newCurrent})`;
        newHistorical = splitHistorical.join(" ");
    }

    return { newCurrent, newHistorical };
}

function HandleCommas(input) {
    // adds and handles commas
    return input;
}

function ValidateInput(input) {
    // determines if last string in input is an operator or decimal
    return input;
}

function PrepareInput(input) {
    // handles % button
    return input;
}

function SolveMathProblem(mathProblem, input) {
    // handle all the different scenarios the calculator faces
    let result = 0;
    return result;
}
