// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const backToTopButton = document.getElementById('backToTop');
const yearCards = document.querySelectorAll('.year-card');
const counterElements = document.querySelectorAll('.counter');
const commodityCards = document.querySelectorAll('.commodity-card');
const progressCircles = document.querySelectorAll('.progress-ring-circle');
const newsletterForm = document.querySelector('.newsletter-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Year Slider/Card Interaction
yearCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove active class from all cards
        yearCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        card.classList.add('active');
        
        // Get the year data
        const year = card.getAttribute('data-year');
        console.log(`Selected year range: ${year}`);
        
        // In a real app, you would update the chart/data based on selected year
    });
});

// Counter Animation
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Initialize counters when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            
            // Animate the counter
            animateCounter(counter, target, 1500);
            
            // For progress circles
            if (counter.classList.contains('progress-value')) {
                // Calculate progress for circles
                const progressValue = parseInt(counter.textContent);
                const circle = counter.closest('.visual-progress').querySelector('.progress-ring-circle');
                const radius = circle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (progressValue / 100) * circumference;
                
                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                circle.style.strokeDashoffset = circumference;
                
                // Animate the circle
                setTimeout(() => {
                    circle.style.strokeDashoffset = offset;
                }, 300);
            }
            
            // Stop observing after animation
            observer.unobserve(counter);
        }
    });
}, observerOptions);

counterElements.forEach(counter => {
    observer.observe(counter);
});

// Commodity Cards Hover Effect
commodityCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const commodity = card.getAttribute('data-commodity');
        console.log(`Hovering over ${commodity} card`);
        
        // Add a subtle animation
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('active')) {
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize Chart.js for Commodities
function initCommodityChart() {
    const ctx = document.getElementById('commodityChart').getContext('2d');
    
    // Data for the chart
    const data = {
        labels: ['Padi', 'Jagung', 'Kopi', 'Cabai', 'Lainnya'],
        datasets: [{
            data: [45, 20, 15, 8, 12],
            backgroundColor: [
                '#4CAF50',
                '#8BC34A',
                '#FFC107',
                '#FF9800',
                '#9C27B0'
            ],
            borderWidth: 0,
            hoverOffset: 15
        }]
    };
    
    // Chart configuration
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            },
            cutout: '70%',
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1500
            }
        }
    };
    
    // Create the chart
    const commodityChart = new Chart(ctx, config);
}

// Newsletter Form Submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // In a real app, you would send this to a server
            console.log(`Subscribing email: ${email}`);
            
            // Show success message
            const button = newsletterForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Terima Kasih!';
            button.style.backgroundColor = '#4CAF50';
            
            // Reset after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                emailInput.value = '';
            }, 3000);
        }
    });
}

// Initialize progress circles on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chart
    if (document.getElementById('commodityChart')) {
        initCommodityChart();
    }
    
    // Initialize progress circles with 0 value
    progressCircles.forEach(circle => {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
    });
    
    // Animate map dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Initialize map markers animation
    const markers = document.querySelectorAll('.map-marker');
    markers.forEach((marker, index) => {
        const pulse = marker.querySelector('.marker-pulse');
        pulse.style.animationDelay = `${index * 0.5}s`;
    });
});

// Add scroll animation for sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Initialize section animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Trigger initial animation for hero section
    setTimeout(() => {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }
    }, 300);
});