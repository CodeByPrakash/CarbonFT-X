# CarbonWise — Technical Specification

## Project Overview

CarbonWise is a carbon footprint tracking and sustainability education single-page web application. It features an immersive 3D globe hero, interactive activity tracking forms, data-rich dashboards with charts, an interactive world map, educational quiz/simulator modules, and actionable sustainability tips — all connected by scroll-driven animations and a cohesive visual experience.

---

## Development Environment

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 5.6+ | Type safety |
| Vite | 6 | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| shadcn/ui | latest | UI component primitives |

---

## Dependencies

### Core Framework (pre-installed with shadcn/ui init)

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | React DOM renderer |
| `typescript` | ^5.6.0 | Type checking |
| `vite` | ^6.0.0 | Build tool |
| `tailwindcss` | ^3.4.0 | CSS framework |
| `postcss` | ^8.4.0 | CSS processing |
| `autoprefixer` | ^10.4.0 | CSS vendor prefixes |
| `clsx` | ^2.1.0 | Conditional classnames |
| `tailwind-merge` | ^2.6.0 | Tailwind class merging |
| `class-variance-authority` | ^0.7.0 | Component variant management |
| `lucide-react` | ^0.460.0 | Icon library (shadcn default) |

### Animation

| Package | Version | Purpose |
|---------|---------|---------|
| `gsap` | ^3.12.0 | Core animation engine — timelines, tweens, scroll-driven animations |
| `lenis` | ^1.1.0 | Smooth scroll with inertia for buttery scroll experience |

> **GSAP Plugins Used (all free as of 2025):** ScrollTrigger, SplitText, DrawSVG

### 3D / WebGL

| Package | Version | Purpose |
|---------|---------|---------|
| `three` | ^0.170.0 | 3D engine for animated Earth globe |
| `@react-three/fiber` | ^8.17.0 | React renderer for Three.js |
| `@react-three/drei` | ^9.114.0 | R3F helpers (shader materials, textures, controls) |

### Charts & Data Visualization

| Package | Version | Purpose |
|---------|---------|---------|
| `recharts` | ^2.13.0 | React charting library — line charts, bar charts, area charts |

### Fonts

| Package | Version | Purpose |
|---------|---------|---------|
| `@fontsource/inter` | ^5.0.0 | Primary font (headings + body) |
| `@fontsource/playfair-display` | ^5.0.0 | Accent/quote font |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@types/react` | ^19.0.0 | React type definitions |
| `@types/react-dom` | ^19.0.0 | React DOM type definitions |
| `@types/three` | ^0.170.0 | Three.js type definitions |
| `eslint` | ^9.0.0 | Code linting |
| `@vitejs/plugin-react` | ^4.3.0 | Vite React plugin |

### Full Install Command

```bash
# After shadcn/ui init (React 19 + Vite + TypeScript + Tailwind)

# Animation
npm install gsap lenis

# 3D / WebGL
npm install three @react-three/fiber @react-three/drei

# Charts
npm install recharts

# Fonts
npm install @fontsource/inter @fontsource/playfair-display

