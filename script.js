// Portfolio JavaScript Functionality - Enhanced with WOW Effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize all functionality
    initCustomCursor();
    initCursorTrail();
    initNavbar();
    initSmoothScrolling();
    initStatsAnimation();
    initScrollAnimations();
    initScrollReveal();
    initMobileMenu();
    initTypingEffect();
    initParallaxEffect();
    initMagneticButtons();
    initProjectCardEffects();
    initSkillsAnimations();
    initActiveNavigation();
    initTechTagTooltips();
    initGoldenParticles();
    addScrollToTop();
});

// Loading screen
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loadingScreen);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800);
    });
}

// Custom cursor with golden glow
function initCustomCursor() {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorRing);
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth ring follow
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .stat-item, .btn-primary, .btn-secondary, .project-link, .tech-tag');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursorRing.classList.add('click');
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorRing.classList.remove('click');
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Golden cursor trail effect
function initCursorTrail() {
    let lastTrailTime = 0;
    const trailDelay = 30;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime > trailDelay) {
            createTrailParticle(e.clientX, e.clientY);
            lastTrailTime = now;
        }
    });
}

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-trail';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 600);
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section, .project-card, .skill-category, .education-item, .about-text, .about-stats, .goals-quote');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal', 'active');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

// Golden floating particles
function initGoldenParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: 100%;
            z-index: 0;
            animation: floatUp ${Math.random() * 10 + 10}s linear forwards;
        `;
        hero.appendChild(particle);
        
        setTimeout(() => particle.remove(), 20000);
    }
    
    // Add float up animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(floatStyle);
    
    setInterval(createParticle, 500);
}

// Magnetic button effect
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .social-links-hero a, .project-link');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate statistics numbers
function initStatsAnimation() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const target = parseInt(entry.target.dataset.target);
                
                animateNumber(statNumber, 0, target, 2000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current + (end === 100 ? '+' : '+');
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Scroll animations for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .education-content, .about-text');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

// Add typing effect to hero title with cursor
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title-gradient');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        heroTitle.appendChild(cursor);
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                setTimeout(typeWriter, 80 + Math.random() * 50);
            } else {
                // Keep cursor blinking after typing
                setTimeout(() => {
                    cursor.style.animation = 'blink 0.8s step-end infinite';
                }, 500);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1500);
    }
}

// Enhanced parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (hero && scrolled < window.innerHeight) {
            const rate = scrolled * 0.4;
            hero.style.backgroundPositionY = rate + 'px';
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrolled / 700);
            }
            
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.02}deg)`;
            }
        }
    });
    
    // Mouse move parallax for hero
    hero?.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        if (heroImage) {
            heroImage.style.transform = `translateX(${xAxis}px) translateY(${yAxis}px)`;
        }
    });
}

// Removed loading animation for faster site load

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scrolled {
        background: rgba(10, 10, 10, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }
    
    .navbar {
        transition: transform 0.3s ease, background 0.3s ease;
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        padding: 2rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    }
    
    .mobile-menu-btn.active i {
        transform: rotate(90deg);
    }
    
    .mobile-menu-btn i {
        transition: transform 0.3s ease;
    }
    
    .nav-links a.active {
        color: var(--accent-yellow);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;

document.head.appendChild(style);

// Add scroll to top functionality with golden styling
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        background: linear-gradient(135deg, #d4af37, #f4e4bc, #d4af37);
        border: none;
        border-radius: 50%;
        color: #0a0a0a;
        font-size: 1.2rem;
        cursor: none;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        z-index: 1000;
        box-shadow: 0 5px 25px rgba(212, 175, 55, 0.4);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects with golden glow
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 10px 35px rgba(212, 175, 55, 0.6), 0 0 50px rgba(212, 175, 55, 0.3)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 25px rgba(212, 175, 55, 0.4)';
    });
}

// Add project card hover effects with 3D tilt
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `translateY(-15px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Move shine effect
            const shine = this.querySelector('.card-shine');
            if (shine) {
                shine.style.left = x + 'px';
                shine.style.top = y + 'px';
            }
        });
    });
}

// Add skills section stagger animations
function initSkillsAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });
    
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(50px)';
        category.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0, 1)';
        skillObserver.observe(category);
    });
}

// Add active navigation highlight with smooth transitions
function initActiveNavigation() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Enhanced tech tag hover effects
function initTechTagTooltips() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
        
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1) rotate(-3deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0)';
        });
    });
}

// Initialize all new features
document.addEventListener('DOMContentLoaded', function() {
    // Text scramble effect for section titles
    initTextScramble();
    
    // Smooth scroll progress indicator
    initScrollProgress();
});

// Text scramble effect
function initTextScramble() {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = chars;
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Add scramble style
    const scrambleStyle = document.createElement('style');
    scrambleStyle.textContent = `
        .scramble-char {
            color: var(--gold-shine);
            opacity: 0.8;
        }
    `;
    document.head.appendChild(scrambleStyle);
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--gold-dark), var(--gold-shine), var(--gold-light));
        z-index: 10001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}
