// Redirect to signUpSegregation.html
function redirectToSignUpSegregation() {
    window.location.href = "../pages/signUpSegregation.html";
  }
  
  // Form validation
  const signUpForm = document.getElementById('signUpForm');
  
  signUpForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
  
    // Simple validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Success message
    alert("Sign Up Successful!");
    // Redirect or clear the form if needed
    signUpForm.reset();
  });
  