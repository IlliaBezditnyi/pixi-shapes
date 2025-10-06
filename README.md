# PIXI Shapes

Interactive falling shapes animation built with PIXI.js, TypeScript, and MVC architecture.

## Features

- 🎨 Multiple shape types (triangle, square, pentagon, hexagon, circle, ellipse)
- 🌈 Random colors for each shape
- 🎮 Interactive controls for spawn rate and gravity
- 📊 Real-time statistics (shape count, surface area)
- 🖱️ Click to create new shapes, and change shapes color
- ⚡ Physics-based gravity simulation

## Tech Stack

- **PIXI.js** - 2D WebGL renderer
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **MVC Architecture** - Clean code organization

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/IlliaBezditnyi/pixi-shapes.git
cd pixi-shapes

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

The application will open at `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── models/          # Domain logic and data
│   ├── shapes/      # Shape classes
│   └── managers/    # Game state management
├── views/           # Shapes and UI rendering
├── controllers/     # User input and game flow
├── interfaces/      # TypeScript interfaces
├── utils/           # Helper functions and GameConfig
└── main.ts          # Application entry point
\`\`\`

## Design Patterns

- **MVC** - Separation of concerns
- **Factory** - Shapes creation
- **Observer** - State change notifications
- **Singleton** - Global accessibility of GameConfig without initialization