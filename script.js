(() => {
  "use strict";

  const header = document.querySelector("#site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector("#primary-navigation");
  const navAnchors = document.querySelectorAll("#primary-navigation a");
  const revealItems = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("main section[id]");

  /*
   * Sticky header state
   * Adds the "is-scrolled" class after the user moves down the page.
   */
  const updateHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeaderState();

  window.addEventListener("scroll", updateHeaderState, {
    passive: true
  });

  /*
   * Mobile navigation
   */
  const closeMenu = () => {
    if (!navToggle || !navLinks) return;

    navToggle.classList.remove("is-open");
    navLinks.classList.remove("is-open");

    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("is-open");

    navLinks?.classList.toggle("is-open", isOpen);

    navToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  /*
   * Close mobile menu after clicking a navigation link.
   */
  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", closeMenu);
  });

  /*
   * Scroll reveal animations
   *
   * Elements with the `.reveal` class start hidden in CSS.
   * IntersectionObserver adds `.is-visible` when they enter
   * the viewport.
   */
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

    /*
     * Active navigation section
     *
     * Highlights the navigation link corresponding to
     * the section currently visible on screen.
     */
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.getAttribute("id");

          navAnchors.forEach((anchor) => {
            const target = anchor.getAttribute("href");

            anchor.classList.toggle(
              "is-active",
              target === `#${sectionId}`
            );
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  } else {
    /*
     * Fallback for older browsers without IntersectionObserver.
     */
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  /*
   * Escape key closes the mobile navigation.
   */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
})();