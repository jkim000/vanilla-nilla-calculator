const keys = document.querySelectorAll("input");
const currentDisplay = document.querySelector(".current");
const historicalDisplay = document.querySelector(".historical");
let input = "7";

console.log("currentDisplay", currentDisplay.innerHTML);
console.log("historicalDisplay", historicalDisplay.innerHTML);
console.log("input:", input);

for (let key of keys) {
    const keyValue = key.value;
    console.log("keyValue:", keyValue);

    key.addEventListener("click", () => {
        if (keyValue === "C") {
            input = "";
            currentDisplay.innerHTML = "0";
            historicalDisplay.innerHTML = "";
        } else if (keyValue === "CE") {
            input = "";
            currentDisplay.innerHTML = "0";
        } else if (keyValue === "←") {
            input = input.slice(0, -1);
            !input.length
                ? (currentDisplay.innerHTML = 0)
                : (currentDisplay.innerHTML = input);
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
            // do math
        } else if (keyValue === "xⁿ") {
            // do math
        } else if (keyValue === "%") {
            // do math
        } else if (keyValue === "=") {
            const mathProblem = historicalDisplay.innerHTML.concat(" ", input); // might need a function to handle when this already ends with =
            const result = FindSolution(input, mathProblem);

            historicalDisplay.innerHTML = mathProblem + " =";
            currentDisplay.innerHTML = result;
        } else if (OPERATORS.includes(keyValue)) {
            const result = HandleOperator(
                keyValue,
                input,
                currentDisplay.innerHTML,
                historicalDisplay.innerHTML
            );

            input = "";
            currentDisplay.innerHTML = result.newCurrent;
            historicalDisplay.innerHTML = result.newHistorical;
        } else {
            const validatedNumberOrDecimal = ValidateNumberAndDecimal(
                keyValue,
                currentDisplay.innerHTML,
                historicalDisplay.innerHTML
            );

            if (validatedNumberOrDecimal === "newEntry") {
                input = keyValue;
                currentDisplay.innerHTML = input;
                historicalDisplay.innerHTML = "";
            } else if (validatedNumberOrDecimal === "grow") {
                input += keyValue;
                currentDisplay.innerHTML = input;
            }
        }
    });
}

function ValidateNumberAndDecimal(keyValue, current, historical) {
    const endValue = historical.slice(-1);
    const hasDecimal = current.includes(".");

    if (keyValue === "." && hasDecimal) return "ignore";
    else if (keyValue === "0" && current === "0") return "ignore";
    else if (endValue === "=") return "newEntry";
    else return "grow";
}

function HandleOperator(keyValue, input, current, historical) {
    const endValue = historical.slice(-1);

    let newCurrent = current;
    let newHistorical = historical;

    if (!historical || endValue === "=") {
        newHistorical = `${current} ${keyValue}`;
    } else if (OPERATORS.includes(endValue)) {
        if (input === "") {
            newHistorical = historical
                .substring(0, historical.length - 1)
                .concat(keyValue);
        } else {
            const fixedMultAndDiv = historical
                .replace("×", "*")
                .replace("÷", "/");
            const result = eval(fixedMultAndDiv.concat(current));
            newCurrent = result;
            newHistorical = `${newCurrent} ${keyValue}`;
        }
    } else {
        // endValue is ")"
        console.log("historical: ", newHistorical);
        const fixedMultAndDiv = historical.replace("×", "*").replace("÷", "/");
        console.log("fixed: ", fixedMultAndDiv);
        const result = eval(fixedMultAndDiv);
        newCurrent = result;
        newHistorical = `${newCurrent} ${keyValue}`;
    }

    return { newCurrent, newHistorical };
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
        newHistorical = `${newCurrent}`;
    } else if (endValue === ")") {
        splitHistorical[splitHistorical.length - 1] = `(${newCurrent})`;
        newHistorical = splitHistorical.join(" ");
    }

    return { newCurrent, newHistorical };
}

function HandlePercentage(input) {
    // handles % button
    return input;
}

function CleanInput(input) {
    // adds and handles commas
    return input;
}

function FindSolution(input, mathProblem) {
    // handle all the different scenarios the calculator faces
    let result = 0;
    return result;
}
