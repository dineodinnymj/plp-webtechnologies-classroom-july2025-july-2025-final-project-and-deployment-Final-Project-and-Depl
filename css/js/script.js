// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const bars = hamburger.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Testimonial Slider
    const testimonialSlider = document.getElementById('testimonialSlider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
    }

    // Auto-rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate name
            if (name === '') {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Validate subject
            if (subject === '') {
                document.getElementById('subjectError').textContent = 'Subject is required';
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                document.getElementById('messageError').textContent = 'Message is required';
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('messageError').textContent = 'Message should be at least 10 characters';
                isValid = false;
            }
            
            // Validate phone if provided
            if (phone !== '') {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
                    document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
                    isValid = false;
                }
            }
            
            if (isValid) {
                // In a real application, you would send the form data here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Smooth scrolling for navigation links
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

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.service-card, .testimonial, .mv-card, .team-member').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form input validation in real-time
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.id;
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (field.required && value === '') {
            errorElement.textContent = 'This field is required';
            return false;
        }
        
        if (fieldName === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorElement.textContent = 'Please enter a valid email';
                return false;
            }
        }
        
        if (fieldName === 'phone' && value !== '') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                errorElement.textContent = 'Please enter a valid phone number';
                return false;
            }
        }
        
        if (fieldName === 'message' && value !== '' && value.length < 10) {
            errorElement.textContent = 'Message should be at least 10 characters';
            return false;
        }
        
        errorElement.textContent = '';
        return true;
    }
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize for responsive design
window.addEventListener('resize', debounce(function() {
    const navMenu = document.getElementById('nav-menu');
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        const hamburger = document.getElementById('hamburger');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}, 250));