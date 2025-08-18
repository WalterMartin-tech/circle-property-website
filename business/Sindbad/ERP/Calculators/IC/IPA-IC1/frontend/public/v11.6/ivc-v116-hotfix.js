/* v11.6 UI hotfix: default TEE OFF, hide TEE note in Insurance, taller Output Preview */
(function () {
  function byText(root, exact) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let n; while ((n = w.nextNode())) {
      if (n.nodeValue.trim() === exact) return n.parentElement;
    }
    return null;
  }
  function setTEEOff() {
    const label = byText(document, "TEE Applicable");
    const box = label?.closest("div,section,fieldset,form")?.querySelector('input[type="checkbox"]');
    if (box) {
      box.checked = false;
      box.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  function hideInsuranceTEEMessage() {
    const candidates = [
      "TEE defaults to off; Y2/Y3 posted for preview only.",
      "TEE defaults to off. Y2/Y3 posted for preview only.",
      "TEE defaults to off; Y2/Y3 captured for preview."
    ];
    const all = document.querySelectorAll("small, p, div, span");
    for (const el of all) {
      const t = el.textContent?.trim();
      if (t && candidates.includes(t)) el.style.display = "none";
    }
  }
  function growOutputCard() {
    const h = byText(document, "Output Preview");
    if (!h) return false;
    const card = h.closest(".rounded-2xl, .rounded-xl, .shadow-sm, .border, div");
    if (card) { card.style.minHeight = "560px"; }
    return !!card;
  }
  function init() {
    hideInsuranceTEEMessage();
    setTEEOff();
    if (!growOutputCard()) {
      let tries = 0;
      const t = setInterval(() => { if (growOutputCard() || ++tries > 60) clearInterval(t); }, 200);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
