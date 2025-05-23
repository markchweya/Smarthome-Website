// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom >= 0 &&
        rect.right >= 0
    );
}

// Function to add 'show' class when elements are in view
function checkAnimations() {
    // Select all elements that should animate on scroll
    // These selectors correspond to the elements given initial opacity: 0 in CSS
    const animatedElements = document.querySelectorAll(
        'header .left-head .logo, ' +
        '.home .home-image, .home .home-image .home-text, ' +
        '.container, ' +
        '.contact-us .text, .contact-us .box, .contact-us .box .s-box, ' +
        '.convenience .provided .box, .convenience .content .box, .convenience .video, ' +
        '.property .prop-h, .property .de-box .box, ' +
        '.footer .footer-box .box'
    );

    animatedElements.forEach(el => {
        // Check if the element is in the viewport
        // We can adjust the threshold for when the animation triggers.
        // For example, trigger when the element is 80% visible.
        const rect = el.getBoundingClientRect();
        const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
        const triggerPoint = viewportHeight * 0.8; // Trigger when 80% of viewport height is reached

        if (rect.top < triggerPoint && rect.bottom > 0) {
            el.classList.add('show');
        } else {
            // Optional: Remove 'show' class when out of view if you want re-animation
            // el.classList.remove('show');
        }
    });
}

// Function to update the scroll progress indicator
function updateScrollProgress() {
    const scrollIndicator = document.getElementById('scroll-progress-indicator');
    if (!scrollIndicator) return; // Exit if the indicator element doesn't exist

    const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
    const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollPx / winHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
}


// Event listener for scroll and load events
window.addEventListener('scroll', checkAnimations);
window.addEventListener('load', checkAnimations); // Check on page load for elements already in view

// Add event listeners for the scroll progress indicator
window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress); // Update on load to set initial state


// JavaScript for the mobile navigation menu (if applicable from previous versions)
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuIcon = document.querySelector('header .menu');
    const closeIcon = document.querySelector('header .left-head nav .close');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.add('active');
        });
    }

    if (closeIcon && navbar) {
        closeIcon.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    }
});

