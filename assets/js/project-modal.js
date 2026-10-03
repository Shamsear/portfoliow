/**
 * ProjectModal.js - High-End Project Detail Drawer & Quick Actions
 * Empowers recruiters and clients to inspect live projects, source code, 
 * architecture details, and quickly contact Shamsear.
 */

const PROJECT_DATABASE = {
    'mizan': {
        title: 'Mizan (Runway) — Expense Tracker & Financial PWA',
        category: 'Next.js 16 / Local-First PWA',
        image: 'assets/images/mizan.jpg',
        description: 'Mizan (Runway) acts as a "departures board for your money", providing real-time Safe-to-Spend calculations, visual budget pacing, and offline IndexedDB synchronization.',
        liveUrl: 'https://mizan-qa.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Next.js 16', 'Dexie.js (IndexedDB)', 'Serwist PWA', 'TypeScript', 'Clerk Auth', 'Tailwind CSS'],
        highlights: [
            'Offline-first architecture with instant IndexedDB persistence and background sync.',
            'Visual Safe-to-Spend runway calculation derived from upcoming bills and disposable income.',
            'Responsive multi-device layout built for mobile PWA and desktop viewports.',
            'Bank-grade authentication with Clerk and encrypted local client data.'
        ]
    },
    'oasishorizon': {
        title: 'Oasis Horizon — Luxury Real Estate Platform',
        category: 'Frontend Development / React.js',
        image: 'assets/images/oasishorizon.png',
        description: 'A high-end real estate portal designed for premium properties in Bahrain featuring smooth filtering, dynamic property cards, and responsive contact forms.',
        liveUrl: 'https://oasisbah.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'REST API Integration'],
        highlights: [
            'Immersive gallery showcasing luxury architectural properties.',
            'Optimized client-side filtering for price range, location, and property type.',
            'Mobile-first responsive layout with fast load speeds and smooth animation transitions.'
        ]
    },
    'saharamart': {
        title: 'Sahara Mart — E-Commerce Hypermarket Platform',
        category: 'Web Development / E-Commerce',
        image: 'assets/images/saharamart.png',
        description: 'A feature-complete online hypermarket storefront built for scalable product categories, shopping carts, and promotional deal banners.',
        liveUrl: 'https://saharamart.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'E-Commerce UI'],
        highlights: [
            'Dynamic shopping cart preview with real-time total price calculation.',
            'Category navigation for groceries, electronics, and daily essentials.',
            'Custom promotional modal and newsletter subscription workflow.'
        ]
    },
    'ssleague': {
        title: 'SS League — Live Football Auction & Team Manager',
        category: 'Full-Stack Next.js Application',
        image: 'assets/images/ssleague.png',
        description: 'An interactive fantasy football auction platform enabling strategic player bidding, budget tracking, real-time stats, and season archives.',
        liveUrl: 'https://ssleague.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Next.js', 'Tailwind CSS', 'Real-Time State', 'TypeScript'],
        highlights: [
            'Live bidding engine with real-time budget depletion and squad constraints.',
            'Detailed player stats cards and historical performance archives.',
            'Team manager dashboard for strategic squad customization.'
        ]
    },
    'brainquest': {
        title: 'BrainQuest — Futuristic Sci-Fi Quiz Platform',
        category: 'Interactive UI & Motion Design',
        image: 'assets/images/brainquest.png',
        description: 'An immersive sci-fi styled quiz game featuring futuristic sound effects, micro-interactions, timer challenges, and global leaderboard tracking.',
        liveUrl: 'http://brainquests.vercel.app/',
        githubUrl: 'https://github.com/Shamsear/brainquest',
        tags: ['Tailwind CSS', 'Framer Motion', 'JavaScript', 'Audio FX'],
        highlights: [
            'Cyberpunk visual aesthetic with glowing glassmorphism containers.',
            'Smooth question transitions and instant answer verification feedback.',
            'Gamified streak multiplier system and post-quiz analytics summary.'
        ]
    },
    'distortion': {
        title: 'Distortion Studio — Creative Agency Showcase',
        category: 'Experimental Web Design & WebGL',
        image: 'assets/images/distortion.png',
        description: 'An anti-pattern design system built for creative agencies, showcasing brutalist typography, kinetic hover effects, and WebGL image distortions.',
        liveUrl: 'https://distortionstudio.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Next.js', 'Brutalism', 'WebGL', 'CSS Grid'],
        highlights: [
            'High-contrast brutalist layout rooted in modernist kinetic design.',
            'Custom image warp shaders and interactive cursor trails.',
            'Case study portfolio for fashion, fintech, and digital culture.'
        ]
    },
    'atelier': {
        title: 'Atelier Noir — Dubai Fashion Boutique',
        category: 'Luxury E-Commerce & Branding',
        image: 'assets/images/atelier.png',
        description: 'Avant-garde modest fashion website presenting seasonal luxury collections, editorial lookbooks, and private appointment scheduling.',
        liveUrl: 'https://ateliernoir.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['React.js', 'Tailwind CSS', 'Luxury UI'],
        highlights: [
            'High-fashion lookbook presentation with sticky product showcases.',
            'Minimalist editorial typography and monochrome color balance.',
            'Bespoke consultation booking form.'
        ]
    },
    'devai': {
        title: 'DevAI — AI Code Generation SaaS Platform',
        category: 'SaaS Platform / AI Integration',
        image: 'assets/images/devai.png',
        description: 'Landing page and dashboard for an AI coding assistant platform, featuring real-time code snippet generation, terminal previews, and team collaboration.',
        liveUrl: 'https://devais.vercel.app/',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Next.js', 'React', 'SaaS Design', 'Tailwind CSS'],
        highlights: [
            'Interactive live demo showcasing multi-language code completion.',
            'Waitlist registration modal with instant confirmation feedback.',
            'Feature comparison matrix and pricing tier breakdown.'
        ]
    },
    'helpdesk': {
        title: 'Enterprise Help Desk & SLA Ticketing Dashboard',
        category: 'IT Support & Systems Management',
        image: 'assets/images/helpdesk_dashboard.jpg',
        description: 'A professional IT support dashboard designed to handle end-user tickets, priority escalation, technician assignments, and SLA resolution compliance.',
        liveUrl: '#',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['IT Support', 'SLA Timers', 'Ticket Workflow', 'Active Directory'],
        highlights: [
            'Ticket queue management with SLA countdown alerts.',
            'Categorized priority queues (Critical, High, Medium, Low).',
            'Analytical resolution metrics and end-user notification logs.'
        ]
    },
    'networkmonitor': {
        title: 'LAN & IT Asset Monitoring System',
        category: 'IT Infrastructure & Networking',
        image: 'assets/images/network_monitor.jpg',
        description: 'A comprehensive infrastructure monitor that tracks connected network devices, bandwidth usage, IP allocation, and server health status.',
        liveUrl: '#',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Networking', 'LAN/WAN', 'Asset Tracking', 'IP Management'],
        highlights: [
            'Live device status indicators (Online, Offline, High Latency).',
            'Exportable CSV inventory reports for IT audits.',
            'Automated alerts for unreachable gateways or servers.'
        ]
    },
    'aijobtrends': {
        title: 'AI Job Market Trends Power BI Analytics',
        category: 'Data Analytics & Power BI',
        image: 'assets/images/ai_job_trends.svg',
        description: 'An in-depth data analytics project exploring global AI hiring trends, salary benchmarks, skill demand distributions, and industry adoption.',
        liveUrl: 'assets/extras/AI Job Trends.pbix',
        githubUrl: 'https://github.com/Shamsear',
        tags: ['Power BI', 'DAX', 'Data Modeling', 'Market Intelligence'],
        highlights: [
            '4+ interactive report pages with drill-through slice filters.',
            'DAX metrics calculating salary averages and year-over-year job growth.',
            'Visual storytelling formatted for executive presentation.'
        ]
    }
};

