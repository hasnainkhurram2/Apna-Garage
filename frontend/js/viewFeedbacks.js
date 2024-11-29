const tableBody = document.getElementById('requests-body');
// Function to populate the table dynamically
function populatefeedbacksdbacksTable(feedbacks) {
  const nofeedbacksMessage = document.getElementById('no-requests-message');
  if (feedbacks.length === 0) {
    // Show "No feedbacks Found" message
    nofeedbacksMessage.style.display = '';
  } else {
    // Hide "No feedbacks Found" message
    nofeedbacksMessage.style.display = 'none';

    // Populate table rows
    feedbacks.forEach((feedback) => {
      const row = document.createElement('tr');
      const cell1 = document.createElement('td');
      const cell2 = document.createElement('td');
      const cell3 = document.createElement('td');
      const cell4 = document.createElement('td');

      cell1.textContent = feedback.name || 'N/A';
      cell2.textContent = feedback.serviceName || 'N/A';
      cell3.textContent = feedback.content || 'N/A';
      cell4.textContent = feedback.rating || 'N/A';

      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      tableBody.appendChild(row);
    });
  }
}
// Function to redirect to dashboard
function redirectToDashboard() {
  window.location.href = './technicianDashboard.html';
}

// On page load, populate the feedbacks table
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/technicians/feedbacks',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    const result = await response.json();
    if (response.ok) {
      populatefeedbacksdbacksTable(result.data);
      console.log('Successfully Populated feedback Table');
    }
  } catch (error) {
    console.log(error);
  }
});
tableBody.addEventListener('click', async (e) => {
  e.preventDefault();
  if (event.target.classList.contains('active-button')) {
    const activeButton = document.querySelector('.active-button');
    const params = new URLSearchParams({
      reqId: activeButton.value,
    });
    window.location.href = `./providefeedbacksdback.html?${params.toString()}`;
  } else {
    console.log('Did not recieve the event properly.', event.target.classList);
  }
});
