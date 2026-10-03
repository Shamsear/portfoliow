/**
 * app.js
 * All page behaviour, loaded as an ES module (deferred by default).
 * No scroll listeners: state is driven by IntersectionObserver.
 */
import { PROJECTS } from './projects.js';

const EMAIL = 'shamsear@gmail.com';
const EMAILJS = {
    src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js',
    publicKey: 'Nb8ThHEgrWHlteSAX',
    serviceId: 'service_g24wt76',
    templateId: 'template_jsm32hb'
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.documentElement.classList.add('js');

/* --------------------------------------------------------------------------
   Tiny DOM builder (textContent only, no HTML injection)
   -------------------------------------------------------------------------- */
function h(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
        if (value === null || value === undefined || value === false) continue;
        if (key === 'class') node.className = value;
        else if (key === 'text') node.textContent = value;
        else node.setAttribute(key, value === true ? '' : value);
    }
    for (const child of children.flat()) {
        if (child === null || child === undefined || child === false) continue;
        node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return node;
}

function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', `#i-${name}`);
    svg.append(use);
    return svg;
}

/* --------------------------------------------------------------------------
   Toast
   -------------------------------------------------------------------------- */
const toast = (() => {
    const el = $('#toast');
    const text = $('#toast-text');
    let timer;
    return (message) => {
        if (!el || !text) return;
        text.textContent = message;
        el.classList.add('is-visible');
        clearTimeout(timer);
        timer = setTimeout(() => el.classList.remove('is-visible'), 2400);
    };
})();

/* --------------------------------------------------------------------------
   Header: border on scroll (sentinel) + mobile menu
   -------------------------------------------------------------------------- */
function initHeader() {
    const header = $('.site-header');
    const sentinel = $('#top-sentinel');
    if (header && sentinel) {
        new IntersectionObserver(([entry]) => {
            header.classList.toggle('is-scrolled', !entry.isIntersecting);
        }).observe(sentinel);
    }

    const toggle = $('.nav__toggle');
    const menu = $('#nav-menu');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        menu.classList.toggle('is-open', open);
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            toggle.focus();
        }
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}

/* --------------------------------------------------------------------------
   Scroll spy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const links = $$('.nav__link[href^="#"]');
    const map = new Map();
    links.forEach((link) => {
        const section = document.getElementById(link.getAttribute('href').slice(1));
        if (section) map.set(section, link);
    });
    if (!map.size) return;

    const visible = new Set();
    const update = () => {
        let current = null;
        for (const section of map.keys()) if (visible.has(section)) { current = section; break; }
        links.forEach((l) => l.removeAttribute('aria-current'));
        if (current) map.get(current).setAttribute('aria-current', 'true');
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)));
        update();
    }, { rootMargin: '-35% 0px -55% 0px' });

    map.forEach((_, section) => io.observe(section));
}

/* --------------------------------------------------------------------------
   Reveal on scroll
   -------------------------------------------------------------------------- */
function initReveal() {
    const items = $$('[data-reveal]');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-in'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   Image fallback (fortify: error state)
   -------------------------------------------------------------------------- */
function attachImageFallback(img) {
    const fail = () => {
        const frame = img.closest('.tile__media');
        if (!frame || frame.querySelector('.media-fallback')) return;
        img.remove();
        frame.append(h('div', { class: 'media-fallback mono', text: 'Preview unavailable' }));
    };
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fail();
    else img.addEventListener('error', fail, { once: true });
}

/* --------------------------------------------------------------------------
   Index filters
   -------------------------------------------------------------------------- */
function initFilters() {
    const buttons = $$('.filter');
    const rows = $$('.index__row');
    const empty = $('#index-empty');
    const live = $('#index-live');
    if (!buttons.length || !rows.length) return;

    buttons.forEach((btn) => {
        const value = btn.dataset.filter;
        const count = value === 'all' ? rows.length : rows.filter((r) => r.dataset.kind === value).length;
        const badge = btn.querySelector('.filter__count');
        if (badge) badge.textContent = String(count);
    });

    const apply = (value) => {
        let shown = 0;
        rows.forEach((row) => {
            const match = value === 'all' || row.dataset.kind === value;
            row.hidden = !match;
            if (match) shown += 1;
        });
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === value)));
        if (empty) empty.hidden = shown !== 0;
        if (live) live.textContent = `${shown} ${shown === 1 ? 'project' : 'projects'} shown`;
    };

    buttons.forEach((btn) => btn.addEventListener('click', () => apply(btn.dataset.filter)));
    $('#index-reset')?.addEventListener('click', () => apply('all'));
}

/* --------------------------------------------------------------------------
   Case study dialog with hash routing (#work/slug)
   -------------------------------------------------------------------------- */
