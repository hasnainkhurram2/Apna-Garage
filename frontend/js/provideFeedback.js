let reqId = null;
// Function to redirect to the homepage
function returnToHome() {
  alert('Returning to homepage...');
  // You can replace this alert with the redirection logic if needed
  // Example: window.location.href = '../pages/home.html';
}

// Function to log out the user
function logout() {
  alert('Logged out successfully!');
  // You can replace this alert with the redirection logic if needed
  // Example: window.location.href = '../pages/login.html';
}

// Star Rating Interaction
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    reqId = await urlParams.get('reqId');
    console.log(reqId);
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/technicians/getTechnicianByReqId',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reqId,
        }),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      alert(result.message);
      return;
    }
    document.getElementById('name').textContent = result._user.name;
  } catch (error) {
    console.log(error);
    alert('Oops, Something went wrong. Try Again Later.');
  }
});
const stars = document.querySelectorAll('.star-rating span');
let selectedRating = 0; // Store the selected rating

stars.forEach((star) => {
  star.addEventListener('click', () => {
    // Reset all stars
    stars.forEach((s) => s.classList.remove('selected'));

    // Highlight the selected star and all before it
    star.classList.add('selected');
    let prev = star.previousElementSibling;
    while (prev) {
      prev.classList.add('selected');
      prev = prev.previousElementSibling;
    }

    // Set the selected rating value
    selectedRating = star.dataset.value;
  });
});

// Submit Feedback

const submitButton = document.querySelector('.submit-feedback');
const reviewBox = document.querySelector('.review-box');

submitButton.addEventListener('click', async () => {
  const reviewContent = reviewBox.value.trim();
  console.log(reviewContent);

  // Validate input
  if (selectedRating === 0 || reviewContent === '') {
    alert('Please provide a rating and write a review.');
    return;
  }

  // Construct feedback object
  const feedback = {
    reqId,
    content: reviewContent,
    rating: selectedRating,
  };
  console.log(selectedRating);

  try {
    // Send feedback to the server
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/customers/provideFeedback',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(feedback),
      }
    );

    if (response.ok) {
      const result = await response.json();
      if (confirm('Feedback submitted successfully!')) {
        window.location.href = './customerDashboard.html';
      }
      console.log(result);
    } else {
      const error = await response.json();
      alert(`Failed to submit feedback: ${error.message}`);
    }
  } catch (err) {
    console.error('Error submitting feedback:', err);
    alert('An error occurred while submitting feedback.');
  }
});
