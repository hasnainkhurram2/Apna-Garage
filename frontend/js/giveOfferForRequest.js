function navigateToDashboard() {
    window.location.href = './viewTechnicianRequests.html';
  }
  
  // Fetch the request details and populate the page
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Assuming you're passing an ID or some identifier in the URL, like /giveOfferForRequest.html?id=123
      const urlParams = new URLSearchParams(window.location.search);
      const requestId = urlParams.get('requestId');
      console.log(requestId);
      // Fetch the request details using the requestId (you might want to modify your API URL accordingly)
      const response = await fetch(`http://127.0.0.1:3000/api/v1/requests/getReq?requestId=${requestId}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Failed to fetch request details');
      }
  
      const data = await response.json();
      
      // Assuming `data` is an object with request details
      const request = data;
      // Populate the page with the request data
      document.getElementById('service-name').textContent = request.name || 'N/A';
      document.getElementById('description').textContent = request.description || 'N/A';
      document.getElementById('requested-by').textContent = request.requestinguser || 'N/A';
      document.getElementById('request-time').textContent = new Date(request.startTime).toLocaleString() || 'N/A';
  
      // Add event listeners for buttons
      // document.getElementById('accept-btn').addEventListener('click', () => {
      //   document.getElementById('offer-form').style.display = 'block'; // Show the demand form
      // });
  
      // document.getElementById('reject-btn').addEventListener('click', () => {
      //   // You can handle reject logic here
      //   alert('Request Rejected');
      // });
  
      // // Handle the offer form submission
      // document.getElementById('demand-form').addEventListener('submit', async (e) => {
      //   e.preventDefault();
      //   const demand = document.getElementById('demand').value;
  
      //   // Submit the demand (you can adjust the API endpoint and data structure accordingly)
      //   const offerResponse = await fetch(`http://127.0.0.1:3000/api/v1/technicians/submitOffer/${requestId}`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ demand }),
      //   });
  
      //   if (offerResponse.ok) {
      //     alert('Offer Submitted Successfully!');
      //     document.getElementById('offer-form').style.display = 'none'; // Hide the form after submission
      //   } else {
      //     alert('Failed to submit offer.');
      //   }
      // });
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching the request details.');
    }
  });
  