// Main JS functionality for the site
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileCloseButton = document.querySelector(".mobile-close-button");
    const sidebar = document.querySelector(".sidebar");
    const mobileOverlay = document.querySelector(".mobile-overlay");
    const body = document.body;
  
    // Check if the device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
    // Function to toggle the mobile menu
    function toggleMobileMenu() {
      sidebar.classList.toggle("show");
      mobileOverlay.style.display = sidebar.classList.contains("show") ? "block" : "none";
      
      // Prevent scrolling when sidebar is open on iOS
      if (isIOS) {
        if (sidebar.classList.contains("show")) {
          body.classList.add("sidebar-open");
        } else {
          body.classList.remove("sidebar-open");
        }
      }
    }
  
    // Mobile menu toggle events
    mobileMenuButton.addEventListener("click", toggleMobileMenu);
    mobileCloseButton.addEventListener("click", toggleMobileMenu);
    mobileOverlay.addEventListener("click", toggleMobileMenu);
  
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener("click", function() {
        if (window.innerWidth <= 767 && sidebar.classList.contains("show")) {
          toggleMobileMenu();
        }
      });
    });
  
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
  
    // Resize event handler to ensure proper display on orientation change
    window.addEventListener("resize", function() {
      if (window.innerWidth > 767) {
        sidebar.classList.remove("show");
        mobileOverlay.style.display = "none";
        body.classList.remove("sidebar-open");
      }
    });
  });