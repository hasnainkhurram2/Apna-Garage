// Redirect to login page
function redirectToLogin() {
  window.location.href = '../pages/login.html';
}

// Reset Password Logic
const resetPasswordForm = document.getElementById('resetPasswordForm');

resetPasswordForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // const email = document.getElementById('email').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Simple validation
  if (newPassword !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  alert(`Password reset link sent to ${email}.`);
  // Implement server-side password reset API logic if needed
});
