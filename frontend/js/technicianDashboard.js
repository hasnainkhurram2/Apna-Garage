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
