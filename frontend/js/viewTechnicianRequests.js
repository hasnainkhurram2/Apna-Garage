// Function to populate the table dynamically
function populateTechnicianRequestsTable(requests) {
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
        cell1.textContent = request.name || 'N/A';
        cell2.textContent =  request.description || 'N/A';
        cell3.textContent = request.requestinguser || 'N/A';
        cell4.textContent =
        `${dt.toLocaleDateString()} \n ${dt.toLocaleTimeString()}` || 'N/A';
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        tableBody.appendChild(row);
      });
    }
  }

  function backToTechnicianDashboard() {
      window.location.href = './technicianDashboard.html';  
  }
    // On page load, populate the requests table
  document.addEventListener('DOMContentLoaded', async () => {
      try {
        const response = await fetch(
          'http://127.0.0.1:3000/api/v1/technicians/technicianrequests',
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const result = await response.json();
        if (response.ok) {
          populateTechnicianRequestsTable(result.data);
          console.log('Successfully Populated Request Table');
        }
      } catch (error) {
        console.log(error);
      }
    });




