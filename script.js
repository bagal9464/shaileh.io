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


function typeWriter(text, element, i, cb) {
    const chars = Array.isArray(text) ? text : [...text];
    if (i < chars.length) {
        const cursorNode = element.querySelector('.typewriter-cursor');
        if (cursorNode) {
            element.insertBefore(document.createTextNode(chars[i]), cursorNode);
        } else {
            element.appendChild(document.createTextNode(chars[i]));
        }
        setTimeout(() => typeWriter(chars, element, i + 1, cb), 60);
    } else if (cb) {
        cb();
    }
}

envelope.addEventListener('click', () => {
    envelope.classList.add('hide');
    quoteContainer.classList.add('show');

    const pElements = quoteContainer.querySelectorAll('p:not(.author-name)');
    const authorElement = quoteContainer.querySelector('.author-name');

    const quoteLine1 = pElements.length > 0 ? pElements[0].textContent.trim() : "";
    const quoteLine2 = pElements.length > 1 ? pElements[1].textContent.trim() : "";

    pElements.forEach(p => p.innerHTML = '');
    if (authorElement) authorElement.style.opacity = '0';

    setInterval(spawnPetal, 400);
    for (let i = 0; i < 10; i++) { setTimeout(spawnPetal, i * 150); }

    const greetingText = document.getElementById('greeting-text');
    if (greetingText) greetingText.classList.add('hide');

    for (let i = 0; i < 15; i++) { setTimeout(spawnFloatingHeart, i * 80); }

    setTimeout(() => {
        if (pElements.length > 0) {
            const cursor1 = document.createElement('span');
            cursor1.classList.add('typewriter-cursor');
            pElements[0].appendChild(cursor1);

            typeWriter(quoteLine1, pElements[0], 0, () => {
                if (pElements[0].contains(cursor1)) pElements[0].removeChild(cursor1);

                if (pElements.length > 1) {
                    const cursor2 = document.createElement('span');
                    cursor2.classList.add('typewriter-cursor');
                    pElements[1].appendChild(cursor2);

                    typeWriter(quoteLine2, pElements[1], 0, () => {
                        if (pElements[1].contains(cursor2)) pElements[1].removeChild(cursor2);
                        if (authorElement) {
                            authorElement.style.opacity = '1';
                            authorElement.style.transition = 'opacity 2s ease';
                        }
                    });
                }
            });
        }
    }, 1200);
}, { once: true });
