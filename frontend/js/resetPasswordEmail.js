// Redirect to login page
function redirectToLogin() {
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

  const email = document.getElementById('email').value;

  try {
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/users/resetPasswordEmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      }
    );
    const result = await response.json();
    if (response.ok) {
      confirm('Reset Link sent to your email address');
      redirectToLanding();
    } else {
      alert('Account does not exist for this email address');
      redirectToLanding();
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
});