# Dev dependencies
npm install -D @types/react @types/react-dom @types three
```

---

## Component Inventory

### shadcn/ui Components

| Component | Source | Usage | Customization |
|-----------|--------|-------|---------------|
| `button` | `npx shadcn add button` | All CTAs, commit buttons, nav actions | Custom variants: primary (gradient pill), secondary (outlined pill), ghost (transparent). Add pill border-radius (50px). |
| `card` | `npx shadcn add card` | Dashboard widgets, action cards, stat cards | Add glass card variant (backdrop-filter blur). Add top-border and left-border accent variants. |
| `input` | `npx shadcn add input` | Track form text fields | Custom focus ring color (#52B788). Add unit selector pairing. |
| `select` | `npx shadcn add select` | Track form dropdowns (fuel type, units) | Custom option list styling with hover states. |
| `slider` | `npx shadcn add slider` | Energy usage slider, renewable % | Custom track/fill colors. Add value tooltip above thumb. |
| `switch` | `npx shadcn add switch` | Round trip toggle, flight toggle | Custom colors (on: #52B788). |
| `badge` | `npx shadcn add badge` | Category badges, impact badges | Custom color variants per category. |
| `tabs` | `npx shadcn add tabs` | Track section category tabs | Pill-style tabs with sliding indicator animation. |
| `progress` | `npx shadcn add progress` | Goal progress bar, quiz progress | Custom colors. Smooth width animation. |
| `tooltip` | `npx shadcn add tooltip` | Chart tooltips, achievement hover, map hover | Glass card styling. Follow-cursor behavior. |
| `toast` | `npx shadcn add toast` | Form submission feedback, notifications | Custom positioning (top-right), auto-dismiss, type variants (success/error/info). |
| `separator` | `npx shadcn add separator` | Footer dividers, section dividers | Custom opacity for dark backgrounds. |
| `scroll-area` | `npx shadcn add scroll-area` | Mobile filter bar, simulator timeline | Horizontal scroll with hidden scrollbar. |
| `sheet` | `npx shadcn add sheet` | Mobile navigation menu, country detail panel | Slide-in from right/bottom. Backdrop blur. |
| `dialog` | `npx shadcn add dialog` | Goal adjustment modal, reminder settings | Scale-in animation. Backdrop fade. |
| `skeleton` | `npx shadcn add skeleton` | Loading states for charts, cards | Shimmer gradient animation. |

### Custom Components

#### Layout

| Component | File | Description |
|-----------|------|-------------|
| `Sidebar` | `components/layout/Sidebar.tsx` | Fixed left nav (240px), dark bg, logo + nav links + user profile. Collapsible to icon-only on tablet. |
| `TopBar` | `components/layout/TopBar.tsx` | Fixed top bar (64px), transparent→solid on scroll, hamburger on mobile. |
| `BottomNav` | `components/layout/BottomNav.tsx` | Mobile bottom tab bar (64px) with center FAB. |
| `PageLayout` | `components/layout/PageLayout.tsx` | Root layout wrapper combining sidebar + topbar + main content area with proper offset. |

#### Hero Section

| Component | File | Description |
|-----------|------|-------------|
| `HeroSection` | `sections/Hero/HeroSection.tsx` | Full-viewport hero with 3D globe, floating particles, text content, stats bar. |
| `GlobeScene` | `sections/Hero/GlobeScene.tsx` | R3F Canvas containing the Earth globe, atmosphere shader, and leaf particle system. |
| `Globe` | `sections/Hero/Globe.tsx` | The 3D Earth mesh with custom shader material (ocean, continents, atmosphere glow). |
| `LeafParticles` | `sections/Hero/LeafParticles.tsx` | 50-80 leaf sprites orbiting the globe at various speeds and inclinations. |
| `StarField` | `sections/Hero/StarField.tsx` | CSS-rendered twinkling stars on dark background. |
| `StatsBar` | `sections/Hero/StatsBar.tsx` | Bottom bar with 3 animated counter stats. |

#### Track Section

| Component | File | Description |
|-----------|------|-------------|
| `TrackSection` | `sections/Track/TrackSection.tsx` | Tabbed activity logging interface. |
| `ActivityForm` | `sections/Track/ActivityForm.tsx` | Main form card rendering fields based on active tab. |
| `FormField` | `sections/Track/FormField.tsx` | Reusable form field with label, input, and real-time impact badge. |
| `ImpactBadge` | `sections/Track/ImpactBadge.tsx` | Live-updating CO2 estimate badge with color coding (coral/amber/sage). |
| `SummaryPanel` | `sections/Track/SummaryPanel.tsx` | Fixed summary showing today's total, breakdown bar, goal progress, motivational message. |
| `CategoryTabs` | `sections/Track/CategoryTabs.tsx` | Horizontal pill tabs for Transport/Food/Energy/Shopping. |

#### Dashboard Section

| Component | File | Description |
|-----------|------|-------------|
| `DashboardSection` | `sections/Dashboard/DashboardSection.tsx` | Grid layout of dashboard widgets. |
| `ScoreCard` | `sections/Dashboard/ScoreCard.tsx` | Circular progress ring with animated score (0-100). |
| `TrendChart` | `sections/Dashboard/TrendChart.tsx` | Recharts line chart with gradient fill, hover tooltips, average line. |
| `GoalProgressCard` | `sections/Dashboard/GoalProgressCard.tsx` | Horizontal progress bar with used/target/remaining stats. |
| `CategoryBreakdown` | `sections/Dashboard/CategoryBreakdown.tsx` | Recharts donut chart with interactive segments and legend. |
| `AchievementsCard` | `sections/Dashboard/AchievementsCard.tsx` | 3x2 grid of achievement icons with locked/unlocked states. |
| `TipsCard` | `sections/Dashboard/TipsCard.tsx` | Personalized insight list with lightbulb icons and "Try it" buttons. |
| `WeeklyComparison` | `sections/Dashboard/WeeklyComparison.tsx` | Recharts bar chart comparing user vs avg vs eco hero. |

#### Visualize Section

| Component | File | Description |
|-----------|------|-------------|
| `VisualizeSection` | `sections/Visualize/VisualizeSection.tsx` | Container for map, carbon cycle, and comparisons. |
| `WorldMap` | `sections/Visualize/WorldMap.tsx` | Interactive SVG choropleth map with country hover/click tooltips and side panel. |
| `CountryPanel` | `sections/Visualize/CountryPanel.tsx` | Slide-in panel showing country detail data (sheet component). |
| `CarbonCycle` | `sections/Visualize/CarbonCycle.tsx` | Scroll-driven animated carbon cycle diagram with SVG arrow draws. |
| `ComparisonSection` | `sections/Visualize/ComparisonSection.tsx` | 3-column comparison cards (flight vs commute, food choices, energy sources). |
| `ComparisonCard` | `sections/Visualize/ComparisonCard.tsx` | Individual comparison card with icon, text, and mini bar chart. |

#### Learn Section

| Component | File | Description |
|-----------|------|-------------|
| `LearnSection` | `sections/Learn/LearnSection.tsx` | Dark section container for 3 learning modules. |
| `QuizModule` | `sections/Learn/QuizModule.tsx` | Multi-step quiz with progress bar, questions, answer options, results with confetti. |
| `DaySimulator` | `sections/Learn/DaySimulator.tsx` | Interactive timeline from 6 AM to 11 PM with activity slots and running total. |
| `MythBuster` | `sections/Learn/MythBuster.tsx` | 3x2 grid of 3D flip cards (myth front / fact back). |
| `FlipCard` | `sections/Learn/FlipCard.tsx` | Individual flip card with CSS 3D rotateY transition. |

#### Take Action Section

| Component | File | Description |
|-----------|------|-------------|
| `ActionSection` | `sections/Action/ActionSection.tsx` | Container for action cards, commitments, and community counter. |
| `ActionCard` | `sections/Action/ActionCard.tsx` | Action item card with category badge, impact badge, commit button. |
| `FilterBar` | `sections/Action/FilterBar.tsx` | Horizontal filter pills for category filtering with animated transitions. |
| `CommitmentsPanel` | `sections/Action/CommitmentsPanel.tsx` | Collapsible panel showing committed actions, impact summary, streak ring. |
| `CommunityCounter` | `sections/Action/CommunityCounter.tsx` | Large animated counter with simulated live updates and gradient background. |

#### Shared Components

| Component | File | Description |
|-----------|------|-------------|
| `SectionHeader` | `components/SectionHeader.tsx` | Reusable section header with label, headline, subtext. Accepts color variants for dark/light backgrounds. |
| `AnimatedCounter` | `components/AnimatedCounter.tsx` | Animated number counter with configurable duration, easing, and formatting. Used across hero stats, dashboard, community counter. |
| `ProgressRing` | `components/ProgressRing.tsx` | SVG circular progress ring with animated draw and center text. Color-coded by value range. |
| `GlassCard` | `components/GlassCard.tsx` | Backdrop-filter blur card for hero content and Learn section modules. |
| `ScrollReveal` | `components/ScrollReveal.tsx` | Wrapper component applying GSAP ScrollTrigger entrance animations (fade-up, scale, slide). Configurable variant, delay, stagger. |
| `ToastProvider` | `components/ToastProvider.tsx` | Custom toast notification system built on shadcn toast. Queue management, auto-dismiss, type variants. |
| `Confetti` | `components/Confetti.tsx` | Leaf particle confetti effect — falling leaves with random drift, rotation, and speed. Used on quiz completion and commit actions. |

---

## Animation Implementation Plan

### Easing Definitions (GSAP CustomEase or CSS)

| Name | Value | Usage |
|------|-------|-------|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General transitions |
| `ease-entrance` | `cubic-bezier(0, 0, 0.2, 1)` | Scroll-triggered entrances |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations |
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Toggles, playful interactions |
| `ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Card pop-ins |

