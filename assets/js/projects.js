/**
 * projects.js
 * Single source of truth for case study content.
 * The page markup (tiles + index rows) references these entries by slug.
 * Copy rules: plain language, no invented metrics, no em or en dashes.
 */

export const PROJECTS = {
    stockflow: {
        title: 'StockFlow AI',
        kind: 'Product app',
        role: 'Full-stack build',
        status: 'Live',
        summary: 'A custom warehouse management dashboard for Qatar and UAE logistics, replacing spreadsheet chaos with predictive reorders.',
        context: 'Warehouse teams often track stock across dry storage and cold rooms using manual spreadsheets, only noticing shortages when shelves are empty.',
        built: [
            'Stock depletion forecasting that estimates reorder thresholds per SKU based on consumption velocity.',
            'Multi-warehouse bay tracking with real-time stock sync across phones, tablets and PCs.',
            'Inbound receiving, FEFO expiry date protection, and driver digital proof-of-dispatch slips.'
        ],
        hard: 'Turning warehouse consumption forecasting into clear, actionable reorder points without overwhelming floor operators.',
        outcome: 'Warehouse reorders are planned from live forecasts instead of discovered from empty shelves.',
        stack: ['Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Tailwind CSS'],
        live: 'https://stockflow-aim.vercel.app/',
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/stockflow.webp',
        alt: 'StockFlow warehouse dashboard with live bay stock sync, FEFO expiry alerts, and driver dispatch.'
    },
    ssleague: {
        title: 'SS League',
        kind: 'Product app',
        role: 'Design and full-stack build',
        status: 'Live',
        summary: 'A live auction and team manager for a fantasy football league, where managers bid for players against fixed budgets.',
        context: 'Fantasy league auctions involve live bids, fixed budgets and squad limits. Tracking all of that by hand is slow and easy to get wrong.',
        built: [
            'A bidding flow that updates budgets and squad counts as each player is sold, so constraints are enforced by the app instead of by people.',
            'Player profiles with stats and a season archive, so past auctions and results stay searchable.',
            'A team manager dashboard where each manager can review and adjust their squad.'
        ],
        hard: 'Keeping budget and squad rules enforced during live bidding, so every sale leaves each team in a valid state.',
        outcome: 'Auctions, squads, player stats and season history live in one app.',
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Real-time state'],
        live: 'https://ssleague.vercel.app/',
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/ssleague.webp',
        alt: 'SS Super Soccer League platform showing live standings, tournament rankings, and player management.'
    },
    billing: {
        title: 'EyeNova Billing',
        kind: 'Product app',
        role: 'Full-stack and desktop build',
        status: 'In production (desktop POS)',
        summary: 'A native desktop billing and POS system for optical retail stores, sharing live cloud schemas to keep counter sales and inventory in sync.',
        context: 'Optical retail counters deal with prescription contact lenses, custom spectacle lenses and walk-in purchases. Running sales through disconnected spreadsheets created manual re-entry errors and stock drift.',
        built: [
            'A keyboard-first POS counter screen (F2 scan, F6 pay) with barcode lookup, quick-cash change calculation, and payment terminal capture.',
            'Optical prescription engine supporting dual-eye contact lens powers (OD/OS) and spectacle lens upgrades.',
            'Live Neon PostgreSQL synchronization via Npgsql, sharing models with the web store so in-store sales decrement online stock instantly.',
            'Atomic ACID transactions ensuring orders, invoices and stock decrements commit together in a single transaction.',
            'Bilingual Arabic/English 80mm thermal receipt printing (ESC/POS) and formal A4 tax invoice generation using QuestPDF.',
            'Physical stock audit reconciliation with serialized database locking to prevent count conflicts during open store hours.'
        ],
        hard: 'Handling bilingual Arabic RTL text formatting on standard 80mm ESC/POS thermal printers while maintaining sub-second checkout transactions across multiple counter terminals.',
        outcome: 'Store transactions complete in seconds with zero stock drift between the retail counter and online channels.',
        stack: ['C#', '.NET 10', 'WPF', 'PostgreSQL (Neon)', 'QuestPDF', 'ESC/POS'],
        live: null,
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/billing.webp',
        alt: 'EyeNova Billing desktop POS checkout interface with optical prescription line items, live inventory status, and payment tenders.'
    },
    mizan: {
        title: 'Mizan',
        kind: 'Product app',
        role: 'Product design and full-stack build',
        status: 'Live',
        summary: 'An offline-first finance app that answers one question: how much can I safely spend today?',
        context: 'Most budgeting apps show what you already spent. Mizan works the other way round and starts from upcoming bills and income to show a daily safe-to-spend number.',
        built: [
            'A safe-to-spend calculation that accounts for upcoming bills before showing what is left for today.',
            'Local-first storage in IndexedDB through Dexie, so the app opens and records expenses with no connection.',
            'An installable PWA layout that works the same on phone and desktop, with Clerk handling sign in.'
        ],
        hard: 'Making offline the default rather than a fallback. Every write lands in IndexedDB first and the interface reads from there, so the app never waits on the network.',
        outcome: 'A daily number people can act on, available instantly even with no signal.',
        stack: ['Next.js 16', 'TypeScript', 'Dexie (IndexedDB)', 'Clerk', 'Tailwind CSS'],
        live: 'https://mizan-qa.vercel.app/',
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/mizan.webp',
        alt: 'Mizan mobile budgeting interface showing daily safe-to-spend tracking and expense logging.'
    },
    devai: {
        title: 'DevAI',
        kind: 'Product app',
        role: 'Product design and front-end build',
        status: 'Live marketing site and interactive preview',
        summary: 'The launch site for an AI code generation product, with an interactive preview of the generator in action.',
        context: 'An AI coding product has to show what it does within seconds, to an audience that is hard to impress with claims.',
        built: [
            'An interactive code completion preview that plays out a real generation flow on the page.',
            'A waitlist sign up dialog with inline validation and clear success and error states.',
            'A feature comparison and pricing breakdown laid out for quick scanning.'
        ],
        hard: 'Making the preview feel live and believable on a marketing site, without slowing the page down.',
        outcome: 'Visitors see the product working before they sign up, instead of reading claims about it.',
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        live: 'https://devais.vercel.app/',
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/devai.webp',
        alt: 'DevAI marketing site with headline Build websites 10x faster with DevAI and live developer metrics.'
    },
    projectfund: {
        title: 'ProjectFund Tracker',
        kind: 'Product app',
        role: 'Full-stack build',
        status: 'Live',
        summary: 'A grant and fund manager that tracks funding pools, milestone allocations and spending.',
        context: 'Grant spending is usually reported after the fact from scattered documents.',
        built: [
            'Milestone allocation tracking with automatic status updates.',
            'Budget breakdown charts that can be exported for reporting.',
            'Role-based views for grant managers and applicants.'
        ],
        hard: 'Keeping allocations, spending and milestones consistent in one PostgreSQL schema so every chart reads from the same numbers.',
        outcome: 'Funding status can be read at any time instead of rebuilt for each report.',
        stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Chart.js'],
        live: 'https://projectfund-tracker.vercel.app/',
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/projectfund.webp',
        alt: 'Project Fund Tracker multi-account ledger and petty cash management login portal.'
    },
    distortion: {
        title: 'Distortion Studio',
        kind: 'Experiment',
        role: 'Concept, design and build',
        status: 'Live',
        summary: 'A showcase site for a creative agency built on purpose against the usual rules, with brutalist type and WebGL image distortion.',
        context: 'A study in how far a site can push type and motion before it stops being usable, and where to draw that line.',
        built: [
            'High-contrast brutalist typography on a strict CSS grid.',
            'Custom WebGL shaders that warp project images on hover.',
            'Case study pages for fictional fashion and fintech clients.'
        ],
        hard: 'Pushing type and shader effects hard while keeping every page readable and easy to navigate.',
        outcome: 'A reference piece for loud visual direction that still loads fast and stays navigable.',
        stack: ['Next.js', 'WebGL shaders', 'CSS Grid'],
        live: 'https://distortionstudio.vercel.app/',
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/distortion.webp',
        alt: 'Distortion Studio experimental agency website with terminal interface and matrix glitch aesthetic.'
    },
    oasis: {
        title: 'Oasis Horizon',
        kind: 'Brand site',
        role: 'Design and front-end build',
        status: 'Live',
        summary: 'A luxury real estate site with fast client-side filtering by price and property type.',
        context: 'Premium property buyers expect a calm, image-led site that still lets them narrow down quickly.',
        built: [
            'An image-led gallery for each property.',
            'Instant client-side filters for price range and property type.',
            'A mobile-first layout and enquiry form.'
        ],
        hard: 'Showing large photography while keeping the site fast on mobile.',
        outcome: 'A browsing experience that feels premium and stays quick on mobile.',
        stack: ['React', 'Tailwind CSS', 'Framer Motion'],
        live: 'https://oasisbah.vercel.app/',
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/oasishorizon.webp',
        alt: 'Oasis Horizon real estate home page with a large property photo.'
    },
    atelier: {
        title: 'Atelier Noir',
        kind: 'Brand site',
        role: 'Design and front-end build',
        status: 'Live',
        summary: 'An editorial fashion boutique site with seasonal lookbooks and private appointment booking.',
        context: 'A boutique that sells by appointment needs its site to feel like the store and to book visits.',
        built: [
            'Lookbook pages with sticky product showcases.',
            'Monochrome editorial typography.',
            'A consultation booking form.'
        ],
        hard: 'Letting photography lead while keeping booking one step away on every page.',
        outcome: 'A site that carries the brand and turns visits into appointments.',
        stack: ['React', 'Tailwind CSS'],
        live: 'https://ateliernoir.vercel.app/',
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/atelier.webp',
        alt: 'Atelier Noir fashion boutique home page in black and white.'
    },
    sahara: {
        title: 'Sahara Mart',
        kind: 'Brand site',
        role: 'Front-end build',
        status: 'Live',
        summary: 'A hypermarket storefront with category navigation, a live cart preview and deal banners.',
        context: 'A large catalogue needs simple navigation and a cart that always shows the running total.',
        built: [
            'Category navigation for groceries and electronics.',
            'A cart preview with live totals.',
            'Promotional deal banners and modal flow.'
        ],
        hard: 'Building cart state and totals in plain JavaScript with no framework.',
        outcome: 'A complete storefront flow in a small, dependency-free codebase.',
        stack: ['HTML', 'CSS', 'JavaScript'],
        live: 'https://saharamart.vercel.app/',
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/saharamart.webp',
        alt: 'Sahara Mart storefront with product categories and deal banners.'
    },
    typevelocity: {
        title: 'Type Velocity',
        kind: 'Experiment',
        role: 'Design and build',
        status: 'Live',
        summary: 'A typing speed test with live words per minute, accuracy and instant error highlighting.',
        context: 'A small project to get input handling and real-time feedback exactly right.',
        built: [
            'Live words per minute and accuracy calculation.',
            'Instant highlighting of each typing error.',
            'Selectable test lengths and passages.'
        ],
        hard: 'Updating stats on every keystroke without dropping frames.',
        outcome: 'Feedback that keeps up with fast typists.',
        stack: ['JavaScript', 'Canvas', 'HTML', 'CSS'],
        live: 'https://thetypevelocity.vercel.app/',
        repo: 'https://github.com/Shamsear',
        image: 'assets/images/work/typevelocity.webp',
        alt: 'Type Velocity typing test screen with a passage and live statistics.'
    },
    brainquest: {
        title: 'BrainQuest',
        kind: 'Experiment',
        role: 'Design and build',
        status: 'Live',
        summary: 'A sci-fi quiz game with sound effects, timed rounds and a streak multiplier.',
        context: 'A study in game feel: how sound, timing and motion make a simple quiz rewarding.',
        built: [
            'Timed rounds with instant answer feedback.',
            'Sound effects and smooth question transitions.',
            'A streak multiplier for consecutive correct answers.'
        ],
        hard: 'Syncing sound, animation and scoring so feedback lands at the same moment.',
        outcome: 'A quiz that feels like a game rather than a form.',
        stack: ['JavaScript', 'Tailwind CSS', 'Framer Motion', 'Web Audio'],
        live: 'https://brainquests.vercel.app/',
        repo: 'https://github.com/Shamsear/brainquest',
        image: 'assets/images/work/brainquest.webp',
        alt: 'BrainQuest quiz screen with a question and answer options on a dark sci-fi background.'
    }
};
