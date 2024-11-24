// Redirect to signUpSegregation.html
function redirectToSignUpSegregation() {
  window.location.href = '../pages/signUpSegregation.html';
}

// Form validation
const signUpForm = document.getElementById('signUpForm');

signUpForm.addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form submission

  const name = document.getElementById('fullName').value.trim();
  console.log(name);
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const dob = document.getElementById('dob').value;
  const address = document.getElementById('address').value;
  const contact = document.getElementById('contact').value;

  if (name === '') {
    alert('Full Name is required');
    e.preventDefault();
  }

  // Simple validation
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const emailRes = await fetch('http://127.0.0.1:3000/api/v1/users/sendCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email,
    }),
  });
  const emailResult = await emailRes.json();
  if (!emailRes.ok) {
    alert(emailResult.message);
    return;
  }
  const code = prompt(
    'Email Sent, Enter the code in the email to Verify your Email.'
  );
  if (code !== emailResult.verCode) {
    alert('Incorrect Code. Please Retry and Enter the correct Code.');
    return;
  }
  const customerData = {
    name,
    email,
    password,
    dob,
    address,
    contact,
  };
  try {
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/customers/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(customerData),
      }
    );
    const result = await response.json();
    if (response.ok) {
      if (
        confirm('Customer Sign Up successful! Press OK to proceed to Login.')
      ) {
        window.location.href = './login.html';
      }
    } else {
      alert(`Oops, Something went wrong. Try Again Later. ${result.message}`);
      console.log(`Error while trying to Sign Up: ${result.message}`);
    }
  } catch (error) {
    alert(`Oops, Something went wrong. Try Again Later. ${result.message}`);
    console.log(`Error while trying to Sign Up: ${result.message}`);
  }
});
