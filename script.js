lucide.createIcons();

function toggleMenu() {
    const menu = document.getElementById('menu');
    const menuText = document.getElementById('menu-text');
    menu.classList.toggle('active');
    menuText.textContent = menu.classList.contains('active') ? 'CLOSE' : 'MENU';
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    body.classList.toggle('dark-mode');
    themeIcon.setAttribute('data-lucide', body.classList.contains('dark-mode') ? 'sun' : 'moon');
    lucide.createIcons();
}

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 32) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

const words = ['digital systems', 'brands', 'web apps', 'ICT solutions'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typewriterLoop() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const current = words[wordIndex];
    if (deleting && charIndex <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    } else if (!deleting && charIndex >= current.length) {
        deleting = true;
        setTimeout(typewriterLoop, 1300);
        return;
    }

    el.textContent = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);

    setTimeout(typewriterLoop, deleting ? 60 : 110);
}

typewriterLoop();

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (form) {
    form.addEventListener('submit', async event => {
        event.preventDefault();

        const originalText = submitBtn.textContent;
        const formData = new FormData(form);
        const name = (formData.get('name') || '').toString();
        const email = (formData.get('email') || '').toString();
        const subject = (formData.get('subject') || 'Website inquiry').toString();
        const message = (formData.get('message') || '').toString();
        const mailtoBody = [
            `Name: ${name}`,
            `Email: ${email}`,
            '',
            message
        ].join('\n');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusEl.textContent = '';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const message = await response.text();

            if (!response.ok) {
                throw new Error(message || 'Unable to send message.');
            }

            statusEl.textContent = 'Message sent successfully. I will reply soon.';
            statusEl.style.color = '#22c55e';
            form.reset();
        } catch (error) {
            const mailtoLink = `mailto:blessedbenwork@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;
            window.location.href = mailtoLink;
            statusEl.textContent = 'Your email app should open with the message ready to send. If not, use WhatsApp.';
            statusEl.style.color = '#ef4444';
            console.error(error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}
