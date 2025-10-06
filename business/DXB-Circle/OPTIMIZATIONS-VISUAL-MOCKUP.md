# Optimizations UI/UX - Visual Mockup & Wireframes

**Date:** October 5, 2025  
**Purpose:** Visualize navigation and page layouts before building

---

## 📐 Navigation Mockup

### **Option A: Top-Level Navigation (RECOMMENDED)**

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  🔵 Circle Property                                                        │
│                                                                            │
│  [Home]  [Invest]  [Own]  [Develop]  [Optimizations] 🆕  [Services]  [Trends]  │
│                                                  ↑                         │
│                                       NEW BADGE HERE                       │
│                                                              [Subscribe] [Book Call] │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**On Hover: "Optimizations"**
```
┌─────────────────────────────────┐
│  LP/MILP solvers for decisions  │
│  ▼                              │
└─────────────────────────────────┘
```

---

## 🎨 Landing Page Layout (`/optimizations`)

```
┌─────────────────────────────────────────────────────────────────────┐
│                          HERO SECTION                               │
│                     (Gradient Blue Background)                      │
│                                                                     │
│                    Find Your Optimal Solution                       │
│                                                                     │
│   Industrial-grade optimization with full transparency.             │
│   See what constrains your plan and what moves the needle—         │
│   backed by the same math used by Bloomberg and FactSet.           │
│                                                                     │
│          [Try Sample Data]     [Book Expert Review]                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                       VALUE PROPOSITIONS                            │
│                                                                     │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│   │   🎯    │  │   📊    │  │   🤖    │  │   📥    │            │
│   │Powerful │  │  Full   │  │   AI    │  │  Real   │            │
│   │  Math   │  │Transpar.│  │Assist.  │  │ Outputs │            │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         MODULE CARDS                                │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐                        │
│  │  📊 Deal Picker │  │ 💰 Debt Stack   │                        │
│  │                 │  │                 │                        │
│  │  Pick the best  │  │  Hit LTV/DSCR   │                        │
│  │  basket of deals│  │  at lowest cost │                        │
│  │                 │  │                 │                        │
│  │  [LP Solver]    │  │  [LP Solver]    │                        │
│  │  ~2-5s          │  │  ~2-5s          │                        │
│  │                 │  │                 │                        │
│  │ [Optimize →]    │  │ [Optimize →]    │                        │
│  └─────────────────┘  └─────────────────┘                        │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐                        │
│  │ 🏗️ Capex Phasing│  │ 📝 Leasing Mix  │                        │
│  │                 │  │                 │                        │
│  │  Phase refurb   │  │  Balance occ.   │                        │
│  │  to max uplift  │  │  WAULT & incent.│                        │
│  │                 │  │                 │                        │
│  │  [MILP Solver]  │  │  [LP Solver]    │                        │
│  │  ~10-30s        │  │  ~2-5s          │                        │
│  │                 │  │                 │                        │
│  │ [Plan Capex →]  │  │ [Optimize →]    │                        │
│  └─────────────────┘  └─────────────────┘                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      HOW IT WORKS                                   │
│                                                                     │
│   [1. Upload Data] → [2. Set Constraints] → [3. Review Results]   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Deal Picker Page Layout (`/optimizations/deal-picker`)

### **Step 1: Input Data**

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Deal Picker                               │
│  Maximize portfolio yield within budget and diversification         │
│                                                                     │
│  ● Step 1: Input Data  ○ Step 2: Run Solver  ○ Step 3: Results    │
│  ───────────────────                                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  UPLOAD OR ENTER DATA                                              │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  📎 Upload CSV                                             │   │
│  │  [Drop file here or click to browse]                      │   │
│  │  Template: deal_picker_template.csv                       │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  OR                                                                │
│                                                                     │
│  Budget (AED)       [50,000,000]  ⓘ Total capital available       │
│                                                                     │
│  Objective          [ Cash Yield ▾ ]                               │
│                     Options: Cash Yield | Risk-Adjusted Yield      │
│                                                                     │
│  ┌─ Constraints (Optional) ─────────────────────────────────┐     │
│  │                                                           │     │
│  │  Max Office Allocation:  [40%]  ⓘ Diversification cap    │     │
│  │  Max Downtown Allocation: [30%] ⓘ Geographic cap          │     │
│  │  Risk Penalty per Point:  [0.0] ⓘ Risk adjustment factor │     │
│  │                                                           │     │
│  └───────────────────────────────────────────────────────────┘     │
│                                                                     │
│  ┌─ Deals (Add Manually) ─────────────────────────────────┐       │
│  │                                                         │       │
│  │  Deal ID  │ Price (AED) │ NOI (AED) │ Sector │ City   │       │
│  │  ────────│────────────│───────────│────────│────────│       │
│  │  DEAL-001 │ 15,000,000 │   900,000 │ Office │ Downtown│       │
│  │  DEAL-002 │ 20,000,000 │ 1,400,000 │ Resi   │ Marina  │       │
│  │  + Add Deal                                             │       │
│  │                                                         │       │
│  └─────────────────────────────────────────────────────────┘       │
│                                                                     │
│  [Load Sample Data]  [Clear All]                                   │
│                                                                     │
│                          [Continue to Optimize →]                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### **Step 2: Running**

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Deal Picker                               │
│                                                                     │
│  ○ Step 1: Input Data  ● Step 2: Run Solver  ○ Step 3: Results    │
│                        ──────────────────                          │
│                                                                     │
│                                                                     │
│                        ┌─────────────┐                             │
│                        │   Loading   │                             │
│                        │   Spinner   │                             │
│                        └─────────────┘                             │
│                                                                     │
│                   Running optimization...                           │
│                   This typically takes 2-5 seconds                  │
│                                                                     │
│                   Solving LP with 15 deals                          │
│                   Budget: AED 50M                                   │
│                   Constraints: 8                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### **Step 3: Results**

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Deal Picker                               │
│                                                                     │
│  ○ Step 1: Input Data  ○ Step 2: Run Solver  ● Step 3: Results    │
│                                                ─────────────────   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  ✅ OPTIMIZATION COMPLETE                                           │
│                                                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ │
│  │ Capital Used │ │  Cash Yield  │ │Assets Selected│ │  Status  │ │
│  │              │ │              │ │              │ │          │ │
│  │ AED 48.5M    │ │    6.85%     │ │      12      │ │ Optimal  │ │
│  │ 97% of budget│ │  Weighted    │ │ Out of 15    │ │          │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📊 ALLOCATIONS                                                     │
│                                                                     │
│  Deal ID    │ Capital (AED) │ Weight │ Yield │ Expected NOI      │ │
│  ───────────│───────────────│────────│───────│──────────────────│ │
│  DEAL-001   │    15,000,000 │   30%  │ 6.0%  │      900,000     │ │
│  DEAL-002   │    20,000,000 │   40%  │ 7.0%  │    1,400,000     │ │
│  DEAL-005   │     8,500,000 │   17%  │ 7.2%  │      612,000     │ │
│  DEAL-007   │     5,000,000 │   10%  │ 6.8%  │      340,000     │ │
│  ───────────│───────────────│────────│───────│──────────────────│ │
│  TOTAL      │    48,500,000 │  97%   │ 6.85% │    3,252,000     │ │
│                                                                     │
│  [Download CSV]  [View Full Table]                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  ⚠️ WHAT CONSTRAINED YOUR PLAN                                     │
│                                                                     │
│  The following constraints are binding (slack ≈ 0):                │
│                                                                     │
│  ▸ Budget Cap                    Slack: 0.00     ← BINDING         │
│    You used all available capital                                  │
│                                                                     │
│  ▸ Max Office Allocation 40%     Slack: 0.03     ← NEAR BINDING    │
│    You're at the diversification limit for Office                  │
│                                                                     │
│  ▸ Max Downtown Allocation 30%   Slack: 2.15     ← Not binding     │
│    You have room to add more Downtown deals                        │
│                                                                     │
│  💡 Tip: Constraints with zero slack are limiting your yield.      │
│     To improve, relax these guardrails.                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  💡 SHADOW PRICES (WHAT MOVES THE NEEDLE)                          │
│                                                                     │
│  These show the marginal benefit of relaxing each constraint:      │
│                                                                     │
│  📈 Budget: +AED 1,000,000 → +0.068% yield (AED 68,000 more NOI)   │
│  📈 Max Office: +1% → +0.015% yield (AED 15,000 more NOI)          │
│                                                                     │
│  💡 Tip: Focus on the constraints with highest shadow prices.      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  🔮 WHAT-IF SCENARIOS                                              │
│                                                                     │
│  Try these variations to see potential improvements:               │
│                                                                     │
│  ┌────────────────────────────────────────────────────────┐       │
│  │ ▸ Increase budget by AED 5M → +0.34% yield (Est.)     │       │
│  │   [Run This Scenario]                                  │       │
│  └────────────────────────────────────────────────────────┘       │
│                                                                     │
│  ┌────────────────────────────────────────────────────────┐       │
│  │ ▸ Relax Office cap to 50% → +0.15% yield (Est.)       │       │
│  │   [Run This Scenario]                                  │       │
│  └────────────────────────────────────────────────────────┘       │
│                                                                     │
│  ┌────────────────────────────────────────────────────────┐       │
│  │ ▸ Add risk penalty 0.5 per point → See safer mix      │       │
│  │   [Run This Scenario]                                  │       │
│  └────────────────────────────────────────────────────────┘       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📥 DOWNLOADS                                                       │
│                                                                     │
│  [📊 Download XLSX Plan]  [📄 Download CSV]  [📋 Share Link]       │
│                                                                     │
│  Files expire in 30 days. Results saved to your history.           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  NEXT STEPS                                                         │
│                                                                     │
│  [Run Another Optimization]  [Book Expert Review]  [Commit to Ops] │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📱 Mobile View (Responsive)

### **Landing Page (Mobile)**

```
┌──────────────────────────┐
│  ☰  Circle Property      │
├──────────────────────────┤
│                          │
│  Find Your Optimal       │
│  Solution                │
│                          │
│  Industrial-grade        │
│  optimization...         │
│                          │
│  [Try Sample Data]       │
│                          │
├──────────────────────────┤
│  ┌──────────────────┐   │
│  │  🎯 Powerful     │   │
│  │     Math         │   │
│  └──────────────────┘   │
│                          │
│  ┌──────────────────┐   │
│  │  📊 Full         │   │
│  │  Transparency    │   │
│  └──────────────────┘   │
│                          │
├──────────────────────────┤
│  ┌──────────────────┐   │
│  │ 📊 Deal Picker   │   │
│  │                  │   │
│  │ Pick the best    │   │
│  │ basket of deals  │   │
│  │                  │   │
│  │ [LP] ~2-5s       │   │
│  │                  │   │
│  │ [Optimize →]     │   │
│  └──────────────────┘   │
│                          │
│  ┌──────────────────┐   │
│  │ 💰 Debt Stack    │   │
│  │ ...              │   │
│  └──────────────────┘   │
│                          │
│  (Scroll for more)       │
│                          │
└──────────────────────────┘
```

---

## 🎨 Color Palette

### **Module Colors**

```css
/* Deal Picker - Blue */
--deal-picker-primary: #2563eb;
--deal-picker-light: #dbeafe;
--deal-picker-dark: #1e40af;

