// // Redirect to login page
// function redirectToLogin() {
//   window.location.href = '../pages/login.html';
// }

// // Reset Password Logic
// const resetPasswordForm = document.getElementById('resetPasswordForm');
// // console.log(resetPasswordForm);
// resetPasswordForm.addEventListener('submit', async function (e) {
//   console.log('hello');
//   e.preventDefault(); // Prevent form submission

//   const email = document.getElementById('email').value;
//   console.log(email);
//   if (email === '') {
//     alert('email is required');
//     e.preventDefault();
//   }

//   //   const requestData = {
//   //     content: description,
//   //     service_id: serviceType,
//   //     location,
//   //     startTime: null,
//   //     completed: false,
//   //   };
//   try {
//     const response = await fetch(
//       `http://127.0.0.1:5500/api/v1/users/resetPasswords/${email}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         // body: JSON.stringify(requestData),
//       }
//     );
//     const result = await response.json();
//     if (response.ok) {
//       if (confirm('Reset Link has been sent to your email address.')) {
//         window.location.href = './landingPage.html';
//       }
//     } else {
//       alert(`Oops, Something went wrong. Try Again Later. ${result.message}`);
//       console.log(`Error while trying to Reset password: ${result.message}`);
//     }
//   } catch (error) {
//     alert(`Oops, Something went wrong. Try Again Later. ${result.message}`);
//     console.log(`Error while trying to reset password: ${result.message}`);
//   }
// });
