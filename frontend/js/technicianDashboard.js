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
    const userName = result.userDetails.userName.toUpperCase();

    welcomeElement.textContent = `WELCOME ${userName}`;
  } catch (error) {
    console.log(`Error while fetching Session data: ${error}`);
  }
});

function logout() {
  if (confirm('Are you sure you want to log out?')) {
    window.location.href = '../pages/landingPage.html'; // Redirect to login page
  }
}

function navigateToTechnicianRequests() {
  window.location.href = 'viewTechnicianRequests.html'; // Redirect to login page
}

function navigateToOngoingRequests() {
  window.location.href = 'viewOngoingRequests.html'; // Redirect to login page
}

function redirectToUserProfile() {
  window.location.href = 'technicianProfile.html';
}
