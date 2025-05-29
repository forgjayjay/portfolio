
document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.querySelector('.header-container');
    const nav = document.querySelector('.nav');
    
    const hamburgerButton = document.createElement('button');
    hamburgerButton.className = 'hamburger';
    hamburgerButton.setAttribute('aria-label', 'Toggle menu');
    hamburgerButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    
    const logo = document.querySelector('.logo');
    logo.insertAdjacentElement('afterend', hamburgerButton);
    
    document.body.appendChild(overlay);
    
    function toggleMenu() {
        const isActive = nav.classList.contains('active');
        
        if (isActive) {
    
            nav.classList.remove('active');
            hamburgerButton.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
    
            nav.classList.add('active');
            hamburgerButton.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    hamburgerButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1200 && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
});