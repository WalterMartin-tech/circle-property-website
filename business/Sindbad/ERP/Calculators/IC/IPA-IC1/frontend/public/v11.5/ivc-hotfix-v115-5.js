// ivc-hotfix-v115-5 (runs on v11.5 html)
(function () {
  const MARK = 'ivc-hotfix-v115-5';
  if (document.documentElement.classList.contains(MARK)) return;
  document.documentElement.classList.add(MARK);

  const byTxt = (root, txt) => {
    txt = (txt||'').toLowerCase();
    const all = root.querySelectorAll('h1,h2,h3,h4,h5,h6,legend,section,div,span,label');
    for (const n of all) {
      const s = (n.textContent || '').trim().toLowerCase();
      if (s === txt || s.includes(txt)) return n;
    }
    return null;
  };

  // 1) Make Credit Facility preview taller (no scroll)
  (() => {
    const header = byTxt(document, 'Credit Facility (g)');
    if (!header) return;
    const card = header.closest('section,div,article') || header.parentElement;
    if (card) card.classList.add('credit-preview-taller');
  })();

  // 2) Default TEE toggle to OFF (visually and value)
  (() => {
    const tsf = byTxt(document, 'Taxes & Fees (TSF)');
    if (!tsf) return;
    const tsfBox = tsf.closest('section,div,article') || tsf.parentElement;
    if (!tsfBox) return;
    const chk = tsfBox.querySelector('input[type="checkbox"], input[type="radio"]');
    if (chk) {
      chk.checked = false;
      chk.dispatchEvent(new Event('change', { bubbles: true }));
    }
  })();

  // 3) Move Insurance (P) under TSF as a wide card
  (() => {
    const tsf = byTxt(document, 'Taxes & Fees (TSF)');
    const insHdr = byTxt(document, 'Insurance (P)');
    if (!tsf || !insHdr) return;
    const tsfCard = tsf.closest('section,div,article') || tsf.parentElement;
    const insCard = insHdr.closest('section,div,article') || insHdr.parentElement;
    if (!tsfCard || !insCard) return;
    // Normalize card width and place right after TSF
    insCard.classList.add('insurance-as-card');
    tsfCard.insertAdjacentElement('afterend', insCard);
  })();

  // 4) Thousand separators for Insurance amounts (Y1/Y2/Y3)
  (() => {
    const ins = byTxt(document, 'Insurance (P)');
    if (!ins) return;
    const card = ins.closest('section,div,article') || ins.parentElement;
    const candidates = Array.from(card.querySelectorAll('input'))
      .filter(el => el.type === 'text' || el.type === 'number');

    const format = (el) => {
      const raw = (el.value || '').toString().replace(/[^\d.-]/g, '');
      if (raw === '' || raw === '-') return (el.value = '');
      const n = Number(raw);
      if (Number.isFinite(n)) el.value = n.toLocaleString('en-US');
    };

    for (const el of candidates) {
      el.addEventListener('blur', () => format(el));
      // also clean on input (but do NOT reformat cursor each key)
      el.addEventListener('input', () => el.value = el.value.replace(/[^\d,.-]/g,''));
    }
  })();

  console.debug(MARK, 'applied');
})();

// --- v11.5: TEE defaults ---
document.addEventListener('DOMContentLoaded', () => {
  const tee = document.querySelector('#teeToggle, input[name="tee"], #tee');
  if (tee) tee.checked = false;

  // Remove any TEE row accidentally placed in insurance
  const teeInInsurance = document.querySelector('#insurance-section .tee-row, #insurance-section .tee-toggle');
  if (teeInInsurance) teeInInsurance.remove();
});
