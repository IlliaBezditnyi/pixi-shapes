import './styles.css';
import { GameController } from './controllers/GameController';

console.log('🚀 PIXI Shapes Starting...');

let gameController: GameController | null = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 100));

    // Create and initialize game controller
    gameController = new GameController();
    
    gameController.initialize();
    console.log('GameController initialized');
    
    gameController.start();
    console.log('GameController started');

    // Make game controller globally accessible for debugging
    (window as any).game = gameController;
    
  } catch (error) {
    console.error('Failed to start game:', error);
    console.error('Error details:', error);
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (gameController) {
    gameController.destroy();
  }
});