// ==================== Smooth Scroll & Active Link ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Navbar Scroll Effect ==================== 
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// ==================== Counter Animation for Statistics ==================== 
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = entry.target;
            const finalNumber = parseInt(target.textContent);
            countUp(target, finalNumber);
            target.classList.add('counted');
        }
    });
}, observerOptions);

function countUp(element, finalNumber) {
    let currentNumber = 0;
    const increment = finalNumber / 50; // 50 steps untuk smooth animation
    const interval = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            element.textContent = finalNumber.toLocaleString();
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(currentNumber).toLocaleString();
        }
    }, 30);
}

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(el => {
    observer.observe(el);
});

// ==================== Button Interactions ==================== 
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });
    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== Gallery Cards Interaction ==================== 
const galleryCards = document.querySelectorAll('.gallery-card, .info-card, .commodity-card');
galleryCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
});

// ==================== Fade In on Scroll ==================== 
const fadeInElements = document.querySelectorAll('.about-text, .digital-text, .productivity-text, .monitoring h2, .commodity h2, .information h2');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

fadeInElements.forEach(el => {
    el.style.opacity = '0';
    fadeInObserver.observe(el);
});

// ==================== CTA Button Click Handler ==================== 
const ctaButtons = document.querySelectorAll('.btn-cta, .btn-cta-large');
ctaButtons.forEach(button => {
    button.addEventListener('click', function () {
        console.log('CTA Button Clicked');
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`;
document.head.appendChild(style);

// ==================== Form Validation (if forms exist) ==================== 
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== Parallax Scroll Effect ==================== 
window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// ==================== Active Navigation Link ==================== 
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = '#2d7a3e';
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ==================== Mobile Menu (if needed) ==================== 
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth <= 768) {
        // Mobile menu initialization could go here
    }
}

initMobileMenu();
window.addEventListener('resize', initMobileMenu);

// ==================== Lazy Loading Images ==================== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in';
        imageObserver.observe(img);
    });
}

// ==================== Smooth Fade In for Page Load ==================== 
window.addEventListener('load', function () {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

// ==================== Scroll to Top Button ==================== 
function addScrollToTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.textContent = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #2d7a3e;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
    });
    scrollTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
}

addScrollToTopButton();

// ==================== Console Welcome Message ==================== 
console.log('%c🧅 Welcome to Onion AI', 'color: #2d7a3e; font-size: 20px; font-weight: bold;');
console.log('%cPeta Informasi Lahan Pertanian Indonesia', 'color: #f4b860; font-size: 14px;');
console.log('%cBuilt with ❤️ for sustainable agriculture', 'color: #666; font-size: 12px;');
