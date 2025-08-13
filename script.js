document.addEventListener('DOMContentLoaded', function() {
            // Initialize AOS Animation
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
            
            // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mainNav = document.getElementById('main-nav');
            
            mobileMenuBtn.addEventListener('click', function() {
                mainNav.classList.toggle('show');
                this.innerHTML = mainNav.classList.contains('show') ? 
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
            
            // Close mobile menu when clicking on nav links
            document.querySelectorAll('#main-nav a').forEach(link => {
                link.addEventListener('click', () => {
                    mainNav.classList.remove('show');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
            
            // Sticky Header on Scroll
            const header = document.getElementById('main-header');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Smooth Scrolling for Anchor Links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Update active nav link
                        document.querySelectorAll('#main-nav a').forEach(link => {
                            link.classList.remove('active');
                        });
                        this.classList.add('active');
                    }
                });
            });
            
            // Back to Top Button
            const backToTopBtn = document.getElementById('back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });
            
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Testimonial Slider
            const slides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.slider-dot');
            let currentSlide = 0;
            let slideInterval;
            
            function showSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                slides[index].classList.add('active');
                dots[index].classList.add('active');
                currentSlide = index;
            }
            
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }
            
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-slide'));
                    showSlide(slideIndex);
                    resetInterval();
                });
            });
            
            function startSlider() {
                slideInterval = setInterval(nextSlide, 5000);
            }
            
            function resetInterval() {
                clearInterval(slideInterval);
                startSlider();
            }
            
            startSlider();
            
            // Counter Animation
            const counters = document.querySelectorAll('.counter');
            const speed = 200;
            
            function animateCounters() {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const increment = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(animateCounters, 1);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                });
            }
            
            // Start counter animation when section is in view
            const aboutSection = document.querySelector('.about');
            const observerOptions = {
                threshold: 0.3
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            observer.observe(aboutSection);
            
            // Form Submission
            const contactForm = document.getElementById('contactForm');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const service = document.getElementById('service').value;
                
                // Here you would typically send the form data to a server
                // For demo, we'll just show an alert
                alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} regarding ${service || 'your inquiry'} soon.`);
                
                // Reset form
                contactForm.reset();
            });
            
            // Set current year in footer
            document.querySelector('.footer-bottom p').innerHTML = 
                document.querySelector('.footer-bottom p').innerHTML.replace('2023', new Date().getFullYear());
        });