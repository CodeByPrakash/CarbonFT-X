# 🌍 CarbonWise

**A full-featured carbon footprint tracking and sustainability education web app.**

Built for the **PromptWars** hackathon (Google for Developers × Hack2Skill).

🔗 **Live Demo:** Vercel - [Carbon-Wise](https://carbon-ft-x.vercel.app/) | Kimi - [qzdh3d6q6ehpu.kimi.page](https://qzdh3d6q6ehpu.kimi.page)
💻 **Repository:** [github.com/CodeByPrakash/CarbonFT-X](https://github.com/CodeByPrakash/CarbonFT-X)

---

## ✨ What It Does

CarbonWise turns carbon footprint tracking into something interactive, visual, and genuinely educational — not just a number on a dashboard. It's built around six connected experiences:

### 🌍 Hero
An immersive dark-themed entry point with an animated Canvas globe — a rotating Earth with orbiting leaf particles, twinkling stars, and mouse-reactive parallax — plus animated stat counters and gradient CTAs.

### 📝 Track
Tabbed activity logging across four categories — **Transport, Food, Energy, Shopping** — with real-time CO2 impact calculations, sliders, dropdowns, and a live summary panel showing today's footprint with a color-coded breakdown bar.

### 📊 Dashboard
A rich analytics hub featuring:
- Animated carbon score ring (0–100)
- Recharts area chart for footprint trends
- Weekly goal progress bar
- Donut chart for category breakdown
- 6-badge achievement grid
- Personalized eco-tips
- Weekly comparison bar chart

### 🗺️ Visualize
An interactive SVG world map with color-coded emission intensity, hover tooltips, and click-to-detail country panels — plus global stats cards and side-by-side perspective comparisons (flight vs. commute, food choices, energy sources).

### 📚 Learn
A dark-themed educational hub with:
- A 5-question interactive climate quiz with progress tracking and a result rating
- A "Day in Your Life" simulator — build a daily schedule and watch the carbon total update live
- 6 flip cards revealing climate myths vs. facts with 3D CSS transitions

### ⚡ Take Action
A filterable grid of 9 eco-action cards with category badges, impact levels, and difficulty ratings. Includes a "My Commitments" panel tracking total CO2 savings and a community impact counter.

---

## 🛠️ Tech Stack

| Layer | Tools |
|---|---|
| Framework | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | GSAP + ScrollTrigger, Lenis (smooth scroll) |
| Data Viz | Recharts, Canvas API (globe) |
| Persistence | LocalStorage (activities & commitments) |
| Design | Custom forest-green / eco-accent color palette |

Fully responsive — sidebar on desktop, top bar + bottom nav on mobile.

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/CodeByPrakash/CarbonFT-X.git
cd CarbonFT-X

# Install dependencies
npm install

# Run the dev server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Author

**Prakash** ([@CodeByPrakash](https://github.com/CodeByPrakash))
Built for PromptWars — a vibe-coding hackathon by Google for Developers × Hack2Skill.
