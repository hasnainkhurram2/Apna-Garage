document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const toggleBtn = question.querySelector(".toggle-btn");
            
            if (answer.style.display === "block") {
                answer.style.display = "none";
                toggleBtn.textContent = "+";
            } else {
                answer.style.display = "block";
                toggleBtn.textContent = "-";
            }
        });
    });
});

function navigateToDashboard() {
    window.location.href = "landingPage.html";
  }
