# Recall — Asset Architecture & Developer Guide

This directory organizes all media assets for the **Recall** literary journey into dedicated, modular folders.

```
assets/
├── backgrounds/         # Full-screen ambient atmospheric backgrounds (1920x1080 recommended)
│   ├── woolf-bg.jpg
│   ├── joyce-bg.jpg
│   ├── plath-bg.jpg
│   ├── poe-bg.jpg
│   └── eliot-bg.jpg
│
├── authors/             # Writer portraits / profile photographs (600x600 recommended)
│   ├── virginia-woolf.jpg
│   ├── james-joyce.jpg
│   ├── sylvia-plath.jpg
│   ├── edgar-allan-poe.jpg
│   └── ts-eliot.jpg
│
├── verses/              # In-depth verse illustrations & piece artwork (800x800+ recommended)
│   ├── to-the-lighthouse.jpg
│   ├── ulysses.jpg
│   ├── lady-lazarus.jpg
│   ├── the-raven.jpg
│   └── the-waste-land.jpg
│
└── audio/               # Dual atmospheric soundscapes per piece (WAV, MP3, OGG)
    ├── woolf-main.wav       # Woolf: Main verse soundscape (ocean swells, wind, foghorn)
    ├── woolf-profile.wav    # Woolf: Profile / Verse analysis (intimate piano & Rhodes chords)
    ├── joyce-main.wav       # Joyce: Main verse soundscape (Dublin sea breeze & open fifth drone)
    ├── joyce-profile.wav    # Joyce: Profile / Verse analysis (warm Celtic modal strings)
    ├── plath-main.wav       # Plath: Main verse soundscape (double heartbeat pulse & clockwork)
    ├── plath-profile.wav    # Plath: Profile / Verse analysis (bowed cello drone & chamber harmonics)
    ├── poe-main.wav         # Poe: Main verse soundscape (midnight wind, low sub drone & bell)
    ├── poe-profile.wav      # Poe: Profile / Verse analysis (cathedral salon organ chords)
    ├── eliot-main.wav       # Eliot: Main verse soundscape (April rain drops & cello drone)
    └── eliot-profile.wav    # Eliot: Profile / Verse analysis (somber modernist chamber harmony)
```

---

## Dual Audio Behavior

Recall features **two distinct audio tracks** per piece:
1. **Main Verse Audio (`mainAudio`)**: Plays seamlessly while the user reads the poem on the main showcase page.
2. **Profile / Explanation Audio (`profileAudio`)**: Crossfades in smoothly when the user opens the "About the Writer" profile page or the "Verse Explanation" page. When returning to the main page, it crossfades back to the main verse soundscape.

---

## How to Add a New Piece (For Developers)

Whenever you want to add a new writer or poem to Recall:

### 1. Place the Media Files in Their Respective Folders
- Add the background image to `assets/backgrounds/` (e.g. `assets/backgrounds/mywriter-bg.jpg`)
- Add the writer's portrait to `assets/authors/` (e.g. `assets/authors/mywriter.jpg`)
- Add the verse illustration to `assets/verses/` (e.g. `assets/verses/mypiece.jpg`)
- Add the **Main Verse Audio** track to `assets/audio/` (e.g. `assets/audio/mywriter-main.wav`)
- Add the **Profile / Editorial Audio** track to `assets/audio/` (e.g. `assets/audio/mywriter-profile.wav`)

### 2. Register the Piece in `index.html`
In the `<script>` section of `index.html`, add a new object to the `writers` array:

```javascript
{
  name: "Writer Name",
  author: "Writer Name",
  piece: "Piece Title",
  work: "Piece Title",
  year: "Year",
  excerpt: "Short biography / overview excerpt for the writer card.",
  bio: "Detailed biography of the author.",
  stanza: "The verse text.\n\nLine breaks are preserved with newlines.",
  keyQuote: "Key memorable quote from the verse.",
  explanation: "Deep philosophical and literary analysis of the verse.",
  
  // Dedicated local folder assets
  authorPic: "assets/authors/mywriter.jpg",
  bgPic: "assets/backgrounds/mywriter-bg.jpg",
  versePic: "assets/verses/mypiece.jpg",
  
  // Dual audio tracks
  mainAudio: "assets/audio/mywriter-main.wav",       // Main verse page
  profileAudio: "assets/audio/mywriter-profile.wav", // Profile & verse analysis page
  
  // Compatibility aliases
  audioTrack: "assets/audio/mywriter-main.wav",
  photo: "assets/authors/mywriter.jpg",
  thumb: "assets/authors/mywriter.jpg",
  bg: "assets/backgrounds/mywriter-bg.jpg",
  audio: "assets/audio/mywriter-main.wav",
  link: "https://because.tv"
}
```

The application automatically manages crossfading between views and when switching pieces with the spacebar.
