# Slicer ✂️

A high-precision, self-contained, browser-based audio and video sample slicer and professional sampler kit builder. Automatically detect transients for one-shot drum hits, classify drum sounds (Kick, Snare, Hi-Hat, Perc), or detect tempo (BPM) and bar grid boundaries for seamless looping samples. Export your slices directly as 16-bit or 24-bit broadcast-grade WAV files, standalone SoundFont 2 banks (`.sf2`), open instrument maps (`.sfz`), standard Type-0 MIDI trigger maps (`.mid`), and complete DecentSampler presets (`.dspreset`) inside a single compressed ZIP archive.

Works 100% locally in your browser using the HTML5 Web Audio API, Canvas 2D, and JSZip. Zero server uploads, zero latency, zero telemetry.

---

## ✨ Features & Implemented Functionality

### 🎹 Complete Sampler Kit & Preset Engine
- **SFZ Export (`.sfz`)**: Universal open-format instrument mapping with chromatic key mapping starting at C1 (MIDI 36), per-slice root keys (`pitch_keycenter`), per-slice fine tuning in cents (`tune`), and `loop_mode=one_shot`. 100% compatible with iOS Mighty Synth, Sforzando, bs-16i, LinuxSampler, and AudioKit.
- **Native SoundFont 2 Export (`.sf2`)**: Generates a standard SoundFont 2.04 RIFF `sfbk` binary file containing embedded 16-bit PCM audio slices, instrument zones, preset zones, chromatic key ranges, overriding root keys, and fine tuning. Ready for 1-tap import on iOS and hardware soundfont players.
- **Type-0 MIDI Sequence (`.mid`)**: Generates chronological Type-0 MIDI file with track name, tempo meta-events (BPM synchronized), variable-length quantity delta times, and chromatic slice triggers to recreate the exact groove in any DAW.
- **WAV Export**: Selectable 16-bit and 24-bit PCM audio rendering with optional peak normalization (0 dBFS).
- **All-in-One Portable ZIP Kit**: Bundles all sliced WAV files + `.sfz` + `.sf2` + `.mid` + DecentSampler `.dspreset` + session log (`info.txt`) into a single archive.
- **Standalone Download Action Buttons**: Direct 1-click download buttons for `⭳ SF2`, `⭳ SFZ`, `⭳ MIDI`, and `Export ZIP`.

### 🎛️ Per-Slice Controls
- **Custom Renaming**: Rename any slice inline via the zoom editor (e.g. "Punchy Kick", "Snare Reverb"). Custom names are reflected on slice cards and dynamically used for WAV filenames, SFZ regions, and SF2 sample descriptors.
- **Chromatic Note Badge**: Every slice displays its mapped chromatic MIDI note and number (e.g., `C1 · 36`, `C#1 · 37`, `D1 · 38`).
- **Pitch Transposition**: Semi-tone coarse tuning (±12 semitones) with real-time playback audition, sinc-interpolated resampling on WAV render, and fine-tune metadata in SFZ and SF2.
- **Gain Trim**: Adjust individual slice level by ±12 dB.
- **⇄ Reverse**: Non-destructive reverse playback and reversed WAV export.
- **Auditioning**: 1-click playback audition button on every slice card and in the zoom editor.
- **Delete & Download**: Dedicated single slice delete and individual WAV download buttons.

### 🎧 Dual Slicing Engines (Automatic + Manual)
- **Automatic Transient Detection (One-Shots)**: RMS onset energy envelope with real-time sensitivity threshold (dB) and minimum hit gap (ms).
- **Dynamic Threshold Guide**: Real-time visual overlay on the waveform demonstrating exact transient trigger boundaries.
- **Guaranteed One-Shot Fallback**: Single hits, vocal stabs, or ambient tones with subtle transients automatically provision a slice spanning the sound so no audio file ever loads empty.
- **Automatic Loop Quantization**: Tempo (BPM) detection using onset autocorrelation with parabolic sub-sample peak interpolation. Quantizes to 1, 2, 4, or 8-bar boundaries with beat-grid snapping.
- **Manual Slice Creation**:
  - **+ Add Slice**: Instant slice placement at current playhead/marker position.
  - **Click & Drag Region Creation**: Draw custom slices directly on empty canvas areas with automatic zero-crossing snapping.
  - **Split & Merge**: Split existing slices at markers or merge with adjacent slices.

### 🔬 Intelligent Transient Classification
- Heuristically classifies slices into **Kick**, **Snare**, **Hi-Hat**, **Perc**, or **Sample/FX** using spectral centroid, high-frequency energy ratio, and zero-crossing rate analysis.
- Color-coded tag pills on every slice card with interactive 1-click override.

### 📊 Waveform & Spectrogram Views
- **Full Waveform Overview**: Interactive waveform with draggable boundary handles and playhead tracking.
- **Fast STFT Spectrogram**: Real-time Short-Time Fourier Transform frequency heatmap optimized to render in under 8 ms using pre-computed trigonometric tables.
- **Zoom Slice Editor**: High-resolution zoom view with pinch-to-zoom, mouse wheel zoom, pan, and interactive boundary handles.
- **Zero-Crossing Snapping**: Auto-aligns slice start and end points to zero-amplitude crossings within a ±2 ms window to eliminate clicks and pops.
- **Micro-Nudge Controls**: Precision ±1 ms and ±10 ms adjustment buttons for surgical editing.

### 🛡️ Resilient Local Audio Engine
- **100% Client-Side**: Audio never leaves your computer or browser.
- **Native WAV Fallback Decoder (`decodeWavFallback`)**: Parses Broadcast Wave Format (`bext`), sampler metadata (`smpl`), cue chunks, and 24/32-bit PCM directly in JavaScript if browser Web Audio decoding fails.
- **Full-Window Drag & Drop**: Drag audio files anywhere onto the window with visual overlay confirmation.

---

## 📱 iOS Mighty Synth Import Guide

### Method A: Standalone SoundFont 2 (Fastest)
1. Tap **⭳ SF2** in Slicer to download `YourTrack.sf2`.
2. In the iOS Safari downloads menu, tap the file and choose **Share** → **Save to Files**.
3. Choose **On My iPhone/iPad** → **Mighty Synth** (or tap **Open in Mighty Synth** directly).
4. In Mighty Synth, select the SoundFont bank from the preset selector. Your slices are chromatic starting at C1 (MIDI 36).

### Method B: Full ZIP Kit
1. Tap **Export ZIP** and download the archive.
2. In iOS **Files**, tap the `.zip` file to extract the folder.
3. Move the uncompressed folder into **On My iPhone/iPad** → **Mighty Synth**.
4. In Mighty Synth, load the `.sfz` file. All accompanying WAV slices in the folder load instantly with proper pitch centers and tuning.

---

## 🚀 Quick Start

### 1. Open Directly in Any Browser
Because `index.html` is completely self-contained with Tailwind CSS and JSZip loaded via CDN:
- Simply double-click `index.html` or open it in Chrome, Safari, Firefox, or Edge.

### 2. Run with Node / Vite
```bash
npm install
npm run dev
```

---

## 🎹 Supported Audio & Video Formats

Any format supported by your browser's media engine:
- `.wav`, `.mp3`, `.m4a`, `.aac`, `.flac`, `.ogg`, `.opus`, `.aiff`
- Video audio tracks: `.mp4`, `.mov`, `.webm`

---

## 📄 License

MIT License. Open source and free for commercial or personal use.
