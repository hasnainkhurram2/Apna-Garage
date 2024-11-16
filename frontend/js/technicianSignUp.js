const form = document.getElementById('technicianSignUpForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const dob = document.getElementById('dob').value;
  const address = document.getElementById('address').value;
  const contact = document.getElementById('contact').value;
  const expertise = document.getElementById('expertise').value;
  const experience = document.getElementById('experience').value;
  const workplace = document.getElementById('workplace').value;

  if (fullName === '') {
    alert('Full Name is required!');
    e.preventDefault();
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  const technicianData = {
    name: fullName,
    email,
    password,
    dob,
    address,
    contact,
    expertise,
    experience,
    workplace,
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
      if (
        confirm(
          'Technician Sign Up successful! Press OK to proceed to your Dashboard.'
        )
      ) {
        window.location.href = './technicianDashboard.html';
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
