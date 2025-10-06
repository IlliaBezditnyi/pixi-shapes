import { IObserver } from "@/interfaces/IObserver";
import { ISubject } from "@/interfaces/ISubject";
import { ShapeFactory } from "@/models/ShapeFactory";
import { ShapeManager } from "@/models/ShapeManager";
import { ShapeType } from "@/types/types";
import { GameConfig } from "@/utils/GameConfig";
import { CanvasView } from "@/views/CanvasView";
import { UIView } from "@/views/UIView";
import { InputController } from "./InputController";
import { ColorUtils } from "@/utils/ColorUtils";

export class GameController implements IObserver {
  private shapeManager: ShapeManager;
  private canvasView: CanvasView;
  private uiView: UIView;
  private inputController: InputController | null = null;

  private isRunning: boolean = false;
  private lastSpawnTime: number = 0;
  private lastFrameTime: number = 0;

  constructor() {
    this.shapeManager = new ShapeManager();
    this.canvasView = new CanvasView();
    this.uiView = new UIView();
  }

  public initialize(): void {
    this.canvasView.initialize('canvas-container');

    // Register as observer of ShapeManager
    this.shapeManager.attach(this);

    this.uiView.bindControlEvents({
      onIncreaseShapes: this.increaseShapesPerSecond.bind(this),
      onDecreaseShapes: this.decreaseShapesPerSecond.bind(this),
      onIncreaseGravity: this.increaseGravity.bind(this),
      onDecreaseGravity: this.decreaseGravity.bind(this)
    });

    const canvas = this.canvasView.getCanvas();
    this.inputController = new InputController(canvas, this.handleCanvasClick.bind(this));
    this.inputController.initialize();

    this.updateUI();

    console.log('Game initialized successfully!');
  }

  public start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.lastSpawnTime = 0;

    // Start the game loop using ticker
    this.canvasView.getApp().ticker.add(this.gameLoop.bind(this));
  }

  public stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    this.canvasView.getApp().ticker.remove(this.gameLoop.bind(this));
  }

  private gameLoop(): void {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;

    // Update physics
    this.shapeManager.update(deltaTime);

    this.spawnShapes(currentTime);

    this.canvasView.renderAll(this.shapeManager.getShapes());
  }

  // Spawn new shapes based on shapesPerSecond rate
  private spawnShapes(currentTime: number): void {
    const shapesPerSecond = GameConfig.Spawn.shapesPerSecond;

    if (shapesPerSecond === 0) return;

    const spawnInterval = 1000 / shapesPerSecond;

    if (currentTime - this.lastSpawnTime >= spawnInterval) {
      const shape = ShapeFactory.createRandomShapeAtTop(GameConfig.Canvas.width);
      this.shapeManager.addShape(shape);
      this.lastSpawnTime = currentTime;
    }
  }

  private handleCanvasClick(x: number, y: number): void {
    const clickedShape = this.shapeManager.findShapeAt(x, y);

    if (clickedShape) {
      const clickedType = clickedShape.shapeType;
      const newColor = ColorUtils.getRandomVibrantColor();
      
      const allShapes = this.shapeManager.getShapes();
      let changedCount = 0;
      
      for (const shape of allShapes) {
        if (shape.shapeType === clickedType) {
          (shape as any).color = newColor;
          changedCount++;
        }
      }
    } else {
      const shape = ShapeFactory.createShape(ShapeType.RANDOM, x, y);
      this.shapeManager.addShape(shape);
    }
  }

  private increaseShapesPerSecond(): void {
    const current = GameConfig.Spawn.shapesPerSecond;
    const max = GameConfig.Spawn.maxShapesPerSecond;
    const step = GameConfig.Spawn.shapesPerSecondStep;

    if (current < max) {
      GameConfig.Spawn.shapesPerSecond = Math.min(current + step, max);
      this.updateUI();
    }
  }

  private decreaseShapesPerSecond(): void {
    const current = GameConfig.Spawn.shapesPerSecond;
    const min = GameConfig.Spawn.minShapesPerSecond;
    const step = GameConfig.Spawn.shapesPerSecondStep;

    if (current > min) {
      GameConfig.Spawn.shapesPerSecond = Math.max(current - step, min);
      this.updateUI();
    }
  }

  private increaseGravity(): void {
    const current = GameConfig.Physics.gravity;
    const max = GameConfig.Physics.maxGravity;
    const step = GameConfig.Physics.gravityStep;

    if (current < max) {
      GameConfig.Physics.gravity = Math.min(current + step, max);
      this.updateUI();
    }
  }

  private decreaseGravity(): void {
    const current = GameConfig.Physics.gravity;
    const min = GameConfig.Physics.minGravity;
    const step = GameConfig.Physics.gravityStep;

    if (current > min) {
      GameConfig.Physics.gravity = Math.max(current - step, min);
      this.updateUI();
    }
  }

  // Called when ShapeManager state changes
  public update(subject: ISubject): void {
    if (subject instanceof ShapeManager) {
      this.updateUI();
    }
  }

  private updateUI(): void {
    const stats = this.shapeManager.getStats();
    
    this.uiView.updateAll({
      shapeCount: stats.count,
      totalArea: stats.totalArea,
      gravity: GameConfig.Physics.gravity,
      shapesPerSecond: GameConfig.Spawn.shapesPerSecond
    });
  }

  public destroy(): void {
    this.stop();
    
    if (this.inputController) {
      this.inputController.destroy();
    }
    
    this.shapeManager.clear();
    this.canvasView.destroy();
  }
}