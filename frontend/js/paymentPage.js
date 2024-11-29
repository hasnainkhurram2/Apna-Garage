const params = new URLSearchParams(window.location.search);
const data =
{
  requestId : params.get('requestId'),
  demand : params.get('demand'),
}
console.log(data);
document.addEventListener('DOMContentLoaded', async () => {
  const costText = document.getElementById('payment-cost');
    costText.textContent = `PKR ${data.demand}`;
});
document
  .querySelector('.payment-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Get input values
    const cardNumber = document.getElementById('card-number').value;
    const expDate = document.getElementById('exp-date').value;
    const cvv = document.getElementById('cvv').value;

    // Validate fields (Basic example)
    if (!cardNumber || !expDate || !cvv) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Prepare the request payload
      const payload = {
        paymentType: 'card', // Hardcoded to card payment
        amount: data.demand
      };

      // Send POST request to the API
      const response = await fetch(
`http://127.0.0.1:3000/api/v1/customers/payment?requestId=${data.requestId}`,        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        }
      );

      // Handle response
      if (response.ok) {
        const result = await response.json();
        // Show confirmation and redirect to dashboard
        if (confirm('Payment successful! Redirecting to your dashboard.')) {
          window.location.href = './customerDashboard.html';
        }
      } else {
        // Handle errors returned by the API
        const errorData = await response.json();
        alert(`Payment failed: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Error:', error);
      alert(
        'An error occurred while processing your payment. Please try again.'
      );
    }
  });

  
  function navigateToDashboard() {
    window.location.href = './customerDashboard.html';
  }
