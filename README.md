<div align="center">

# 🎂 Happy Birthday, Prataya!

**A fully interactive birthday celebration web experience — built with love for a very special 20th birthday.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS](https://img.shields.io/badge/CSS-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

</div>

---

## 📖 Overview

`my-birthday` is a handcrafted, single-page web experience built to celebrate Prataya's 20th birthday. It features a multi-page interactive flow — from an animated landing page, to a cinematic candle-blowing scene, to 20 personalised letter-in-envelope wishes. Every detail, from the synthesized party fanfare to the guilt-trip skip modal, was designed to feel personal and alive.

---

## ✨ Features

<details>
<summary><strong>🏠 Landing Page</strong></summary>

- Large serif typographic hero — `HELLO, 20.`
- Floating animated stickers (✨ 🎀 ⭐ 🎈 🌸 🥂)
- Gradient paper-texture background with noise overlay
- "Let's Celebrate" CTA → prompts cake interaction
- Two-step guilt-trip skip modal sequence before allowing skip

</details>

<details>
<summary><strong>🎂 Celebration Page</strong></summary>

- Three animated candles with realistic flame flicker
- **Blow the candle** → wind swoosh → flame bends → flame snuffs → smoke wisps → room goes dark
- Synthesized party fanfare on page load using the **Web Audio API** (no audio files needed)
- Birthday audio auto-plays on candle blow click
- Animated cake-cutting: knife falls, slice separates and slides out
- Confetti burst sequence (3 waves) on page mount using `canvas-confetti`
- Full dark-mode cinematic transition after candles are blown

</details>

<details>
<summary><strong>⏳ Timeline Page</strong></summary>

- Visual timeline displaying key moments and memories
- Interactive timeline elements with hover effects
- Smooth transitions between timeline events
- Navigation to proceed to the Surprises page

</details>

<details>
<summary><strong>💌 20 Wishes Page</strong></summary>

- 20 personalised letter envelopes in a responsive grid
- Five colour variants: pink, yellow, green, lavender, peach
- Each envelope opens into a pop-up card with a handwritten message
- Staggered entry animation for the envelope grid
- Finale section with a closing birthday message

</details>

<details>
<summary><strong>🧭 Navigation</strong></summary>

- Full browser history API integration — the browser **Back** and **Forward** buttons work correctly
- Hash-based routing (`#celebration`, `#surprises`) — shareable and bookmarkable states
- On-screen back buttons on every page

</details>

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI framework & component model |
| [Vite](https://vitejs.dev) | 8 | Build tool, dev server & HMR |
| [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) | latest | Confetti burst animations |
| Web Audio API | Native | Synthesized party fanfare sound effects |
| HTML5 `<audio>` | Native | Birthday audio clip playback |
| Vanilla CSS | — | All custom styling — no UI library |
| Google Fonts | — | Instrument Serif + DM Sans |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site will be running at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## 🎨 Design System

### Color Palette

| Token | Hex | Preview |
|---|---|---|
| `--pink` | `#d93470` | ![#d93470](https://placehold.co/12x12/d93470/d93470.png) |
| `--yellow` | `#ffd35c` | ![#ffd35c](https://placehold.co/12x12/ffd35c/ffd35c.png) |
| `--green` | `#afd0c6` | ![#afd0c6](https://placehold.co/12x12/afd0c6/afd0c6.png) |
| `--ink` | `#252641` | ![#252641](https://placehold.co/12x12/252641/252641.png) |
| `--paper` | `#f6e8d8` | ![#f6e8d8](https://placehold.co/12x12/f6e8d8/f6e8d8.png) |

### Typography

| Role | Font |
|---|---|
| Display / Headings | [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) |
| Body / UI | [DM Sans](https://fonts.google.com/specimen/DM+Sans) |
| Code | [Space Mono](https://fonts.google.com/specimen/Space+Mono) |

---

## 🗺️ User Flow

```
Landing Page
    │
    ├─ [LET'S CELEBRATE] ──────────────────────→ Cake Prompt
                                                      │
                                         ┌────────────┴────────────┐
                                         │                         │
                                  [OF COURSE]               [I'LL SKIP IT]
                                         │                         │
                                Celebration Page ◄─────       Skip Modal 1
                                         │             │           │
                              [Blow the Candle]        │       Skip Modal 2
                                         │             │        │        │
                                [Cut a Piece]          │──[Let's go]  [Really skip]
                                         │                              │
                              [Unlock Surprises]                        │
                                         │                              │
                                Timeline Page ◄─────────────────────────│
                                         │
                           Surprises (20 Wishes) Page
```

---

## 📜 License

This project is private — made for a personal occasion. Not intended for redistribution.

---

<div align="center">

💌 *Made with care, for someone who deserves the world.*

> *"Twenty years of being exactly who you are — messy, brilliant, overthinking, and completely irreplaceable."*

</div>