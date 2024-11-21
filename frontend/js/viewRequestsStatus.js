// Function to populate the table dynamically
function populateRequestsTable(requests) {
  const tableBody = document.getElementById('requests-body');
  const noRequestsMessage = document.getElementById('no-requests-message');
  if (requests.length === 0) {
    // Show "No Requests Found" message
    noRequestsMessage.style.display = '';
  } else {
    // Hide "No Requests Found" message
    noRequestsMessage.style.display = 'none';

    // Populate table rows
    requests.forEach((request) => {
      const row = document.createElement('tr');
      const cell1 = document.createElement('td');
      const cell2 = document.createElement('td');
      const cell3 = document.createElement('td');
      const cell4 = document.createElement('td');
      const dt = new Date(request.startTime);
      cell1.textContent =
        `${dt.toLocaleDateString()} \n ${dt.toLocaleTimeString()}` || 'N/A';
      cell2.textContent = request.name || 'N/A';
      cell3.textContent = request.description || 'N/A';
      if (request.completed !== null) {
        if (request.completed) {
          cell4.textContent = 'Completed';
        } else {
          cell4.textContent = 'In Progress';
        }
      } else {
        cell4.textContent = 'Not Accepted';
      }
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
  window.location.href = './customerDashboard.html';
}

// On page load, populate the requests table
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/customers/reqHistory',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    const result = await response.json();
    if (response.ok) {
      populateRequestsTable(result.data);
      console.log('Successfully Populated Request Table');
    }
  } catch (error) {
    console.log(error);
  }
});
