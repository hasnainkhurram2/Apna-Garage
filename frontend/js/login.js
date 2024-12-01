// Redirect to home page
function redirectToHome() {
  window.location.href = '../pages/landingPage.html';
}

// Login Form Submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent default form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (response.ok) {
      if (result.userDetails.userType == '2') {
        if (confirm('Login Successful! Redirrecting to Customer Dashboard.')) {
          window.location.href = './customerDashboard.html';
        }
      } else if (result.userDetails.userType == '3') {
        if (
          confirm('Login Successful! Redirrecting to Technician Dashboard.')
        ) {
          window.location.href = './technicianDashboard.html';
        }
      }
      console.log(result.userType);
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.log(error);
    alert('Oops, Something went wrong. Try Again Later.');
  }
});
