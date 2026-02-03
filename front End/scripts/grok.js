console.log("Grok Page Loaded");
// Starfield animation script
        const canvas = document.getElementById('starfield');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const stars = [];
        const numStars = 200;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.2,
                alpha: Math.random() * 0.5 + 0.2, // Fainter stars
                dx: Math.random() * 0.2 - 0.1,
                dy: Math.random() * 0.2 - 0.1
            });
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
            });
        }

        function updateStars() {
            stars.forEach(star => {
                star.x += star.dx;
                star.y += star.dy;

                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;
            });
        }

        function animate() {
            drawStars();
            updateStars();
            requestAnimationFrame(animate);
        }

        animate();

        // Auto-resizing textarea
        const textarea = document.querySelector('textarea');
        textarea.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        });

(function () {
            const btn = document.getElementById('statusBtn');
            const panel = document.getElementById('dropdown');
            const label = document.getElementById('statusLabel');

            // open/close
            function toggle(open) {
                const isOpen = panel.classList.contains('open');
                if (typeof open === 'boolean') {
                    if (open && !isOpen) { panel.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
                    if (!open && isOpen) { panel.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
                } else {
                    panel.classList.toggle('open');
                    btn.setAttribute('aria-expanded', panel.classList.contains('open'));
                }
            }

            btn.addEventListener('click', (e) => { toggle(); });

            // click an item
            panel.addEventListener('click', (e) => {
                const it = e.target.closest('.menu-item');
                if (!it) return;
                const value = it.dataset.value;
                if (value) {
                    label.textContent = value === 'Grok' ? 'Grok 4.1 Thinking' : value;
                    // mark selected visually
                    panel.querySelectorAll('.menu-item').forEach(i => i.querySelector('.selected-check')?.remove());
                    const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    check.setAttribute('viewBox', '0 0 24 24');
                    check.setAttribute('class', 'selected-check');
                    check.setAttribute('fill', 'none');
                    check.setAttribute('stroke', 'currentColor');
                    check.setAttribute('stroke-width', '2');
                    check.setAttribute('stroke-linecap', 'round');
                    check.setAttribute('stroke-linejoin', 'round');
                    check.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
                    it.appendChild(check);
                }
                toggle(false);
            });

            // close on outside click
            document.addEventListener('click', (e) => {
                if (!panel.contains(e.target) && !btn.contains(e.target)) toggle(false);
            });

            // keyboard accessibility: Escape to close, arrow keys to navigate
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') toggle(false);

                if (panel.classList.contains('open')) {
                    const items = Array.from(panel.querySelectorAll('.menu-item, .menu-footer'));
                    const idx = items.indexOf(document.activeElement);
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const next = items[(idx + 1) % items.length];
                        next.focus();
                    }
                    if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prev = items[(idx - 1 + items.length) % items.length];
                        prev.focus();
                    }
                    if (e.key === 'Enter' && document.activeElement.classList.contains('menu-item')) {
                        document.activeElement.click();
                    }
                }
            });

            // open on focus for keyboard users
            btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(true); panel.querySelector('.menu-item').focus(); } });

        })();