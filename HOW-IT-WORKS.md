# How It Works

This document explains which parts of the code control what you see on screen, so you can understand and learn from this presentation. Each section links the code to the visual result.

---

## Overview

This presentation uses three languages working together:

| File | Role | What it controls |
|------|------|------------------|
| **index.html** | Structure | The content (text, headings, slides) and how it's organized |
| **styles.css** | Appearance | Colors, fonts, layout, size, spacing, animations |
| **script.js** | Behavior | Slide changes, keyboard/click navigation, dot indicators |

---

## Part 1: HTML (`index.html`)

HTML defines the **structure**—what exists on the page and in what order.

### The document skeleton

```
<!DOCTYPE html>     → Tells the browser this is an HTML5 page
<html lang="en">    → Root element, language set to English
  <head>            → Metadata (not visible on screen)
  <body>            → Everything the user sees goes here
```

### What each section does

| HTML element | What you see |
|--------------|--------------|
| `<div class="presentation">` | The full-screen container holding all slides |
| `<section class="slide">` | One slide. There are 9 slides total. |
| `class="slide active"` | Only the slide with `active` is visible. JavaScript switches which slide has this class. |
| `<h1 class="slide-title">` | The big teal heading (e.g., "About Me", "Where I Come From") |
| `<div class="slide-content">` | The body text below the title |
| `<div class="highlight-box">` | The box with a left border (used on the "Why Holberton" slide) |
| `<div class="fun-fact">` | The styled box for the fun fact (guitar/cuatro slide) |
| `<ul>` and `<li>` | Bullet lists (e.g., hobbies) |
| `<div id="navDots">` | Empty container where JavaScript creates the dots |
| `<span id="slideNumber">` | The "1 / 9" counter in the bottom-right |

### How slides are hidden or shown

- All slides use `class="slide"`.
- Only one slide also has `class="active"`.
- CSS hides slides without `active` (using `opacity: 0` and `visibility: hidden`) and shows the active one.
- JavaScript adds or removes `active` when you press keys or click.

---

## Part 2: CSS (`styles.css`)

CSS controls the **appearance**—colors, layout, fonts, and effects.

### CSS variables (`:root`)

```css
:root {
  --bg-dark: #0f1419;    /* Dark background color */
  --bg-card: #1a2332;    /* Slightly lighter for boxes */
  --accent: #00d4aa;     /* Teal for headings and highlights */
  --text: #e7e9ea;       /* Main text color */
  --text-muted: #8b98a5; /* Gray for body text */
}
```

**What you see:** Changing `--accent` changes the color of titles, the location badge, and highlight borders. `var(--accent)` means "use the value of this variable."

### Layout and visibility

| CSS selector | What it controls |
|--------------|------------------|
| `html, body` | Full height, dark background, Outfit font, no scrolling |
| `.presentation` | Centers all slides in the viewport |
| `.slide` | Each slide: full screen, centered content, **hidden by default** (`opacity: 0`, `visibility: hidden`) |
| `.slide.active` | The active slide: visible (`opacity: 1`, `visibility: visible`), on top (`z-index: 1`) |

### Typography and spacing

| CSS selector | What you see |
|--------------|--------------|
| `.slide-title` | Large teal headings (2.5rem), bold, centered |
| `.slide-content` | Gray body text, max width 700px, centered |
| `.slide-content strong` | Bold text in brighter white |
| `.section-label` | Small uppercase labels above titles (e.g., "BACKGROUND & JOURNEY") |
| `.location` | The rounded "📍 Cataño, PR" badge |
| `.highlight-box` | Box with teal left border and dark background |
| `.fun-fact` | Gradient box with border for the fun fact |

### Navigation UI

| CSS selector | What you see |
|--------------|--------------|
| `.nav-dots` | Container for the dots, fixed at bottom center |
| `.nav-dot` | Each dot: small circle, gray, half opacity |
| `.nav-dot:hover` | Dot at full opacity when you hover |
| `.nav-dot.active` | Current slide's dot: teal, slightly larger |
| `.nav-hint` | "← → or click to navigate" text |
| `.slide-number` | "1 / 9" in the bottom-right |

### Transitions

```css
transition: opacity 0.5s ease, visibility 0.5s ease;
```

