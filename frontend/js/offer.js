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
    const rows = document.querySelectorAll(".offers-table tbody tr");
    rows.forEach((row) => {
        row.addEventListener("mousemove", (e) => {
            // Update tooltip position and display
            tooltip.textContent = "View Offer"; // Set the tooltip text
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
            tooltip.style.display = "block";
        });

        row.addEventListener("mouseleave", () => {
            tooltip.style.display = "none"; // Hide tooltip when leaving row
        });
    });
}

function redirectToDashboard() {
    window.location.href = './customerDashboard.html';
  }



    function populateOffersTable(offers) {
        const tableBody = document.getElementById('offers-body');
        const noOffersMessage = document.getElementById('no-offers-message');
    
        if (offers.length === 0) {
            // Show "No offers Found" message
            noOffersMessage.style.display = '';
        } else {
            // Hide "No offers Found" message
            noOffersMessage.style.display = 'none';
    
            // Clear previous table rows
            tableBody.innerHTML = '';
    
            // Populate table rows
            offers.forEach((offer) => {
                console.log(offer);
    
                const row = document.createElement('tr');
                row.dataset.requestId = offer.request_id;
                row.dataset.requestDescription = offer.request_description;
                row.dataset.technicianId = offer.technician_id;
                row.dataset.technicianName = offer.technician_name;
                row.dataset.serviceName = offer.service_name;
    
                row.addEventListener('click', () => {
                    // Include offer details as query parameters
                    const params = new URLSearchParams({
                        requestId: row.dataset.requestId,
                        requestDescription: row.dataset.requestDescription,
                        technicianId: row.dataset.technicianId,
                        technicianName: row.dataset.technicianName,
                        serviceName: row.dataset.serviceName,
                    });
    
                    window.location.href = `./viewOffer.html?${params.toString()}`;
                });
    
                // Create and populate table cells
                const cell1 = document.createElement('td'); // Service Name
                const cell2 = document.createElement('td'); // Request Description
                const cell3 = document.createElement('td'); // Technician Name
    
                cell1.textContent = offer.technician_name || 'N/A';
                cell2.textContent = offer.service_name || 'N/A';
                cell3.textContent = offer.request_description || 'N/A';    
                // Append cells to the row
                row.appendChild(cell1);
                row.appendChild(cell2);
                row.appendChild(cell3);
    
                // Append row to the table body
                tableBody.appendChild(row);

            });

            initializeTooltips();
        }
    }
    
  

  document.addEventListener('DOMContentLoaded', async () => {
    let response = '';
    let result = '';
    let userId = '';
    try {
     response = await fetch('http://127.0.0.1:3000/api/v1/session/', {
      method: 'GET',
      credentials: 'include',
    });
     result = await response.json();
    if (!response.ok || result.message === 'Unauthorized.') {
      if (confirm('Session Expired or Unauthorized Access. Please Login.')) {
        window.location.href = './login.html';
      }
      console.log(`Failed inside the try block: ${response.message}.`);
    }
    else
    {
        userId = result.userDetails.userId;
    }

  } catch (error) {
    console.log(`Error while fetching Session data: ${error}`);
  }

    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/customers/offer?userId=${userId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const result = await response.json();
      if (response.ok) {
        populateOffersTable(result.data);
        console.log('Successfully Populated Request Table');
      }
    } catch (error) {
      console.log(error);
    }
  });
  