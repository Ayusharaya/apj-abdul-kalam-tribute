/**
 * Dr. A.P.J. Abdul Kalam Tribute Page
 * Interactive Quotes Switcher, Mobile Navigation, and Scroll Behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // Inspiring Quotes Data & Switcher
  // -------------------------------------------------------------------------
  const quotes = [
    {
      text: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
      source: "Address to Students"
    },
    {
      text: "If you want to shine like a sun, first burn like a sun.",
      source: "Inspiring Thoughts"
    },
    {
      text: "Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great.",
      source: "Indomitable Spirit"
    },
    {
      text: "To succeed in your mission, you must have single-minded devotion to your goal.",
      source: "Wings of Fire"
    },
    {
      text: "Failure will never overtake me if my determination to succeed is strong enough.",
      source: "Address at IIT Madras"
    },
    {
      text: "You cannot change your future, but you can change your habits, and surely your habits will change your future.",
      source: "Ignited Minds"
    }
  ];

  let currentQuoteIndex = 0;
  let quoteInterval = null;

  const quoteTextElem = document.getElementById('activeQuoteText');
  const prevBtn = document.getElementById('prevQuoteBtn');
  const nextBtn = document.getElementById('nextQuoteBtn');
  const dotsContainer = document.getElementById('quoteDots');

  // Generate pagination dots
  if (dotsContainer) {
    quotes.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `quote-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to quote ${idx + 1}`);
      dot.addEventListener('click', () => {
        setQuote(idx);
        resetQuoteTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateQuoteDisplay() {
    if (!quoteTextElem) return;

    // Smooth fade effect
    quoteTextElem.style.opacity = '0';
    setTimeout(() => {
      quoteTextElem.textContent = `"${quotes[currentQuoteIndex].text}"`;
      quoteTextElem.style.opacity = '1';

      // Update dot active states
      const dots = dotsContainer ? dotsContainer.querySelectorAll('.quote-dot') : [];
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentQuoteIndex);
      });
    }, 200);
  }

  function setQuote(index) {
    currentQuoteIndex = (index + quotes.length) % quotes.length;
    updateQuoteDisplay();
  }

  function nextQuote() {
    setQuote(currentQuoteIndex + 1);
  }

  function prevQuote() {
    setQuote(currentQuoteIndex - 1);
  }

  function resetQuoteTimer() {
    if (quoteInterval) clearInterval(quoteInterval);
    quoteInterval = setInterval(nextQuote, 7000);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextQuote();
      resetQuoteTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevQuote();
      resetQuoteTimer();
    });
  }

  // Start auto-rotation
  resetQuoteTimer();

  // -------------------------------------------------------------------------
  // Mobile Navigation Toggle
  // -------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------------------------------------------------------------------------
  // Back to Top Button
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // Theme Switcher (Dark / Light Mode)
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('kalam_tribute_theme') || 'light';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      if (themeIcon) themeIcon.innerHTML = '&#9728;'; // Sun icon
    } else {
      document.body.classList.remove('dark-theme');
      if (themeIcon) themeIcon.innerHTML = '&#9790;'; // Moon icon
    }
  }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-theme');
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('kalam_tribute_theme', newTheme);
    });
  }

  // -------------------------------------------------------------------------
  // Interactive Virtual Homage (Diya & Flower Offering)
  // -------------------------------------------------------------------------
  const lightDiyaBtn = document.getElementById('lightDiyaBtn');
  const offerFlowerBtn = document.getElementById('offerFlowerBtn');
  const diyaFlame = document.getElementById('diyaFlame');
  const diyaGlow = document.getElementById('diyaGlow');
  const diyaBtnText = document.getElementById('diyaBtnText');
  const diyaBtnIcon = document.getElementById('diyaBtnIcon');
  const tributeCountElem = document.getElementById('tributeCount');
  const tributeMessage = document.getElementById('tributeMessage');

  let tributeCount = parseInt(localStorage.getItem('kalam_tribute_count')) || 0;
  let isDiyaLit = localStorage.getItem('kalam_diya_lit') === 'true';

  if (tributeCountElem) {
    tributeCountElem.textContent = tributeCount.toLocaleString();
  }

  function updateDiyaVisuals() {
    if (isDiyaLit) {
      diyaFlame?.classList.add('lit');
      diyaGlow?.classList.add('active');
      if (diyaBtnText) diyaBtnText.textContent = 'Lamp is Shining';
      if (diyaBtnIcon) diyaBtnIcon.innerHTML = '&#10024;';
      if (tributeMessage) tributeMessage.textContent = 'Thank you for lighting the lamp of wisdom in memory of Dr. Kalam!';
    } else {
      diyaFlame?.classList.remove('lit');
      diyaGlow?.classList.remove('active');
      if (diyaBtnText) diyaBtnText.textContent = 'Light the Lamp';
      if (diyaBtnIcon) diyaBtnIcon.innerHTML = '&#129524;';
    }
  }

  updateDiyaVisuals();

  if (lightDiyaBtn) {
    lightDiyaBtn.addEventListener('click', () => {
      isDiyaLit = !isDiyaLit;
      localStorage.setItem('kalam_diya_lit', isDiyaLit);
      if (isDiyaLit) {
        tributeCount += 1;
        localStorage.setItem('kalam_tribute_count', tributeCount);
        if (tributeCountElem) tributeCountElem.textContent = tributeCount.toLocaleString();
      }
      updateDiyaVisuals();
    });
  }

  // Floating rose flowers animation
  if (offerFlowerBtn) {
    offerFlowerBtn.addEventListener('click', (e) => {
      tributeCount += 1;
      localStorage.setItem('kalam_tribute_count', tributeCount);
      if (tributeCountElem) tributeCountElem.textContent = tributeCount.toLocaleString();

      if (tributeMessage) {
        tributeMessage.textContent = 'A flower of deep gratitude offered to the People\'s President.';
      }

      // Create floating flower element
      const flower = document.createElement('div');
      flower.className = 'floating-flower';
      flower.textContent = '🌹';
      const rect = offerFlowerBtn.getBoundingClientRect();
      flower.style.left = `${rect.left + rect.width / 2}px`;
      flower.style.top = `${rect.top}px`;
      flower.style.setProperty('--dx', `${(Math.random() - 0.5) * 120}px`);
      flower.style.setProperty('--rot', `${(Math.random() - 0.5) * 90}deg`);

      document.body.appendChild(flower);
      setTimeout(() => flower.remove(), 2400);
    });
  }
});

