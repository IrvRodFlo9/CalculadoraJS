const screen = document.querySelector(".container__screen");

const contenedor = document.querySelector(".container__numbers");

let displayResult = false;
let displayError = false;
const symbols = "+-x()/";

const calculate = (expression) => {
  try {
    const processedExpression = expression.includes("x")
      ? expression.replace("x", "*")
      : expression;
    result = eval(processedExpression);
    displayResult = true;
    return result;
  } catch (error) {
    displayError = true;
    return "Expresión inválida";
  }
};

const cleanDisplay = () => (
  (displayError = false), (displayResult = false), ""
);

/* Forma anterior
const cleanDisplay = () => {
  displayResult = false;
  displayError = false;

  return "";
}; */

const spaceDisplay = (inScreen, symbol) => {
  if (displayError) inScreen = cleanDisplay();

  if (symbols.includes(symbol)) {
    if (displayResult) displayResult = false;

    return `${inScreen} ${symbol} `;
  } else {
    if (displayResult) inScreen = cleanDisplay();

    return `${inScreen}${symbol}`;
  }
};

const del = (expresion) => {
  if (displayError) return cleanDisplay();

  const charDelete = expresion.slice(-1) == " " ? -3 : -1;
  /* Forma anteior 
  const lastChar = expresion.slice(-1);
  let charDelete = -1;
  lastChar == " " ? (charDelete = -3) : null;
  */

  return expresion.slice(0, charDelete);
};

const display = (e) => {
  if (e.target.localName == "div") return;

  const symbol = e.target.textContent;
  const inScreen = screen.textContent;

  const newScreen =
    symbol == "="
      ? calculate(inScreen)
      : symbol == "Del"
      ? del(inScreen)
      : symbol == "Clear"
      ? cleanDisplay()
      : spaceDisplay(inScreen, symbol);

  screen.innerHTML = newScreen;

  /* Forma antigua 
  const symbol = e.target.textContent;
  const inScreen = screen.textContent;

  if (e.target.localName != "div") {
    let newScreen = "";
    // Verifica que no se de click en el div
    if (symbol == "=") {
      newScreen = calculate(inScreen);
    } else if (symbol == "Del") {
      newScreen = del(inScreen);
    } else if (symbol == "Clear") {
      newScreen = cleanDisplay();
    } else {
      newScreen = spaceDisplay(inScreen, symbol);
    }
    screen.innerHTML = newScreen;
  }
  */
};

contenedor.addEventListener("click", display);
