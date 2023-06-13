const OPERATORS = ["+", "-", "×", "÷"];

const keys = document.querySelectorAll("input");
const currentDisplay = document.querySelector(".current");
const historicalDisplay = document.querySelector(".historical");
let input = "";

for (let key of keys) {
    const keyValue = key.value;

    key.addEventListener("click", () => {
        if (keyValue === "=") {
            const result = FindSolution(
                currentDisplay.innerHTML,
                historicalDisplay.innerHTML
            );

            input = "";
            currentDisplay.innerHTML = result.newCurrent;
            historicalDisplay.innerHTML = result.newHistorical;
        } else if (keyValue === "C") {
            input = "";
            currentDisplay.innerHTML = "0";
            historicalDisplay.innerHTML = "";
        } else if (keyValue === "CE") {
            input = "";
            currentDisplay.innerHTML = "0";
        } else if (keyValue === "←") {
            input = input.slice(0, -1);
            !input.length
                ? (historicalDisplay.innerHTML = "")
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
        } else if (keyValue === "x²" || keyValue === "xⁿ") {
            const result = HandleExponents(
                keyValue,
                currentDisplay.innerHTML,
                historicalDisplay.innerHTML
            );

            input = "";
            currentDisplay.innerHTML = result.newCurrent;
            historicalDisplay.innerHTML = result.newHistorical;
        } else if (keyValue === "%") {
            const result = HandlePercentage(
                currentDisplay.innerHTML,
                historicalDisplay.innerHTML
            );

            input = "";
            currentDisplay.innerHTML = result.newCurrent;
            historicalDisplay.innerHTML = result.newHistorical;
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

function FindSolution(current, historical) {
    const endValue = historical.slice(-1);
    const splitHistorical = historical.split(" ");

    let newCurrent = current;
    let newHistorical = historical;

    if (OPERATORS.includes(endValue) || endValue === "*") {
        const fixedMultAndDiv = historical.replace("×", "*").replace("÷", "/");
        newCurrent = eval(fixedMultAndDiv.concat(current));
        newHistorical = `${historical} ${current} =`;
    } else if (endValue === "=") {
        splitHistorical[0] = current;
        newHistorical = splitHistorical.join(" ");
        splitHistorical.pop();
        const fixedMultAndDiv = splitHistorical
            .join(" ")
            .replace("×", "*")
            .replace("÷", "/");
        newCurrent = eval(fixedMultAndDiv);
    }

    return { newCurrent, newHistorical };
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
    } else if (endValue === "*") {
        const result = eval(historical.concat(current));
        newCurrent = result;
        newHistorical = `${newCurrent} ${keyValue}`;
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
        const fixedMultAndDiv = historical.replace("×", "*").replace("÷", "/");
        const result = eval(fixedMultAndDiv);
        newCurrent = result;
        newHistorical = `${newCurrent} ${keyValue}`;
    }

    return { newCurrent, newHistorical };
}

function HandlePlusMinus(input, current, historical) {
    const endValue = historical.slice(-1);
    const splitHistorical = historical.split(" ");

    let newCurrent = eval(current * -1);
    let newHistorical = historical;

    if (OPERATORS.includes(endValue) && input === "") {
        newHistorical += ` (${newCurrent})`;
    } else if (endValue === "=") {
        newHistorical = `${newCurrent}`;
    } else if (endValue === ")") {
        splitHistorical[splitHistorical.length - 1] = `(${newCurrent})`;
        newHistorical = splitHistorical.join(" ");
    }

    return { newCurrent, newHistorical };
}

function HandleExponents(keyValue, current, historical) {
    const endValue = historical.slice(-1);
    const splitHistorical = historical.split(" ");
    const hasOperator = OPERATORS.some((operator) =>
        historical.includes(operator)
    );

    let newCurrent = current;
    let newHistorical = historical;

    if (endValue === "*") {
        return { newCurrent, newHistorical };
    }

    if (keyValue === "x²") {
        newCurrent = eval(current ** 2);

        if (OPERATORS.includes(endValue)) {
            newHistorical += ` ${newCurrent}`;
        } else if (endValue !== "=" && hasOperator) {
            splitHistorical[splitHistorical.length - 1] = newCurrent;
            newHistorical = splitHistorical.join(" ");
        } else {
            newHistorical = newCurrent;
        }
    }

    if (keyValue === "xⁿ") {
        if (!historical || endValue === "=")
            newHistorical = newCurrent.concat("**");
        else if (OPERATORS.includes(endValue))
            newHistorical = `${historical} ${newCurrent}**`;
        else newHistorical += "**";

        newCurrent = 0;
    }

    return { newCurrent, newHistorical };
}

function HandlePercentage(current, historical) {
    const endValue = historical.slice(-1);
    const hasOperator = OPERATORS.some((operator) =>
        historical.includes(operator)
    );
    const splitHistorical = historical.split(" ");

    let newCurrent = current;
    let newHistorical = historical;

    if (!historical) {
        newCurrent = eval((0 * current) / 100);
        newHistorical = newCurrent;
    } else if (OPERATORS.includes(endValue)) {
        const base = splitHistorical[0];
        newCurrent = eval((base * current) / 100);
        newHistorical = `${historical} ${newCurrent}`;
    } else if (hasOperator) {
        const base = eval(historical);
        newCurrent = eval((base * current) / 100);
        splitHistorical[splitHistorical.length - 1] = newCurrent;
        newHistorical = splitHistorical.join(" ");
    } else if (endValue === "=") {
        newCurrent = eval(current / 100);
        newHistorical = newCurrent;
    }

    return { newCurrent, newHistorical };
}