### Animation Table

| # | Animation | Library / Tool | Implementation Approach | Complexity |
|---|-----------|----------------|------------------------|------------|
| 1 | **Smooth scrolling** | Lenis | Initialize Lenis in App root. Integrate with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`. | Low |
| 2 | **Scroll-triggered entrances (default)** | GSAP + ScrollTrigger | `ScrollReveal` wrapper component. Animate from `opacity:0, y:40` to visible. `ScrollTrigger` with `start: "top 80%"`, `once: true`. | Low |
| 3 | **Scroll-triggered fade** | GSAP + ScrollTrigger | `ScrollReveal` variant. Opacity-only transition for subtle elements. | Low |
| 4 | **Scroll-triggered scale entrance** | GSAP + ScrollTrigger | `ScrollReveal` variant. `scale(0.9) → scale(1)` with Spring easing. Used for cards. | Low |
| 5 | **Scroll-triggered slide from left/right** | GSAP + ScrollTrigger | `ScrollReveal` variant. `translateX(±60px) → 0`. | Low |
| 6 | **Staggered list/card entrances** | GSAP + ScrollTrigger | `ScrollReveal` with `stagger` option. Parent triggers, children stagger in with configurable delay (50-200ms). | Low |
| 7 | **3D Globe rotation** | Three.js + R3F | Continuous Y-axis rotation in `useFrame` (360deg/60s). Fixed tilt on X-axis (23.5deg). Linear easing. | Medium |
| 8 | **Globe atmosphere shader** | Three.js ShaderMaterial | Custom vertex/fragment shader with Fresnel rim glow (teal #52B788). Implemented as separate mesh slightly larger than globe. | High |
| 9 | **Globe mouse parallax** | Three.js + R3F | Track mouse position, apply to rotation speed multiplier and slight tilt adjustment. Lerp factor 0.05 in `useFrame`. | Medium |
| 10 | **Globe scroll transform** | GSAP ScrollTrigger | Scrub animation tied to scroll: globe `scale(1→0.6)`, `opacity(1→0.3)`, `translateY(0→-20%)`. Trigger: hero section scroll. | Medium |
| 11 | **Leaf particles (orbiting)** | Three.js + R3F | 50-80 leaf sprites in spherical shell distribution. Each particle has independent orbit speed (20-60s), inclination, and opacity. Custom sprite material or textured planes. | High |
| 12 | **CSS leaf particle fallback** | CSS animations | 15-20 absolutely-positioned leaf SVGs. Keyframe animation: `translateY(100vh → -10vh)` + `translateX(sine wave oscillation ±30px)` + `rotate(0→360deg)`. Random durations 20-40s. | Medium |
| 13 | **Star twinkle** | CSS animations | Random opacity keyframes (0.2→0.8), random durations 3-6s, `animation-delay` staggered per star. | Low |
| 14 | **Hero content stagger** | GSAP + ScrollTrigger | Timeline on page load: badge (delay 200ms) → headline (400ms) → subtext (600ms) → CTAs (800ms) → scroll indicator (1200ms). | Medium |
| 15 | **Animated number counters** | Custom hook (`useAnimatedCounter`) | `requestAnimationFrame` loop with eased interpolation. Duration 1500ms, decelerate curve. Formats with commas/decimals. Triggered by ScrollTrigger or prop change. | Medium |
| 16 | **Top bar scroll transition** | GSAP ScrollTrigger | Scrub class toggle at 100px scroll threshold. Background: transparent→white, text: white→dark, shadow appears. | Low |
| 17 | **Sidebar link hover** | CSS transitions | Background pill slides in (`transform: translateX`, 200ms). Opacity transition for text. | Low |
| 18 | **Mobile menu open/close** | GSAP | Hamburger→X morph (line rotation/translation, 300ms). Menu slide-down (`translateY: -100%→0`, 400ms). Backdrop fade. Menu items stagger in (50ms). | Medium |
| 19 | **Track tab switch** | GSAP | Outgoing content: fade + `translateX(-20px)` (200ms). Incoming: fade + `translateX(20px→0)` (300ms, 50ms delay). Indicator slide. | Medium |
| 20 | **Form field entrance (stagger)** | GSAP | Fields stagger in on tab switch. Standard entrance, 100ms stagger. Impact badges pop with `ease-spring`. | Low |
| 21 | **Real-time impact badge update** | CSS + JS | Number transitions with `useAnimatedCounter` (300ms). Badge color CSS transition (200ms) on threshold cross. | Low |
| 22 | **Summary bar segment animation** | CSS transitions | Width transitions (300ms) on Recharts or CSS flex-width animation. | Low |
| 23 | **Submit button states** | CSS transitions | Loading: spinner overlay + opacity change. Success: background color transition to #52B788 (300ms) + checkmark scale-in. | Low |
| 24 | **Submit success flash** | GSAP | Brief card background color pulse to #D8F3DC (400ms), then form fields fade out→clear→fade in. | Low |
| 25 | **Dashboard grid entrance** | GSAP + ScrollTrigger | Cards stagger: `scale(0.95→1)`, `opacity(0→1)`, 100ms stagger, left-to-right top-to-bottom. | Low |
| 26 | **Line chart draw** | Recharts + CSS | Recharts `isAnimationActive` with custom duration (800ms). Additional SVG `stroke-dashoffset` animation for dramatic line draw. | Medium |
| 27 | **Donut chart segment draw** | Recharts + CSS | Recharts `isAnimationActive`. Segments draw clockwise with staggered `stroke-dasharray` animation (800ms, 100ms stagger). | Medium |
| 28 | **Bar chart grow** | Recharts | Recharts `isAnimationActive` with `animationBegin` stagger (100ms per bar). Bars grow from bottom (`transform-origin: bottom`). | Low |
| 29 | **Progress bar fill** | CSS transitions | Width animated from 0% to target (1000ms) using CSS `transition: width 1s ease-entrance`. Triggered by ScrollTrigger. | Low |
| 30 | **Progress ring draw** | SVG + GSAP | `stroke-dashoffset` animated from full circumference to target value (1200ms). Triggered by ScrollTrigger. Center counter animates simultaneously. | Medium |
| 31 | **Achievement badge entrance** | GSAP + ScrollTrigger | Badges stagger in with scale animation (100ms stagger). Locked badges start at lower opacity. | Low |
| 32 | **World map entrance** | GSAP + ScrollTrigger | Container fade (400ms). Ocean bg color transition (600ms). Countries fill with staggered color wash (30ms per country, top-to-bottom). | Medium |
| 33 | **Country hover effect** | CSS + JS | Border highlight (2px white stroke via CSS). Tooltip follow-cursor via mouse event tracking. Brightness filter increase. | Low |
| 34 | **Country zoom + panel** | GSAP | Selected country scales to center (scale 1.5, 400ms). Side panel slides in from right (`translateX: 100%→0`, 400ms). | Medium |
| 35 | **Carbon cycle scroll animation** | GSAP ScrollTrigger | Scroll-scrubbed timeline: Atmosphere fade-in → tree arrows draw (SVG stroke-dashoffset) → ocean arrows draw → human emission arrow draws (red) → imbalance pulse. Each step at different scroll progress thresholds. | High |
| 36 | **Comparison card bar animations** | GSAP + ScrollTrigger | Bars animate width from 0 to target (800ms, staggered). Number counters animate simultaneously. | Low |
| 37 | **Quiz question transition** | GSAP | Outgoing: fade + `translateX(-20px)` (300ms). Incoming: fade + `translateX(20px→0)` (300ms). | Medium |
| 38 | **Quiz answer feedback** | CSS + GSAP | Correct: green background flash (#52B788, 300ms) + checkmark scale-in. Incorrect: red flash (#FF6B6B) + X icon + correct answer highlight. | Low |
| 39 | **Quiz confetti** | Custom `Confetti` component | 30-40 leaf SVGs spawned at results position. GSAP timeline: random `translateX` drift, `translateY` fall, `rotation`, opacity fade. Durations 2-4s, staggered starts. | Medium |
| 40 | **Day simulator timeline** | CSS + JS | Activity slots stagger in on scroll (80ms per slot). Selection triggers option card border transition (200ms). Running total uses `useAnimatedCounter`. Timeline bar segments animate width/color (400ms). | Medium |
| 41 | **Myth buster 3D flip** | CSS 3D transforms | `transform: rotateY(0→180deg)` on inner container. `backface-visibility: hidden` on both faces. Duration 500ms, `ease-default`. Triggered by click/tap. | Medium |
| 42 | **Action card filter transition** | GSAP | Outgoing cards: fade + scale to 0.95 (200ms). Incoming: fade + scale from 0.95→1.0 (300ms, 100ms delay). Masonry reflow. | Medium |
| 43 | **Commit button animation** | CSS + GSAP | Click: scale 0.95 (100ms) → fill #52B788 (200ms) → text change + checkmark. Confetti burst (3-5 leaves from button position). Card top border pulse. | Medium |
| 44 | **Community counter** | GSAP + `setInterval` | Initial count-up from 0 on scroll (2000ms). Ongoing: `setInterval` adds random small increments (1-5) every 2-3s with digit flash effect. | Medium |
| 45 | **Commitments panel reveal** | GSAP | Height animates from 0 to auto (400ms, `ease-entrance`). Content fades in (300ms, 200ms delay). | Medium |
| 46 | **Toast notifications** | GSAP | Slide in from top-right (`translateX: 100%→0`, 300ms, `ease-entrance`). Auto-dismiss after 4s: fade + slide out. | Low |
| 47 | **Scroll indicator bounce** | CSS animation | Chevron `translateY(0→8px)` infinite, 1.5s. Fade out after 100px scroll. | Low |
| 48 | **Mobile FAB pulse** | CSS animation | Continuous `scale(1.0→1.05)` with synced shadow pulse, 2s infinite. | Low |
| 49 | **Reduced motion support** | CSS media query | `prefers-reduced-motion: reduce` → all transitions to 50ms, disable continuous animations, simplify scroll entrances to opacity-only. | Low |
| 50 | **Skeleton shimmer** | CSS animation | `background-position` animation on linear-gradient (shimmer sweep), 1.5s infinite. | Low |

### Global Animation Setup

```typescript
// In App.tsx or main animation setup file:

