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
          row.style.cursor = 'pointer'; // Change cursor to indicate the row is clickable
          
          row.setAttribute('class', 'reqRow');
          row.setAttribute('value', request.id); // Set the value to requestId
          row.dataset.requestId = request.id;
          row.dataset.requestName = request.name;
          row.dataset.requestDescription = request.description;
          row.dataset.requestUser = request.requestinguser;
          row.dataset.requestStartTime = request.startTime;
          row.addEventListener('click', () => {
              // Include request details as query parameters
              const params = new URLSearchParams({
                requestId: row.dataset.requestId,
                requestName: row.dataset.requestName,
                requestDescription: row.dataset.requestDescription,
                requestUser: row.dataset.requestUser,
                requestStartTime: row.dataset.requestStartTime
              });
              
              window.location.href = `./giveOfferForRequest.html?${params.toString()}`;  
          });
          

          const cell1 = document.createElement('td');
          const cell2 = document.createElement('td');
          const cell3 = document.createElement('td');
          const cell4 = document.createElement('td');
          const dt = new Date(request.startTime);

          // Fill table cells with data
          cell1.textContent = request.name || 'N/A';
          cell2.textContent = request.description || 'N/A';
          cell3.textContent = request.requestinguser || 'N/A';
          cell4.textContent = `${dt.toLocaleDateString()} \n ${dt.toLocaleTimeString()}` || 'N/A';

          // Append cells to the row
          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);

          // Append row to the table body
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


