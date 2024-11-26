// JavaScript to make the banner slide every 3 seconds
let currentIndex = 0;
const images = document.querySelectorAll('.banner img');
const totalImages = images.length;

function changeImage() {
  // Remove 'active' class from the current image
  images[currentIndex].classList.remove('active');

  // Increment index to move to the next image, loop back if necessary
  currentIndex = (currentIndex + 1) % totalImages;

  // Add 'active' class to the new image
  images[currentIndex].classList.add('active');
}

// Change image every 3.5 seconds
setInterval(changeImage, 3500);

function redirectToSignUpSegregation() {
  window.location.href = '../pages/signUpSegregation.html';
}
function redirectToLogInPage() {
  window.location.href = '../pages/login.html';
}
function redirectToAboutUs() {
  window.location.href = '../pages/aboutUs.html';
}
function redirectToContactUs() {
  window.location.href = '../pages/contactUs.html';
}
function redirectToFAQs() {
  window.location.href = '../pages/faq.html';
}
function redirectToTermsAndConditions() {
  window.location.href = '../pages/termsAndConditions.html';
}
function redirectToTeamMembers() {
  window.location.href = '../pages/teamMembers.html';
}

function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
}