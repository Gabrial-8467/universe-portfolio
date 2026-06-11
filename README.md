# Universe Portfolio

An immersive 3D space-themed portfolio built with React, Three.js, and React Three Fiber. Navigate through an infinite starfield to explore different sections of your portfolio represented as galaxies and a black hole.

## Features

- **3D Space Environment**: Infinite starfield with realistic lighting and post-processing effects
- **Interactive Galaxies**: Six portfolio sections (About, Skills, Education, Experience, Achievements, Projects) represented as rotating galaxies
- **Black Hole Contact**: A black hole represents the Contact section with accretion disk effects
- **Smooth Camera Controls**: Drag to rotate, scroll to zoom, WASD/QE to move through space
- **Cinematic Transitions**: Animated camera travel when clicking on portfolio items
- **Ambient Audio**: Background audio with toggle control
- **Post-Processing Effects**: Bloom, chromatic aberration, noise, and vignette for cinematic look

## Tech Stack

- React 18
- TypeScript
- Three.js
- React Three Fiber
- React Three Drei
- Zustand (state management)
- Vite (build tool)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Controls

- **Mouse Drag**: Rotate camera view
- **Scroll**: Zoom in/out
- **W/S**: Move forward/backward
- **A/D**: Move left/right
- **Q/E**: Move up/down
- **Click on Galaxy**: Travel to that portfolio section
- **Audio Toggle**: Enable/disable ambient audio

## Portfolio Sections

1. **About**: Learn more about me
2. **Skills**: My technical expertise
3. **Education**: Academic background
4. **Experience**: Professional journey
5. **Achievements**: Notable accomplishments
6. **Projects**: Featured work
7. **Contact**: Get in touch (represented as a black hole)

## Project Structure

```
src/
├── components/
│   ├── AudioController/    # Audio playback management
│   ├── CameraController/    # Camera movement controls
│   ├── Galaxy/              # Galaxy 3D model component
│   ├── Starfield/           # Star field background
│   └── Wormhole/            # Black hole component
├── scenes/
│   ├── IntroScene/          # Intro/loading scene
│   └── UniverseScene/       # Main universe scene with galaxies
├── store/                   # Zustand state management
└── App.tsx                  # Main application component
```

## Customization

To customize the portfolio items, edit the `portfolioItems` array in `src/scenes/UniverseScene/index.tsx`. Each item has properties for title, description, position, scale, and link.

## Audio

The project uses an ambient audio file (`src/assets/audio/aum.mp3`) that loops when enabled. Audio is on by default at 20% volume.


