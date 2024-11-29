document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);

    const data = {
        requestId: params.get("requestId"),
        serviceName: params.get("serviceName"), // Using serviceName as the request name
        requestDescription: params.get("requestDescription"),
        technicianId: params.get("technicianId"),
        technicianName: params.get("technicianName"),
        offerDemand: params.get("offerDemand"),
        offerDescription: params.get("offerDescription") || "Not Provided", // Default to "Not Provided" if missing
    };

    try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/customers/invoice`,  {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        if(!response.ok)
        {
            alert("There was an error sending invoice");
        }
    }
    catch(error)
    {
        console.log(error);
    }

})


function redirectToDashboard() {
    window.location.href = 'customerDashboard.html';
  }