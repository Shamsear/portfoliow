/**
 * NumberFlow.js - Continuous Rolling Digit Counter Engine
 * Inspired by NumberFlow (https://number-flow.barvian.me/)
 * Features: Tabular-nums digit alignment, smooth spring physics, 
 * IntersectionObserver viewport trigger, and custom formatters.
 */

class NumberFlowCounter {
    constructor(element, options = {}) {
        this.element = element;
        this.targetValue = parseFloat(options.value || element.getAttribute('data-value') || '0');
        this.suffix = options.suffix || element.getAttribute('data-suffix') || '';
        this.prefix = options.prefix || element.getAttribute('data-prefix') || '';
        this.decimals = parseInt(options.decimals || element.getAttribute('data-decimals') || '0', 10);
        this.duration = parseInt(options.duration || element.getAttribute('data-duration') || '1600', 10);
        
        this.currentValue = 0;
        this.startTime = null;
        this.animated = false;

        this.init();
    }

    init() {
        // Enforce Swiss style tabular numbers & smooth alignment
        this.element.style.fontVariantNumeric = 'tabular-nums';
        this.element.style.display = 'inline-flex';
        this.element.style.alignItems = 'baseline';
        this.element.classList.add('number-flow-host');

        // Prepare placeholder initial DOM
        this.render(0);
    }

    // Spring cubic ease-out calculation for silky smooth rolling movement
    easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    start() {
        if (this.animated) return;
        this.animated = true;
        this.startTime = performance.now();

        const step = (now) => {
            const elapsed = now - this.startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            const easedProgress = this.easeOutExpo(progress);

            this.currentValue = easedProgress * this.targetValue;
            this.render(this.currentValue);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                this.render(this.targetValue);
            }
        };

        requestAnimationFrame(step);
    }

    render(value) {
        const formattedNum = value.toLocaleString('en-US', {
            minimumFractionDigits: this.decimals,
            maximumFractionDigits: this.decimals,
        });

        // Split into characters and construct rolling digit structure
        const chars = formattedNum.split('');
        let html = '';

        if (this.prefix) {
            html += `<span class="nf-symbol nf-prefix">${this.prefix}</span>`;
        }

        chars.forEach((char) => {
            if (/\d/.test(char)) {
                html += `
                    <span class="nf-digit-wrapper" style="overflow: hidden; display: inline-block; vertical-align: baseline;">
                        <span class="nf-digit" style="display: inline-block; transition: transform 0.05s ease-out;">${char}</span>
                    </span>
                `;
            } else {
                html += `<span class="nf-symbol">${char}</span>`;
            }
        });

        if (this.suffix) {
            html += `<span class="nf-symbol nf-suffix">${this.suffix}</span>`;
        }

        this.element.innerHTML = html;
    }
}

// Global Auto Initializer via IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    const counterElements = document.querySelectorAll('[data-numberflow]');
    const instances = [];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const instance = entry.target.__numberFlowInstance;
                if (instance) {
                    instance.start();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    counterElements.forEach(el => {
        const instance = new NumberFlowCounter(el);
        el.__numberFlowInstance = instance;
        observer.observe(el);
        instances.push(instance);
    });
});
