document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://127.0.0.1:3000/api/v1/users/getInfo', {
    method: 'GET',
    credentials: 'include',
  });
  const result = await response.json();
  if (!response.ok) {
    if (confirm(result.message)) {
      window.location.href = './login.html';
    }
  }
  document.getElementById('name').textContent = result._user.name;
  document.getElementById('email').textContent = result._user.email;
  document.getElementById('address').textContent = result._user.address;
  document.getElementById('contact').textContent = result._user.contact;
  const dob = new Date(result._user.dob);
  document.getElementById('dob').textContent = dob.toLocaleDateString();
});
function redirectToDashboard() {
  window.location.href = './customerDashboard.html';
}
