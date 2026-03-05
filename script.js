
document.addEventListener('DOMContentLoaded', () => {

    const data = SITE_DATA; // alias

    /* here i am loading the dynamic donent for the site data especially 
    for the carousel and manufacturing process steps that changes the design in mobile devide */
    renderGalleryThumbnails();
    renderProcessSteps();

    function renderGalleryThumbnails() {
        const nextImgWrap = document.querySelector('.next-img');
        if (!nextImgWrap) return;
        nextImgWrap.innerHTML = '';
        data.product.images.forEach((src, i) => {
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
        data.processSteps.forEach((step, i) => {
            const span = document.createElement('span');
            span.textContent = step.name;
            span.setAttribute('data-index', i);
            if (i === 0) span.classList.add('active');
            stepsRow.appendChild(span);
        });
    }

    /*  PRODUCT GALLERY CAROUSEL + ZOOM  implementation*/
    (function initProductGallery() {
        const mainImgWrapper = document.querySelector('.product-gallery .main-img');
        if (!mainImgWrapper) return;

        const mainImg = mainImgWrapper.querySelector('img');
        const leftBtn = mainImgWrapper.querySelector('.left-arrow-button');
        const rightBtn = mainImgWrapper.querySelector('.right-arrow-button');
        let currentIdx = 0;
        const total = data.product.images.length;

        /* ── Set active image ── */
        window.setGalleryImage = function (idx) {
            currentIdx = (idx + total) % total;
            mainImg.src = data.product.images[currentIdx];

            // Thumbnail highlight + Scroll into view
            document.querySelectorAll('.next-img > div').forEach((div, i) => {
                const isActive = i === currentIdx;
                div.classList.toggle('active-thumb', isActive);
                if (isActive) {
                    div.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        };

        leftBtn.addEventListener('click', () => setGalleryImage(currentIdx - 1));
        rightBtn.addEventListener('click', () => setGalleryImage(currentIdx + 1));

        /*
           Lens:   semi-transparent box that follows cursor on image.
           Panel:  absolute box beside the image showing magnified region.
       */
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
            return data.product.images[currentIdx];
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

    /*  PRODUCT GALLERY REORDER  ≤ 360px
       Move gallery between features and price box. */
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


    /* PRODUCT STICKY BAR
       Appears after the hero section (first fold) scrolls
       out of view. Shows: thumbnail | title | price | CTA. */
       
    (function initStickyProductBar() {
        const heroSection = document.querySelector('.product-detail-section');
        if (!heroSection) return;

        const bar = document.createElement('div');
        bar.id = 'product-sticky-bar';
        bar.innerHTML = `
      <div class="psb-left">
        <img class="psb-thumb" src="${data.product.images[0]}" alt="">
        <div class="psb-info">
          <span class="psb-title">${data.product.title}</span>
          <span class="psb-price">${data.product.price.currency}${data.product.price.min} - ${data.product.price.max}</span>
        </div>
      </div>
      <button class="psb-cta">Get Custom Quote</button>
    `;
        document.body.appendChild(bar);


        // hide on scroll-DOWN, reveal on scroll-UP (like mobile nav)
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


    /* MANUFACTURING PROCESS
       Desktop  : image left/right arrows + pill clicks → navigate steps.
       Mobile ≤ 800px: image arrows hidden; injected Prev/Next text buttons navigate.*/
    (function initManufacturingProcess() {
        const stepsRow = document.querySelector('.process-steps');
        const detailBlock = document.querySelector('.process-detail');
        const detailEl = document.querySelector('.process-detail > .detail');
        const imgLeft = document.querySelector('.process-actions .left-arrow-button');
        const imgRight = document.querySelector('.process-actions .right-arrow-button');
        if (!stepsRow || !detailBlock || !detailEl) return;

        const steps = data.processSteps;
        const total = steps.length;
        let current = 0;
        let isMobileUI = false;
        let badge = null;
        let mobileNav = null;

        /* ── hide image arrows on mobile ── */
        const procStyle = document.createElement('style');
        document.head.appendChild(procStyle);

        /* ── go to a step ── */
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

    /* DOWNLOAD BROCHURE MODAL  */
    (function initDownloadModal() {
        const modal = document.getElementById('downloadModal');
        const openBtns = document.querySelectorAll('.cta-download');
        const closeBtn = document.querySelector('.download-modal-close');
        if (!modal) return;

        function openModal() {
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.hidden = true;
            document.body.style.overflow = '';
        }

        openBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        }));

        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hidden) closeModal();
        });
    })();

    /*  REQUEST QUOTE MODAL */
    (function initQuoteModal() {
        const modal = document.getElementById('quoteModal');
        const openBtns = document.querySelectorAll('.quote-button, .cta-request-button, .psb-cta');
        const closeBtn = document.getElementById('quoteModalClose');
        const form = document.getElementById('quoteForm');

        if (!modal || !form) return;

        function openModal() {
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.hidden = true;
            document.body.style.overflow = '';
        }

        openBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        }));

        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hidden) closeModal();
        });

    })();

});
