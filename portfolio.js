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

    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-hidden {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .animate-visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    `;
    document.head.appendChild(style);
});


const portrait = document.querySelector(".portrait");

portrait.addEventListener("mouseenter", () => {
    gsap.to(".portrait", { scale: 1.3, duration: 0.5, rotation: 0 })
});

portrait.addEventListener("mouseleave", () => {
    gsap.to(".portrait", { scale: 1, duration: 0.5, rotation: 0 })
})



gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".animation",
    { y: -200, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".animation",

            toggleActions: "play reverse play reverse"
        }
    })
    gsap.fromTo(".subtitle",
    { y: 50, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".animation",

            toggleActions: "play reverse play reverse"
        }
    })

gsap.from(".cta-buttons", {
    z: -200,
    opacity: 0,
    scale: 0.5,
    duration: 1,
    delay: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".cta-buttons",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});



gsap.fromTo(".portrait",
    { x: 300, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
            trigger: ".portrait",
            start: "top 50%",
            end: "-top 5%",
            toggleActions: "play reverse play reverse"
        }

    })

// Image animation from left side
gsap.fromTo(".about-image",
    { x: -100, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".about",
            start: "top 60%",
            end: "-top 5%",
            toggleActions: "play reverse play reverse",
        }

    }
)

// Text animation right side
gsap.fromTo(".about-text",
    { x: 100, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.1,
        scrollTrigger: {
            trigger: ".about",
            start: "top 60%%",
            end: "-top 5%",
            toggleActions: "play reverse play reverse"
        }
    });

// Title fade-in from top
gsap.fromTo(".section-title",
    { y: -50, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".about",
            start: "top 85%",
            end: "-top 5%",
            toggleActions: "play reverse play reverse"
        }
    });


document.querySelectorAll(".scroll").forEach(elem => {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 50%",
        end: "bottom 50%",
        toggleClass: { targets: elem, className: "animate-visible" },
        toggleActions: "play reverse play reverse"
    });
});

gsap.fromTo(".card1",
    { x: -100, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".card1",
            start: "top 60%",
            end: "buttom 5%",
            toggleActions: "play reverse play reverse"
        }
    });
    gsap.fromTo(".card3",
    { x: 100, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease:"power3.out",
        scrollTrigger: {
            trigger: ".card3",
            start: "top 60%",
            end: "buttom 2%",
            toggleActions: "play reverse play reverse"
        }
    });

    gsap.from("card2", {
    z: -200,
    opacity: 0,
    scale: 0.5,
    duration: 1,
    delay: 0.1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".card2",
        start: "top 60%",
        end:"top 5%",
        toggleActions: "play reverse play reverse"
    }
});






