// Redirect to home page
function redirectToHome() {
    window.location.href = '../pages/homepage.html';
}

// Login Form Submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulated login logic
    if (email && password) {
        alert(`Welcome, ${email}!`);
        window.location.href = '../pages/customerDashboard.html'; // Redirect to customer dashboard or generic dashboard
    } else {
        alert('Please enter valid credentials.');
    }
});
