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

// Contact form: validation, animations, and real submission (single handler)
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const btn = document.getElementById('submitBtn');

const fields = [
    { el: document.getElementById('fieldName'), input: document.getElementById('cf-name') },
    { el: document.getElementById('fieldEmail'), input: document.getElementById('cf-email') },
    { el: document.getElementById('fieldMessage'), input: document.getElementById('cf-message') },
];

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let hasError = false;
    fields.forEach(f => {
        f.el.classList.remove('has-error');
        void f.el.offsetWidth;
        if (!f.input.value.trim()) {
            f.el.classList.add('has-error');
            hasError = true;
        }
    });

    if (hasError) {
        formStatus.textContent = 'Please fill in all fields.';
        formStatus.className = 'form-status is-visible';
        return;
    }

    const payload = {
        name: document.getElementById('cf-name').value,
        email: document.getElementById('cf-email').value,
        reason: document.getElementById('cf-reason').value,
        message: document.getElementById('cf-message').value,
    };

    btn.classList.add('is-loading');
    formStatus.className = 'form-status';

    try {
        const res = await fetch('https://portfolio-lqo4.onrender.com/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Request failed');

        btn.classList.remove('is-loading');
        btn.classList.add('is-success');

        setTimeout(() => {
            formStatus.textContent = "Message sent. I'll get back to you soon.";
            formStatus.className = 'form-status is-visible is-success';
        }, 200);

        setTimeout(() => {
            btn.classList.remove('is-success');
            form.reset();
        }, 2200);
    } catch (error) {
        btn.classList.remove('is-loading');
        formStatus.textContent = 'Something went wrong. Try again, or email me directly.';
        formStatus.className = 'form-status is-visible is-error';
    }
});

fields.forEach(f => {
    f.input.addEventListener('input', () => f.el.classList.remove('has-error'));
});

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
revealEls.forEach(el => revealObserver.observe(el));

// Timeline draw-in animation
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length) {
    const itemsArray = Array.from(timelineItems);

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');

                const index = itemsArray.indexOf(entry.target);
                const previousItem = itemsArray[index - 1];
                if (previousItem) {
                    previousItem.classList.add('is-drawn');
                }
            }
        });
    }, { threshold: 0.5 });

    itemsArray.forEach(item => timelineObserver.observe(item));
}