**What you see:** Slides fade in and out over 0.5 seconds instead of switching instantly.

---

## Part 3: JavaScript (`script.js`)

JavaScript controls the **behavior**—what happens when you interact with the page.

### Selecting elements

```javascript
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('navDots');
```

- `querySelectorAll('.slide')` → Gets all elements with `class="slide"`.
- `getElementById('navDots')` → Gets the element with `id="navDots"`.

### Creating the dots

```javascript
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('div');
  dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('data-index', i);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
```

**What you see:** One dot per slide. Clicking a dot calls `goToSlide(i)` to show that slide.

### The `goToSlide()` function

```javascript
function goToSlide(index) {
  currentSlide = index;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
  document.getElementById('slideNumber').textContent = `${currentSlide + 1} / ${totalSlides}`;
}
```

**What you see:**

1. `slide.classList.toggle('active', i === currentSlide)` adds `active` only to the slide at `currentSlide`, removes it from others.
2. Same for dots: only the current dot gets `active`.
3. The slide counter text updates to "2 / 9", "3 / 9", etc.

### Keyboard events

```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    goToSlide(currentSlide + 1);  // Next slide
  } else if (e.key === 'ArrowLeft') {
    goToSlide(currentSlide - 1);  // Previous slide
  }
});
```

**What you see:** Right arrow and Space go to the next slide; left arrow goes to the previous slide.

### Click to navigate

```javascript
document.addEventListener('click', (e) => {
  if (e.clientX > window.innerWidth / 2) {
    goToSlide(currentSlide + 1);  // Click right side → next
  } else if (currentSlide > 0) {
    goToSlide(currentSlide - 1);  // Click left side → previous
  }
});
```

**What you see:** Clicking the right half of the screen goes forward; clicking the left half goes back.

---

## How the pieces connect

1. **HTML** defines the slides and gives them classes (`slide`, `active`, `slide-title`, etc.).
2. **CSS** styles those classes (e.g., only `.slide.active` is visible).
3. **JavaScript** changes which slide has `active` when you press keys or click.
4. When `active` moves from one slide to another, the CSS makes the new slide visible and hides the old one.

---

## Glossary

Terms used in this project that you might not have seen in class yet:

| Term | Definition |
|------|------------|
| **Attribute** | Extra information inside an HTML tag. Example: `class="slide"`, `id="navDots"`, `href="styles.css"`. |
| **Class** | A name you give to one or more elements so CSS and JavaScript can target them. Same class can be used many times. |
| **Comment** | Text ignored by the computer. In HTML: `<!-- comment -->`. In CSS: `/* comment */`. In JS: `// comment`. |
| **DOM** | Document Object Model. The tree of HTML elements the browser builds. JavaScript uses it to read and change the page. |
| **Event** | Something that happens (click, key press, etc.). JavaScript can react with `addEventListener`. |
| **Event listener** | Code that runs when an event occurs. Example: `addEventListener('click', ...)` runs when the user clicks. |
| **Flexbox** | A CSS layout system. `display: flex` lets you arrange items in a row or column with alignment options. |
| **ID** | A unique name for one element. Use `getElementById()` to select it. Only one element per page should have that ID. |
| **Opacity** | How see-through something is. `0` = invisible, `1` = fully visible. |
| **Selector** | The part of a CSS rule that picks which elements to style. Example: `.slide-title` selects elements with `class="slide-title"`. |
| **Transition** | Animated change between two states. Example: opacity changing from 0 to 1 over 0.5 seconds. |
| **Variable** | A named container for a value. In CSS: `--accent`. In JS: `let currentSlide`. |
| **Viewport** | The visible area of the browser window. |
| **z-index** | Stacking order. Higher numbers appear on top. Used so the active slide shows above the others. |

---

## Quick reference: change the look

| Want to change... | Edit this file | Look for... |
|-------------------|----------------|-------------|
| Colors | styles.css | `:root` variables |
| Font size | styles.css | `font-size` in `.slide-title`, `.slide-content` |
| Slide transition speed | styles.css | `transition` in `.slide` |
| Number of slides | index.html | Add or remove `<section class="slide">` |
| Slide content | index.html | Text inside each `<section>` |
| Keyboard shortcuts | script.js | `e.key` in the `keydown` listener |

---

*Part of the Holberton School About Me project.*
