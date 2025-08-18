/* HOTFIX v11.6 (layout-only) */
(function () {
  const tag = "HOTFIX v11.6 loaded";
  if (window.__ivc_v116_hotfix__) return;
  window.__ivc_v116_hotfix__ = true;
  console.log(tag);

  const ready = (fn)=> (document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true })
    : fn());

  ready(() => {
    // 1) Make the "Output Preview" card visually taller and not scroll-clipped
    const isOP = (el) => /(^|\s)Output\s+Preview(\s|$)/i.test((el.textContent||"").trim());
    const opHeader = Array.from(document.querySelectorAll("h1,h2,h3,div,span")).find(isOP);
    if (opHeader) {
      let card = opHeader;
      // climb to the nearest card-like container
      while (card && card !== document.body) {
        const s = getComputedStyle(card);
        const looksCard = (s.borderRadius !== "0px" && s.backgroundColor !== "rgba(0, 0, 0, 0)");
        if (looksCard) break;
        card = card.parentElement;
      }
      if (card && card !== document.body) {
        // make it tall and non-scrolling
        card.style.minHeight = "720px";       // increase height
        card.style.maxHeight = "none";
        card.style.overflow = "visible";
      }
    }

    // 2) Ensure "TEE Applicable" checkbox is OFF by default
    const teeTextEl = Array.from(document.querySelectorAll("label,div,span,p")).find(
      el => /TEE\s+Applicable/i.test(el.textContent || "")
    );
    if (teeTextEl) {
      const box = teeTextEl.closest("*")?.querySelector('input[type="checkbox"]');
      if (box) box.checked = false;
    }

    // 3) Add a small bottom padding so basement tables never overlap
    const root = document.getElementById("root") || document.body;
    root.style.paddingBottom = "120px";
  });
})();
