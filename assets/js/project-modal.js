/**
 * ProjectModal.js - Comprehensive Project Database & Detail Drawer
 * Holds exact URLs and technical specs for all 10 live projects.
 */

const PROJECT_DATABASE = {
    'mizan': {
        title: 'Mizan (Runway) — Financial PWA',
        category: 'Next.js 16 / Local-First PWA',
        description: 'Mizan acts as a departures board for your money, providing real-time Safe-to-Spend calculations, visual budget pacing, and offline IndexedDB synchronization.',
        liveUrl: 'https://mizan-qa.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Next.js 16', 'Dexie.js (IndexedDB)', 'TypeScript', 'Clerk Auth', 'Tailwind CSS'],
        highlights: [
            'Offline-first architecture with instant IndexedDB persistence.',
            'Visual Safe-to-Spend runway calculation derived from upcoming bills.',
            'Responsive multi-device PWA layout.'
        ]
    },
    'devai': {
        title: 'DevAI — AI Code Generation SaaS',
        category: 'SaaS Platform / AI Integration',
        description: 'Landing page and interactive preview for an AI coding assistant platform, featuring live code generation, terminal previews, and team collaboration.',
        liveUrl: 'https://devais.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Next.js', 'React', 'Tailwind CSS', 'AI Prompting', 'TypeScript'],
        highlights: [
            'Interactive live code completion preview.',
            'Waitlist registration modal with instant verification.',
            'Feature comparison matrix & tier pricing breakdown.'
        ]
    },
    'projectfund': {
        title: 'ProjectFund Tracker — Grant & Fund Manager',
        category: 'Full-Stack Application',
        description: 'Financial management application designed to track project funding pools, allocation milestones, expenditure logs, and grant reporting.',
        liveUrl: 'https://projectfund-tracker.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Chart.js'],
        highlights: [
            'Milestone allocation tracking with automated status updates.',
            'Visual budget breakdown and exportable summary charts.',
            'Role-based dashboard for grant managers and applicants.'
        ]
    },
    'stockflow': {
        title: 'StockFlow AI — Smart Inventory Engine',
        category: 'AI & Inventory Management',
        description: 'An intelligent inventory tracking platform leveraging predictive analytics to forecast reorder thresholds, track SKUs, and eliminate stockouts.',
        liveUrl: 'https://stockflow-aim.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Next.js', 'Node.js', 'Python AI', 'PostgreSQL', 'Tailwind CSS'],
        highlights: [
            'Predictive stock depletion forecasting engine.',
            'Real-time SKU quantity tracking across multiple warehouses.',
            'Automated reorder notifications and supplier log.'
        ]
    },
    'oasis': {
        title: 'Oasis Horizon — Luxury Real Estate Portal',
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
    'distortion': {
        title: 'Distortion Studio — Creative Agency Showcase',
        category: 'Experimental Web Design & WebGL',
        description: 'An anti-pattern design system built for creative agencies, showcasing brutalist typography, kinetic hover effects, and WebGL image distortions.',
        liveUrl: 'https://distortionstudio.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Next.js', 'Brutalism', 'WebGL Shaders', 'CSS Grid'],
        highlights: [
            'High-contrast brutalist typography layout.',
            'Custom image warp shaders and interactive hover effects.',
            'Case study portfolio for digital fashion and fintech.'
        ]
    },
    'atelier': {
        title: 'Atelier Noir — Dubai Fashion Boutique',
        category: 'Luxury E-Commerce & Branding',
        description: 'Avant-garde fashion website presenting seasonal luxury collections, editorial lookbooks, and private appointment scheduling.',
        liveUrl: 'https://ateliernoir.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['React.js', 'Tailwind CSS', 'Luxury UI', 'Ecommerce'],
        highlights: [
            'High-fashion lookbook presentation with sticky showcases.',
            'Minimalist editorial typography and monochrome palette.',
            'Bespoke consultation booking form.'
        ]
    },
    'sahara': {
        title: 'Sahara Mart — E-Commerce Hypermarket',
        category: 'Web Development / E-Commerce',
        description: 'A feature-complete online hypermarket storefront built for scalable product categories, shopping carts, and promotional deal banners.',
        liveUrl: 'https://saharamart.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'E-Commerce UI'],
        highlights: [
            'Dynamic shopping cart preview with real-time price totals.',
            'Category navigation for groceries and electronics.',
            'Custom promotional modal workflow.'
        ]
    },
    'typevelocity': {
        title: 'Type Velocity — Speed Typing Engine',
        category: 'Interactive Web Application',
        description: 'A fast, sleek typing speed application measuring WPM, accuracy percentages, error highlights, and real-time performance graphs.',
        liveUrl: 'https://thetypevelocity.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['JavaScript', 'Canvas', 'HTML5', 'CSS3', 'Metrics Engine'],
        highlights: [
            'Real-time WPM calculation and raw typing statistics.',
            'Instant error highlighting and visual feedback.',
            'Customizable test durations and text passages.'
        ]
    },
    'brainquest': {
        title: 'BrainQuest — Futuristic Sci-Fi Quiz Game',
        category: 'Interactive UI & Gamification',
        description: 'An immersive sci-fi styled quiz game featuring cyberpunk sound effects, micro-interactions, timer challenges, and score tracking.',
        liveUrl: 'https://brainquests.vercel.app/',
        githubUrl: 'https://github.com/Shamsear/brainquest',
        tags: ['Tailwind CSS', 'Framer Motion', 'JavaScript', 'Audio FX'],
        highlights: [
            'Cyberpunk visual aesthetic with glowing glass containers.',
            'Smooth question transitions and instant answer verification.',
            'Gamified streak multiplier system.'
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
