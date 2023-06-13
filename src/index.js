const OPERATORS = ["+", "-", "×", "÷"];
const KEYBOARD_OPERATORS = ["+", "-", "*", "/"];
const KEYBOARD_NUMS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

const keys = document.querySelectorAll("input");
const currentDisplay = document.querySelector(".current");
const historicalDisplay = document.querySelector(".historical");
let input = "";

document.addEventListener("keydown", handleKeydown);

for (let key of keys) {
    key.addEventListener("click", handleClick);
}

function handleClick(event) {
    const keyValue = event.target.value;

    if (keyValue === "C") {
        input = "";
        currentDisplay.innerHTML = "0";
        historicalDisplay.innerHTML = "";
    } else if (keyValue === "CE") {
        input = "";
        currentDisplay.innerHTML = "0";
    } else if (keyValue === "←") {
        input = input.slice(0, -1);
        !input.length && currentDisplay.innerHTML !== "0"
            ? (currentDisplay.innerHTML = "0")
            : !input.length
            ? (historicalDisplay.innerHTML = "")
            : (currentDisplay.innerHTML = input);
    } else if (keyValue === "=") {
        handleEqual();
    } else if (keyValue === "+/-") {
        handlePlusMinus();
    } else if (keyValue === ":)") {
        console.log("V-(~_^)v");
    } else if (keyValue === "x²" || keyValue === "xⁿ") {
        handleExponentiation(keyValue);
    } else if (keyValue === "%") {
        handlePercentage();
    } else if (OPERATORS.includes(keyValue)) {
        handleOperators(keyValue);
    } else {
        validateNumbersAndDecimal(keyValue);
    }
}

function handleKeydown(event) {
    const keyValue = event.key;

    if (keyValue === "Escape") {
        input = "";
        currentDisplay.innerHTML = "0";
        historicalDisplay.innerHTML = "";
    } else if (keyValue === "Delete") {
        input = "";
        currentDisplay.innerHTML = "0";
    } else if (keyValue === "Backspace") {
        input = input.slice(0, -1);
        !input.length && currentDisplay.innerHTML !== "0"
            ? (currentDisplay.innerHTML = "0")
            : !input.length
            ? (historicalDisplay.innerHTML = "")
            : (currentDisplay.innerHTML = input);
    } else if (keyValue === "Enter" || keyValue === "=") {
        handleEqual();
    } else if (keyValue === "?") {
        handlePlusMinus();
    } else if (keyValue === "s") {
        handleExponentiation(keyValue);
    } else if (keyValue === "^") {
        handleExponentiation(keyValue);
    } else if (keyValue === "%") {
        handlePercentage();
    } else if (KEYBOARD_OPERATORS.includes(keyValue)) {
        handleOperators(keyValue);
    } else if (KEYBOARD_NUMS.includes(keyValue)) {
        validateNumbersAndDecimal(keyValue);
    }
}

function validateNumbersAndDecimal(keyValue) {
    const initialCurrent = currentDisplay.innerHTML;
    const initialHistorical = historicalDisplay.innerHTML;

    const endValue = initialHistorical.slice(-1);
    const hasDecimal = initialCurrent.includes(".");

    if (endValue === "=") {
        currentDisplay.innerHTML = keyValue;
        historicalDisplay.innerHTML = "";
    } else {
        if (
            !(keyValue === "." && hasDecimal) &&
            !(keyValue === "0" && initialCurrent === "0")
        ) {
            input += keyValue;
            currentDisplay.innerHTML = input;
        }
    }
}

function handleEqual() {
    const initialCurrent = currentDisplay.innerHTML;
    const initialHistorical = historicalDisplay.innerHTML;

    const endValue = initialHistorical.slice(-1);
    const splitHistorical = initialHistorical.split(" ");

    if (endValue === "=") {
        splitHistorical[0] = initialCurrent;
        historicalDisplay.innerHTML = splitHistorical.join(" ");
        splitHistorical.pop();
        const fixedMultAndDiv = splitHistorical
            .join(" ")
            .replace("×", "*")
            .replace("÷", "/");
        currentDisplay.innerHTML = eval(fixedMultAndDiv);
    } else if (OPERATORS.includes(endValue) || endValue === "*") {
        const fixedMultAndDiv = initialHistorical
            .replace("×", "*")
            .replace("÷", "/");
        currentDisplay.innerHTML = eval(fixedMultAndDiv.concat(initialCurrent));
        historicalDisplay.innerHTML = `${initialHistorical} ${initialCurrent} =`;
    } else if (!initialHistorical) {
        currentDisplay.innerHTML = "0";
        historicalDisplay.innerHTML = `${initialCurrent} =`;
    } else {
        const fixedMultAndDiv = initialHistorical
            .replace("×", "*")
            .replace("÷", "/");
        currentDisplay.innerHTML = eval(fixedMultAndDiv);
        historicalDisplay.innerHTML = `${initialHistorical} =`;
    }

    input = "";
}

