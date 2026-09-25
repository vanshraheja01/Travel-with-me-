// Scroll-reveal ported from AI Resume Analyzer (components/ui/scroll-reveal.tsx).
// Adds `.show` to every `.scroll-reveal` element once it enters the viewport.
(function () {
  var items = document.querySelectorAll(".scroll-reveal");

  items.forEach(function (el) {
    var index = parseInt(el.getAttribute("data-reveal-index") || "0", 10);
    el.style.setProperty("--reveal-delay", Math.min(index, 8) * 0.08 + "s");
  });

  if (typeof IntersectionObserver === "undefined") {
    requestAnimationFrame(function () {
      items.forEach(function (el) { el.classList.add("show"); });
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  // Scroll progress bar + sticky navbar
  var progress = document.querySelector(".scroll-progress");
  var navbar = document.querySelector(".navbar");

  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 120);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
