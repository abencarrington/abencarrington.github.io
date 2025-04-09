// Smooth scrolling & dynamic sidebar highlighting

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
  
    // Smooth scrolling on click
    navLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute("href"));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  
    // Update the active link as the user scrolls
    window.addEventListener("scroll", function () {
      let currentSection = "";
  
      const sections = document.querySelectorAll("section");
      sections.forEach(section => {
        // Tweak offset to ensure highlight triggers at a comfortable position
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });
  
      // Remove 'active' from all links; add to link matching current section
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSection) {
          link.classList.add("active");
        }
      });
    });
  });