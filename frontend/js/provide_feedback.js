// Star Rating Interaction
const stars = document.querySelectorAll('.star-rating span');
stars.forEach((star) => {
    star.addEventListener('click', () => {
        // Reset all stars
        stars.forEach((s) => s.classList.remove('selected'));

        // Highlight selected star and all before it
        star.classList.add('selected');
        let prev = star.previousElementSibling;
        while (prev) {
            prev.classList.add('selected');
            prev = prev.previousElementSibling;
        }
    });
});

// Logout Functionality
function logout() {
    alert('Logged out successfully!');
}

// Return to Homepage
function returnToHome() {
    alert('Returning to homepage...');
    // You can replace this alert with window.location.href = 'index.html';
}

