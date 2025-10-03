// src/main.ts

import './styles.css';
import { GameController } from './controllers/GameController';

console.log('🚀 PIXI Shapes Animation Starting...');

let gameController: GameController | null = null;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('✅ DOM Loaded');

  try {
    // Small delay to ensure everything is ready
    await new Promise(resolve => setTimeout(resolve, 100));

    // Create and initialize game controller
    gameController = new GameController();
    console.log('🔧 GameController created');
    
    gameController.initialize();
    console.log('🔧 GameController initialized');
    
    // Start the game after initialization
    gameController.start();
    console.log('🔧 GameController started');

    console.log('🎉 Game is running! Click to create or destroy shapes!');
    console.log('📊 Check the top panel for statistics');
    console.log('🎮 Use +/- buttons to control spawn rate and gravity');

    // Make game controller globally accessible for debugging
    (window as any).game = gameController;
    
  } catch (error) {
    console.error('❌ Failed to start game:', error);
    console.error('Error details:', error);
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (gameController) {
    gameController.destroy();
  }
});