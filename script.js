/**
 * script.js — Mangalam HDPE Pipes
 * Reads all data from SITE_DATA (data.js).
 *
 * Sections:
 *  1. Render dynamic content from SITE_DATA
 *  2. Product gallery carousel + image zoom
 *  3. Sticky product bar (appears after hero fold)
 *  4. Nav dropdown & sticky main-nav
 *  5. FAQ accordion
 *  6. Application carousel (fix left-button selector)
 *  7. Manufacturing process — desktop tabs + mobile Step X/8 nav
 *  8. Product gallery reorder for ≤ 360px
 *  9. Contact form validation
 */

/* =====================================================
   WAIT FOR DOM
===================================================== */
document.addEventListener('DOMContentLoaded', () => {

    const D = SITE_DATA; // alias

    /* ===================================================
       1. RENDER DYNAMIC CONTENT FROM SITE_DATA
    =================================================== */
    renderGalleryThumbnails();
    renderProcessSteps();

    function renderGalleryThumbnails() {
        const nextImgWrap = document.querySelector('.next-img');
        if (!nextImgWrap) return;
        nextImgWrap.innerHTML = '';
        D.product.images.forEach((src, i) => {
            const div = document.createElement('div');
            div.setAttribute('data-index', i);
            div.style.backgroundImage = `url('${src}')`;
            div.style.backgroundSize = 'cover';
            div.style.backgroundPosition = 'center';
            if (i === 0) div.classList.add('active-thumb');
            div.addEventListener('click', () => setGalleryImage(i));
            nextImgWrap.appendChild(div);
        });
    }

    function renderProcessSteps() {
        const stepsRow = document.querySelector('.process-steps');
        if (!stepsRow) return;
        stepsRow.innerHTML = '<hr>';
        D.processSteps.forEach((step, i) => {
            const span = document.createElement('span');
            span.textContent = step.name;
            span.setAttribute('data-index', i);
            if (i === 0) span.classList.add('active');
            stepsRow.appendChild(span);
        });
    }

    /* ===================================================
       2. PRODUCT GALLERY CAROUSEL + ZOOM
    =================================================== */
    (function initProductGallery() {
        const mainImgWrapper = document.querySelector('.product-gallery .main-img');
        if (!mainImgWrapper) return;

        const mainImg = mainImgWrapper.querySelector('img');
        const leftBtn = mainImgWrapper.querySelector('.left-arrow-button');
        const rightBtn = mainImgWrapper.querySelector('.right-arrow-button');
        let currentIdx = 0;
        const total = D.product.images.length;

        /* ── Set active image ── */
        window.setGalleryImage = function (idx) {
            currentIdx = (idx + total) % total;
            mainImg.src = D.product.images[currentIdx];

            // Thumbnail highlight
            document.querySelectorAll('.next-img > div').forEach((div, i) => {
                div.classList.toggle('active-thumb', i === currentIdx);
            });
        };

        leftBtn.addEventListener('click', () => setGalleryImage(currentIdx - 1));
        rightBtn.addEventListener('click', () => setGalleryImage(currentIdx + 1));

        /* ── AMAZON-STYLE ZOOM ──────────────────────────────────────
           Lens:   semi-transparent box that follows cursor on image.
           Panel:  absolute box beside the image showing magnified region.
        ──────────────────────────────────────────────────────────── */
        const ZOOM_FACTOR = 3;          // 3× magnification
        const LENS_W = 120;        // lens width  (px)
        const LENS_H = 100;        // lens height (px)
        const PANEL_W = 340;        // zoom-panel width  (px)
        const PANEL_H = 300;        // zoom-panel height (px)

        // Lens overlay (sits on top of the main image)
        const lens = document.createElement('div');
        lens.className = 'zoom-lens';
        mainImgWrapper.appendChild(lens);

        // Zoom result panel (absolutely positioned beside the gallery)
        const panel = document.createElement('div');
        panel.className = 'zoom-panel';
        // We attach it to the parent .product-gallery so it can sit to the right
        const galleryEl = mainImgWrapper.closest('.product-gallery') || mainImgWrapper.parentElement;
        galleryEl.style.position = 'relative';
        galleryEl.appendChild(panel);


        /* ── Zoom logic ── */
        function getImageSrc() {
            return D.product.images[currentIdx];
        }

        function updateZoomPanel(imgSrc) {
            // Background image = same src, scaled up ZOOM_FACTOR times
            const bgW = mainImgWrapper.offsetWidth * ZOOM_FACTOR;
            const bgH = mainImgWrapper.offsetHeight * ZOOM_FACTOR;
            panel.style.backgroundImage = `url('${imgSrc}')`;
            panel.style.backgroundSize = `${bgW}px ${bgH}px`;
        }

        function onMouseMove(e) {
            const rect = mainImgWrapper.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            // Clamp lens within image bounds
            x = Math.max(LENS_W / 2, Math.min(rect.width - LENS_W / 2, x));
            y = Math.max(LENS_H / 2, Math.min(rect.height - LENS_H / 2, y));

            const lensLeft = x - LENS_W / 2;
            const lensTop = y - LENS_H / 2;

            lens.style.left = `${lensLeft}px`;
            lens.style.top = `${lensTop}px`;

            // Map lens position to background-position on the panel
            const ratioX = lensLeft / (rect.width - LENS_W);
            const ratioY = lensTop / (rect.height - LENS_H);

            const bgW = rect.width * ZOOM_FACTOR;
            const bgH = rect.height * ZOOM_FACTOR;
            const bgX = -(ratioX * (bgW - PANEL_W));
            const bgY = -(ratioY * (bgH - PANEL_H));

            panel.style.backgroundSize = `${bgW}px ${bgH}px`;
            panel.style.backgroundPosition = `${bgX}px ${bgY}px`;
        }

        mainImgWrapper.addEventListener('mouseenter', () => {
            mainImgWrapper.classList.add('zooming');
            panel.style.backgroundImage = `url('${getImageSrc()}')`;
            panel.classList.add('active');
        });

        mainImgWrapper.addEventListener('mousemove', onMouseMove);

        mainImgWrapper.addEventListener('mouseleave', () => {
            mainImgWrapper.classList.remove('zooming');
            panel.classList.remove('active');
        });

        // Update panel image when gallery slide changes
        const _origSetGallery = window.setGalleryImage;
        window.setGalleryImage = function (idx) {
            _origSetGallery(idx);
            if (panel.classList.contains('active')) {
                panel.style.backgroundImage = `url('${getImageSrc()}')`;
            }
        };
    })();


    /* ===================================================
       3. PRODUCT STICKY BAR
       Appears after the hero section (first fold) scrolls
       out of view. Shows: thumbnail | title | price | CTA.
    =================================================== */
    (function initStickyProductBar() {
        const heroSection = document.querySelector('.product-detail-section');
        if (!heroSection) return;

        const bar = document.createElement('div');
        bar.id = 'product-sticky-bar';
        bar.innerHTML = `
      <div class="psb-left">
        <img class="psb-thumb" src="${D.product.images[0]}" alt="">
        <div class="psb-info">
          <span class="psb-title">${D.product.title}</span>
          <span class="psb-price">${D.product.price.currency}${D.product.price.min} - ${D.product.price.max}</span>
        </div>
      </div>
      <button class="psb-cta">Get Custom Quote</button>
    `;
        document.body.appendChild(bar);


        // Smart sticky: hide on scroll-DOWN, reveal on scroll-UP (like mobile nav)
        // But only active once past the hero section.
        let lastScrollY = window.scrollY;
        let barVisible = false;

        function show() { if (!barVisible) { bar.classList.add('visible'); barVisible = true; } }
        function hide() { if (barVisible) { bar.classList.remove('visible'); barVisible = false; } }

        function onScroll() {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            const scrollY = window.scrollY;
            const scrollDown = scrollY > lastScrollY;

            if (heroBottom > 0) {
                // Still in hero — always hidden
                hide();
            } else {
                // Past hero: show when scrolling DOWN, hide when scrolling UP
                if (scrollDown) show();
                else hide();
            }

            lastScrollY = scrollY;
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    })();


    /* ===================================================
       4. NAV DROPDOWN (products menu)
    =================================================== */
    (function initNavDropdown() {
        const toggleBtn = document.querySelector('.nav-dropdown-toggle');
        const dropdownMenu = document.getElementById('product-menu');
        if (!toggleBtn || !dropdownMenu) return;

        const open = () => { dropdownMenu.hidden = false; toggleBtn.setAttribute('aria-expanded', 'true'); };
        const close = () => { dropdownMenu.hidden = true; toggleBtn.setAttribute('aria-expanded', 'false'); };

        toggleBtn.addEventListener('click', () =>
            toggleBtn.getAttribute('aria-expanded') === 'true' ? close() : open()
        );
        document.addEventListener('click', (e) => {
            if (!toggleBtn.contains(e.target) && !dropdownMenu.contains(e.target)) close();
        });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    })();


    /* ===================================================
       5. FAQ ACCORDION
    =================================================== */
    (function initFAQ() {
        const faqs = document.querySelectorAll('.faq');
        faqs.forEach((faq) => {
            const box = faq.querySelector('.faq-question-box');
            const answer = faq.querySelector('.faq-answer');
            if (!box || !answer) return;

            box.setAttribute('role', 'button');
            box.setAttribute('tabindex', '0');
            box.setAttribute('aria-expanded', answer.classList.contains('active') ? 'true' : 'false');

            function toggle() {
                const isOpen = answer.classList.contains('active');
                faqs.forEach((f) => {
                    f.querySelector('.faq-answer')?.classList.remove('active');
                    f.querySelector('.faq-question-box')?.setAttribute('aria-expanded', 'false');
                    const c = f.querySelector('img');
                    if (c) c.style.transform = '';
                });
                if (!isOpen) {
                    answer.classList.add('active');
                    box.setAttribute('aria-expanded', 'true');
                    const caret = box.querySelector('img');
                    if (caret) caret.style.transform = 'rotate(180deg)';
                }
            }

            box.addEventListener('click', toggle);
            box.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
            });
        });
    })();


    /* ===================================================
       6. APPLICATION CAROUSEL
       Fix: use specific selectors to avoid hitting
       the product-gallery buttons by mistake.
    =================================================== */
    (function initApplicationCarousel() {
        const container = document.querySelector('.application-card-container');
        // Use the section-scoped buttons inside .application-actions
        const leftBtn = document.querySelector('.application-actions .left-arrow-button');
        const rightBtn = document.querySelector('.application-actions .right-arrow-button');
        if (!container) return;



        const SCROLL = 460;
        if (leftBtn) leftBtn.addEventListener('click', () => container.scrollBy({ left: -SCROLL, behavior: 'smooth' }));
        if (rightBtn) rightBtn.addEventListener('click', () => container.scrollBy({ left: SCROLL, behavior: 'smooth' }));
    })();


    /* ===================================================
       7. MANUFACTURING PROCESS
       Desktop  : image left/right arrows + pill clicks → navigate steps.
       Mobile ≤ 800px: image arrows hidden; injected Prev/Next text buttons navigate.
    =================================================== */
    (function initManufacturingProcess() {
        const stepsRow = document.querySelector('.process-steps');
        const detailBlock = document.querySelector('.process-detail');
        const detailEl = document.querySelector('.process-detail > .detail');
        const imgLeft = document.querySelector('.process-actions .left-arrow-button');
        const imgRight = document.querySelector('.process-actions .right-arrow-button');
        if (!stepsRow || !detailBlock || !detailEl) return;

        const steps = D.processSteps;
        const total = steps.length;
        let current = 0;
        let isMobileUI = false;
        let badge = null;
        let mobileNav = null;

        /* ── Inject CSS: hide image arrows on mobile ── */
        const procStyle = document.createElement('style');
        document.head.appendChild(procStyle);

        /* ── Core: go to a step ── */
        function goTo(idx) {
            current = (idx + total) % total;
            renderContent(current);
            // Sync pill highlight
            stepsRow.querySelectorAll('span').forEach((s, i) =>
                s.classList.toggle('active', i === current)
            );
            if (isMobileUI) updateMobileNav();
        }

        /* ── Render step content ── */
        function renderContent(idx) {
            const s = steps[idx];
            const h3 = detailEl.querySelector('h3');
            const p = detailEl.querySelector('p');
            const ul = detailEl.querySelector('ul');
            const img = document.querySelector('.process-actions > img');
            if (h3) h3.textContent = s.title;
            if (p) p.textContent = s.desc;
            if (ul) ul.innerHTML = s.bullets.map(b =>
                `<li><img src="./assets/icons/CheckCircle.svg" alt=""> <span>${b}</span></li>`
            ).join('');
            if (img) img.src = s.image;
        }

        /* ── Desktop: image arrow buttons ── */
        if (imgLeft) imgLeft.addEventListener('click', () => goTo(current - 1));
        if (imgRight) imgRight.addEventListener('click', () => goTo(current + 1));

        /* ── Desktop: pill clicks (keep them working too) ── */
        stepsRow.querySelectorAll('span').forEach((span, i) => {
            span.style.cursor = 'pointer';
            span.addEventListener('click', () => goTo(i));
        });

        /* ── Initial render ── */
        renderContent(0);

        /* ── Mobile UI (injected) ── */
        function updateMobileNav() {
            if (badge) badge.textContent = `Step ${current + 1}/${total}: ${steps[current].name}`;
            const prev = document.getElementById('procPrev');
            const next = document.getElementById('procNext');
            if (prev) prev.disabled = (current === 0);
            if (next) next.disabled = (current === total - 1);
        }

        function buildMobileUI() {
            badge = document.createElement('div');
            badge.className = 'process-step-badge';
            detailBlock.insertAdjacentElement('beforebegin', badge);

            mobileNav = document.createElement('div');
            mobileNav.className = 'process-mobile-nav';
            mobileNav.innerHTML = `
              <button class="process-nav-btn" id="procPrev">← Previous</button>
              <button class="process-nav-btn" id="procNext">Next →</button>
            `;
            detailBlock.insertAdjacentElement('afterend', mobileNav);

            document.getElementById('procPrev')?.addEventListener('click', () => goTo(current - 1));
            document.getElementById('procNext')?.addEventListener('click', () => goTo(current + 1));

            isMobileUI = true;
            updateMobileNav();
        }

        function destroyMobileUI() {
            badge?.remove(); badge = null;
            mobileNav?.remove(); mobileNav = null;
            isMobileUI = false;
        }

        function applyLayout() {
            const shouldMobile = window.innerWidth <= 800;
            if (shouldMobile && !isMobileUI) buildMobileUI();
            if (!shouldMobile && isMobileUI) destroyMobileUI();
        }

        applyLayout();
        window.addEventListener('resize', applyLayout);
    })();


    /* ===================================================
       8. PRODUCT GALLERY REORDER  ≤ 360px
       Move gallery between features and price box.
    =================================================== */
    (function initGalleryReorder() {
        const wrapper = document.querySelector('.product-hero-wrapper');
        const gallery = document.querySelector('.product-gallery');
        const features = document.querySelector('.product-features');
        if (!wrapper || !gallery || !features) return;

        let moved = false;

        function apply() {
            if (window.innerWidth <= 360) {
                if (!moved) { features.insertAdjacentElement('afterend', gallery); moved = true; }
            } else {
                if (moved) { wrapper.insertBefore(gallery, wrapper.firstElementChild); moved = false; }
            }
        }

        apply();
        let t;
        window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(apply, 80); });
    })();


    /* ===================================================
       9. CONTACT FORM VALIDATION
    =================================================== */
    (function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        function showError(input, msg) {
            clearError(input);
            input.style.borderColor = '#EF4444';
            const err = document.createElement('span');
            err.className = 'field-error';
            Object.assign(err.style, { display: 'block', color: '#EF4444', fontSize: '12px', marginTop: '4px' });
            err.textContent = msg;
            input.parentNode.appendChild(err);
        }
        function clearError(input) {
            input.style.borderColor = '';
            input.parentNode.querySelector('.field-error')?.remove();
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            const name = document.getElementById('fullName');
            const email = document.getElementById('emailAddress');
            const phone = document.getElementById('phoneNumber');

            if (!name?.value.trim()) { showError(name, 'Full name is required.'); valid = false; }
            else clearError(name);

            if (!email?.value.trim()) { showError(email, 'Email is required.'); valid = false; }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError(email, 'Enter a valid email.'); valid = false; }
            else clearError(email);

            if (phone?.value.trim() && !/^[0-9\s\-()+]{7,15}$/.test(phone.value)) {
                showError(phone, 'Enter a valid phone number.'); valid = false;
            } else if (phone) clearError(phone);

            if (valid) {
                const btn = form.querySelector('.contact-submit-btn');
                btn.textContent = 'Sending…';
                btn.disabled = true;
                setTimeout(() => {
                    btn.textContent = '✓ Request Sent!';
                    btn.style.background = '#16a34a';
                    form.reset();
                    setTimeout(() => {
                        btn.textContent = 'Request Custom Quote';
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                }, 1200);
            }
        });

        form.querySelectorAll('.form-input').forEach(inp => inp.addEventListener('input', () => clearError(inp)));
    })();

}); // end DOMContentLoaded