function initCaseStudies() {
    const dialog = $('#case');
    const body = $('#case-body');
    const label = $('#case-label');
    if (!dialog || !body || typeof dialog.showModal !== 'function') return;

    let opener = null;
    let pushedHash = false;
    const HASH_RE = /^#work\/([a-z0-9-]+)$/;

    const render = (slug, p) => {
        label.textContent = `${p.kind} · ${p.title}`;

        const media = p.image
            ? h('div', { class: 'case__media' },
                h('div', { class: 'tile__media' },
                    h('img', {
                        src: p.image,
                        alt: p.alt || `${p.title} screenshot`,
                        width: 1600,
                        height: 1000,
                        decoding: 'async',
                        class: p.contain ? 'is-contain' : null
                    })))
            : null;

        const facts = h('dl', { class: 'case__facts' },
            h('div', {}, h('dt', { class: 'mono', text: 'Role' }), h('dd', { text: p.role })),
            h('div', {}, h('dt', { class: 'mono', text: 'Status' }), h('dd', { text: p.status }))
        );

        const block = (title, ...content) =>
            h('section', { class: 'case__block' }, h('h3', { class: 'case__h mono', text: title }), ...content);

        const actions = h('div', { class: 'case__actions' },
            p.live
                ? h('a', { class: 'btn btn--primary', href: p.live, target: '_blank', rel: 'noopener' },
                    'Open live site', icon('arrow-up-right'), h('span', { class: 'visually-hidden', text: '(opens in a new tab)' }))
                : h('span', { class: 'case__note', text: 'No public demo for this project.' }),
            p.repo
                ? h('a', { class: 'btn btn--ghost', href: p.repo, target: '_blank', rel: 'noopener' },
                    icon('github'), p.repo.endsWith('/Shamsear') ? 'GitHub profile' : 'View source',
                    h('span', { class: 'visually-hidden', text: '(opens in a new tab)' }))
                : null
        );

        const content = h('div', { class: 'case__content' },
            h('h2', { class: 'case__title', id: 'case-title', text: p.title }),
            h('p', { class: 'case__summary', text: p.summary }),
            facts,
            block('Context', h('p', { text: p.context })),
            block('What I built', h('ul', { class: 'case__list' }, p.built.map((b) => h('li', { text: b })))),
            block('The hard part', h('p', { text: p.hard })),
            block('Result', h('p', { text: p.outcome })),
            block('Stack', h('ul', { class: 'case__stack' }, p.stack.map((s) => h('li', { class: 'chip mono', text: s })))),
            actions
        );

        body.replaceChildren(h('div', { class: 'case__layout', style: media ? null : 'grid-template-columns: minmax(0, 1fr)' }, media, content));
        const img = body.querySelector('img');
        if (img) attachImageFallback(img);
        body.scrollTop = 0;
    };

    const open = (slug, { fromHash = false } = {}) => {
        const project = PROJECTS[slug];
        if (!project) {
            if (fromHash) {
                history.replaceState(null, '', location.pathname + location.search + '#work');
                toast('That project link is out of date. Showing all work.');
            }
            return;
        }
        render(slug, project);
        if (!dialog.open) {
            dialog.classList.remove('is-closing');
            dialog.showModal();
            document.body.classList.add('is-locked');
        }
        $('.case__close', dialog)?.focus();
        const hash = `#work/${slug}`;
        if (!fromHash && location.hash !== hash) {
            history.pushState({ case: slug }, '', hash);
            pushedHash = true;
        }
    };

    const finishClose = () => {
        dialog.classList.remove('is-closing');
        if (dialog.open) dialog.close();
        document.body.classList.remove('is-locked');
        if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
        opener = null;
    };

    const close = ({ fromHistory = false } = {}) => {
        if (!dialog.open || dialog.classList.contains('is-closing')) return;
        if (!fromHistory && HASH_RE.test(location.hash)) {
            if (pushedHash) history.back();
            else history.replaceState(null, '', location.pathname + location.search);
        }
        pushedHash = false;
        if (reducedMotion.matches) return finishClose();
        dialog.classList.add('is-closing');
        dialog.addEventListener('animationend', finishClose, { once: true });
        setTimeout(() => { if (dialog.classList.contains('is-closing')) finishClose(); }, 260);
    };

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-case]');
        if (!trigger) return;
        e.preventDefault();
        opener = trigger;
        open(trigger.dataset.case);
    });

    // Prefetch case study images on intent (hover / focus)
    const prefetched = new Set();
    const prefetch = (e) => {
        const trigger = e.target.closest?.('[data-case]');
        const p = trigger && PROJECTS[trigger.dataset.case];
        if (!p?.image || prefetched.has(p.image)) return;
        prefetched.add(p.image);
        const img = new Image();
        img.decoding = 'async';
        img.src = p.image;
    };
    document.addEventListener('pointerover', prefetch, { passive: true });
    document.addEventListener('focusin', prefetch);

    $('.case__close', dialog)?.addEventListener('click', () => close());
    dialog.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
    dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });

    const syncFromHash = () => {
        const match = location.hash.match(HASH_RE);
        if (match) open(match[1], { fromHash: true });
        else close({ fromHistory: true });
    };
    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);
    if (HASH_RE.test(location.hash)) syncFromHash();
}

