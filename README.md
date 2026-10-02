# Slicer ✂️

A high-precision, self-contained, browser-based audio and video sample slicer. Automatically detect transients for one-shot drum hits and sound effects, or detect tempo (BPM) and bar grid boundaries for seamless looping samples. Export your slices directly as 16-bit or 24-bit broadcast-grade WAV files inside a compressed ZIP archive.

Works 100% locally in your browser using the HTML5 Web Audio API, Canvas 2D, and JSZip. Zero server uploads, zero latency, zero telemetry.

---

## ✨ Features

- **Dual Slicing Engines**:
  - **One-Shot Mode**: RMS onset & transient energy detection with configurable sensitivity (dB) and minimum hit gap (ms).
  - **Loop Mode**: Automatic tempo (BPM) detection using onset autocorrelation with parabolic sub-sample peak interpolation. Quantizes to 1, 2, 4, or 8-bar boundaries with beat-grid snapping.
- **Interactive Multi-Level Waveforms**:
  - **Overview Canvas**: Full-track visualization with draggable slice boundaries, active playhead tracking, and manual marker placement.
  - **Zoom Slice Editor**: High-resolution zoom view with pinch-to-zoom, mouse wheel zoom, pan, and interactive boundary handles.
  - **Zero-Crossing Snapping**: Auto-aligns slice start and end points to zero-amplitude crossings within a ±2 ms window to eliminate clicks and pops.
  - **Micro-Nudge Controls**: Precision ±1 ms and ±10 ms adjustment buttons for surgical editing.
  - **Slice Management**: Split at marker, merge with adjacent slice, delete slice, and reset to automatic detection.
- **Seam Auditioning**:
  - Test loop continuity with **Seam ×4** playback, applying real-time loop crossfades so you know your loops groove seamlessly before exporting.
- **Audio Rendering & Export**:
  - **Format Options**: Studio 24-bit WAV or standard 16-bit PCM WAV.
  - **Level Normalization**: Optional one-click peak normalization to −1 dBFS.
  - **Crossfading & Fades**: Configurable 0–100 ms linear crossfade or edge fade-out.
  - **ZIP Packaging**: Packages all selected slices alongside an `info.txt` session log containing source metadata, tempo, and slice parameters.
- **Productivity & Workflow**:
  - **Drag & Drop**: Drag audio or video files directly onto the browser window.
  - **50-Step Undo History**: Safe non-destructive editing (`Ctrl+Z` / `Cmd+Z`).
  - **Session Persistence**: Saves slice markers and tempo to `localStorage`, with automatic restore prompts on reload.
  - **Keyboard Shortcuts**: `Space` to play/pause selected slice, `Escape` to close editor, `Ctrl/Cmd+Z` to undo.

---

## 🚀 Quick Start

### 1. Open Directly in Any Browser
Because `index.html` is completely self-contained with Tailwind CSS and JSZip loaded via CDN:
- Simply double-click `index.html` or open it in Chrome, Safari, Firefox, or Edge.

### 2. Run with Node / Vite
If you prefer running via the included Vite dev server:
```bash
# Install dependencies
npm install

# Start local server
npm run dev
```

---

## 📦 How to Publish to GitHub

### Option A: Using Git Command Line

1. **Initialize Git (if not already done)**:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit: Slicer - Audio One-Shot & Loop Slicer"
   ```

2. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Name your repository (e.g. `slicer` or `audio-slicer`).
   - Do **not** initialize with a README (this repository already has one).

3. **Link remote and push**:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git branch -M main
   git push -u origin main
   ```

### Option B: Using GitHub CLI (`gh`)

If you have `gh` installed and authenticated on your machine:
```bash
gh repo create slicer --public --source=. --remote=origin --push
```

---

## 🌐 Deploy to GitHub Pages (1-Click Free Hosting)

Once pushed to GitHub, you can host Slicer for free via GitHub Pages:

1. Open your repository on GitHub.
2. Go to **Settings** > **Pages** (under "Code and automation").
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Click **Save**.
5. Within 1 minute, your app will be live at `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`.

---

## 🎹 Supported Audio & Video Formats

Any format supported by your browser's Web Audio API decoding engine:
- `.wav`, `.mp3`, `.m4a`, `.aac`, `.flac`, `.ogg`
- Video audio tracks: `.mp4`, `.mov`, `.webm`

---

## 📄 License

MIT License. Open source and free for commercial or personal use.
