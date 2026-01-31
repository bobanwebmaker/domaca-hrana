document.addEventListener("DOMContentLoaded", () => {
  // Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const body = document.body;

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
      body.classList.toggle("active");
    });
  }

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburger) hamburger.classList.remove("active");
      if (nav) nav.classList.remove("active");
      body.classList.remove("active");
    });
  });

  // Counters Animation
  const counters = document.querySelectorAll(".counter");
  const speed = 200;
  let countersAnimated = false;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-count") || "0");
      const count = Number(counter.innerText || "0");
      const inc = target / speed;

      if (count < target) {
        counter.innerText = String(Math.ceil(count + inc));
      } else {
        counter.innerText = String(target);
      }
    });

    // nastavi dok svi ne stignu target
    const done = Array.from(counters).every((c) => Number(c.innerText) >= Number(c.getAttribute("data-count") || "0"));
    if (!done) requestAnimationFrame(animateCounters);
  };

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0;
  }

  const counterSection = document.querySelector(".counter-section");
  const checkCounters = () => {
    if (!countersAnimated && counterSection && isInViewport(counterSection)) {
      countersAnimated = true;
      animateCounters();
    }
  };

  window.addEventListener("scroll", checkCounters, { passive: true });
  checkCounters();

  // Testimonials Slider
  const testimonialSlider = document.querySelector(".testimonials-slider");
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  const sliderDots = document.querySelector(".slider-dots");

  if (testimonialSlider && testimonialSlides.length > 0 && sliderDots) {
    let currentSlide = 0;

    testimonialSlides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      sliderDots.appendChild(dot);
    });

    const dots = sliderDots.querySelectorAll(".slider-dot");

    function showSlide(n) {
      testimonialSlides.forEach((slide, index) => {
        slide.style.display = index === n ? "block" : "none";
        if (dots[index]) dots[index].classList.toggle("active", index === n);
      });
    }

    function goToSlide(n) {
      currentSlide = n;
      showSlide(currentSlide);
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      showSlide(currentSlide);
    }

    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);

    let slideInterval = setInterval(nextSlide, 5000);

    testimonialSlider.addEventListener("mouseenter", () => clearInterval(slideInterval));
    testimonialSlider.addEventListener("mouseleave", () => (slideInterval = setInterval(nextSlide, 5000)));

    showSlide(currentSlide);
  }

  // Scroll Animation
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".product-card, .about-content, .about-image, .delivery-card, .partner, .price-categories, .price-tables, .price-notes, .order-cta, .product-content, .product-variants, .product-gallery, .ingredients-section, .order-info, .testimonials-section, .story-section, .values-section, .process-step, .faq-item, .map-section, .contact-section"
    );

    elements.forEach((element) => {
      const top = element.getBoundingClientRect().top;
      const screen = window.innerHeight;
      if (top < screen) element.classList.add("fade-in");
    });
  };

  window.addEventListener("scroll", animateOnScroll, { passive: true });
  animateOnScroll();

  // Music Toggle
  const musicToggle = document.querySelector(".music-toggle");
  let audio = null;
  let isPlaying = false;

  if (musicToggle) {
    audio = document.createElement("audio");
    audio.src = "mp3/domace.mp3";
    audio.loop = true;

    musicToggle.addEventListener("click", () => {
      const icon = musicToggle.querySelector(".music-icon");
      if (!icon) return;

      if (isPlaying) {
        audio.pause();
        icon.innerHTML = '<i class="fas fa-music"></i>';
      } else {
        audio.play().catch(() => {});
        icon.innerHTML = '<i class="fas fa-volume-up"></i>';
      }
      isPlaying = !isPlaying;
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" });
    });
  });

  // FAQ functionality
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const toggle = item.querySelector(".faq-toggle");

      if (question && answer && toggle) {
        question.addEventListener("click", () => {
          faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
              const otherAnswer = otherItem.querySelector(".faq-answer");
              const otherToggle = otherItem.querySelector(".faq-toggle");
              if (otherAnswer && otherAnswer.classList.contains("active")) {
                otherAnswer.classList.remove("active");
                if (otherToggle) otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
              }
            }
          });

          answer.classList.toggle("active");
          toggle.innerHTML = answer.classList.contains("active")
            ? '<i class="fas fa-minus"></i>'
            : '<i class="fas fa-plus"></i>';
        });
      }
    });
  }

  // Price category tabs functionality
  const categoryTabs = document.querySelectorAll(".category-tab");
  const priceTables = document.querySelectorAll(".price-table");

  if (categoryTabs.length > 0 && priceTables.length > 0) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        categoryTabs.forEach((t) => t.classList.remove("active"));
        priceTables.forEach((table) => table.classList.remove("active"));

        this.classList.add("active");

        const category = this.getAttribute("data-category");
        const table = category ? document.getElementById(category) : null;
        if (table) table.classList.add("active");
      });
    });
  }

  // ---------------------------------------
  // Tracking klikova na .trackcall
  // ---------------------------------------
  document.querySelectorAll(".trackcall").forEach((el) => {
    el.addEventListener("click", () => {
      const payload = JSON.stringify({ time: new Date().toISOString(), call: 1 });

      fetch("https://bobanwebmaker.com/private/domaca-hrana.php", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    });
  });
});

// ---------------------------------------
// INTERACTIVE CURSOR (pokreni samo ako postoji)
// ---------------------------------------
const $context = document.body;
const $circle = document.querySelector("#circle");
const interactive = document.querySelector(".interactive");
const $divs = document.querySelectorAll(".interactive .interactive-div");

if ($circle && interactive && $divs.length > 0) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let onDiv = false;
  let hoveringDiv = null;
  const easing = 0.1;

  $context.addEventListener(
    "pointermove",
    (evt) => {
      if (!onDiv) {
        targetX = evt.clientX - $circle.offsetWidth / 2;
        targetY = evt.clientY + window.scrollY - $circle.offsetHeight / 2;
      }
    },
    { passive: true }
  );

  function animateCircle() {
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;

    $circle.style.setProperty("--xpos", `${currentX}px`);
    $circle.style.setProperty("--ypos", `${currentY}px`);

    requestAnimationFrame(animateCircle);
  }
  animateCircle();

  // Jedan observer za sve divove
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.style.pointerEvents = entry.isIntersecting ? "auto" : "none";
      });
    },
    { threshold: 0.1 }
  );

  $divs.forEach((div) => {
    observer.observe(div);

    div.addEventListener("mouseenter", () => {
      const rect = div.getBoundingClientRect();

      const finalWidth = rect.width + 30;
      const finalHeight = rect.height + 30;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + window.scrollY + rect.height / 2;

      targetX = centerX - finalWidth / 2;
      targetY = centerY - finalHeight / 2;

      if (!onDiv || hoveringDiv !== div) {
        $circle.style.width = `${finalWidth}px`;
        $circle.style.height = `${finalHeight}px`;
        $circle.style.borderRadius = "22px";
      }

      onDiv = true;
      hoveringDiv = div;
    });

    div.addEventListener("mouseleave", (evt) => {
      if (hoveringDiv === div) {
        onDiv = false;
        hoveringDiv = null;

        $circle.style.width = "var(--circleSize)";
        $circle.style.height = "var(--circleSize)";
        $circle.style.borderRadius = "50%";

        targetX = evt.clientX - $circle.offsetWidth / 2;
        targetY = evt.clientY + window.scrollY - $circle.offsetHeight / 2;
      }
    });
  });
}