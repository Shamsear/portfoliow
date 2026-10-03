/**
 * Clean, lightweight portfolio JS
 * Focuses strictly on smooth scrolling, mobile nav toggle, and email copy.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Hide page loader overlay smoothly
    const hideLoader = () => {
        const loader = document.querySelector('.page-loader');
        if (loader && !loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
            }, 500);
        }
    };

    // Trigger loader removal
    setTimeout(hideLoader, 300);
    window.addEventListener('load', hideLoader);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
});

// Quick copy helper
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.innerHTML = `Email copied: ${email}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    });
}