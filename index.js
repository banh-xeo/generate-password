// START - set default input and letters
const UPPER_LETTER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const LOWER_LETTER = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const NUMBER = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const SYMBOL = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+'];
var defaultLength = 8;
var isReset = true;

// START - make pwd-fields NOT selectable
const pwdFields = document.getElementById("pwd-fields");
pwdFields.classList.add("deslectable");

// START - add event listener, 'click' to gen-btn
const generateBtn = document.getElementById('gen-btn');
generateBtn.addEventListener('click', () => generatePassword());

// START - retrieve all the inputs
const upperInput = document.getElementById('upper');
const lowerInput = document.getElementById('lower');
const numberInput = document.getElementById('number');
const symbolInput = document.getElementById('symbol');
const lengthInput = document.getElementById('pwd-len');


// FUNCTIONS - relate to generate password
function generatePassword() {
    isUpper = upperInput.checked;
    isLower = lowerInput.checked;
    isNumber = numberInput.checked;
    isSymbol = symbolInput.checked;
    length = lengthInput.value;
    if (isValidInputs(isUpper, isLower, length)) {
        let passwordArr = [];
        if (isUpper) {
            passwordArr = [...UPPER_LETTER];
        }
        if (isLower) {
            passwordArr = [...passwordArr, ...LOWER_LETTER];
        }
        if (isNumber) {
            passwordArr = [...passwordArr, ...NUMBER];
        }
        if (isSymbol) {
            passwordArr = [...passwordArr, ...SYMBOL];
        }
        // console.log(passwordArr); - DEBUG
        let password = '';
        for (let i = 0; i < length; i++) {
            let randIndex = Math.floor(Math.random() * passwordArr.length);
            password += passwordArr[randIndex];
        }
        // console.log(password); - DEBUG
        displayPassword(password)
    } else {
        reset();
    }
}

function isValidInputs(upper, lower, length) {
    /* 
        This checks for 2 main conditions:
        - At least either UPPER_LETTER and LOWER_LETTER are selected
        - Password length is between 8 and 40 characters
    */
    if (!upper && !lower) {
        alert('Please select at least one of Uppercase or Lowercase option.');
        return false;
    }
    if (length < 8 || length > 40) {
        alert('Password length must be between 8 and 40 characters.');
        return false;
    }
    return true;
}

function displayPassword(password) {
    pwdFields.textContent = password;
    pwdFields.classList.remove("deslectable");
    pwdFields.classList.add("selectable");
    isReset = false;
}

function reset() {
    // Reset password fields
    pwdFields.textContent = "Click on 'Generate Password'"
    pwdFields.classList.remove("selectable");
    pwdFields.classList.add("deslectable");
    // Reset length input
    lengthInput.value = defaultLength;
    // Reset checkboxes
    upperInput.checked = true;
    lowerInput.checked = false;
    numberInput.checked = false;
    symbolInput.checked = false;

    isReset = true;
}

// START - add copy-on-click event
const copyOnClickEl = document.getElementById("copy-on-click");
copyOnClickEl.addEventListener('click', () => copyOnClick())

function copyOnClick() {
    if (!isReset) {
        navigator.clipboard.writeText(pwdFields.textContent);
        alert(`Copied: ${pwdFields.textContent}`);
    }
}