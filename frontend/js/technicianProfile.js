// Store initial field values for cancel functionality
let initialValues = {};
let userId = 0;
// Fetch technician data and display on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/technicians/technicianProfile',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    const result = await response.json();

    if (!response.ok) {
      if (confirm(result.message)) {
        window.location.href = './login.html';
      }
      return;
    }

    // Populate fields with technician data
    const technician = result._technician;
    const user = result._user;

    console.log(user);
    console.log(technician);
    userId = user.id;
    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent = user.email;
    document.getElementById('address').textContent = user.address;
    document.getElementById('contact').textContent = user.contact;
    const dob = new Date(user.dob).toLocaleDateString();
    document.getElementById('dob').textContent = dob;
    document.getElementById('available').value = technician.availability
      ? 'true'
      : 'false';
    document.getElementById('experience').textContent = technician.experience;
    document.getElementById('expertise').value = technician.type;
    document.getElementById('workshop').textContent = technician.workplace;

    // console.log('Available:', document.getElementById('available').value);
    // console.log('Expertise:', document.getElementById('expertise').value);

    // Save initial values for cancel functionality
    initialValues = {
      name: user.name,
      email: user.email,
      address: user.address,
      contact: user.contact,
      dob: dob,
      available: technician.availability ? 'true' : 'false',
      experience: technician.experience,
      expertise: technician.type,
      workshop: technician.workplace,
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
});

// Redirect to dashboard
function redirectToDashboard() {
  window.location.href = './technicianDashboard.html';
}

// Enable edit mode: show edit icons, save/cancel buttons, and enable dropdowns
function enableEditMode() {
  document
    .querySelectorAll('.edit-icon')
    .forEach((pen) => pen.classList.remove('hidden'));
  document.querySelector('.profile-buttons').classList.remove('hidden');

  // Enable dropdowns
  document.querySelectorAll('.dropdown').forEach((select) => {
    select.disabled = false;
  });
}

// Toggle editable state for a specific field
function toggleFieldEditable(id) {
  const field = document.getElementById(id);
  const isEditable = field.contentEditable === 'true';

  if (isEditable) {
    field.contentEditable = false;
    field.classList.remove('editable');
  } else {
    field.contentEditable = true;
    field.classList.add('editable');
    field.focus();
  }
}

// Save changes: gather all field values, including dropdown selections
function saveChanges() {
  console.log('Here in save changes');
  const updatedValues = {
    id: userId,
    name: document.getElementById('name').textContent,
    email: document.getElementById('email').textContent,
    address: document.getElementById('address').textContent,
    contact: document.getElementById('contact').textContent,
    dob: document.getElementById('dob').textContent,
    availability: document.getElementById('available').value,
    expertise: document.getElementById('expertise').value,
    workplace: document.getElementById('workshop').textContent,
  };

  //   console.log(document.getElementById('available').value);
  //   console.log(document.getElementById('expertise').value);

  // Submit updated values to the server
  fetch('http://127.0.0.1:3000/api/v1/technicians/updateTechnicianInfo', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedValues),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        alert('Profile updated successfully!');
        window.location.href = './technicianProfile.html';
      } else {
        alert('Failed to update profile: ' + result.message);
      }
    })
    .catch((error) => {
      console.error('Error saving profile:', error);
      alert('An error occurred while saving the profile.');
    });
}

// Cancel changes: reset fields to initial values and disable dropdowns
function cancelChanges() {
  Object.keys(initialValues).forEach((key) => {
    if (key === 'available' || key === 'expertise') {
      document.getElementById(key).value = initialValues[key];
    } else {
      document.getElementById(key).textContent = initialValues[key];
    }
  });

  // Disable dropdowns
  document.querySelectorAll('.dropdown').forEach((select) => {
    select.disabled = true;
  });

  // Disable edit mode
  document.querySelectorAll('.value-box').forEach((field) => {
    field.contentEditable = false;
    field.classList.remove('editable');
  });
  document
    .querySelectorAll('.edit-icon')
    .forEach((pen) => pen.classList.add('hidden'));
  document.querySelector('.profile-buttons').classList.add('hidden');
}

async function deleteMyAccount() {
  if (confirm('Are you sure you want to delete your Account?')) {
    const response = await fetch('http://127.0.0.1:3000/api/v1/users', {
      method: 'DELETE',
      credentials: 'include',
    });
    const result = response.json();
    if (response.ok) {
      alert('Account deleted');
      window.location.href = './landingPage.html';
    } else {
      alert(`Error occurred: ${result.message}`);
    }
  } else {
    window.location.href = './technicianProfile.html';
  }
}
