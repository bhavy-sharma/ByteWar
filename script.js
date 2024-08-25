document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Hardcoded credentials (not secure!)
    const validUsername = "yourUsername";
    const validEmail = "yourEmail@example.com";
    const validPassword = "yourPassword";

    if (username === validUsername && email === validEmail && password === validPassword) {
        window.location.href = 'battle.html'; // Redirect if credentials are valid
    } else {
        alert('Invalid credentials, please try again.');
    }
});
