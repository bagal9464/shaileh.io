const floatingHeartsLayer = document.getElementById('floating-hearts-layer');
const staticHeartsLayer = document.getElementById('static-hearts-layer');

function createStaticHeart(x, y, scale, rotation) {
    const heart = document.createElement('div');
    heart.classList.add('heart-3d');
    heart.style.left = `${x}px`;
    heart.style.bottom = `${y}px`;
    heart.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    staticHeartsLayer.appendChild(heart);
}

// Add some static hearts naturally nestled amongst the clouds.
// X, Bottom Y, Scale, Rotation
createStaticHeart(40, 150, 1.2, -30);
createStaticHeart(120, 170, 0.9, -60);
createStaticHeart(230, 190, 1.5, -40);
createStaticHeart(80, 90, 1.8, -20);
createStaticHeart(280, 110, 1.3, -50);
createStaticHeart(180, 80, 1.1, -45);
createStaticHeart(20, 80, 0.8, -15);
createStaticHeart(150, 120, 1.0, -35);

const romanticStuffs = ['🎈', '💖'];

function spawnRomanticItem() {
    const item = document.createElement('div');
    item.classList.add('floating-stuff', 'animate-float');

    // Random choice of floating element
    const stuff = romanticStuffs[Math.floor(Math.random() * romanticStuffs.length)];
    item.innerText = stuff;

    // Random start position within bottom 100px-200px range
    const startX = Math.random() * 320;
    const startY = 150 + Math.random() * 50;

    item.style.left = `${startX}px`;
    item.style.bottom = `${startY}px`;

    // Slight randomization in size based on what it is
    const baseSize = stuff === '✨' ? 12 : 20;
    item.style.fontSize = `${baseSize + Math.random() * 10}px`;

    const duration = 6 + Math.random() * 5;
    item.style.setProperty('--duration', `${duration}s`);

    const drift = (Math.random() * 2) - 1;
    item.style.setProperty('--dirX', drift);

    floatingHeartsLayer.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, duration * 1000);
}

function spawnFloatingHeart() {
    const item = document.createElement('div');
    item.classList.add('floating-stuff', 'animate-float');

    // randomize content
    item.innerText = romanticStuffs[Math.floor(Math.random() * romanticStuffs.length)];

    // Random start position within bottom 100px-200px range
    const startX = Math.random() * 320;
    const startY = 150 + Math.random() * 50;

    item.style.left = `${startX}px`;
    item.style.bottom = `${startY}px`;
    item.style.fontSize = `${16 + Math.random() * 14}px`; // random size

    const duration = 6 + Math.random() * 5;
    item.style.setProperty('--duration', `${duration}s`);

    const drift = (Math.random() * 2) - 1;
    item.style.setProperty('--dirX', drift);

    floatingHeartsLayer.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, duration * 1000);
}

setInterval(spawnFloatingHeart, 800);

for (let i = 0; i < 6; i++) {
    setTimeout(spawnFloatingHeart, i * 300);
}

// Interaction Logic
const envelope = document.getElementById('tap-envelope');
const quoteContainer = document.querySelector('.quote-container');
const rainingPetalsLayer = document.getElementById('raining-petals-layer');

function spawnPetal() {
    const petal = document.createElement('div');
    petal.classList.add('falling-petal');

    // Spread petals across width
    const startX = Math.random() * 320;
    petal.style.left = `${startX}px`;

    const duration = 4 + Math.random() * 4;
    petal.style.animationDuration = `${duration}s`;

    rainingPetalsLayer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

const quoteLines = [
    "Distance may stop my hands from giving you real flowers, but it will never stop my heart from sending you love.",
    "Please accept this digital bouquet until I can bring you the real ones."
];

function typeWriter(text, element, i, cb) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, element, i + 1, cb), 60); // Speed
    } else if (cb) {
        cb();
    }
}

envelope.addEventListener('click', () => {
    // Hide envelope
    envelope.classList.add('hide');

    // Show container (so quote marks animate in)
    quoteContainer.classList.add('show');

    // Prep typing elements
    const pElements = quoteContainer.querySelectorAll('p:not(.author-name)');
    const authorElement = quoteContainer.querySelector('.author-name');

    pElements.forEach(p => p.innerHTML = '');
    if (authorElement) authorElement.style.opacity = '0';

    // Start raining petals
    setInterval(spawnPetal, 400);
    for (let i = 0; i < 10; i++) {
        setTimeout(spawnPetal, i * 150);
    }

    // Hide greeting
    const greetingText = document.getElementById('greeting-text');
    if (greetingText) {
        greetingText.classList.add('hide');
    }

    // Burst of bottom stuff
    for (let i = 0; i < 15; i++) {
        setTimeout(spawnFloatingHeart, i * 80);
    }

    // Typing effect cursor
    const cursor = document.createElement('span');
    cursor.classList.add('typewriter-cursor');

    setTimeout(() => {
        pElements[0].appendChild(cursor);
        typeWriter(quoteLines[0], pElements[0], 0, () => {
            pElements[0].removeChild(cursor);
            pElements[1].appendChild(cursor);
            typeWriter(quoteLines[1], pElements[1], 0, () => {
                pElements[1].removeChild(cursor);
                if (authorElement) {
                    authorElement.style.opacity = '1';
                    authorElement.style.transition = 'opacity 2s ease';
                }
            });
        });
    }, 1200); // start typing after 1.2s container reveal
}, { once: true });
