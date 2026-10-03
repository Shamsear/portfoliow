/**
 * Clean, lightweight portfolio JS
 * Focuses strictly on smooth scrolling, mobile nav toggle, and email copy.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Hide page loader overlay smoothly
    const hideLoader = () => {
        const loader = document.querySelector('.page-loader');
        if (loader && !loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
            }, 500);
        }
    };

    // Trigger loader removal
    setTimeout(hideLoader, 300);
    window.addEventListener('load', hideLoader);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
});

// Category Filtering for Bento Projects
function filterProjects(category, btnElement) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (category === 'all' || itemCategories.includes(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Modal Drawer Trigger Fallbacks
function openProjectModal(key) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    const specs = {
        'task-copilot': {
            title: 'AI-Native Task & Knowledge Copilot',
            desc: 'Full-stack productivity workspace leveraging Next.js 14 App Router, vector embeddings, and background worker queues for automated document parsing and smart task organization.'
        },
        'api-gateway': {
            title: 'High-Throughput REST Gateway',
            desc: 'Production API gateway featuring token bucket rate-limiting, JWT validation, latency monitoring, and Dockerized microservice orchestration.'
        },
        'analytics-dashboard': {
            title: 'Real-Time Data Analytics Dashboard',
            desc: 'Live telemetry monitoring portal utilizing WebSockets, tabular-num digit transitions, and custom SVG charts built for high data density.'
        },
        'code-reviewer': {
            title: 'Automated Code Review Agent',
            desc: 'CLI tool that plugs into pre-commit hooks to analyze code for potential vulnerabilities, anti-patterns, missing types, and test failures before merging.'
        }
    };

    const data = specs[key] || { title: 'Project Details', desc: 'Detailed specifications and architecture documentation.' };

    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = `<p style="margin-bottom: 1rem;">${data.desc}</p><p style="font-size: 0.85rem; color: var(--accent-gold); font-family: var(--font-mono);">Stack: Next.js, React, TypeScript, Node.js, Python, PostgreSQL</p>`;
        modal.classList.add('active');
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.remove('active');
}

// Quick copy helper
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.innerHTML = `Email copied: ${email}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    });
}