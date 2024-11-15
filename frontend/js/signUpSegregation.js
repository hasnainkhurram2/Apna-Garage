// Get references to the buttons
const customerButton = document.getElementById("customerButton");
const technicianButton = document.getElementById("technicianButton");

// Redirect to customerSignUp.html on clicking the customer button
customerButton.addEventListener("click", () => {
  window.location.href = "../pages/customerSignUp.html"; // Adjust path as necessary
});

// Redirect to technicianSignUp.html on clicking the technician button
technicianButton.addEventListener("click", () => {
  window.location.href = "../pages/technicianSignUp.html"; // Adjust path as necessary
});
