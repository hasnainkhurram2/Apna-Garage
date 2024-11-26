// Store initial field values for cancel functionality
let initialValues = {};

// Fetch user data and display on page load
document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://127.0.0.1:3000/api/v1/users/getInfo', {
    method: 'GET',
    credentials: 'include',
  });
  const result = await response.json();
  if (!response.ok) {
    if (confirm(result.message)) {
      window.location.href = './login.html';
    }
  }
  // Populate fields with user data
  document.getElementById('name').textContent = result._user.name;
  document.getElementById('email').textContent = result._user.email;
  document.getElementById('address').textContent = result._user.address;
  document.getElementById('contact').textContent = result._user.contact;
  const dob = new Date(result._user.dob);
  document.getElementById('dob').textContent = dob.toLocaleDateString();

  // Save initial values for cancel functionality
  initialValues = {
    name: result._user.name,
    email: result._user.email,
    address: result._user.address,
    contact: result._user.contact,
    dob: dob.toLocaleDateString(),
  };
});

// Redirect to dashboard
function redirectToDashboard() {
  window.location.href = './customerDashboard.html';
}

// Enable edit mode: show pen icons and save/cancel buttons
function enableEditMode() {
  document.querySelectorAll('.edit-icon').forEach(pen => pen.classList.remove('hidden'));
  document.querySelector('.profile-buttons').classList.remove('hidden');
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

// Save changes: gather all field values and submit to the backend
function saveChanges() {
  const updatedValues = {
    name: document.getElementById('name').textContent,
    email: document.getElementById('email').textContent,
    address: document.getElementById('address').textContent,
    contact: document.getElementById('contact').textContent,
    dob: document.getElementById('dob').textContent,
  };

  // Submit updated values to the server
  fetch('http://127.0.0.1:3000/api/v1/users/updateInfo', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedValues),
  })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        alert('Profile updated successfully!');
         window.location.href = './customerProfile.html'
      } else {
        alert('Failed to update profile: ' + result.message);
      }
    });
}

// Cancel changes: reset fields to initial values
function cancelChanges() {
  Object.keys(initialValues).forEach(key => {
    document.getElementById(key).textContent = initialValues[key];
  });

  // Disable edit mode
  document.querySelectorAll('.value-box').forEach(field => {
    field.contentEditable = false;
    field.classList.remove('editable');
  });
  document.querySelectorAll('.edit-icon').forEach(pen => pen.classList.add('hidden'));
  document.querySelector('.profile-buttons').classList.add('hidden');
}
