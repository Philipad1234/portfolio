// Hamburger menu nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Spotlight mouse effect
const spotlight = document.getElementById('spotlight');

window.addEventListener('mousemove', (e) => {
    spotlight.style.setProperty('--spot-x', e.clientX + 'px');
    spotlight.style.setProperty('--spot-y', e.clientY + 'px');
});

// Form submissions
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.form-submit');
    const payload = {
        name: document.getElementById('cf-name').value,
        email: document.getElementById('cf-email').value,
        reason: document.getElementById('cf-reason').value,
        message: document.getElementById('cf-message').value,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
        const res = await fetch('https://portfolio-lqo4.onrender.com/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Request failed');

        formStatus.textContent = "Message sent. I'll get back to you soon.";
        formStatus.className = 'form-status is-success';
        form.reset();
    } catch (error) {
        formStatus.textContent = 'Something went wrong. Try again, or email me directly.';
        formStatus.className = 'form-status is-error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
    }
})