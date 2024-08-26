const ID = ["bhavy__sharma__", "gauravsingh7132"];
const PASS = ["BHAVY", "GAURAV"];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let isValid = false;

    for (let i = 0; i < ID.length; i++) {
        if (username === ID[i] && password === PASS[i]) {
            isValid = true;
            break;
        }
    }

    if (isValid) {
        console.log("Valid credentials, redirecting to code.html");
        location.href = "code.html"; // Redirect to code.html if credentials are valid
    } else {
        alert("Invalid Credential"); // Show alert only if credentials are invalid
    }
});
