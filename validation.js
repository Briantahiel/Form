const inputBirth = document.querySelector("#birth");

const errorType = [
    "valueMissing",
    "typeMissMatch",
    "patternMismatch",
    "customError",
];
const errorMessages = {
    name: {
        valueMissing: "This fname field can't be empty"
    },
    email: {
        valueMissing: "This email field can't be empty",
        typeMismatch: "Email is not valid"
    },
    password: {
        valueMissing: "This password field can't be empty",
        patternMismatch: "At least 8 to 16 characters, lowercase uppercase, one number. Special characters are not allowed"  
    },
    birth: {
        valueMissing: "This date of birth field can't be empty",
        customError: "You have to be 18 or over"
    },
    number: {
        valueMissing: "This phone field can't be empty",
        patternMismatch: "Format required is XX-XXXXXXXXX of 12 numbers"
    },
    address: {
        valueMissing: "This address field can't be empty",
        patternMismatch: "Minimum length of 10 characters and maximum length of 30 characters"
    },
    city: {
        valueMissing: "This city field can't be empty",
        patternMismatch: "Minimum length of 10 characters and maximum length of 30 characters"
    },
    state: {
        valueMissing: "This state field can't be empty",
        patternMismatch: "Minimum length of 10 characters and maximum length of 30 characters"
    }
};

function validate(input){
    const inputType = input.dataset.type;
    if(validators[inputType]){
        validators[inputType](input)
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = showErrorMessage(inputType, input)
    }
};

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener("blur", (input) => {
        validate(input.target);
    })
});

function showErrorMessage(inputType, input){
    let message = "";
    errorType.forEach(error => {
        if(input.validity[error]){
            message = errorMessages[inputType][error];
        }
    });
    return message
};

const validators = {
    birth: input => validateAge(input),
};

inputBirth.addEventListener("blur", (e) => {
    validateAge(e.target)
});

function validateAge(input){
    const dateUser = new Date(input.value);
    let message = "";
    if(!overAge(dateUser)){
        message = "You have to be 18 or over"
    }
    input.setCustomValidity(message);
};

function overAge(date){
    const currentDate = new Date();
    const subtractDate = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate())
    return subtractDate < currentDate;
};
