// Go to landing page
function goToLandingPage() {
    window.location.href = "landingPage.html";
  }
  
  // Team members data with extended descriptions
  const teamMembers = [
    { 
      name: "Farooq Haider", 
      description: "Farooq Haider is a versatile Full Stack Developer known for his ability to seamlessly develop frontend and backend systems. With expertise in Node.js, Express, PostgreSQL, HTML, CSS, and JavaScript, he has a strong command of both programming and design. Farooq is also skilled in creative tools like Figma and Canva, enabling him to create visually appealing and user-friendly interfaces. He has a deep understanding of version control, branching strategies, and collaborative workflows using Git and GitHub. His expert-level proficiency in making responsive designs and keen eye for detail make him a vital asset to any project."
    },
    { 
      name: "Hasnain Khurram", 
      description: "Hasnain Khurram is a highly skilled Full Stack Developer and Moderator with a deep understanding of modern web technologies. Proficient in Node.js, Express, PostgreSQL, HTML, CSS, and JavaScript, he excels at building robust, scalable applications. He is highly proficient in integrating complex systems and ensuring seamless functionality. Hasnain's expertise extends to tools like Git and GitHub, ensuring efficient collaboration and version control. As an expert-level professional, he brings leadership and reliability to any development team."
    },
    { 
      name: "Abdullah Azeem", 
      description: "Abdullah Azeem is an expert Backend Developer with a strong focus on server-side technologies. His proficiency in Node.js, Express, and PostgreSQL allows him to build secure and efficient backend systems. Abdullah is adept at working with Git, ensuring smooth version control and team collaboration. He excels at integrating various technologies to create smooth and cohesive solutions. With his expert-level knowledge, he consistently delivers high-quality, performance-driven backend solutions for complex projects."
    },
    { 
      name: "Naail Rayyan", 
      description: "Naail Rayyan is a seasoned Full Stack Developer with a proven track record of delivering innovative web applications. He specializes in Node.js, Express, PostgreSQL, HTML, CSS, JavaScript, and Figma, making him a well-rounded developer. Naail's expert-level skills enable him to tackle challenging problems, from crafting responsive user interfaces to designing efficient backend architectures. He has advanced skills in system integration, delivering seamless and efficient solutions. His commitment to excellence and teamwork sets him apart as a valuable asset in the field."
    },
    { 
      name: "Basim Zafar", 
      description: "Basim Zafar is a talented Front-End Developer who combines creativity and technical expertise to build engaging user interfaces. Proficient in HTML, CSS, and JavaScript, he focuses on creating visually appealing and highly functional designs. With intermediate-level skills in Git, Basim ensures seamless integration into development workflows. He is dedicated to writing clean, maintainable code that ensures scalability and future-proofing of front-end applications. His attention to detail and passion for front-end development make him a valuable contributor to user-focused projects."
    }
  ];
  
  // Function to display team members
  function displayTeam() {
    const teamContainer = document.getElementById("team-members");
    teamMembers.forEach((member) => {
      const memberDiv = document.createElement("div");
      memberDiv.className = "team-member";
      memberDiv.innerHTML = `
        <h3>${member.name}</h3>
        <p>${member.description}</p>
      `;
      teamContainer.appendChild(memberDiv);
    });
  }
  
  // Initialize display on page load
  window.onload = displayTeam;
  