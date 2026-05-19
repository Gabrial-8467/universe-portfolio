# Universe Portfolio

A cinematic interactive 3D universe portfolio web application built with React, Three.js, and React Three Fiber.

## Features

- **Cinematic Big Bang Intro**: Immersive opening sequence with particle explosions and camera transitions
- **5 Explorable Galaxies**: 
  - 🔴 **Skills Galaxy**: Technologies and expertise arranged in orbital systems
  - 🔵 **Projects Galaxy**: Portfolio projects with interactive details
  - 🟡 **Experience Galaxy**: Career milestones and professional journey
  - 🟣 **About Galaxy**: Personal story, education, and vision
  - 🔴 **Contact Galaxy**: Get in touch through multiple channels

- **Interactive Elements**:
  - Hover effects with glowing animations
  - Click to zoom into galaxies and planets
  - Smooth orbital animations
  - Cinematic camera transitions
  - Particle systems and visual effects

- **Modern Stack**:
  - React + TypeScript
  - Vite for fast development
  - Three.js + React Three Fiber for 3D
  - Zustand for state management
  - GSAP for smooth animations
  - @react-three/postprocessing for visual effects

## Project Structure

```
src/
├── components/          # Reusable 3D components
│   ├── Galaxy/         # Galaxies with planets
│   ├── Planet/         # Interactive planets
│   ├── Starfield/      # Background stars
│   ├── ParticleSystem/ # Particle effects
│   ├── CameraController/ # Camera movement
│   ├── HologramPanel/  # Information panels
│   ├── WarpTransition/ # Warp effects
│   ├── OrbitRing/      # Orbital paths
│   ├── Nebula/         # Nebula effects
│   ├── BlackHole/      # Contact section
│   └── AudioController/# Sound effects
│
├── scenes/              # Scene components
│   ├── IntroScene/      # Big Bang intro
│   ├── UniverseScene/   # Main universe
│   └── GalaxyScene/     # Galaxy details (future)
│
├── store/               # Zustand state management
├── data/                # Configuration data
│   └── galaxies.ts      # Galaxy & planet definitions
│
├── types/               # TypeScript definitions
├── utils/               # Helper functions
│   └── math.ts          # Math utilities
│
├── shaders/             # GLSL shaders
├── animations/          # Animation sequences
└── hooks/               # Custom React hooks

```

## Getting Started

### Installation

```bash
cd "d:\react projects\universe portfolio"
npm install
npm run dev
```

The app will start at `http://localhost:5174`

### Usage

1. **Explore**: Use WASD/QE keys to navigate through space
2. **Zoom**: Use scroll wheel to zoom in/out
3. **Interact**: 
   - Hover over galaxies to highlight them
   - Click galaxies to zoom in for detail
   - Click planets for information
4. **Controls**: See the info panel in the bottom-left for controls

## Customization

### Adding Your Information

Edit `src/data/galaxies.ts` to customize:
- Galaxy names and positions
- Planet information and orbital patterns
- Personal data and social links

### Styling

- `src/App.css`: UI overlay styles
- `src/index-new.css`: Global styles
- Component materials in individual component files

### Audio

Enable/disable audio in the UI overlay. Audio effects play on:
- Hover over elements
- Clicking interactions
- Scene transitions

## Performance Tips

- Geometry instancing is used for stars
- Lazy loading for distant galaxies
- Low-poly models for planets
- Post-processing effects are optimized
- Camera culling for off-screen objects

## Browser Support

- Chrome/Edge (Recommended)
- Firefox
- Safari (with WebGL support)
- Requires WebGL 2.0+

## Technologies Used

- **3D**: Three.js, React Three Fiber, Drei
- **State**: Zustand
- **Animation**: GSAP
- **Effects**: @react-three/postprocessing
- **Build**: Vite
- **Language**: TypeScript

## Architecture Principles

- **Component-Based**: Reusable, configurable components
- **Data-Driven**: Configuration objects instead of hardcoded components
- **Modular**: Clear separation of concerns
- **Scalable**: Easy to add new galaxies, planets, and features
- **Type-Safe**: Comprehensive TypeScript types

## Future Enhancements

- [ ] Detailed planet view scenes
- [ ] More interactive hologram panels
- [ ] Ambient music system
- [ ] Mobile responsiveness
- [ ] Additional visual effects
- [ ] Analytics integration
- [ ] Accessibility improvements

## License

MIT

## Author

Created as a cinematic portfolio experience showcasing technical expertise in modern web technologies and 3D graphics.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
