function navigateToDashboard() {
    window.location.href = './viewTechnicianRequests.html';
  }
  
  // Fetch the request details and populate the page
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Assuming you're passing an ID or some identifier in the URL, like /giveOfferForRequest.html?id=123
      const urlParams = new URLSearchParams(window.location.search);
      const requestId = urlParams.get('requestId');

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
      console.log(request);
      // Populate the page with the request data
      document.getElementById('service-name').textContent = request.name || 'N/A';
      document.getElementById('description').textContent = request.description || 'N/A';
      document.getElementById('requested-by').textContent = request.requestinguser || 'N/A';
      document.getElementById('request-time').textContent = new Date(request.startTime).toLocaleString() || 'N/A';
  
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching the request details.');
    }
  });
  

  function navigateToDashboard() {
    window.location.href = './viewTechnicianRequests.html';
  }
  
  function showDemandForm() {
    // Hide the request details container
    const requestDetailsContainer = document.getElementById("request-details-container");
    requestDetailsContainer.style.display = "none";
  
    // Show the demand form
    const demandForm = document.getElementById("demand-form");
    demandForm.style.display = "block";
  }
  
  function closeDemandForm() {
    // Hide the demand form
    const demandForm = document.getElementById("demand-form");
    demandForm.style.display = "none";
  
    // Show the request details container again
    const requestDetailsContainer = document.getElementById("request-details-container");
    requestDetailsContainer.style.display = "block";
  }
  
   async function submitDemand() {
    const demand = document.getElementById("technician-demand").value.trim();
    const description = document.getElementById("description-input").value.trim();
  
    if (!demand) {
      alert("Please fill out Demand form!");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
      const requestId = urlParams.get('requestId');
      //console.log(requestId);
      let response;
      let ans;
      try {
         response = await fetch('http://127.0.0.1:3000/api/v1/session/', {
          method: 'GET',
          credentials: 'include',
        });
         ans= await response.json();
       
       
      } catch (error) {
        console.log(`Error while fetching Session data: ${error}`);
      }

      const techId = ans.userDetails.userId;
        console.log(techId);
    const offer = {
      demand,
      description,
      requestId,
      techId,
    };

    try {
      const response = await fetch(
        'http://127.0.0.1:3000/api/v1/requests/saveOffer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(offer),
        }
      );
      const result = await response.json();
    window.location.href = './offerForwarded.html';
     }
  
  catch(error)
  {
    console.log(error);
  }
}