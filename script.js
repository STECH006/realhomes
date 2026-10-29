document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  if (hamburgerBtn && navMenu) {
    const navLinks = document.querySelectorAll(".nav-links .nav-item");

    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      hamburgerBtn.classList.toggle("active");
      navMenu.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("open");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("open");
      }
    });
  }

  const radiusRange = document.getElementById("radiusRange");
  const radiusValue = document.getElementById("radiusValue");
  const searchForm = document.getElementById("searchForm");

  if (radiusRange && radiusValue) {
    radiusValue.textContent = `${radiusRange.value} miles`;

    radiusRange.addEventListener("input", (e) => {
      radiusValue.textContent = `${e.target.value} miles`;
    });
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const radius = radiusRange ? radiusRange.value : "0";

      alert(`Searching locations within ${radius} miles radius.`);
    });
  }

  const actionButtons = document.querySelectorAll(".action-btn");

  actionButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      btn.classList.toggle("active");
    });
  });

  const pageButtons = document.querySelectorAll(
    ".pagination .page-btn, .pagination .page-num",
  );

  pageButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.tagName.toLowerCase() === "a") {
        return;
      }

      if (
        btn.classList.contains("text-btn") ||
        btn.classList.contains("prev") ||
        btn.classList.contains("next")
      ) {
        return;
      }

      pageButtons.forEach((button) => {
        button.classList.remove("active");
      });

      btn.classList.add("active");
    });
  });

  const scrollBtn = document.getElementById("scrollToTopBtn");

  if (scrollBtn) {
    const toggleScrollButton = () => {
      if (window.scrollY > 300) {
        scrollBtn.style.display = "flex";
      } else {
        scrollBtn.style.display = "none";
      }
    };

    toggleScrollButton();

    window.addEventListener("scroll", toggleScrollButton, {
      passive: true,
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const bannerSection = document.getElementById("bannerSection");
  const bannerBg = document.getElementById("bannerBg");
  const bannerContent = document.querySelector(".banner-content");

  if (bannerSection) {
    if (bannerContent) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              bannerContent.classList.add("visible");

              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        },
      );

      revealObserver.observe(bannerSection);
    }

    if (bannerBg) {
      let ticking = false;

      const updateParallax = () => {
        const rect = bannerSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const speed = 0.25;
          const yPos = (rect.top - windowHeight / 2) * speed;

          bannerBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }

        ticking = false;
      };

      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
          }
        },
        {
          passive: true,
        },
      );

      updateParallax();
    }
  }
});