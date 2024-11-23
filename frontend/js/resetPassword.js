// Redirect to login page
function redirectToLogin() {
<<<<<<< HEAD
    window.location.href = '../pages/login.html';
}

// Reset Password Logic
const resetPasswordForm = document.getElementById('resetPasswordForm');

resetPasswordForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Simple validation
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    alert(`Password reset link sent to ${email}.`);
    // Implement server-side password reset API logic if needed
=======
  window.location.href = '../pages/login.html';
}

// Redirect to login page
function redirectToLanding() {
  window.location.href = '../pages/landingPage.html';
}
// Ensure DOM is fully loaded
const resetPasswordForm1 = document.getElementById('resetPasswordForm');

resetPasswordForm1.addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent default form submission

  const newPassword = document.getElementById('newPassword').value;

  try {
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/users/resetPassword',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ newPassword }),
      }
    );

    if (response.ok) {
      confirm('Password Updated');
      redirectToLanding();
    } else {
      alert('Error occurred');
      redirectToLanding();
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
>>>>>>> origin/main
});