/* Debt Stack - Green */
--debt-stack-primary: #16a34a;
--debt-stack-light: #dcfce7;
--debt-stack-dark: #15803d;

/* Capex Phasing - Orange */
--capex-primary: #ea580c;
--capex-light: #ffedd5;
--capex-dark: #c2410c;

/* Leasing Mix - Purple */
--leasing-primary: #9333ea;
--leasing-light: #f3e8ff;
--leasing-dark: #7e22ce;
```

### **Status Colors**

```css
/* Status Indicators */
--status-success: #16a34a;  /* Green */
--status-warning: #eab308;  /* Yellow */
--status-error: #dc2626;    /* Red */
--status-info: #2563eb;     /* Blue */

/* Binding Constraints */
--binding-color: #dc2626;   /* Red - tight constraint */
--near-binding: #eab308;    /* Yellow - almost tight */
--slack-color: #16a34a;     /* Green - has slack */
```

---

## 🔤 Typography

### **Headings**

```css
/* Page Title */
h1 {
  font-size: 2.5rem;  /* 40px */
  font-weight: 700;
  line-height: 1.2;
  color: #0f172a;  /* slate-900 */
}

/* Section Title */
h2 {
  font-size: 2rem;  /* 32px */
  font-weight: 700;
  line-height: 1.3;
  color: #1e293b;  /* slate-800 */
}

