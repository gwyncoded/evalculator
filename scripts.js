const display = document.getElementById("display"); //display's innertext is where we put our numbers and whatnot.

let formula = [0]; //formula is what we build up throughout the createFormula function collecting inputs. 
let calcValue = 0; //calcValue gets set to the value of formula after it gets .joined. it exists for the purpose of being eval()ed, getting set to the value of eval(calcValue), and the result of that being set to the innerText of the display.
display.innerText = calcValue;
let lastNumberHasDecimal = false;

const createFormula = (input) => {

  if (lastNumberHasDecimal === true && input === ".") {
    console.log("ERROR: tried to add a decimal to a number that already had one");
    return;
  }; //this terminates if i manage to detect the user inputting a decimal on a number that already has a decimal. this MUST be placed before the if statements that set lastNumberHasDecimal.

  if (input === "/" || input === "*" || input === "+" || input === "-") {
    lastNumberHasDecimal = false;
    //console.log("lastNumberHasDecimal is " + lastNumberHasDecimal);
  };
  if (input === "." && lastNumberHasDecimal === false) {
    lastNumberHasDecimal = true;
    //console.log("lastNumberHasDecimal is " + lastNumberHasDecimal);
  }; //okay so i want this to set a flag when you input a decimal then continue executing the formula builder, and i want the flag to be cleared whenever you input an operator.

  if (formula[formula.length - 1] === "0"&& input.length === 1 && input === "0") {
    console.log("ERROR: tried to input 0 on a blank formula");
    return;
  }; //checks if the last value in the formula is 0, if the formula is only one character long and if you're trying to input a zero. terminates the function without doing anything if all these things are true. oh and it console logs too.

  if (formula[formula.length - 1] === "-" && input === "-") {
    console.log("ERROR: attempted to input two consecutive minuses");
    return;
  }; //this prevents inputing two consecutive -'s. 

  if (formula[formula.length - 1] === "-") {
    if (formula[formula.length - 2] === "+" || formula[formula.length - 2] === "-" || formula[formula.length - 2] === "*" || formula[formula.length - 2] === "/") {
    if (input === "*" || input === "+" || input === "/") {
      formula.pop();
      formula.pop();
      formula.push(input);
      calcValue = formula.join("");
      display.innerText = calcValue;
      console.log("two or more consecutive operators successfully detected");
      return;
      }
    }
  }; //this if statement checks if the last value in the formula is -, then checks if the value before that is an operator, then checks if you're trying to input another operator. if you are it throws out the last two values in the formula and appends your input to the formula.

  if (formula[formula.length - 1] === "+" || formula[formula.length - 1] === "-" || formula[formula.length - 1] === "*" || formula[formula.length - 1] === "/") {
    if (input === "*" || input === "+" || input === "/") {
      formula.pop();
      formula.push(input);
      calcValue = formula.join("");
      display.innerText = calcValue;
      console.log("two or more consecutive operators successfully detected");
      return;
      }
  }; //this if statement checks if the last value in the formula is an operator, then checks if you're trying to input an operator and if you are it replaces the last value in the formula with your input, then terminates the function.

  if (formula.length === 1 && formula[formula.length - 1] === 0 && ((input === "*" || input === "+" || input === "/"))) {
    console.log("ERROR: tried to input an operator into a blank formula");
    return;
  }; //this if statement checks if you're trying to input an operator, other than -, into a blank formula, and if you are it terminates the function without letting you do that.

  if (formula.length === 1 && formula[formula.length - 1] === 0) {
    formula = [input];
    display.innerText = formula;
  } else {
    formula.push(input);
    calcValue = formula.join("");
    display.innerText = calcValue;
  } //this if else statement checks whether or not the formula is blank (just a 0). if it is, it replaces the blank formula with the input. this prevents inputing a 1 on a blank formula resulting in the UGLY 01. if the formula isn't blank, it appends the input to the end of the formula. it then sets calcValue to the .joined formula array, and sets display's innerText to calcValue.
};

const allClear = () => {
  formula = [0];
  calcValue = formula;
  display.innerText = calcValue;
  lastNumberHasDecimal = false;
}; //resets formula back to an array with a zero, sets calcValue to formula and sets display to calcValue.

const calculate = () => {
  if (formula[formula.length - 1] === "+" || formula[formula.length - 1] === "-" || formula[formula.length - 1] === "*" || formula[formula.length - 1] === "/") {
    return;
  } else {
    console.log("calculating " + calcValue);
    calcValue = eval(calcValue);
    formula = [calcValue];
    display.innerText = calcValue;
    if (Number.isInteger(calcValue)) {
      lastNumberHasDecimal = false;
    } else {
      lastNumberHasDecimal = true;
    }
  }
}; //slams the calcValue formula we've been building into the eval operator (my beloved) and sets the display to the answer. it also sets the formula to be an array with a single value, that value being the number that was just calculated. it also also sets lastNumberHasDecimal to the appropriate value so that you can't have multiple decimals in one number after hitting calculate. and now it also makes sure the formula doesn't end in an operator before executing (if it does it just returns).