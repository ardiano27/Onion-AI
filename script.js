document.addEventListener('DOMContentLoaded', () => {
    // 1. CHART JS (Visualisasi Data Bawang)
    const ctx = document.getElementById('bawangChart').getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, '#00a86b'); // Warna utama
    gradient.addColorStop(1, 'rgba(0, 168, 107, 0.05)'); // Transparan di bawah

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Produksi Nasional (Juta Ton)',
                data: [1.15, 1.28, 1.35, 1.48, 1.52],
                backgroundColor: gradient,
                borderRadius: 6,
                barThickness: 35,
                hoverBackgroundColor: '#008f5a'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1a2a23',
                    titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 14 },
                    bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { borderDash: [5, 5], color: '#f0f0f0' },
                    ticks: { font: { family: "'Plus Jakarta Sans', sans-serif" } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { family: "'Plus Jakarta Sans', sans-serif" } }
                }
            }
        }
    });

    // 2. MOBILE MENU TOGGLE (Agar tombol hamburger berfungsi)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Tutup menu saat link diklik
        document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // 3. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});