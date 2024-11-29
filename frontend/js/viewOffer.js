 // Get URL parameters
 const params = new URLSearchParams(window.location.search);


document.addEventListener("DOMContentLoaded", () => {
   
    // Extract data from URL parameters
    const offerData = {
        requestId: params.get("requestId"),
        serviceName: params.get("serviceName"), // Using serviceName as the request name
        requestDescription: params.get("requestDescription"),
        technicianId: params.get("technicianId"),
        technicianName: params.get("technicianName"),
        offerDemand: params.get("offerDemand"),
        offerDescription: params.get("offerDescription") || "Not Provided", // Default to "Not Provided" if missing
    };

    sessionStorage.setItem("offerData", JSON.stringify(offerData));

    console.log(offerData);
    document.getElementById("request-name").textContent = offerData.serviceName;
    document.getElementById("request-description").textContent = offerData.requestDescription;
    document.getElementById("technician-name").textContent = offerData.technicianName;
    document.getElementById("offer-demand").textContent = offerData.offerDemand;
    document.getElementById("offer-description").textContent = offerData.offerDescription;

    const technicianProfileUrl = `viewTechnician.html?id=${offerData.technicianId}`;
    document.getElementById("technician-name").href = technicianProfileUrl; // Set href to direct to technician profile page

  });
  
  // Redirect function for the RETURN button
  function redirectToOffersPage() {
    window.location.href = "./offer.html";
  }
  
  function confirmAction(action) {
    const popupMessage = action === 'ACCEPT'
        ? "Are you sure you want to accept this offer?"
        : "Are you sure you want to reject this offer?";

    // Set the message in the popup
    document.getElementById("popup-message").textContent = popupMessage;

    // Show the popup
    document.getElementById("confirmation-popup").style.display = "block";
}

// Handle confirmation (Yes button)
async function handlePopupConfirm() {
    const technicianId = params.get("technicianId");
    const requestId = params.get("requestId"); // Get requestId from params

    try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/customers/requestAccepted`,  {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({technicianId, requestId}),
        });
    }
    catch(error)
    {
        console.log(error);
    }
    window.location.href = "invoiceForwarded.html";
}

// Handle cancellation (No button)
function handlePopupCancel() {
    // Close the popup
    document.getElementById("confirmation-popup").style.display = "none";
}