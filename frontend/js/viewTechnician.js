const params = new URLSearchParams(window.location.search);

// Fetch technician data and display on page load
document.addEventListener('DOMContentLoaded', async () => {
    
    const technicianId = params.get("id");
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/customers/technician?techId=${technicianId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const result = await response.json();

    if (!response.ok) {
      if (confirm(result.message)) {
        window.location.href = './login.html';
      }
      return;
    }

    // Populate fields with technician data
    const technician = result._technician;
    const user = result._user;

    console.log(user);
    console.log(technician);
    userId = user.id;
    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent = user.email;
    document.getElementById('address').textContent = user.address;
    document.getElementById('contact').textContent = user.contact;
    const dob = new Date(user.dob).toLocaleDateString();
    document.getElementById('dob').textContent = dob;
    document.getElementById('available').textContent = technician.availability === true ? 'Yes' : 'No';
    document.getElementById('experience').textContent = technician.experience + ' Years';
    document.getElementById('expertise').textContent = technician.type.charAt(0).toUpperCase() + technician.type.slice(1);
    document.getElementById('workshop').textContent = technician.workplace;

  } catch (error) {
    console.error('Error fetching profile:', error);
  }
});



function redirectToOfferDetails() {
     // Get offerData from sessionStorage
     const offerData = JSON.parse(sessionStorage.getItem("offerData"));

     if (offerData) {
         // Convert offerData object to query string
         const queryParams = new URLSearchParams(offerData).toString();
        console.log(offerData);
         // Redirect to viewOffer.html with offerData as URL parameters
         const offerDetailsUrl = './viewOffer.html?' + queryParams;
     window.location.href = offerDetailsUrl;
     } else {
         console.error("Offer data not found in sessionStorage");
     }
}




