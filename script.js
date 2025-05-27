// Wait for everything to load
window.addEventListener('load', function() {
  // Load header and footer
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      setupMenuToggle(); // Call menu setup after header is loaded
    });

  fetch('footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer').innerHTML = data);
});

function setupMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (!menuToggle || !nav) {
    console.error('Menu elements not found!');
    return;
  }

  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Toggle aria-expanded for accessibility
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Close menu when clicking on a nav link (for mobile)
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}