/* --------------------------------------------------------------------------
   Copy email
   -------------------------------------------------------------------------- */
function initCopyEmail() {
    $$('[data-copy-email]').forEach((btn) => {
        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(EMAIL);
                toast('Email copied to clipboard');
            } catch {
                const addr = $('.email-line__addr');
                if (addr) {
                    const range = document.createRange();
                    range.selectNodeContents(addr);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                toast('Press Ctrl+C or Cmd+C to copy the email');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Contact form (EmailJS loaded on first interaction)
   -------------------------------------------------------------------------- */
let emailjsPromise = null;
function loadEmailJS() {
    if (window.emailjs) return Promise.resolve(window.emailjs);
    if (emailjsPromise) return emailjsPromise;
    emailjsPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = EMAILJS.src;
        s.async = true;
        s.onload = () => {
            try {
                window.emailjs.init({ publicKey: EMAILJS.publicKey });
                resolve(window.emailjs);
            } catch (err) { reject(err); }
        };
        s.onerror = () => { emailjsPromise = null; reject(new Error('EmailJS failed to load')); };
        document.head.append(s);
    });
    return emailjsPromise;
}

function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const status = $('#form-status');
    const submit = $('button[type="submit"]', form);
    const submitLabel = $('.btn__label', submit);
    const fields = {
        name: $('#cf-name', form),
        email: $('#cf-email', form),
        message: $('#cf-message', form)
    };

    form.setAttribute('novalidate', '');
    form.addEventListener('focusin', () => loadEmailJS().catch(() => {}), { once: true });

    const rules = {
        name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
        email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address, like name@company.com.'),
        message: (v) => (v.trim().length >= 10 ? '' : 'Please write a short message, at least 10 characters.')
    };

    const setError = (key, msg) => {
        const input = fields[key];
        const err = $(`#${input.id}-error`);
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (err) err.textContent = msg;
    };

    Object.keys(fields).forEach((key) => {
        fields[key].addEventListener('blur', () => { if (fields[key].value) setError(key, rules[key](fields[key].value)); });
        fields[key].addEventListener('input', () => {
            if (fields[key].getAttribute('aria-invalid') === 'true') setError(key, rules[key](fields[key].value));
        });
    });

    const setStatus = (state, nodes) => {
        status.dataset.state = state;
        status.replaceChildren(...[].concat(nodes));
    };

    const setBusy = (busy) => {
        submit.disabled = busy;
        submit.setAttribute('aria-busy', String(busy));
        submitLabel.textContent = busy ? 'Sending…' : 'Send message';
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let firstInvalid = null;
        Object.keys(fields).forEach((key) => {
            const msg = rules[key](fields[key].value);
            setError(key, msg);
            if (msg && !firstInvalid) firstInvalid = fields[key];
        });
        if (firstInvalid) { firstInvalid.focus(); return; }

        // Honeypot: bots fill hidden fields. Pretend success, send nothing.
        if ($('#cf-company', form)?.value) {
            form.reset();
            setStatus('success', 'Thanks. Your message is on its way.');
            return;
        }

        // Simple client rate limit: one message per 60 seconds.
        const last = Number(localStorage.getItem('cf-last') || 0);
        if (Date.now() - last < 60_000) {
            setStatus('error', 'You just sent a message. Please wait a minute before sending another.');
            return;
        }

        setBusy(true);
        setStatus('', '');
        try {
            const emailjs = await loadEmailJS();
            await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
                from_name: fields.name.value.trim(),
                from_email: fields.email.value.trim(),
                reply_to: fields.email.value.trim(),
                subject: `Portfolio message from ${fields.name.value.trim()}`,
                message: fields.message.value.trim(),
                to_name: 'Shamsear Ebrahim'
            });
            localStorage.setItem('cf-last', String(Date.now()));
            form.reset();
            Object.keys(fields).forEach((key) => setError(key, ''));
            setStatus('success', 'Thanks. Your message is on its way and I will reply by email.');
        } catch {
            const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio message')}&body=${encodeURIComponent(fields.message.value)}`;
            setStatus('error', [
                "Your message didn't send. Your text is still in the form. You can try again or ",
                h('a', { class: 'link', href: mailto, text: 'email me directly' }),
                '.'
            ]);
        } finally {
            setBusy(false);
        }
    });
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
initHeader();
initScrollSpy();
initReveal();
initFilters();
initCaseStudies();
initCopyEmail();
initContactForm();
$$('.tile__media img').forEach(attachImageFallback);

const year = $('#year');
if (year) year.textContent = String(new Date().getFullYear());