class ProjectModalController {
    constructor() {
        this.createModalContainer();
        this.attachCardListeners();
    }

    createModalContainer() {
        if (document.getElementById('projectDetailModal')) return;

        const modalHtml = `
            <div id="projectDetailModal" class="project-modal-backdrop" aria-hidden="true">
                <div class="project-modal-content">
                    <button id="closeProjectModalBtn" class="project-modal-close">&times;</button>
                    
                    <div class="project-modal-grid">
                        <div class="project-modal-media">
                            <img id="pmImage" src="" alt="Project Preview">
                            <div class="project-modal-badge" id="pmCategory"></div>
                        </div>

                        <div class="project-modal-details">
                            <h3 id="pmTitle" class="text-2xl font-bold text-stone-50 mb-3"></h3>
                            <p id="pmDescription" class="text-stone-300 text-sm leading-relaxed mb-4"></p>

                            <div class="mb-5">
                                <h4 class="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">Key Highlights</h4>
                                <ul id="pmHighlights" class="space-y-1.5 text-xs text-stone-300"></ul>
                            </div>

                            <div class="mb-6">
                                <h4 class="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">Technologies Used</h4>
                                <div id="pmTags" class="flex flex-wrap gap-2"></div>
                            </div>

                            <div class="flex flex-wrap gap-3 pt-4 border-t border-stone-800">
                                <a id="pmLiveBtn" href="#" target="_blank" class="px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-sm transition-all duration-200 flex items-center gap-2">
                                    <i class="fas fa-external-link-alt"></i> Live Demo / Report
                                </a>
                                <a id="pmGithubBtn" href="#" target="_blank" class="px-5 py-2.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-sm border border-stone-700 transition-all duration-200 flex items-center gap-2">
                                    <i class="fab fa-github"></i> Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        this.modal = document.getElementById('projectDetailModal');
        this.closeBtn = document.getElementById('closeProjectModalBtn');

        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    attachCardListeners() {
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
            // Find key identifier from title or image
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // If user clicked directly on live/github links inside card, don't open modal
                if (e.target.closest('a')) return;

                const cardTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
                let key = 'oasishorizon';

                if (cardTitle.includes('mizan')) key = 'mizan';
                else if (cardTitle.includes('oasis')) key = 'oasishorizon';
                else if (cardTitle.includes('sahara')) key = 'saharamart';
                else if (cardTitle.includes('ss league')) key = 'ssleague';
                else if (cardTitle.includes('brainquest')) key = 'brainquest';
                else if (cardTitle.includes('distortion')) key = 'distortion';
                else if (cardTitle.includes('atelier')) key = 'atelier';
                else if (cardTitle.includes('devai')) key = 'devai';
                else if (cardTitle.includes('help desk')) key = 'helpdesk';
                else if (cardTitle.includes('network')) key = 'networkmonitor';
                else if (cardTitle.includes('ai job')) key = 'aijobtrends';

                this.open(key);
            });
        });
    }

    open(key) {
        const data = PROJECT_DATABASE[key] || PROJECT_DATABASE['oasishorizon'];

        document.getElementById('pmImage').src = data.image;
        document.getElementById('pmTitle').textContent = data.title;
        document.getElementById('pmCategory').textContent = data.category;
        document.getElementById('pmDescription').textContent = data.description;

        const highlightsEl = document.getElementById('pmHighlights');
        highlightsEl.innerHTML = data.highlights.map(h => `<li class="flex items-start gap-2"><i class="fas fa-check text-amber-500 text-xs mt-0.5"></i> <span>${h}</span></li>`).join('');

        const tagsEl = document.getElementById('pmTags');
        tagsEl.innerHTML = data.tags.map(t => `<span class="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono">${t}</span>`).join('');

        const liveBtn = document.getElementById('pmLiveBtn');
        const githubBtn = document.getElementById('pmGithubBtn');

        if (data.liveUrl && data.liveUrl !== '#') {
            liveBtn.href = data.liveUrl;
            liveBtn.style.display = 'inline-flex';
        } else {
            liveBtn.style.display = 'none';
        }

        if (data.githubUrl) {
            githubBtn.href = data.githubUrl;
            githubBtn.style.display = 'inline-flex';
        }

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (!this.modal) return;
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Quick Copy Email / Phone Utility
function copyContactDetail(text, label) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.createElement('div');
        toast.className = 'quick-copy-toast';
        toast.innerHTML = `<i class="fas fa-check-circle text-amber-500"></i> ${label} copied to clipboard!`;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 2500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectModalController();
});
