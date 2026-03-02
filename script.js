// ============================================
// ESTEX CAPITAL - Portfolio Website JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initLoader();
    initNavbar();
    initSmoothScroll();
    initMobileMenu();
    initPortfolioModal();
    initScrollAnimation();
});

// ============================================
// LOADER ANIMATION
// ============================================
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after animation completes
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Remove loader from DOM after transition
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for blur effect
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .btn-nav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    const hamburger = document.getElementById('hamburger');
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// PORTFOLIO MODAL
// ============================================
function initPortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Project data
    const projects = {
        1: {
            title: 'E-Commerce Platform',
            description: 'Platform belanja online modern dengan fitur lengkap termasuk keranjang belanja, pembayaran online, manajemen produk, dan dashboard admin. Dibangun dengan teknologi modern untuk performa optimal.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
            features: [
                'Sistem keranjang belanja real-time',
                'Integrasi pembayaran Stripe',
                'Dashboard admin lengkap',
                'Optimasi SEO',
                'Responsif di semua perangkat'
            ]
        },
        2: {
            title: 'Dashboard Analytics',
            description: 'Sistem dashboard analitik real-time untuk monitoring bisnis. Menampilkan visualisasi data interaktif dengan chart yang menarik dan laporan otomatis yang dapat di-export.',
            technologies: ['Vue.js', 'D3.js', 'Firebase', 'Chart.js', 'Tailwind'],
            features: [
                'Visualisasi data real-time',
                'Chart interaktif',
                'Laporan otomatis',
                'Export ke PDF/Excel',
                'Multi-user access'
            ]
        },
        3: {
            title: 'HR Management System',
            description: 'Sistem manajemen sumber daya manusia komprehensif untuk pengelolaan karyawan, absensi, penggajian, dan rekrutmen. Dilengkapi dengan fitur onboarding dan training management.',
            technologies: ['Angular', 'TypeScript', 'PostgreSQL', 'NestJS', 'JWT'],
            features: [
                'Manajemen karyawan',
                'Sistem absensi fingerprint',
                'Hitung gaji otomatis',
                'Rekrutmen online',
                'Portal karyawan'
            ]
        }
    };
    
    // Open modal
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.dataset.project;
            const project = projects[projectId];
            
            if (project) {
                let tagsHtml = project.technologies.map(tech => 
                    `<span>${tech}</span>`
                ).join('');
                
                let featuresHtml = project.features.map(feature => 
                    `<li>${feature}</li>`
                ).join('');
                
                modalBody.innerHTML = `
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <h3>Fitur Utama:</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${featuresHtml}
                    </ul>
                    <div class="portfolio-tags">
                        ${tagsHtml}
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// SCROLL ANIMATION (Fade In)
// ============================================
function initScrollAnimation() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.feature-card, .service-card, .portfolio-item, .tech-item, .contact-info, .contact-cta'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Initialize counter animation when visible
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
}

// ============================================
// WA BUTTON CLICK TRACKING (Optional)
// ============================================
const waButton = document.querySelector('.btn-whatsapp');
if (waButton) {
    waButton.addEventListener('click', function() {
        console.log('WhatsApp button clicked - Opening WhatsApp');
    });
}
