// Redirect to signUpSegregation.html
function redirectToSignUpSegregation() {
  window.location.href = './signUpSegregation.html';
}

// Form validation
const signUpForm = document.getElementById('technicianSignUpForm');
const modal = document.getElementById('verificationModal');
const verifyCodeButton = document.getElementById('verifyCode');
const closeModalButton = document.getElementById('closeModal');
const verificationCodeInput = document.getElementById('verificationCode');

let verificationCode = ''; // Store verification code from the backend

signUpForm.addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form submission

  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const dob = document.getElementById('dob').value;
  const address = document.getElementById('address').value;
  const contact = document.getElementById('contact').value;
  const expertise = document.getElementById('expertise');
  const experience = document.getElementById('experience');
  const workplace = document.getElementById('workplace');

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const emailRes = await fetch(
      'http://127.0.0.1:3000/api/v1/users/sendCode',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      }
    );

    const emailResult = await emailRes.json();
    if (!emailRes.ok) {
      alert(emailResult.message);
      return;
    }

    verificationCode = emailResult.verCode;
    modal.style.display = 'flex'; // Show the modal
  } catch (error) {
    alert('Failed to send verification code.');
  }
});

// Verify Code Button
verifyCodeButton.addEventListener('click', async function () {
  const enteredCode = verificationCodeInput.value.trim();

  if (enteredCode === verificationCode) {
    alert('Verification successful!');

    const technicianData = {
      name: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      dob: document.getElementById('dob').value,
      address: document.getElementById('address').value,
      contact: document.getElementById('contact').value,
      expertise: document.getElementById('expertise').value,
      experience: document.getElementById('experience').value,
      workplace: document.getElementById('workplace').value,
    };

    try {
      const response = await fetch(
        'http://127.0.0.1:3000/api/v1/technicians/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(technicianData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert('Sign Up successful! Redirecting to login.');
        window.location.href = './login.html';
      } else {
        alert(`Sign Up failed: ${result.message}`);
      }
    } catch (error) {
      alert('Failed to Sign Up. Please try again later.');
    }

    modal.style.display = 'none'; // Close modal
  } else {
    alert('Incorrect Code. Please try again.');
  }
});

// Close Modal
closeModalButton.addEventListener('click', function () {
  modal.style.display = 'none';
});
