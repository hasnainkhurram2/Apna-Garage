const tableBody = document.getElementById('requests-body');
// Function to populate the table dynamically
function populateRequestTable(requests) {
  const norequestsMessage = document.getElementById('no-requests-message');
  console.log(requests);
  if (requests.length === 0) {
    // Show "No requests Found" message
    norequestsMessage.style.display = '';
  } else {
    // Hide "No requests Found" message
    norequestsMessage.style.display = 'none';

    // Populate table rows
    requests.forEach((request) => {
      const row = document.createElement('tr');
      const cell1 = document.createElement('td');
      const cell2 = document.createElement('td');
      const cell3 = document.createElement('td');
      const cell4 = document.createElement('td');
      const cell5 = document.createElement('td');
      const cell6 = document.createElement('td');
      const dt = new Date(request.startTime);
      const button = document.createElement('button');
      cell1.textContent = request.name || 'N/A';
      cell2.textContent = request.serviceName || 'N/A';
      cell3.textContent = request.description || 'N/A';
      cell4.textContent =
        `${dt.toLocaleDateString()} \n ${dt.toLocaleTimeString()}` || 'N/A';
      cell6.textContent = request.location;
      cell5.appendChild(button);
      cell5.classList.add('active-button');
      button.classList.add('active');
      button.textContent = 'Complete';
      button.value = request.reqId;
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      row.appendChild(cell6);
      row.appendChild(cell5);
      tableBody.appendChild(row);
    });
  }
}
// Function to redirect to dashboard
function redirectToDashboard() {
  window.location.href = './technicianDashboard.html';
}

// On page load, populate the requests table
document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/technicians/curRequests',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    const result = await response.json();
    if (response.ok) {
      populateRequestTable(result.data);
      console.log('Successfully Populated request Table');
    }
  } catch (error) {
    console.log(error);
  }
});
tableBody.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.classList.contains('active')) {
    const activeButton = document.querySelector('.active-button');
    const activeText = document.querySelector('.active');
    const reqId = activeText.value;
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/technicians/markCompleted',
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reqId,
        }),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      alert(result.message);
      return;
    }
    activeButton.classList.remove('active-button');
    activeButton.classList.add('done-button');
    activeText.textContent = 'Completed';
    activeText.classList.remove('active');
  } else {
    console.log('Did not recieve the event properly.', event.target.classList);
  }
});