// 1. Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// 2. Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// 3. Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);
```

---

## State & Logic Plan

### State Management Architecture

React built-in state management is sufficient — no external state library needed. State is organized as follows:

#### Local Component State (useState)

- Form input values (Track section)
- Active tab selection (Track, Action filter)
- UI toggle states (mobile menu, modals, switches)
- Quiz current question, score, completed status
- Simulator selected activities
- Flip card flipped states
- Toast queue

#### Shared State (React Context)

**`CarbonDataContext`** — Provides footprint data and calculated metrics to Dashboard, Visualize, and Action sections:

```typescript
interface CarbonDataContextType {
  // Raw logged activities
  activities: ActivityLog[];
  
  // Computed metrics (memoized via useMemo)
  dailyTotal: number;           // kg CO2 today
  weeklyTotal: number;          // kg CO2 this week
  categoryBreakdown: {
    transport: number;
    food: number;
    energy: number;
    shopping: number;
  };
  trendData: TrendPoint[];      // Daily/weekly data points for chart
  carbonScore: number;          // 0-100 calculated score
  
  // Actions
  addActivity: (activity: ActivityLog) => void;
  clearActivities: () => void;
  setGoal: (goal: number) => void;
  weeklyGoal: number;
}
```

**`UserContext`** — User preferences and commitments:

```typescript
interface UserContextType {
  name: string;
  commitments: string[];        // Array of action IDs
  addCommitment: (id: string) => void;
  removeCommitment: (id: string) => void;
  achievements: string[];       // Unlocked achievement IDs
  checkInStreak: number;        // Days in a row
}
```

### Emission Calculation Logic

**`lib/emissions.ts`** — Pure functions for CO2 calculations:

```typescript
// Constants for CO2 per unit
const EMISSION_FACTORS = {
  transport: {
    carGasoline: 0.21,     // kg CO2 per km
    carDiesel: 0.17,
    carElectric: 0.05,
    carHybrid: 0.12,
    publicTransit: 0.04,
    flight: 0.15,            // kg CO2 per km (with multiplier for altitude)
  },
  food: {
    meatMeal: 3.3,           // kg CO2 per meal
    chickenMeal: 0.8,
    vegetarianMeal: 0.4,
    veganMeal: 0.2,
    foodWaste: { none: 0, minimal: 0.5, moderate: 1.5, high: 3.0 },
    takeout: 0.3,            // kg CO2 per meal (packaging)
  },
  energy: {
    electricityLow: 2.0,     // kg CO2 per day (estimated)
    electricityMedium: 5.0,
    electricityHigh: 10.0,
    heatingMultiplier: { electric: 1.0, gas: 1.5, oil: 2.0, renewable: 0.1 },
  },
  shopping: {
    clothingItem: 5.0,       // kg CO2 per item (avg)
    electronics: 50.0,       // kg CO2 per purchase
    packaging: { minimal: 0.1, standard: 0.5, excessive: 1.5 },
    secondhand: -2.0,        // Negative offset
  },
};

