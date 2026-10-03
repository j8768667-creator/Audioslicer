# Slicer ✂️

A high-precision, self-contained, browser-based audio and video sample slicer and sampler kit builder. Automatically detect transients for one-shot drum hits, classify drum sounds (Kick, Snare, Hi-Hat, Perc), or detect tempo (BPM) and bar grid boundaries for seamless looping samples. Export your slices directly as 16-bit or 24-bit broadcast-grade WAV files, standard MIDI maps (`.mid`), and complete sampler presets (`.sfz` and DecentSampler `.dspreset`) inside a compressed ZIP archive.

Works 100% locally in your browser using the HTML5 Web Audio API, Canvas 2D, and JSZip. Zero server uploads, zero latency, zero telemetry.

---

## ✨ Features

### 🎧 Dual Slicing Engines
- **One-Shot Mode**: RMS onset & transient energy detection with configurable sensitivity (dB) and minimum hit gap (ms).
- **Dynamic Threshold Guide**: Real-time visual overlay on the waveform demonstrating exact transient trigger boundaries.
- **Loop Mode**: Automatic tempo (BPM) detection using onset autocorrelation with parabolic sub-sample peak interpolation. Quantizes to 1, 2, 4, or 8-bar boundaries with beat-grid snapping.
- **Click & Drag Region Creation**: Draw custom slices directly on empty canvas areas with automatic zero-crossing snapping.

### 🔬 Intelligent Transient Classification
- Automatically classifies one-shot slices into **Kick**, **Snare**, **Hi-Hat**, **Perc**, or **Sample/FX** using spectral centroid, high-frequency energy ratio, and zero-crossing rate analysis.
- Color-coded tag pills on every slice card.
- Automatic descriptive naming on export (e.g. `Song_kick_01.wav`, `Song_snare_02.wav`).

### 📊 Waveform & Spectrogram Views
- **Waveform Overview**: Full-track visualization with draggable slice boundaries, active playhead tracking, and manual marker placement.
- **Interactive Fourier Spectrogram**: Switch seamlessly between time-domain waveform and multi-color Short-Time Fourier Transform (STFT) frequency heatmap.
- **Zoom Slice Editor**: High-resolution zoom view with pinch-to-zoom, mouse wheel zoom, pan, and interactive boundary handles.
- **Zero-Crossing Snapping**: Auto-aligns slice start and end points to zero-amplitude crossings within a ±2 ms window to eliminate clicks and pops.
- **Micro-Nudge Controls**: Precision ±1 ms and ±10 ms adjustment buttons for surgical editing.

### 🎛️ Per-Slice Sound Shaping
- **⇄ Reverse**: Non-destructive reverse playback and reversed WAV export.
- **Gain Trim**: Adjust individual slice level by ±12 dB.
- **Pitch Transposition**: Semi-tone coarse tuning (±12 semitones) with real-time audition and sinc-interpolated resampling on export.
- **Editor Loop Audition**: Toggle looped playback directly within the zoom editor to fine-tune slice boundaries.

### 🔄 Advanced Crossfading & Seam Auditioning
- **Equal-Power (3 dB) Crossfade**: Sine/cosine power-preserving crossfade curve prevents volume dips at loop seams.
- **Linear Crossfade**: Traditional linear crossfading (0 to 100 ms).
- **Seam ×4 Auditioning**: Seamlessly audition loop transitions with 4 repetitions before exporting.

### 🎹 Sampler Kit & MIDI Export
- **Standard MIDI Map (`.mid`)**: Automatically generates a Type 0 MIDI file with chromatic trigger notes (C1, C#1, D1, etc.) mapped to the exact slice timing to rebuild the groove in any DAW.
- **SFZ Sampler Patch (`.sfz`)**: Universal open-format instrument mapping for Sforzando, LinuxSampler, and hardware samplers.
- **DecentSampler Preset (`.dspreset`)**: Ready-to-play multi-sample preset for DecentSampler (free VST/AU/AAX/iOS).
- **Direct Drag-Out**: Drag slice cards directly out of the browser into compatible DAWs (Ableton, Bitwig, Reaper) or desktop folders.
- **1-Click Individual WAV Download**: Download any slice instantly with applied gain, pitch, reverse, and normalization.

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
   git commit -m "feat: complete audio slicer and sampler workstation"
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
- `.wav`, `.mp3`, `.m4a`, `.aac`, `.flac`, `.ogg`, `.opus`, `.aiff`
- Video audio tracks: `.mp4`, `.mov`, `.webm`

---

## 📄 License

MIT License. Open source and free for commercial or personal use.
