document.documentElement.classList.add("js");

(function () {
  const mainNav = document.getElementById("mainNav");
  const menuToggle = document.getElementById("menuToggle");
  const contactForm = document.getElementById("contactForm");
  const navLinks = document.querySelectorAll(".nav-a");

  menuToggle?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => mainNav.classList.remove("open"));
  });

  const sections = document.querySelectorAll("main section[id]");
  function updateNav() {
    let id = "home";
    const y = window.scrollY + 140;
    sections.forEach((s) => {
      if (s.offsetTop <= y) id = s.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
    });
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  const counters = document.querySelectorAll(".count[data-count]");
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        let n = 0;
        const step = () => {
          n += Math.ceil(target / 30);
          if (n >= target) {
            el.textContent = target;
            return;
          }
          el.textContent = n;
          requestAnimationFrame(step);
        };
        step();
        counterObs.unobserve(el);
      });
    },
    { threshold: 0.3 }
  );
  counters.forEach((el) => counterObs.observe(el));

  document.querySelectorAll(".block-head, .bento-item, .news-item").forEach((el) => {
    el.classList.add("fade-up");
  });
  const fadeObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          fadeObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll(".fade-up").forEach((el) => fadeObs.observe(el));

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject = "Inquiry from Chenghui Glass Website";
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:RaheemiObaied529@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