// Functions:
// calculateTransportEmissions(data: TransportData): number
// calculateFoodEmissions(data: FoodData): number
// calculateEnergyEmissions(data: EnergyData): number
// calculateShoppingEmissions(data: ShoppingData): number
// calculateTotalEmissions(activities: ActivityLog[]): TotalEmissions
// getCarbonScore(totalWeeklyEmissions: number): number (0-100)
```

### Data Flow

```
Track Section (form inputs)
    ↓
[User submits form]
    ↓
CarbonDataContext.addActivity() → recalculates all derived metrics
    ↓
Dashboard Section reads from CarbonDataContext
    ↓
Action Section uses categoryBreakdown for personalized greeting
```

### Local Storage Persistence

User data persists across sessions:

```typescript
// lib/storage.ts
const STORAGE_KEY = 'carbonwise-data';

interface PersistedData {
  activities: ActivityLog[];
  user: { name: string; commitments: string[]; achievements: string[]; streak: number };
  goal: number;
  lastVisit: string;
}

// Auto-save on activity change (debounced 1s)
// Auto-restore on app mount
```

---

## WebGL Implementation Plan

### Globe Scene Architecture (R3F)

```
<Canvas> (R3F Canvas, full viewport)
  └── <GlobeScene>
        ├── <Globe />           {/* Earth sphere with custom shader */}
        ├── <Atmosphere />      {/* Fresnel glow shell mesh */}
        ├── <Clouds />          {/* Semi-transparent cloud layer */}
        ├── <LeafParticles />   {/* Orbiting leaf sprites */}
        └── <StarField />       {/* CSS fallback outside canvas */}
