// Redirect to the landing page when "Home" button is clicked
function redirectToDashboard() {
    window.location.href = "../pages/customerDashboard.html";
  }
  
  // Form submission handler
  document.getElementById("hireForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Form submitted successfully!");
    // Additional form handling logic goes here
  });
  