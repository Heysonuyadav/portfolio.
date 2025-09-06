// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle theme when the theme button is clicked
    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });

                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the form data to a server
            // For now, we'll just log it and show an alert
            console.log('Form submitted:', { name, email, message });

            // Show success message
            alert('Thanks for your message! I\'ll get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Add the initial class for animation
        section.classList.add('animate-hidden');
        observer.observe(section);
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    


    // ---------- Portrait Element ----------
    const portrait = document.querySelector(".portrait");
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (portrait) {
        if (!isMobile) {
            portrait.addEventListener("mouseenter", () => {
                gsap.to(portrait, { scale: 1.3, duration: 0.5, rotation: 0 });
            });
            portrait.addEventListener("mouseleave", () => {
                gsap.to(portrait, { scale: 1, duration: 0.5, rotation: 0 });
            });
        } else {
            gsap.fromTo(portrait,
                { scale: 0.95, opacity: 0 },
                { 
                    scale: 1, opacity: 1, duration: 1, ease: "power1.out",
                    scrollTrigger: { trigger: portrait, start: "top 80%", toggleActions: "play none none none" }
                }
            );
        }
    }

    // ---------- Register ScrollTrigger ----------
    gsap.registerPlugin(ScrollTrigger);

    const animProps = isMobile ? { y: 50, duration: 0.8, ease: "power1.out" } : { y: 200, duration: 1.2, ease: "power3.out" };

    // Animate Hero & Subtitle
    gsap.fromTo(".animation",
        { y: isMobile ? -50 : -200, opacity: 0 },
        { y: 0, opacity: 1, duration: animProps.duration, ease: animProps.ease,
          scrollTrigger: { trigger: ".animation", toggleActions: "play none none none" }
        });

    gsap.fromTo(".subtitle",
        { y: isMobile ? 20 : 50, opacity: 0 },
        { y: 0, opacity: 1, duration: animProps.duration, ease: animProps.ease,
          scrollTrigger: { trigger: ".animation", toggleActions: "play none none none" }
        });

    // Animate CTA buttons
    const cta = document.querySelector(".cta-buttons");
    if (cta) {
        gsap.from(cta, {
            z: -200,
            opacity: 0,
            scale: isMobile ? 0.8 : 0.5,
            duration: animProps.duration,
            delay: 0.5,
            ease: animProps.ease,
            scrollTrigger: { trigger: cta, start: "top 80%", toggleActions: "play none none none" }
        });
    }

    // About Section
    const aboutImg = document.querySelector(".about-image");
    const aboutText = document.querySelector(".about-text");
    if (aboutImg) {
        gsap.fromTo(aboutImg, { x: isMobile ? -50 : -100, opacity: 0 },
                    { x: 0, opacity: 1, duration: animProps.duration,
                      scrollTrigger: { trigger: ".about", start: "top 70%", toggleActions: "play none none none" } });
    }
    if (aboutText) {
        gsap.fromTo(aboutText, { x: isMobile ? 50 : 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: animProps.duration, delay: 0.1,
                      scrollTrigger: { trigger: ".about", start: "top 70%", toggleActions: "play none none none" } });
    }

    // Section titles
    document.querySelectorAll(".section-title").forEach(title => {
        gsap.fromTo(title, { y: isMobile ? -25 : -50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5,
                      scrollTrigger: { trigger: title, start: "top 85%", toggleActions: "play none none none" } });
    });

    // Cards
    [".card1", ".card2", ".card3"].forEach((selector, i) => {
        const el = document.querySelector(selector);
        if (el) {
            const xStart = isMobile ? 0 : (selector === ".card1" ? -100 : (selector === ".card3" ? 100 : 0));
            gsap.fromTo(el, { x: xStart, opacity: 0, scale: isMobile ? 0.95 : 0.8 },
                         { x: 0, opacity: 1, scale: 1, duration: animProps.duration, delay: 0.2*i, ease: animProps.ease,
                           scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } });
        }
    });
});
