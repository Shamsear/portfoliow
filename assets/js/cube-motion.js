/**
 * CubeMotion.js - 3D Interactive Motion & Perspective Engine
 * Inspired by Cube Motion (https://www.cube-motion.dev/)
 * Includes 3D Interactive Tech Cube & Card Perspective Physics
 */

class TechCubeMotion {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.rotX = -20;
        this.rotY = 30;
        this.targetRotX = -20;
        this.targetRotY = 30;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.autoSpinSpeed = 0.3;

        this.init();
    }

    init() {
        this.container.classList.add('cube-motion-stage');
        this.container.innerHTML = `
            <div class="cube-motion-viewport">
                <div class="cube-motion-box" id="techCubeBox">
                    <div class="cube-face front">
                        <i class="fab fa-react" style="color: #38bdf8;"></i>
                        <span>React / Next.js</span>
                    </div>
                    <div class="cube-face back">
                        <i class="fab fa-js-square" style="color: #f59e0b;"></i>
                        <span>TypeScript</span>
                    </div>
                    <div class="cube-face right">
                        <i class="fab fa-node-js" style="color: #10b981;"></i>
                        <span>Node.js</span>
                    </div>
                    <div class="cube-face left">
                        <i class="fab fa-python" style="color: #38bdf8;"></i>
                        <span>Python</span>
                    </div>
                    <div class="cube-face top">
                        <i class="fas fa-database" style="color: #f59e0b;"></i>
                        <span>PostgreSQL</span>
                    </div>
                    <div class="cube-face bottom">
                        <i class="fas fa-brain" style="color: #a855f7;"></i>
                        <span>AI Workflows</span>
                    </div>
                </div>
            </div>
            <div class="cube-motion-shadow"></div>
        `;

        this.box = document.getElementById('techCubeBox');

        // Drag & Mouse Listeners
        const onStart = (e) => {
            this.isDragging = true;
            this.startX = e.clientX || (e.touches && e.touches[0].clientX);
            this.startY = e.clientY || (e.touches && e.touches[0].clientY);
            this.container.style.cursor = 'grabbing';
        };

        const onMove = (e) => {
            if (!this.isDragging) return;
            const x = e.clientX || (e.touches && e.touches[0].clientX);
            const y = e.clientY || (e.touches && e.touches[0].clientY);

            const deltaX = x - this.startX;
            const deltaY = y - this.startY;

            this.targetRotY += deltaX * 0.5;
            this.targetRotX -= deltaY * 0.5;

            this.startX = x;
            this.startY = y;
        };

        const onEnd = () => {
            this.isDragging = false;
            this.container.style.cursor = 'grab';
        };

        this.container.addEventListener('mousedown', onStart);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);

        this.container.addEventListener('touchstart', onStart, { passive: true });
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);

        this.animate();
    }

    animate() {
        if (!this.isDragging) {
            this.targetRotY += this.autoSpinSpeed;
        }

        // Smooth spring lerp physics
        this.rotX += (this.targetRotX - this.rotX) * 0.08;
        this.rotY += (this.targetRotY - this.rotY) * 0.08;

        if (this.box) {
            this.box.style.transform = `rotateX(${this.rotX}deg) rotateY(${this.rotY}deg)`;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Card Perspective Tilt Physics
class CardPerspectiveTilt {
    static initAll(selector = '.project-card, .skill-card, .education-card') {
        const cards = document.querySelectorAll(selector);

        cards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';
            card.style.perspective = '1000px';

            // Add glare layer
            let glare = card.querySelector('.cube-glare');
            if (!glare) {
                glare = document.createElement('div');
                glare.className = 'cube-glare';
                card.appendChild(glare);
            }

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                
                // Position glare spotlight
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(245, 158, 11, 0.15) 0%, transparent 60%)`;
                glare.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                if (glare) glare.style.opacity = '0';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D Tech Cube
    new TechCubeMotion('heroTechCubeContainer');

    // Initialize 3D Tilt on Cards
    CardPerspectiveTilt.initAll();
});
