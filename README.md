# Stand up | Carlos De Jesus

A web-based stand up presentation for Holberton School, built with HTML, CSS, and JavaScript.

## Overview

This project is a slide presentation that introduces my background, motivations, goals, and interests as a Holberton student.

## How to View

1. Clone or download this repository
2. (Optional) Add music: place `loading.mp3` and `presentation.mp3` in the `audio/` folder
3. **For audio to work:** Run a local server (browsers often block audio from `file://`). Example: `npx serve` or `python -m http.server 8000`, then open `http://localhost:8000` or `http://localhost:3000`
4. Or open `index.html` directly—slides work, but audio may not load

## Controls

- **Next slide:** Right arrow key, Spacebar, or click on the right side of the screen
- **Previous slide:** Left arrow key or click on the left side of the screen
- **Jump to slide:** Click the dots at the bottom of the screen

## Contents

- Introduction (Cataño, PR)
- Background & journey
- Why Holberton
- What got me into coding
- First project (disposition tool)
- Career goals (Credit Unions)
- Hobbies
- Fun fact (guitar & Puerto Rican cuatro)

## Project Structure

```
About me/
├── assets/       # Pixel art images (see assets/README.md)
├── audio/        # Music tracks (see audio/README.md)
│   ├── loading.mp3
│   └── presentation.mp3
├── index.html    # HTML structure
├── styles.css    # Layout and styling
├── script.js     # Slide navigation logic
└── README.md
```

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, transitions)
- Vanilla JavaScript
- [Outfit](https://fonts.google.com/specimen/Outfit) font (Google Fonts)

## Hidden Features

Some features are implemented but commented out for later use. To re-enable them:

### Audio Visualizer (frequency bars)

A frequency bars visualizer that syncs to the presentation music. Runs during slides only (not on the loading screen).

**Files to edit:**

1. **`script.js`** — Uncomment the block between `/* ========== HIDDEN: Audio Visualizer` and `========== END HIDDEN ========== */`
2. **`script.js`** — Uncomment `showVisualizer();` inside `dismissLoading()`
3. **`index.html`** — Uncomment the `<canvas id="audioVisualizer">` element
4. **`styles.css`** — Uncomment the `.audio-visualizer` rules (look for `/* HIDDEN: Audio visualizer`)

**Dependencies:** Uses `presentation.mp3` (or `.ogg`) from the `audio/` folder. Requires Web Audio API support in the browser.

## Author

**Carlos De Jesus** — [GitHub](https://github.com/Brocolii11)

---

Part of [Holberton School](https://www.holbertonschool.com/) curriculum.
