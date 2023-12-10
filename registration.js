const form = document.getElementById("registration_form");
const userName = document.getElementById("username");
const phoneNumber = document.getElementById("phonenumber");
const email = document.getElementById("email");
const createPassword = document.getElementById("password1");
const confirmPassword = document.getElementById("password");
const termsConditions = document.getElementById("terms_conditions");
const btnSignUp = document.getElementById("btn_sign_up");

function postData() {

    var formData = {
        username: userName.value,
        phonenumber: phoneNumber.value,
        email: email.value,
        password: confirmPassword.value
    }

    $.ajax({
        type: "POST",
        url: "../BACKEND/registration.php",
        data: formData,
        success: function(response) {
            console.log(response);
            alert("Registered Successfully !");
            routeToPage();
        },
        error: function(xhr, status, error) {
            console.error("Error: " + error);
        }
    });
}

const validateInputs = () => {
    const usernameValue = userName.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const emailValue = email.value.trim();
    const password1Value = createPassword.value.trim();
    const password2Value = confirmPassword.value.trim();
    
    if (usernameValue === '') {
        alert('Username is required');
        setError(userName, 'user name is required');
    }else {
        setSuccess(userName);
    }

    if (phoneNumberValue === '') {
        alert('Phone number is required');
        setError(phoneNumber, 'Phone number is required');
        return;
    } else if (phoneNumberValue.length !== 10 || isNaN(phoneNumberValue)) {
        alert('Phone number must be 10 digits');
        setError(phoneNumber, 'Phone number must be 10 digits');
        return;
    } else {
        setSuccess(phoneNumber);
    }

    if (emailValue === '') {
        alert('Email is required');
        setError(email, 'Email is required');
    } else if (!validateEmail(emailValue)) {
        alert('Please enter a valid email address');
        setError(email, 'Please enter a valid email address');
    } else {
        setSuccess(email);
    }

    if (password1Value === '') {
        alert('Password is required');
        setError(createPassword, 'Password is required');
    } else {
        setSuccess(createPassword);
    }

    if (password2Value === '') {
        alert('Please confirm your password');
        setError(confirmPassword, 'Please confirm your password');
    } else if (!validatePassword(password1Value, password2Value)) {
        alert('Passwords do not match');
        setError(confirmPassword, 'Passwords do not match');
    } else {
        setSuccess(confirmPassword);
    }

    if (termsConditions.checked) {
        // routeToPage();
        postData();
    }
    else alert("Please Agree Terms and Conditions");

};

function limitDigits(inputElement, maxDigits) {
    var inputValue = inputElement.value.trim();
    
    // Remove non-digit characters
    inputValue = inputValue.replace(/\D/g, '');

    // Limit the input to maxDigits
    if (inputValue.length > maxDigits) {
        inputValue = inputValue.slice(0, maxDigits);
        inputElement.value = inputValue;
    }
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.add('success');
}

const setSuccess = (element) => {
    // alert('Welcome ');
}

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const validatePassword = (password1, password2) => {
    return password1 === password2;
};

const routeToPage = () => {
    window.location.replace("login.html");
}