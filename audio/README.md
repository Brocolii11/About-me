# Audio Files

Add your music files here:

| File | Use |
|------|-----|
| `loading.mp3` (or `.ogg`) | Plays while waiting for classmates on the loading screen |
| `presentation.mp3` (or `.ogg`) | Plays during the stand up presentation |

**Formats:** MP3 and OGG are supported. Include at least one format for each track.

**Note:** Browsers often block autoplay until the user interacts with the page. The first click/keypress will start the loading music (if it hadn't already) and then dismiss to the presentation with its own music.

**If audio doesn't load:** Run a local server (`npx serve` or `python -m http.server`). Browsers block loading audio from `file://` URLs for security. Open the browser console (F12) to see any load errors.

---

## Hidden Code: Audio Visualizer

A **frequency bars audio visualizer** is implemented but currently **hidden**. When enabled, it:

- Uses the **presentation music** (`presentation.mp3`) via the Web Audio API
- Displays animated frequency bars at the bottom of the screen during slides
- Uses a teal/cyan color palette that complements the phthalocyanine green theme
- Does **not** appear on the loading screen—only during the presentation slides

**To re-enable:** See the main project `README.md` → "Hidden Features" section.
