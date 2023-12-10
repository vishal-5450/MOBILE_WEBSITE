const userName = document.getElementById("username");
const userPassword = document.getElementById("password");

function validateInputs() {
    if ((userName && userPassword) != null) {
        postData(userName.value, userPassword.value);
    } else {
        alert("Please fill all fields");
    }
}

function postData(userName, password) {

    var loginCredentials = {
        email: userName,
        password: password
    }

    $.ajax({
        type: "POST",
        url: "../BACKEND/login.php",
        data: loginCredentials,
        dataType: "json",
        success: function(response) {
            console.log(response);
            if (response.status == "success") {
                alert("Logged in Successfully !");
                window.location.replace("landing_page.html");
            } else {
                console.log(response.status);
                alert("Login failed. Please check your credentials.");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error: " + error);
        }
    });
}