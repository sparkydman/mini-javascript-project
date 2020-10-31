const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const form = document.getElementById("form");

// check if input field is required
function checkIsRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value === "") {
      showErrorMessage(input, `${getInputName(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check length of input character
function checkInputLength(input, min, max) {
  if (input.value.length < min) {
    showErrorMessage(
      input,
      `${getInputName(input.id)} should not be less than ${min}`
    );
  } else if (input.value.length > max) {
    showErrorMessage(
      input,
      `${getInputName(input.id)} should not be more than ${max}`
    );
  }
}

// match passwords
function matchPasswords(input1, input2) {
  if (input1.value !== input2.value) {
    showErrorMessage(input2, "Passwords not match");
  }
}

// check email match
function validateEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showErrorMessage(input, "Email is not valid");
  }
}

// show error message funtion
function showErrorMessage(input, msg) {
  const formCtrl = input.parentElement;
  formCtrl.className = "form-control error";
  const small = formCtrl.querySelector("small");
  small.innerText = msg;
}

// show success function
function showSuccess(input) {
  const formCtrl = input.parentElement;
  formCtrl.className = "form-control success";
}

function getInputName(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

// eventlistener for form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkIsRequired([username, email, password, password2]);
  checkInputLength(username, 5, 15);
  checkInputLength(password, 8, 20);
  checkInputLength(password2, 8, 20);
  matchPasswords(password, password2);
  validateEmail(email);
});