function handleOperators(keyValue) {
    if (keyValue === "*") keyValue = "×";
    else if (keyValue === "/") keyValue = "÷";

    const initialCurrent = currentDisplay.innerHTML;
    const initialHistorical = historicalDisplay.innerHTML;

    const endValue = initialHistorical.slice(-1);

    if (!initialHistorical || endValue === "=") {
        historicalDisplay.innerHTML = `${initialCurrent} ${keyValue}`;
    } else if (endValue === "*") {
        const newCurrent = eval(initialHistorical.concat(initialCurrent));
        currentDisplay.innerHTML = newCurrent;
        historicalDisplay.innerHTML = `${newCurrent} ${keyValue}`;
    } else if (OPERATORS.includes(endValue)) {
        if (input === "") {
            historicalDisplay.innerHTML = initialHistorical
                .substring(0, initialHistorical.length - 1)
                .concat(keyValue);
        } else {
            const fixedMultAndDiv = initialHistorical
                .replace("×", "*")
                .replace("÷", "/");
            const newCurrent = eval(fixedMultAndDiv.concat(initialCurrent));
            currentDisplay.innerHTML = newCurrent;
            historicalDisplay.innerHTML = `${newCurrent} ${keyValue}`;
        }
    } else {
        const fixedMultAndDiv = initialHistorical
            .replace("×", "*")
            .replace("÷", "/");
        const newCurrent = eval(fixedMultAndDiv);
        currentDisplay.innerHTML = newCurrent;
        historicalDisplay.innerHTML = `${newCurrent} ${keyValue}`;
    }

    input = "";
}

function handlePlusMinus() {
    const initialCurrent = currentDisplay.innerHTML;
    const initialHistorical = historicalDisplay.innerHTML;

    const endValue = initialHistorical.slice(-1);
    const splitHistorical = initialHistorical.split(" ");

    const newCurrent = eval(initialCurrent * -1);
    currentDisplay.innerHTML = newCurrent;

    if (OPERATORS.includes(endValue) && input === "") {
        historicalDisplay.innerHTML += ` (${newCurrent})`;
    } else if (OPERATORS.includes(endValue) && input.length) {
        historicalDisplay.innerHTML;
    } else if (endValue === "=") {
        historicalDisplay.innerHTML = `${newCurrent}`;
    } else if (endValue === ")") {
        splitHistorical[splitHistorical.length - 1] = `(${newCurrent})`;
        historicalDisplay.innerHTML = splitHistorical.join(" ");
    } else {
        historicalDisplay.innerHTML = newCurrent;
    }
}

function handleExponentiation(keyValue) {
    if (keyValue === "s") keyValue = "x²";
    if (keyValue === "^") keyValue = "xⁿ";

    const initialCurrent = currentDisplay.innerHTML;
    const initialHistorical = historicalDisplay.innerHTML;

    const endValue = initialHistorical.slice(-1);
    const splitHistorical = initialHistorical.split(" ");
    const hasOperator = OPERATORS.some((operator) =>
        initialHistorical.includes(operator)
    );

    if (endValue === "*") return;

    if (keyValue === "x²") {
        const newCurrent = eval(initialCurrent ** 2);
        currentDisplay.innerHTML = newCurrent;

        if (OPERATORS.includes(endValue)) {
            historicalDisplay.innerHTML += ` ${newCurrent}`;
        } else if (endValue !== "=" && hasOperator) {
            splitHistorical[splitHistorical.length - 1] = newCurrent;
            historicalDisplay.innerHTML = splitHistorical.join(" ");
        } else {
            historicalDisplay.innerHTML = newCurrent;
        }
    }

    if (keyValue === "xⁿ") {
        if (!initialHistorical || endValue === "=")
            historicalDisplay.innerHTML = initialCurrent.concat(" **");
        else if (OPERATORS.includes(endValue))
            historicalDisplay.innerHTML = `${initialHistorical} ${initialCurrent} **`;
        else historicalDisplay.innerHTML += " **";

        currentDisplay.innerHTML = 0;
    }

    input = "";
}

function handlePercentage() {
    const initialCurrent = currentDisplay.innerHTML;
    const initialHistorical = historicalDisplay.innerHTML;

    const endValue = initialHistorical.slice(-1);
    const hasOperator = OPERATORS.some((operator) =>
        initialHistorical.includes(operator)
    );
    const splitHistorical = initialHistorical.split(" ");

    let newCurrent;

    if (!initialHistorical) {
        newCurrent = eval((0 * initialCurrent) / 100);
        currentDisplay.innerHTML = newCurrent;
        historicalDisplay.innerHTML = newCurrent;
    } else if (OPERATORS.includes(endValue)) {
        const base = splitHistorical[0];
        newCurrent = eval((base * initialCurrent) / 100);
        currentDisplay.innerHTML = newCurrent;
        historicalDisplay.innerHTML = `${initialHistorical} ${newCurrent}`;
    } else if (hasOperator) {
        const fixedMultAndDiv = initialHistorical
            .replace("×", "*")
            .replace("÷", "/");
        const base = eval(fixedMultAndDiv);
        newCurrent = eval((base * initialCurrent) / 100);
        currentDisplay.innerHTML = newCurrent;
        splitHistorical[splitHistorical.length - 1] = newCurrent;
        historicalDisplay.innerHTML = splitHistorical.join(" ");
    } else if (endValue === "=") {
        newCurrent = eval(initialCurrent / 100);
        currentDisplay.innerHTML = newCurrent;
        historicalDisplay.innerHTML = newCurrent;
    }

    input = "";
}
