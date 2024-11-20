document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/v1/session/', {
      method: 'GET',
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok || result.message === 'Unauthorized.') {
      if (confirm('Session Expired or Unauthorized Access. Please Login.')) {
        window.location.href = './login.html';
      }
      console.log(`Failed inside the try block: ${response.message}.`);
    }
    const welcomeElement = document.querySelector('.services-title h1');
    welcomeElement.textContent = `WELCOME ${result.userDetails.userName}`;
  } catch (error) {
    console.log(`Error while fetching Session data: ${error}`);
  }
});

const buttons = document.querySelectorAll('.carousel-button');

// Function to set the active button
function setActiveButton(index) {
  buttons.forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Initialize with the first button active
let activeIndex = 0;
setActiveButton(activeIndex);

// Add event listeners to buttons for hover and click
buttons.forEach((button, index) => {
  // Set the active button on hover
  button.addEventListener('mouseover', () => {
    activeIndex = index;
    setActiveButton(activeIndex);
  });

  // Redirect to specific pages on click
  button.addEventListener('click', () => {
    switch (index) {
      case 0:
        window.location.href = '../pages/hireMechanic.html'; // Redirect for first button

        break;
      case 1:
        window.location.href = '../pages/hireElectrician.html'; // Redirect for second button

        break;
      case 2:
        window.location.href = '../pages/hireBodyTechnician.html'; // Redirect for third button

        break;
      case 3:
        window.location.href = '../pages/hireFuelSupplier.html'; // Redirect for fourth button

        break;
      default:
        break;
    }
  });
});

// Log out function with confirmation
function logout() {
  if (confirm('Are you sure you want to log out?')) {
    window.location.href = '../pages/landingPage.html'; // Redirect to login page
  }
}


function redirectToViewRequestsStatus() {
  window.location.href = "../pages/viewRequestsStatus.html";
}


function redirectToCustomerProfile() {
  window.location.href = "../pages/customerProfile.html";
}