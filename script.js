lucide.createIcons();

// --- Sidebar Menu ---
function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
    const menuText = document.getElementById('menu-text');
    menuText.innerText = menuText.innerText === "MENU" ? "CLOSE" : "MENU";
}

// --- Theme Toggle ---
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons();
}

// --- Scroll Effects ---
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// --- Typewriter Effect ---
const words = ["Networking", "Cybersecurity", "Cloud-Systems", "Software"];
let i = 0, j = 0, isDel = false;
function type() {
    const cur = words[i], el = document.getElementById('typewriter');
    if (!el) return;
    el.textContent = isDel ? cur.substring(0, j--) : cur.substring(0, j++);
    if(!isDel && j > cur.length) { isDel = true; setTimeout(type, 1500); }
    else if(isDel && j === 0) { isDel = false; i = (i+1)%words.length; setTimeout(type, 500); }
    else { setTimeout(type, isDel ? 50 : 150); }
}
type();

// --- Scroll Reveal ---
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));