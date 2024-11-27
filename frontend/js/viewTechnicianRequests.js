// Create a tooltip element
const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
tooltip.style.position = "absolute";
tooltip.style.background = "#000";
tooltip.style.color = "orange";
tooltip.style.padding = "5px 10px";
tooltip.style.borderRadius = "4px";
tooltip.style.fontSize = "12px";
tooltip.style.display = "none";
document.body.appendChild(tooltip);

// Function to initialize tooltip functionality for rows
function initializeTooltips() {
    const rows = document.querySelectorAll(".requests-table tbody tr");
    rows.forEach((row) => {
        row.addEventListener("mousemove", (e) => {
            // Update tooltip position and display
            tooltip.textContent = "View Request"; // Set the tooltip text
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
            tooltip.style.display = "block";
        });

        row.addEventListener("mouseleave", () => {
            tooltip.style.display = "none"; // Hide tooltip when leaving row
        });
    });
}


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
          console.log(request);
          const row = document.createElement('tr');
          row.style.cursor = 'pointer'; // Change cursor to indicate the row is clickable
          
          row.setAttribute('class', 'reqRow');
          row.setAttribute('value', request.requestId); // Set the value to requestId
          row.dataset.requestId = request.requestId;
          row.dataset.requestName = request.serviceName;
          row.dataset.requestDescription = request.description;
          row.dataset.requestUser = request.requestingUser;
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
          cell1.textContent = request.serviceName || 'N/A';   // service name
          cell2.textContent = request.description || 'N/A';
          cell3.textContent = request.requestingUser || 'N/A';    // requested by user
          cell4.textContent = `${dt.toLocaleDateString()} \n ${dt.toLocaleTimeString()}` || 'N/A';

          // Append cells to the row
          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);

          // Append row to the table body
          tableBody.appendChild(row);
      });

      initializeTooltips();
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


