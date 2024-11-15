const form = document.getElementById('technicianSignUpForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const dob = document.getElementById('dob').value;
  const address = document.getElementById('address').value;
  const contact = document.getElementById('contact').value;
  const expertise = document.getElementById('expertise').value;
  const experience = document.getElementById('experience').value;
  const workplace = document.getElementById('workplace').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Mock success message
  alert('Technician signed up successfully!');
  form.reset();
});

