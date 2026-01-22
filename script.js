document.addEventListener('DOMContentLoaded', () => {

    /* -------- MAP PULSE -------- */
    const mapContainer = document.getElementById('map-container');
    const MAX_POINTS = 8;

    function createPulsePoint() {
        if (!mapContainer) return;

        if (mapContainer.querySelectorAll('.pulse-point').length >= MAX_POINTS) {
            return;
        }

        const point = document.createElement('div');
        const isCrowded = Math.random() > 0.4;

        point.classList.add(
            'pulse-point',
            isCrowded ? 'red' : 'green'
        );

        point.style.top = `${10 + Math.random() * 80}%`;
        point.style.left = `${10 + Math.random() * 80}%`;

        mapContainer.appendChild(point);

        setTimeout(() => point.remove(), 4000);
    }

    setInterval(createPulsePoint, 1500);
    createPulsePoint();
    createPulsePoint();

    /* -------- VOTING -------- */
    const voteButtons = document.querySelectorAll('.vote-btn');
    const feedback = document.getElementById('vote-feedback');

    voteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            voteButtons.forEach(b => b.style.opacity = '0.5');
            btn.style.opacity = '1';

            feedback.classList.add('visible');
            feedback.textContent = `Voto registado: ${btn.innerText.trim()}`;

            addInstantPoint(btn.dataset.vibe);

            setTimeout(() => {
                feedback.classList.remove('visible');
                voteButtons.forEach(b => b.style.opacity = '1');
            }, 2000);
        });
    });

    function addInstantPoint(vibe) {
        if (!mapContainer) return;

        const point = document.createElement('div');
        const color = (vibe === 'calm') ? 'green' : 'red';

        point.classList.add('pulse-point', color);
        point.style.top = '50%';
        point.style.left = '50%';
        point.style.zIndex = '5';

        mapContainer.appendChild(point);
        setTimeout(() => point.remove(), 2000);
    }

    /* -------- SOS BAR -------- */
    const sosClose = document.querySelector('.sos-close');
    const sosBar = document.getElementById('sos-bar');

    if (sosClose && sosBar) {
        sosClose.addEventListener('click', () => {
            sosBar.style.display = 'none';
        });
    }

});
