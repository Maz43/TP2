document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loading Screen ---
    const loader = document.querySelector('.loader');
    const hero = document.querySelector('.hero');
    
    // Simulate loading time
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            hero.classList.add('loaded');
            // Trigger initial reveal for hero text
            const heroTexts = document.querySelectorAll('.hero .reveal-text');
            heroTexts.forEach(el => el.classList.add('active'));
        }, 800);
    }, 1500);

    // --- 2. Scroll Progress Bar ---
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.value = scrolled;
    });

    // --- 3. Sticky Navbar ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 4. Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuBtn.classList.toggle('toggle-active');
        });
    }

    // --- 5. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-text:not(.hero .reveal-text)');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // ms
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
                hasCounted = true;
                observer.disconnect();
            }
        });
    }, counterOptions);

    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // --- 7. Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 8. Form Prevention (Demo) ---
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real scenario, this would send data.
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Processing...';
            setTimeout(() => {
                btn.innerText = 'Success!';
                btn.style.backgroundColor = 'var(--success)';
                btn.style.color = '#fff';
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        });
    });
});
