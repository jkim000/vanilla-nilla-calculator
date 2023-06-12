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
        } else if (keyValue === "CE") {
        } else if (keyValue === "←") {
        } else if (keyValue === "+/-") {
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
