document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       FEATURE 1 — MAP PULSE
    ========================== */

    const mapContainer = document.getElementById('map-container');
    const MAX_POINTS = 8;

    function createPulsePoint() {
        if (!mapContainer) return;

        // Limitar número de pontos
        const currentPoints = mapContainer.querySelectorAll('.pulse-point');
        if (currentPoints.length >= MAX_POINTS) {
            currentPoints[0].remove();
        }

        const point = document.createElement('div');

        // 60% vermelho (mais realista para zonas urbanas)
        const isCrowded = Math.random() > 0.4;
        point.classList.add('pulse-point', isCrowded ? 'red' : 'green');

        // Posição aleatória segura
        const top = 10 + Math.random() * 80;
        const left = 10 + Math.random() * 80;

        point.style.top = `${top}%`;
        point.style.left = `${left}%`;

        mapContainer.appendChild(point);

        setTimeout(() => {
            point.remove();
        }, 4000);
    }

    if (mapContainer) {
        setInterval(createPulsePoint, 1500);
        createPulsePoint();
        createPulsePoint();
    }

    /* =========================
       FEATURE 2 — VOTAÇÃO
    ========================== */

    const voteButtons = document.querySelectorAll('.vote-btn');
    const feedback = document.getElementById('vote-feedback');

    if (voteButtons.length && feedback && mapContainer) {
        voteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {

                // Feedback visual
                voteButtons.forEach(b => b.style.opacity = '0.4');
                e.currentTarget.style.opacity = '1';

                feedback.classList.add('visible');
                feedback.textContent = `Voto registado: ${e.currentTarget.innerText.trim()}`;

                // Atualizar mapa
                const vibe = e.currentTarget.dataset.vibe;
                addInstantPoint(vibe);

                setTimeout(() => {
                    feedback.classList.remove('visible');
                    voteButtons.forEach(b => b.style.opacity = '1');
                }, 2000);
            });
        });
    }

    function addInstantPoint(vibe) {
        if (!mapContainer) return;

        const point = document.createElement('div');

        let colorClass = 'green';
        if (vibe === 'busy' || vibe === 'intense') {
            colorClass = 'red';
        }

        point.classList.add('pulse-point', colorClass);
        point.style.top = '50%';
        point.style.left = '50%';
        point.style.zIndex = '10';

        mapContainer.appendChild(point);
        setTimeout(() => point.remove(), 2000);
    }

    /* =========================
       FEATURE 3 — SOS BAR
    ========================== */

    const sosBar = document.getElementById('sos-bar');
    const sosClose = document.querySelector('.sos-close');

    if (sosBar && sosClose) {
        sosClose.addEventListener('click', () => {
            sosBar.style.display = 'none';
        });
    }

    /* =========================
       FEATURE 4 — SEMÁFORO
       (Mantido comentado)
    ========================== */

    /*
    const lights = document.querySelectorAll('.traffic-light .light');
    const statusText = document.querySelector('.traffic-status strong');

    const states = [
        { idx: 0, text: 'Congestionado' },
        { idx: 1, text: 'Moderado' },
        { idx: 2, text: 'Fluido' }
    ];

    let lightIndex = 2;

    setInterval(() => {
        lights.forEach(l => l.classList.remove('active'));
        lightIndex = (lightIndex + 1) % 3;
        lights[lightIndex].classList.add('active');

        const activeColor = getComputedStyle(lights[lightIndex]).backgroundColor;
        statusText.style.color = activeColor;
        statusText.innerText = states[lightIndex].text;
    }, 5000);
    */

});
