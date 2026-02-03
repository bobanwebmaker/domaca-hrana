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
      hamburger.classList.remove("active");
      nav.classList.remove("active");
      body.classList.remove("active");
    });
  });

  // Counters Animation
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // The lower the slower

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-count");
      const count = +counter.innerText;

      // Lower inc to slow and higher to speed up
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  };

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Start counter animation when counter section is in viewport
  const counterSection = document.querySelector(".counter-section");
  if (counterSection) {
    window.addEventListener("scroll", () => {
      if (isInViewport(counterSection)) {
        animateCounters();
      }
    });

    // Check on load as well
    if (isInViewport(counterSection)) {
      animateCounters();
    }
  }

  // Testimonials Slider
  const testimonialSlider = document.querySelector(".testimonials-slider");
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  const sliderDots = document.querySelector(".slider-dots");

  if (testimonialSlider && testimonialSlides.length > 0) {
    let currentSlide = 0;

    // Create dots
    testimonialSlides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      sliderDots.appendChild(dot);
    });

    const dots = document.querySelectorAll(".slider-dot");

    // Show slide
    function showSlide(n) {
      testimonialSlides.forEach((slide, index) => {
        slide.style.display = index === n ? "block" : "none";
        dots[index].classList.toggle("active", index === n);
      });
    }

    // Go to specific slide
    function goToSlide(n) {
      currentSlide = n;
      showSlide(currentSlide);
    }

    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      showSlide(currentSlide);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);

    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    testimonialSlider.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    testimonialSlider.addEventListener("mouseleave", () => {
      slideInterval = setInterval(nextSlide, 5000);
    });

    // Initialize slider
    showSlide(currentSlide);
  }

  // Scroll Animation
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".product-card, .about-content, .about-image, .delivery-card, .partner, .price-categories, .price-tables, .price-notes, .order-cta, .product-content, .product-variants, .product-gallery, .ingredients-section, .order-info, .testimonials-section, .story-section, .values-section, .process-step, .faq-item, .map-section, .contact-section");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;

      if (elementPosition < screenPosition) {
        element.classList.add("fade-in");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Check on load

  // Music Toggle
  const musicToggle = document.querySelector(".music-toggle");
  let audio = null;
  let isPlaying = false;

  if (musicToggle) {
    // Create audio element
    audio = document.createElement("audio");
    audio.src = "mp3/domace.mp3"; // Replace with actual music file
    audio.loop = true;

    musicToggle.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        musicToggle.querySelector(".music-icon").innerHTML = '<i class="fas fa-music"></i>';
      } else {
        audio.play();
        musicToggle.querySelector(".music-icon").innerHTML = '<i class="fas fa-volume-up"></i>';
      }
      isPlaying = !isPlaying;
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // FAQ functionality with smooth transition
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const toggle = item.querySelector('.faq-toggle');
    
      if (question && answer && toggle) {
        question.addEventListener('click', () => {
          // Close all other answers
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              const otherAnswer = otherItem.querySelector('.faq-answer');
              const otherToggle = otherItem.querySelector('.faq-toggle');
              if (otherAnswer && otherAnswer.classList.contains('active')) {
                otherAnswer.classList.remove('active');
                if (otherToggle) {
                  otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
                }
              }
            }
          });
        
          // Toggle current answer
          answer.classList.toggle('active');
          if (answer.classList.contains('active')) {
            toggle.innerHTML = '<i class="fas fa-minus"></i>';
          } else {
            toggle.innerHTML = '<i class="fas fa-plus"></i>';
          }
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
        // Remove active class from all tabs and tables
        categoryTabs.forEach((t) => t.classList.remove("active"));
        priceTables.forEach((table) => table.classList.remove("active"));

        // Add active class to clicked tab
        this.classList.add("active");

        // Show corresponding price table
        const category = this.getAttribute("data-category");
        const table = document.getElementById(category);
        if (table) {
          table.classList.add("active");
        }
      });
    });
  }

  // INTERACTIVE CURSOR
  const $context = document.querySelector("body");
  const $circle = document.querySelector("#circle");
  const $divs = document.querySelectorAll(".interactive .interactive-div");
  const interactive = document.querySelector(".interactive");

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let onDiv = false;
  let hoveringDiv = null;
  const easing = 0.1;

  // Praćenje miša
  $context.addEventListener('pointermove', (evt) => {
    if (!onDiv) {
      const scrollOffsetY = window.scrollY;
      targetX = evt.clientX - $circle.offsetWidth / 2;
      targetY = evt.clientY + scrollOffsetY - $circle.offsetHeight / 2;
    }
  }, { passive: true });
  
  function animateCircle() {
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;

    $circle.style.setProperty("--xpos", `${currentX}px`);
    $circle.style.setProperty("--ypos", `${currentY}px`);

    requestAnimationFrame(animateCircle);
  }

  animateCircle();

  $divs.forEach((div) => {
    div.addEventListener("mouseenter", () => {
      const divRect = div.getBoundingClientRect();
      const scrollOffsetY = window.scrollY; // Kompenzujemo skrol

      const finalWidth = divRect.width + 30;
      const finalHeight = divRect.height + 30;
      const divCenterX = divRect.left + divRect.width / 2;
      const divCenterY = divRect.top + scrollOffsetY + divRect.height / 2;

      targetX = divCenterX - finalWidth / 2;
      targetY = divCenterY - finalHeight / 2;

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
  }); // <-- Ova zagrada je bila problem

  // Koristite Intersection Observer za elemente koji nisu u viewportu
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Onemogućite event listenere za elemente koji nisu vidljivi
        entry.target.style.pointerEvents = 'none';
      } else {
        entry.target.style.pointerEvents = 'auto';
      }
    });
  }, { threshold: 0.1 });

  // OVO JE KLJUČNO: Povezivanje observera sa div elementima
  $divs.forEach(div => {
    observer.observe(div);
  });

  // Praćenje klikova na .trackcall dugmad - slanje na eksterni server
  document.querySelectorAll(".trackcall").forEach(function (el) {
    el.addEventListener("click", function () {
      const payload = JSON.stringify({
        time: new Date().toISOString(),
        call: 1
      });

      fetch("https://bobanwebmaker.com/private/domaca-hrana.php", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: payload,
        keepalive: true
      }).catch(() => {});
    });
  });
});