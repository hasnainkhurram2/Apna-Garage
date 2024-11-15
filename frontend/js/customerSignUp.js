// Redirect to signUpSegregation.html
function redirectToSignUpSegregation() {
  window.location.href = '../pages/signUpSegregation.html';
}

// Form validation
const signUpForm = document.getElementById('signUpForm');

signUpForm.addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const dob = document.getElementById('dob').value;
  const address = document.getElementById('address').value;
  const contact = document.getElementById('contact').value;

  // Simple validation
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const customerData = {
    email,
    password,
    dob,
    address,
    contact,
  };
  try {
    const response = await fetch(
      'http://localhost:3000/api/v1/customers/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      }
    );
    const result = await response.json();
    if (response.ok) {
      if (
        confirm(
          'Customer Sign Up successful! Press OK to proceed to your Dashboard.'
        )
      ) {
        window.location.href = './customerDashboard.html';
      }
    } else {
      alert(`Oops, Something went wrong. Try Again Later.`);
      console.log(`Error while trying to Sign Up: ${result.message}`);
    }
  } catch (error) {
    alert(`Oops, Something went wrong. Try Again Later.`);
    console.log(`Error while trying to Sign Up: ${result.message}`);
  }
});
