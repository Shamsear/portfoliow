/**
 * ProjectModal.js - High-End Minimalist Project Detail Drawer
 */

const PROJECT_DATABASE = {
    'mizan': {
        title: 'Mizan (Runway) — Expense Tracker PWA',
        category: 'Next.js 16 / Local-First PWA',
        description: 'Mizan acts as a "departures board for your money", providing real-time Safe-to-Spend calculations, visual budget pacing, and offline IndexedDB synchronization.',
        liveUrl: 'https://mizan-qa.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Next.js 16', 'Dexie.js (IndexedDB)', 'TypeScript', 'Clerk Auth', 'Tailwind CSS'],
        highlights: [
            'Offline-first architecture with instant IndexedDB persistence.',
            'Visual Safe-to-Spend runway calculation derived from upcoming bills.',
            'Responsive multi-device layout built for mobile PWA and desktop.'
        ]
    },
    'oasis': {
        title: 'Oasis Horizon — Luxury Real Estate Platform',
        category: 'Frontend Development / React.js',
        description: 'A high-end real estate portal designed for premium properties featuring smooth filtering, dynamic property cards, and responsive contact forms.',
        liveUrl: 'https://oasisbah.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'REST API'],
        highlights: [
            'Immersive gallery showcasing luxury architectural properties.',
            'Optimized client-side filtering for price range and property type.',
            'Mobile-first responsive layout with fast load speeds.'
        ]
    },
    'task-copilot': {
        title: 'AI-Native Knowledge Copilot',
        category: 'Full-Stack Next.js Application',
        description: 'Full-stack workspace productivity system with dynamic markdown rendering, vector embeddings for similarity search, and automated background job queues.',
        liveUrl: '#',
        githubUrl: 'https://github.com/Shamsear/portfoliow',
        tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
        highlights: [
            'Vector embeddings search over workspace documents.',
            'Background task queue processing for asynchronous jobs.',
            'Clean markdown editor with instant preview.'
        ]
    },
    'api-gateway': {
        title: 'High-Throughput REST Gateway',
        category: 'Backend Architecture',
        description: 'Microservice API gateway with rate-limiting, JWT authentication, and structured error logging handling 10,000+ requests/min.',
        liveUrl: '#',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Node.js', 'Express', 'Redis', 'Docker', 'JWT'],
        highlights: [
            'Token bucket rate-limiting middleware.',
            'JWT authentication and payload validation.',
            'Dockerized microservice deployment config.'
        ]
    }
};

function openProjectModal(key) {
    const data = PROJECT_DATABASE[key] || PROJECT_DATABASE['mizan'];
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalTitle || !modalBody) return;

    modalTitle.textContent = data.title;
    
    const tagsHtml = data.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
    const highlightsHtml = data.highlights.map(h => `<li style="margin-bottom: 0.35rem;"><i class="fas fa-check" style="color: var(--accent-gold); margin-right: 0.5rem;"></i>${h}</li>`).join('');
    const liveLinkHtml = data.liveUrl && data.liveUrl !== '#' ? `<a href="${data.liveUrl}" target="_blank" class="btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.78rem;">Live Demo <i class="fas fa-external-link-alt"></i></a>` : '';
    const githubLinkHtml = data.githubUrl ? `<a href="${data.githubUrl}" target="_blank" class="btn-secondary" style="padding: 0.35rem 0.85rem; font-size: 0.78rem;"><i class="fab fa-github"></i> Source Code</a>` : '';

    modalBody.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--accent-gold); font-family: var(--font-mono); margin-bottom: 0.5rem; text-transform: uppercase;">${data.category}</div>
        <p style="margin-bottom: 1.25rem;">${data.description}</p>
        
        <div style="margin-bottom: 1.25rem;">
            <h4 style="font-size: 0.8rem; text-transform: uppercase; font-family: var(--font-mono); color: var(--text-primary); margin-bottom: 0.5rem;">Key Highlights</h4>
            <ul style="list-style: none; font-size: 0.88rem; color: var(--text-secondary);">${highlightsHtml}</ul>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.8rem; text-transform: uppercase; font-family: var(--font-mono); color: var(--text-primary); margin-bottom: 0.5rem;">Technologies</h4>
            <div>${tagsHtml}</div>
        </div>

        <div style="display: flex; gap: 0.75rem; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
            ${liveLinkHtml}
            ${githubLinkHtml}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeProjectModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeProjectModal();
        });
    }
});