```

### Globe Shader Material

```glsl
// Vertex shader: standard position, pass UV and normal
// Fragment shader:
//   - Sample noise texture for continent mask
//   - Mix ocean color (#0a1f15) with continent color (#1a3d2a) based on mask
//   - Add subtle wave/terrain detail via noise
//   - Output final color
```

### Atmosphere Shader

```glsl
// Fresnel effect: intensity increases at grazing angles
// Color: #52B788 (teal glow)
// Applied to slightly larger sphere surrounding globe
// Additive blending for glow effect
```

### Performance Considerations

- Globe resolution: 64x64 segments (sufficient for stylized look)
- Leaf particles: Use `InstancedMesh` for 50-80 particles (single draw call)
- Cloud layer: Low-res noise texture, slow drift animation
- Dispose all geometries/materials/textures on unmount
- Pause render loop when hero is not in viewport (using ScrollTrigger)

---

## Project File Structure

```
carbonwise/
├── public/
│   ├── images/
│   │   ├── noise-texture.png
│   │   ├── carbon-cycle.png
│   │   ├── community-illustration.png
│   │   └── empty-state.png
│   └── world-map.svg
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css                    # Tailwind directives + global styles + custom properties
│   │
│   ├── sections/
│   │   ├── Hero/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── GlobeScene.tsx
│   │   │   ├── Globe.tsx
│   │   │   ├── LeafParticles.tsx
│   │   │   ├── StarField.tsx
│   │   │   └── StatsBar.tsx
│   │   ├── Track/
│   │   │   ├── TrackSection.tsx
│   │   │   ├── ActivityForm.tsx
│   │   │   ├── FormField.tsx
│   │   │   ├── ImpactBadge.tsx
│   │   │   ├── SummaryPanel.tsx
│   │   │   └── CategoryTabs.tsx
│   │   ├── Dashboard/
│   │   │   ├── DashboardSection.tsx
│   │   │   ├── ScoreCard.tsx
│   │   │   ├── TrendChart.tsx
│   │   │   ├── GoalProgressCard.tsx
│   │   │   ├── CategoryBreakdown.tsx
│   │   │   ├── AchievementsCard.tsx
│   │   │   ├── TipsCard.tsx
│   │   │   └── WeeklyComparison.tsx
│   │   ├── Visualize/
│   │   │   ├── VisualizeSection.tsx
│   │   │   ├── WorldMap.tsx
│   │   │   ├── CountryPanel.tsx
│   │   │   ├── CarbonCycle.tsx
│   │   │   ├── ComparisonSection.tsx
│   │   │   └── ComparisonCard.tsx
│   │   ├── Learn/
│   │   │   ├── LearnSection.tsx
│   │   │   ├── QuizModule.tsx
│   │   │   ├── DaySimulator.tsx
│   │   │   ├── MythBuster.tsx
│   │   │   └── FlipCard.tsx
│   │   └── Action/
│   │       ├── ActionSection.tsx
│   │       ├── ActionCard.tsx
│   │       ├── FilterBar.tsx
│   │       ├── CommitmentsPanel.tsx
│   │       └── CommunityCounter.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── PageLayout.tsx
│   │   ├── ui/                      # shadcn/ui components (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── skeleton.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── ProgressRing.tsx
│   │   ├── GlassCard.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── Confetti.tsx
│   │   └── Footer.tsx
│   │
│   ├── hooks/
│   │   ├── useScrollPosition.ts
│   │   ├── useAnimatedCounter.ts
│   │   ├── useInView.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── useLenis.ts
│   │
│   ├── contexts/
│   │   ├── CarbonDataContext.tsx
│   │   └── UserContext.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts                 # cn() helper, general utilities
│   │   ├── emissions.ts             # CO2 calculation engine
│   │   ├── storage.ts               # localStorage persistence
│   │   ├── animations.ts            # Shared GSAP configs (easing, defaults)
│   │   └── constants.ts             # Colors, breakpoints, emission factors
│   │
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces and types
│   │
│   └── data/
│       ├── quizQuestions.ts         # Quiz Q&A data
│       ├── actionItems.ts           # Action card content
│       ├── mythCards.ts             # Myth buster card content
│       ├── countryEmissions.ts      # World map country data
│       ├── achievements.ts          # Achievement definitions
│       └── tips.ts                  # Personalized tip content
│
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── components.json                  # shadcn/ui configuration
└── package.json
```

---

## Tailwind Configuration

### Custom Theme Extensions

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          deep: '#1B4332',
          DEFAULT: '#2D6A4F',
          sage: '#52B788',
          pale: '#D8F3DC',
          mint: '#F0FDF4',
        },
        accent: {
          teal: '#00C9A7',
          amber: '#F9A826',
          coral: '#FF6B6B',
          sky: '#4ECDC4',
        },
        neutral: {
          nearBlack: '#1A1A1A',
          charcoal: '#2D2D2D',
          dark: '#495057',
          medium: '#ADB5BD',
          light: '#E9ECEF',
        },
        hero: '#0D2818',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        accent: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        display: ['6.4rem', { lineHeight: '1.1', fontWeight: '800' }],
        h1: ['4.8rem', { lineHeight: '1.15', fontWeight: '700' }],
        h2: ['3.6rem', { lineHeight: '1.2', fontWeight: '600' }],
        h3: ['2.4rem', { lineHeight: '1.3', fontWeight: '600' }],
        h4: ['1.8rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.8rem', { lineHeight: '1.6', fontWeight: '400' }],
        body: ['1.6rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['1.4rem', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['1.2rem', { lineHeight: '1.4', fontWeight: '500' }],
        micro: ['1.0rem', { lineHeight: '1.2', fontWeight: '500' }],
      },
      borderRadius: {
        pill: '50px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
        button: '0 4px 16px rgba(27, 67, 50, 0.3)',
        'button-hover': '0 8px 24px rgba(27, 67, 50, 0.4)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      zIndex: {
        elevated: '10',
        nav: '100',
        overlay: '200',
        modal: '300',
        loading: '400',
      },
      backdropBlur: {
        glass: '12px',
      },
      animation: {
        'bounce-slow': 'bounce 1.5s infinite',
        'pulse-fab': 'pulse-fab 2s infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'twinkle': 'twinkle 4s infinite',
      },
      keyframes: {
        'pulse-fab': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

---

## Key Implementation Notes

### React 19 Considerations
- Use standard hooks (`useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`)
- R3F's `useFrame` for Three.js animation loops
- No `use` hook or Suspense boundaries required for this project

### Performance Optimizations
- Lazy load sections below the fold using `React.lazy()` + `Suspense`
- Pause Three.js render loop when hero is not visible (use `ScrollTrigger` to detect)
- Use `will-change: transform` on animated elements sparingly
- Debounce form input handlers (200ms for impact calculations)
- Use `React.memo()` for ActionCard and other list-rendered components
- Chart animations use CSS transforms (GPU-accelerated) rather than layout properties

### Accessibility
- All interactive elements have visible focus rings (2px #52B788, offset 2px)
- Skip-to-content link for keyboard navigation
- `prefers-reduced-motion` media query support throughout
- ARIA labels on icon-only buttons
- Chart data available as screen-reader text alternatives
- Color contrast ratios meet WCAG AA (checked via design tokens)

### Responsive Strategy
- Mobile-first Tailwind approach
- Sidebar collapses to icon-only at 1024px, hidden at 768px (replaced by BottomNav)
- Charts simplify on mobile (fewer labels, hide grid lines)
- World map uses tap instead of hover, modal instead of side panel on mobile
- Action cards grid: 3 cols → 2 cols → 1 col
- Font sizes scale down via responsive Tailwind classes (`text-h1 md:text-h2`)
