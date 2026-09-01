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


const spotlight = document.getElementById('spotlight');

window.addEventListener('mousemove', (e) => {
  spotlight.style.setProperty('--spot-x', e.clientX + 'px');
  spotlight.style.setProperty('--spot-y', e.clientY + 'px');
});