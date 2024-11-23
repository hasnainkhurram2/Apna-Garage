// Redirect to the landing page when "Home" button is clicked
function redirectToDashboard() {
  window.location.href = '../pages/customerDashboard.html';
}

const hireForm = document.getElementById('hireForm');
// Form submission handler
// document
//   .getElementById('hireForm')
//   .addEventListener('submit', function (event) {
//     event.preventDefault();
//     alert('Form submitted successfully!');
//     // Additional form handling logic goes here
//   });

hireForm.addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form submission

  const location = document.getElementById('location').value.trim();
  const serviceType = document.getElementById('serviceType').value;
  const description = document.getElementById('description').value;

  if (description === '') {
    alert('Description is required');
    e.preventDefault();
  }

  const requestData = {
    content: description,
    service_id: serviceType,
    location,
    startTime: new Date(),
    completed: null,
  };
  try {
    const response = await fetch('http://127.0.0.1:3000/api/v1/requests/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(requestData),
    });
    const result = await response.json();
    if (response.ok) {
      if (
        confirm('Request Lodged successfully! Press OK to proceed to Payment.')
      ) {
        window.location.href = './paymentPage.html';
      }
    } else {
      alert(`Oops, Something went wrong. Try Again Later.`);
      console.log(`Error while trying to Lodge a Request: ${result.message}`);
    }
  } catch (error) {
    alert(`Oops, Something went wrong. Try Again Later.`);
    console.log(`Error while trying to Lodge a Request: ${result.message}`);
  }
});
