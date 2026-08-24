/* ==========================================================================
   VadayAI Solutions — main.js
   Vanilla JS only. Every component null-checks its elements so this single
   shared file can run on every page without erroring on missing markup.
   ========================================================================== */

// Web3Forms endpoint — the form's access_key (set in the hidden field in
// contact.html) tells Web3Forms which inbox to deliver submissions to.
const FORM_ENDPOINT = "https://api.web3forms.com/submit";

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  initStickyHeader();
  initMobileMenu();
  initMegaMenus();
  initVerticalTabs();
  initCounters(reduceMotion);
  initTestimonialCarousel(reduceMotion);
  initFaqAccordion();
  initScrollReveal(reduceMotion);
  initContactForm();
  initSmoothScroll();
  initActiveNav();
  initFooterAccordion();
  initSwooshReveal();
  renderServiceCards();
  renderFaqList();
  renderTestimonials();
  renderStats();

  /* ------------------------------------------------------------------ */
  /* 1. Sticky header scroll state                                       */
  /* ------------------------------------------------------------------ */
  function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 60) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /* 2. Mobile menu: open/close, focus trap, body scroll lock             */
  /* ------------------------------------------------------------------ */
  function initMobileMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const panel = document.querySelector(".mobile-nav");
    const closeBtn = document.querySelector(".mobile-nav-close");
    if (!toggle || !panel) return;

    let lastFocused = null;

    const focusableSelector =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function openMenu() {
      lastFocused = document.activeElement;
      panel.classList.add("is-open");
      document.body.classList.add("no-scroll");
      toggle.setAttribute("aria-expanded", "true");
      const firstFocusable = panel.querySelector(focusableSelector);
      if (firstFocusable) firstFocusable.focus();
      document.addEventListener("keydown", onKeydown);
    }

    function closeMenu() {
      panel.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
      toggle.setAttribute("aria-expanded", "false");
      document.removeEventListener("keydown", onKeydown);
      if (lastFocused) lastFocused.focus();
      panel.querySelectorAll(".mobile-accordion.is-open").forEach((el) => el.classList.remove("is-open"));
    }

    function onKeydown(e) {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key === "Tab") {
        const focusables = Array.from(panel.querySelectorAll(focusableSelector)).filter(
          (el) => el.offsetParent !== null
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    toggle.addEventListener("click", () => {
      const isOpen = panel.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    panel.addEventListener("click", (e) => {
      if (e.target.matches("a")) closeMenu();
    });

    document.addEventListener("click", (e) => {
      if (
        panel.classList.contains("is-open") &&
        !panel.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Mobile accordion for grouped nav items
    panel.querySelectorAll(".mobile-accordion-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".mobile-accordion");
        if (!item) return;
        const isOpen = item.classList.contains("is-open");
        panel.querySelectorAll(".mobile-accordion.is-open").forEach((el) => {
          if (el !== item) el.classList.remove("is-open");
        });
        item.classList.toggle("is-open", !isOpen);
        trigger.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 3. Mega-menu: hover (desktop) + click/keyboard (all)                 */
  /* ------------------------------------------------------------------ */
  function initMegaMenus() {
    const items = document.querySelectorAll(".has-mega");
    if (!items.length) return;

    function closeAll(except) {
      items.forEach((item) => {
        if (item === except) return;
        item.setAttribute("aria-expanded", "false");
      });
    }

    items.forEach((item) => {
      const trigger = item.querySelector(".nav-link");
      const panel = item.querySelector(".mega-panel");
      if (!trigger || !panel) return;

      item.setAttribute("aria-expanded", "false");

      item.addEventListener("mouseenter", () => {
        if (window.matchMedia("(hover: hover)").matches) {
          closeAll(item);
          item.setAttribute("aria-expanded", "true");
        }
      });
      item.addEventListener("mouseleave", () => {
        if (window.matchMedia("(hover: hover)").matches) {
          item.setAttribute("aria-expanded", "false");
        }
      });

      trigger.addEventListener("click", (e) => {
        // A real mouse click (e.detail > 0) on a hover-capable device should
        // just navigate the trigger link normally — hover already opened the
        // panel, so intercepting the click would instantly close it again
        // and make the link unclickable. Only keyboard activation (Enter/
        // Space, e.detail === 0) or non-hover devices toggle the panel.
        const isMouseClick = e.detail > 0;
        if (isMouseClick && window.matchMedia("(hover: hover)").matches) {
          return;
        }
        e.preventDefault();
        const isOpen = item.getAttribute("aria-expanded") === "true";
        closeAll(item);
        item.setAttribute("aria-expanded", String(!isOpen));
      });

      trigger.addEventListener("keydown", (e) => {
        const links = Array.from(panel.querySelectorAll("a"));
        if (e.key === "ArrowDown") {
          e.preventDefault();
          item.setAttribute("aria-expanded", "true");
          if (links[0]) links[0].focus();
        }
        if (e.key === "Escape") {
          item.setAttribute("aria-expanded", "false");
          trigger.focus();
        }
      });

      panel.addEventListener("keydown", (e) => {
        const links = Array.from(panel.querySelectorAll("a"));
        const idx = links.indexOf(document.activeElement);
        if (e.key === "ArrowDown") {
          e.preventDefault();
          const next = links[idx + 1] || links[0];
          next.focus();
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          const prev = links[idx - 1] || links[links.length - 1];
          prev.focus();
        }
        if (e.key === "Escape") {
          item.setAttribute("aria-expanded", "false");
          trigger.focus();
        }
      });
    });

    document.addEventListener("click", (e) => {
      items.forEach((item) => {
        if (!item.contains(e.target)) item.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 4. Vertical tabs component (ARIA-correct)                            */
  /* ------------------------------------------------------------------ */
  function initVerticalTabs() {
    const tablist = document.querySelector('[role="tablist"]');
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

    function selectTab(index) {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (panels[i]) panels[i].classList.toggle("is-active", selected);
      });
      if (tabs[index]) tabs[index].focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => selectTab(i));
      tab.addEventListener("keydown", (e) => {
        let newIndex = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") newIndex = (i + 1) % tabs.length;
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") newIndex = (i - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") newIndex = 0;
        if (e.key === "End") newIndex = tabs.length - 1;
        if (newIndex !== null) {
          e.preventDefault();
          selectTab(newIndex);
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 5. Counter animation via IntersectionObserver, runs once             */
  /* ------------------------------------------------------------------ */
  function initCounters(reduceMotion) {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    if (reduceMotion) {
      counters.forEach((el) => {
        const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
        const suffix = el.getAttribute("data-suffix") || "";
        el.textContent = target + suffix;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
          const suffix = el.getAttribute("data-suffix") || "";
          const duration = 1600;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
          }
          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /* 6. Testimonial carousel                                              */
  /* ------------------------------------------------------------------ */
  function initTestimonialCarousel(reduceMotion) {
    const wrap = document.querySelector(".testimonial-wrap");
    if (!wrap) return;
    const track = wrap.querySelector(".testimonial-slides");
    const slides = Array.from(wrap.querySelectorAll(".testimonial-slide"));
    const prevBtn = wrap.querySelector(".carousel-arrow.prev");
    const nextBtn = wrap.querySelector(".carousel-arrow.next");
    const dotsWrap = wrap.querySelector(".dots");
    if (!track || !slides.length) return;

    let index = 0;
    let autoplayTimer = null;
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll(".dot")) : [];

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function startAutoplay() {
      if (reduceMotion) return;
      stopAutoplay();
      autoplayTimer = setInterval(next, 6000);
    }
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    if (nextBtn) nextBtn.addEventListener("click", () => { next(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); startAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { goTo(i); startAutoplay(); }));

    wrap.addEventListener("mouseenter", stopAutoplay);
    wrap.addEventListener("mouseleave", startAutoplay);
    wrap.addEventListener("focusin", stopAutoplay);
    wrap.addEventListener("focusout", startAutoplay);

    wrap.setAttribute("tabindex", "0");
    wrap.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { next(); startAutoplay(); }
      if (e.key === "ArrowLeft") { prev(); startAutoplay(); }
    });

    // Touch swipe
    let touchStartX = null;
    track.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 40) diff < 0 ? next() : prev();
      touchStartX = null;
      startAutoplay();
    });

    render();
    startAutoplay();
  }

  /* ------------------------------------------------------------------ */
  /* 7. FAQ accordion with smooth max-height animation                    */
  /* ------------------------------------------------------------------ */
  function initFaqAccordion() {
    const list = document.querySelector(".faq-list");
    if (!list) return;

    function bind() {
      const items = Array.from(list.querySelectorAll(".faq-item"));
      items.forEach((item) => {
        const btn = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        if (!btn || !answer) return;
        btn.addEventListener("click", () => {
          const isOpen = btn.getAttribute("aria-expanded") === "true";
          items.forEach((other) => {
            const otherBtn = other.querySelector(".faq-question");
            const otherAnswer = other.querySelector(".faq-answer");
            if (!otherBtn || !otherAnswer) return;
            otherBtn.setAttribute("aria-expanded", "false");
            otherAnswer.style.maxHeight = null;
          });
          if (!isOpen) {
            btn.setAttribute("aria-expanded", "true");
            answer.style.maxHeight = answer.scrollHeight + "px";
          }
        });
      });
    }

    // Expose for re-render after content injection
    window.__bindFaqAccordion = bind;
    bind();
  }

  /* ------------------------------------------------------------------ */
  /* 8. Scroll-reveal via IntersectionObserver, staggered                 */
  /* ------------------------------------------------------------------ */
  function initScrollReveal(reduceMotion) {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    if (reduceMotion) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = el.getAttribute("data-reveal-delay") || 0;
          setTimeout(() => el.classList.add("is-visible"), Number(delay));
          obs.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /* 9. Form validation + success state + honeypot                        */
  /* ------------------------------------------------------------------ */
  function initContactForm() {
    const forms = document.querySelectorAll(".contact-form");
    if (!forms.length) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s().-]{7,20}$/;

    forms.forEach((form) => {
      // .form-error-summary is a sibling of <form> inside .form-card, not a
      // descendant of it, so it must be looked up from the form's parent.
      const errorSummary = form.parentElement.querySelector(".form-error-summary");
      // .form-success sits one level up again, as a sibling of .form-card.
      const successEl = form.parentElement.parentElement.querySelector(".form-success");

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Honeypot check
        const honeypot = form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value.trim() !== "") {
          return; // silently drop likely spam
        }

        const fields = {
          name: form.querySelector('[name="name"]'),
          email: form.querySelector('[name="email"]'),
          phone: form.querySelector('[name="phone"]'),
          message: form.querySelector('[name="message"]'),
          consent: form.querySelector('[name="consent"]')
        };

        let firstInvalid = null;
        const errors = [];
        clearErrors(form);

        if (fields.name && !fields.name.value.trim()) {
          setError(fields.name, "Please enter your full name.");
          errors.push("Full name is required.");
          firstInvalid = firstInvalid || fields.name;
        }

        if (fields.email) {
          if (!fields.email.value.trim()) {
            setError(fields.email, "Please enter your work email.");
            errors.push("Work email is required.");
            firstInvalid = firstInvalid || fields.email;
          } else if (!emailRegex.test(fields.email.value.trim())) {
            setError(fields.email, "Please enter a valid email address.");
            errors.push("Email format is invalid.");
            firstInvalid = firstInvalid || fields.email;
          }
        }

        if (fields.phone && fields.phone.value.trim() && !phoneRegex.test(fields.phone.value.trim())) {
          setError(fields.phone, "Please enter a valid phone number.");
          errors.push("Phone format is invalid.");
          firstInvalid = firstInvalid || fields.phone;
        }

        if (fields.message && !fields.message.value.trim()) {
          setError(fields.message, "Please tell us a bit about your project.");
          errors.push("Message is required.");
          firstInvalid = firstInvalid || fields.message;
        }

        if (fields.consent && !fields.consent.checked) {
          setError(fields.consent, "Please confirm you agree to be contacted.");
          errors.push("Consent confirmation is required.");
          firstInvalid = firstInvalid || fields.consent;
        }

        if (errors.length) {
          if (errorSummary) {
            errorSummary.textContent = errors.join(" ");
            errorSummary.classList.add("is-visible");
          }
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        if (errorSummary) errorSummary.classList.remove("is-visible");

        const payload = {};
        new FormData(form).forEach((value, key) => { payload[key] = value; });

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              form.style.display = "none";
              if (errorSummary) errorSummary.classList.remove("is-visible");
              if (successEl) successEl.classList.add("is-visible");
              form.reset();
            } else {
              if (errorSummary) {
                errorSummary.textContent =
                  data.message || "Something went wrong sending your message. Please try again or email us directly.";
                errorSummary.classList.add("is-visible");
              }
            }
          })
          .catch(() => {
            if (errorSummary) {
              errorSummary.textContent =
                "Something went wrong sending your message. Please try again or email us directly at info@vadayai.com.";
              errorSummary.classList.add("is-visible");
            }
          })
          .finally(() => {
            if (submitBtn) submitBtn.disabled = false;
          });
      });
    });

    function setError(field, message) {
      field.setAttribute("aria-invalid", "true");
      const errId = field.getAttribute("aria-describedby");
      if (errId) {
        const errEl = document.getElementById(errId);
        if (errEl) {
          errEl.textContent = message;
          errEl.classList.add("is-visible");
        }
      }
    }

    function clearErrors(form) {
      form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
      form.querySelectorAll(".field-error").forEach((el) => {
        el.textContent = "";
        el.classList.remove("is-visible");
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* 10. Smooth scroll for in-page anchors with sticky-header offset       */
  /* ------------------------------------------------------------------ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href*="#"]').forEach((link) => {
      const [path, hash] = link.getAttribute("href").split("#");
      if (!hash) return;
      const samePage = path === "" || path === window.location.pathname.split("/").pop();
      if (!samePage) return;

      link.addEventListener("click", (e) => {
        const target = document.getElementById(hash);
        if (!target) return;
        e.preventDefault();
        const headerH = document.querySelector(".site-header")?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 20;
        window.scrollTo({ top, behavior: "smooth" });
        history.pushState(null, "", `#${hash}`);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 11. Active-link highlighting based on current page + scroll          */
  /* ------------------------------------------------------------------ */
  function initActiveNav() {
    const links = document.querySelectorAll(".nav-link[href], .mobile-nav a[href]");
    if (!links.length) return;
    const current = window.location.pathname.split("/").pop() || "index.html";
    links.forEach((link) => {
      const href = link.getAttribute("href").split("#")[0];
      if (href === current || (current === "" && href === "index.html")) {
        link.classList.add("is-active");
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 12. Footer accordion on mobile                                       */
  /* ------------------------------------------------------------------ */
  function initFooterAccordion() {
    const cols = document.querySelectorAll(".footer-col");
    if (!cols.length) return;
    cols.forEach((col) => {
      const heading = col.querySelector("h4");
      if (!heading) return;
      heading.addEventListener("click", () => {
        if (window.innerWidth > 768) return;
        col.classList.toggle("is-open");
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Swoosh divider stroke-draw on scroll into view                       */
  /* ------------------------------------------------------------------ */
  function initSwooshReveal() {
    const swooshes = document.querySelectorAll(".swoosh-divider");
    if (!swooshes.length) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    swooshes.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /* Content rendering from content.js data arrays                        */
  /* ------------------------------------------------------------------ */
  function renderServiceCards() {
    const grid = document.querySelector("[data-render='service-cards']");
    if (!grid || typeof SERVICES_CARDS_DATA === "undefined") return;
    const icons = {
      code: '<path d="M8 4 3 12l5 8"/><path d="M16 4l5 8-5 8"/>',
      link: '<path d="M9 12h6"/><path d="M10 6H7a6 6 0 0 0 0 12h3"/><path d="M14 6h3a6 6 0 0 1 0 12h-3"/>',
      database: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
      shield: '<path d="M12 3l8 4v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7z"/><path d="m9 12 2 2 4-4"/>',
      cloud: '<path d="M7 18a5 5 0 0 1-.4-10 6 6 0 0 1 11.4 2A4.5 4.5 0 0 1 17.5 18Z"/>',
      users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 19a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="9" r="3"/><path d="M15 12.5a5.5 5.5 0 0 1 6.5 5.4"/>'
    };
    grid.innerHTML = SERVICES_CARDS_DATA.map(
      (s, i) => `
      <div class="service-card" data-reveal data-reveal-delay="${(i % 3) * 100}">
        <div class="icon-tile" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[s.icon] || ""}</svg>
        </div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <a class="card-link" href="${s.href}">Learn more
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>`
    ).join("");
  }

  function renderFaqList() {
    const list = document.querySelector("[data-render='faq-list']");
    if (!list || typeof FAQ_DATA === "undefined") return;
    list.innerHTML = FAQ_DATA.map(
      (item, i) => `
      <div class="faq-item">
        <h3>
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}" id="faq-question-${i}">
            <span>${item.q}</span>
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </h3>
        <div class="faq-answer" id="faq-answer-${i}" role="region" aria-labelledby="faq-question-${i}">
          <p class="faq-answer-inner">${item.a}</p>
        </div>
      </div>`
    ).join("");
    if (window.__bindFaqAccordion) window.__bindFaqAccordion();
  }

  function renderTestimonials() {
    const track = document.querySelector("[data-render='testimonial-slides']");
    const dotsWrap = document.querySelector("[data-render='testimonial-dots']");
    if (!track || typeof TESTIMONIALS_DATA === "undefined") return;
    track.innerHTML = TESTIMONIALS_DATA.map(
      (t) => `
      <div class="testimonial-slide">
        <div class="testimonial-card">
          <svg class="quote-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 7c-2.2 0-4 1.8-4 4v6h6v-6H6.2C6.6 9.4 8.3 8 10 8V7c-1 0-2 0-3 0zm10 0c-2.2 0-4 1.8-4 4v6h6v-6h-2.8c.4-1.6 2.1-3 3.8-3V7c-1 0-2 0-3 0z"/></svg>
          <p class="testimonial-text">&ldquo;${t.quote}&rdquo;</p>
          <div class="testimonial-person">
            <div class="avatar-circle" aria-hidden="true">${t.initials}</div>
            <div class="who"><strong>${t.name}</strong><span>${t.role}</span></div>
          </div>
        </div>
      </div>`
    ).join("");
    if (dotsWrap) {
      dotsWrap.innerHTML = TESTIMONIALS_DATA.map(
        (t, i) => `<button class="dot${i === 0 ? " is-active" : ""}" aria-label="Show testimonial ${i + 1}"></button>`
      ).join("");
    }
    // Re-init carousel now that slides exist
    initTestimonialCarousel(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function renderStats() {
    const band = document.querySelector("[data-render='stats-band']");
    if (!band || typeof STATS_DATA === "undefined") return;
    band.innerHTML = STATS_DATA.map(
      (s) => `
      <div>
        <div class="stat-num" data-counter="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
        <div class="stat-label">${s.label}</div>
      </div>`
    ).join("");
    initCounters(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
});
