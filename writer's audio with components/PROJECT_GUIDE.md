# Building an Audio-Visual Interactive Journey from Scratch

A comprehensive guide and reference architecture for building interactive, sensory web experiences like **Recall** with React and Vite.

---

## Table of Contents
1. [Scaffolding a New Project](#1-scaffolding-a-new-project)
2. [Project & Folder Structure](#2-project--folder-structure)
3. [Asset Management (`public/` vs `src/`)](#3-asset-management-public-vs-src)
4. [Essential Commands](#4-essential-commands)
5. [Key Pitfalls & Hard-Earned Lessons](#5-key-pitfalls--hard-earned-lessons)
6. [Smooth Hold Mechanics (Animation Loops in React)](#6-smooth-hold-mechanics-animation-loops-in-react)
7. [Audio Engine & Autoplay Best Practices](#7-audio-engine--autoplay-best-practices)
8. [Mobile & Touch Fallbacks](#8-mobile--touch-fallbacks)
9. [Production Deployment](#9-production-deployment)

---

## 1. Scaffolding a New Project

To avoid misconfigured starters, always initialize directly with the **React** template:

```bash
# JavaScript + React
npm create vite@latest my-app -- --template react

# OR TypeScript + React (if you want TypeScript)
npm create vite@latest my-app -- --template react-ts
```

### Install Dependencies
```bash
cd my-app
npm install
```

### Verify Core Files
Ensure `package.json` contains:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.0"
  }
}
```

Ensure `vite.config.js` exists in the root:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

---

## 2. Project & Folder Structure

A proven modular architecture for this type of application:

```text
my-project/
├── public/
│   └── assets/
│       ├── audio/          # Background ambience, voiceovers, soundscapes (.wav, .mp3)
│       ├── authors/        # Portraits and author pictures (.jpg, .png, .webp)
│       ├── backgrounds/    # Full-screen ambient backgrounds
│       └── verses/         # Verse artwork & visual artifacts
├── src/
│   ├── components/         # Independent UI components
│   │   ├── HeaderBrand.jsx
│   │   ├── LandingScreen.jsx
│   │   ├── TitleScreen.jsx
│   │   ├── Showcase.jsx
│   │   ├── WriterProfileModal.jsx
│   │   ├── VerseExplanationModal.jsx
│   │   ├── HelpModal.jsx
│   │   └── MontageFlash.jsx
│   ├── data/
│   │   └── writers.js      # Structured content array (text, paths, quotes)
│   ├── hooks/
│   │   └── useSpaceHold.js # Reusable interaction hooks
│   ├── App.css             # Layout, textures, CRT scanlines, typography
│   ├── App.jsx             # Top-level state coordinator
│   └── main.jsx            # React application entry point
├── index.html              # HTML shell & web font imports
├── package.json
└── vite.config.js
```

---

## 3. Asset Management (`public/` vs `src/`)

### The Rule for Static Media
Any media loaded dynamically via data objects (e.g., `writers.js` containing `audioPic: "/assets/..."`) belongs in **`public/assets/`**, NOT inside `src/assets/`.

- Vite serves everything inside `public/` directly at the root URL `/`.
- In your code or database objects, write absolute URLs starting with `/`:
  ```javascript
  {
    name: "Virginia Woolf",
    authorPic: "/assets/authors/virginia-woolf.jpg",
    mainAudio: "/assets/audio/woolf-main.wav"
  }
  ```

---

## 4. Essential Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local hot-reloading dev server at `http://localhost:5173/` |
| `npm run build` | Bundles and minifies the app into `dist/` ready for production |
| `npm run preview` | Locally serves and tests the compiled `dist/` bundle |

---

## 5. Key Pitfalls & Hard-Earned Lessons

### 1. The Vanilla vs. React Template Mismatch
* **Symptom**: `tsc && vite build` fails with missing modules (`hero.png`, `counter.ts`, etc.).
* **Cause**: Selecting the default Vanilla TypeScript template when creating the project, leaving behind template files while writing React JSX.
* **Fix**: Use `--template react` and ensure `vite.config.js` with `@vitejs/plugin-react` is present.

### 2. Accidental Config Pastes
* Never paste package configuration into `tsconfig.json`. Keep `package.json` as the single source of truth for scripts and dependencies.

### 3. Animation Cancellation Bug in React Hooks
* **Symptom**: Holding spacebar freezes at ~1% and never advances.
* **Cause**: Placing `progress` or `isHolding` in the dependency array of a `useEffect` that calls `requestAnimationFrame`. Every frame triggers an effect cleanup that cancels the animation.
* **Fix**: Use `useRef` for values updated per-frame.

---

## 6. Smooth Hold Mechanics (Animation Loops in React)

Here is the bulletproof template for `useSpaceHold.js`:

```javascript
import { useState, useEffect, useRef } from 'react';

export function useSpaceHold({ duration = 1400, onComplete, enabled = true }) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdStartRef = useRef(null);
  const animFrameRef = useRef(null);
  const isHoldingRef = useRef(false);
  const progressRef = useRef(0);
  const onCompleteRef = useRef(onComplete);

  // Keep callback reference fresh without restarting effects
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Reset state if disabled
  useEffect(() => {
    if (!enabled) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      isHoldingRef.current = false;
      setIsHolding(false);
      progressRef.current = 0;
      setProgress(0);
      document.body.classList.remove('holding');
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      const isSpace = e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar';
      if (isSpace && !e.repeat && !isHoldingRef.current) {
        e.preventDefault();
        isHoldingRef.current = true;
        setIsHolding(true);
        holdStartRef.current = performance.now();
        document.body.classList.add('holding');

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

        const tick = () => {
          if (!isHoldingRef.current) return;
          const elapsed = performance.now() - holdStartRef.current;
          const currentProgress = Math.min(100, (elapsed / duration) * 100);
          progressRef.current = currentProgress;
          setProgress(currentProgress);

          if (currentProgress < 100) {
            animFrameRef.current = requestAnimationFrame(tick);
          } else {
            isHoldingRef.current = false;
            setIsHolding(false);
            document.body.classList.remove('holding');
            progressRef.current = 0;
            setProgress(0);
            onCompleteRef.current?.();
          }
        };

        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    const handleKeyUp = (e) => {
      const isSpace = e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar';
      if (isSpace && isHoldingRef.current) {
        isHoldingRef.current = false;
        setIsHolding(false);
        document.body.classList.remove('holding');

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

        // Smooth springback animation
        let p = progressRef.current;
        const spring = () => {
          p = Math.max(0, p - 6);
          progressRef.current = p;
          setProgress(p);
          if (p > 0) animFrameRef.current = requestAnimationFrame(spring);
        };
        animFrameRef.current = requestAnimationFrame(spring);
      }
    };

    const handleBlur = () => {
      if (isHoldingRef.current) {
        isHoldingRef.current = false;
        setIsHolding(false);
        document.body.classList.remove('holding');
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        progressRef.current = 0;
        setProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.classList.remove('holding');
    };
  }, [enabled, duration]);

  return { progress, isHolding };
}
```

---

## 7. Audio Engine & Autoplay Best Practices

### Autoplay Policies
Modern browsers block `Audio.play()` until the user has performed an explicit gesture (a click or keypress) on the document.
- Design an intro/title screen first. Once the user clicks or presses Space to launch, subsequent audio tracks play seamlessly.
- Always append `.catch(() => {})` to `audio.play()` to prevent unhandled rejection errors:
  ```javascript
  audio.play().catch((err) => {
    console.warn("Autoplay was blocked by browser policy:", err);
  });
  ```

### Preloading Tracks
Preload the next writer's audio track so switching writers is instantaneous:
```javascript
useEffect(() => {
  const nextIndex = (currentIndex + 1) % writers.length;
  const preload = new Audio(writers[nextIndex].mainAudio);
  preload.preload = 'auto';
}, [currentIndex]);
```

---

## 8. Mobile & Touch Fallbacks

To make your experience work on mobile devices and touchscreens:

```jsx
<div 
  className="spacebar-pill"
  onPointerDown={handleHoldStart}
  onPointerUp={handleHoldEnd}
  onPointerLeave={handleHoldEnd}
>
  <div className="spacebar-fill" style={{ width: `${holdProgress}%` }} />
  <span>hold here or spacebar</span>
</div>
```

---

## 9. Production Deployment

### Option A: Vercel / Netlify
1. Push your repository to GitHub.
2. Import the project in Vercel or Netlify.
3. Both platforms automatically detect Vite:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

### Option B: GitHub Pages
In `vite.config.js`, set `base` to match your repository name:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/<your-repo-name>/',
});
```
Build the project:
```bash
npm run build
```
And deploy the `dist/` folder via GitHub Actions or the `gh-pages` package.

