
class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement){

        if ( ! currentOperandTextElement instanceof Element ) {
            console.error('new Calculator: argument 2 must be instance of Element');
          }
        this.prevOperandTextElement = prevOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clearAll();
    }

    clearAll(){
        this.currentOperandTextElement.innerText = '';
        this.prevOperandTextElement.innerText = '';
        this.operation = undefined;

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = currentOperandTextElement.innerText.toString() + number.toString();
    }

    chooseOperation(operation){
        // Check if the currentOperand is empty so that it does not continue into the code
        if (this.currentOperand === '') return;
        // Checks if there is trailing operations to carry out before continuing a chain of operations
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';

    }

    compute(){
        let computation;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '×':
                computation = prev * current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.prevOperand = '';
        this.operation = undefined;
        
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const intDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let intDisplay;

        if (isNaN(intDigits)){
            intDisplay = '';
        }else {
            intDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if (decimalDigits != null){
            return `${intDisplay}.${decimalDigits}`;
        } else {
            return intDisplay;
        }

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if(this.operation != null || this.operation != undefined ){
            this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;

        } else {
            this.prevOperandTextElement.innerText = ''
        }
        

    }
}

const numButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOperandTextElement = document.querySelector('[data-prev-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement);

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
        
    })
})



// Clears all this on the Calculator Screen
allClearButton.addEventListener('click', button => {
    calculator.clearAll();
});

// Computes Values inputted into the calculator
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

// Deletes the last number enetered
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});