/* Card Title */
h3 {
  font-size: 1.5rem;  /* 24px */
  font-weight: 600;
  line-height: 1.4;
  color: #334155;  /* slate-700 */
}
```

### **Body Text**

```css
/* Primary Text */
body {
  font-size: 1rem;  /* 16px */
  line-height: 1.6;
  color: #475569;  /* slate-600 */
}

/* Small Text (subtitles, captions) */
.text-sm {
  font-size: 0.875rem;  /* 14px */
  color: #64748b;  /* slate-500 */
}

/* Tiny Text (tooltips, footnotes) */
.text-xs {
  font-size: 0.75rem;  /* 12px */
  color: #94a3b8;  /* slate-400 */
}
```

---

## 📐 Spacing & Layout

### **Container Widths**

```css
/* Desktop */
.container {
  max-width: 1280px;  /* 80rem */
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Narrow (forms, results) */
.container-narrow {
  max-width: 768px;  /* 48rem */
}

/* Wide (dashboards, tables) */
.container-wide {
  max-width: 1536px;  /* 96rem */
}
```

### **Section Padding**

```css
/* Large sections */
section {
  padding: 5rem 0;  /* 80px */
}

/* Medium sections */
.section-md {
  padding: 3rem 0;  /* 48px */
}

/* Small sections */
.section-sm {
  padding: 2rem 0;  /* 32px */
}
```

---

## 🎭 Animations & Transitions

### **Button Hover**

```css
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

### **Card Hover**

```css
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  border-color: var(--module-color);
}
```

### **Loading Spinner**

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

---

## 🎯 Key Interactions

### **1. Sample Data Button**
- **Hover:** Background lightens
- **Click:** Button text changes to "Loading..."
- **Effect:** Form fields populate with sample data
- **Feedback:** Toast notification "Sample data loaded"

### **2. Run Optimization Button**
- **Hover:** Lift effect + shadow
- **Click:** Disabled + spinner appears
- **Processing:** Step indicator updates
- **Complete:** Smooth scroll to results

### **3. Download Files**
- **Hover:** Icon animates (bounce)
- **Click:** Immediate download starts
- **Feedback:** Toast "File downloaded"
- **File:** Opens in new tab or downloads

### **4. What-If Scenarios**
- **Hover:** Card highlights
- **Click:** Duplicates current run with modified inputs
- **Effect:** Comparison view side-by-side
- **Option:** Toggle between runs

---

## ✅ Accessibility

### **Keyboard Navigation**

```
Tab       → Next interactive element
Shift+Tab → Previous interactive element
Enter     → Activate button/link
Escape    → Close modal
Space     → Toggle checkbox/radio
Arrow keys → Navigate within groups
```

### **ARIA Labels**

```html
<button aria-label="Run optimization">
  Optimize
</button>

<div role="status" aria-live="polite">
  Optimization complete. Results loaded.
</div>

<section aria-labelledby="results-heading">
  <h2 id="results-heading">Results</h2>
  ...
</section>
```

### **Color Contrast**

- All text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements have clear focus indicators
- Icons have text labels or aria-labels

---

## 🎬 User Flow Animation

### **Complete Journey (Animated)**

```
[User lands on /optimizations]
          ↓
[Sees 4 module cards + hero]
          ↓
[Clicks "Deal Picker"]
          ↓
[Sees 3-step wizard]
          ↓
[Clicks "Load Sample Data"]
  → Form populates (animated)
  → Toast: "Sample data loaded"
          ↓
[Reviews sample data]
          ↓
[Clicks "Run Optimization"]
  → Button disabled
  → Step 2 activates
  → Loading spinner
          ↓
[Wait 2-5 seconds]
          ↓
[Results appear (fade in)]
  → Step 3 activates
  → KPIs count up (animated)
  → Charts draw (animated)
  → Scroll to results (smooth)
          ↓
[Reviews results]
  → Sees allocations table
  → Sees binding constraints (highlighted)
  → Sees shadow prices (tooltips)
          ↓
[Clicks "Download XLSX"]
  → File downloads
  → Toast: "File downloaded"
          ↓
[Clicks "Run Another" or "What-If"]
```

---

**This mockup provides a complete visual reference for building the UI!**

Next steps:
1. Approve the navigation structure
2. Approve the visual design
3. Start building the landing page
4. Implement Deal Picker page

Let me know which elements you'd like to adjust! 🎨

