import * as PIXI from 'pixi.js';
import { ShapeType } from '@/types/types';
import { GameConfig } from '@/utils/GameConfig';
import { Shape } from '@/models/shapes/Shape';

export class CanvasView {
  private app: PIXI.Application;
  private container: PIXI.Container;
  private shapeGraphics: Map<string, PIXI.Graphics>;

  constructor() {
    this.shapeGraphics = new Map();
    this.container = new PIXI.Container();
    
    this.app = new PIXI.Application({
      width: GameConfig.Canvas.width,
      height: GameConfig.Canvas.height,
      backgroundColor: 0xf8f9fa,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    });

    this.app.stage.addChild(this.container);
  }

  public initialize(containerId: string): void {
    const domContainer = document.getElementById(containerId);
    
    if (!domContainer) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

    domContainer.innerHTML = '';
    domContainer.appendChild(this.app.view as HTMLCanvasElement);
  }

  public renderShape(shape: Shape): void {
    let graphics = this.shapeGraphics.get(shape.id);

    if (!graphics) {
      graphics = new PIXI.Graphics();
      
      this.container.addChild(graphics);
      this.shapeGraphics.set(shape.id, graphics);
      
      graphics.interactive = true;
    }

    graphics.clear();
    
    const vertices = shape.getVertices();
    
    graphics.beginFill(shape.color);
    
    if (vertices.length > 1) {
      graphics.moveTo(vertices[0].x - shape.x, vertices[0].y - shape.y);
      for (let i = 1; i < vertices.length; i++) {
        graphics.lineTo(vertices[i].x - shape.x, vertices[i].y - shape.y);
      }
      graphics.closePath();
    } else {
      if (shape.shapeType === ShapeType.CIRCLE) {
        const circle = shape as any;
        graphics.drawCircle(0, 0, circle.radius);
      } else if (shape.shapeType === ShapeType.ELLIPSE) {
        const ellipse = shape as any;
        graphics.drawEllipse(0, 0, ellipse.radiusX, ellipse.radiusY);
      }
    }
    
    graphics.endFill();
    
    graphics.x = shape.x;
    graphics.y = shape.y;
  }

  public renderAll(shapes: readonly Shape[]): void {
    const currentShapeIds = new Set(shapes.map(s => s.id));
    
    for (const [id, graphics] of this.shapeGraphics.entries()) {
      if (!currentShapeIds.has(id)) {
        this.container.removeChild(graphics);
        graphics.destroy();
        this.shapeGraphics.delete(id);
      }
    }

    for (const shape of shapes) {
      this.renderShape(shape);
    }
  }

  public clear(): void {
    for (const graphics of this.shapeGraphics.values()) {
      this.container.removeChild(graphics);
      graphics.destroy();
    }
    this.shapeGraphics.clear();
  }

  public getApp(): PIXI.Application {
    return this.app;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.app.view as HTMLCanvasElement;
  }


  public resize(width: number, height: number): void {
    this.app.renderer.resize(width, height);
  }

  public destroy(): void {
    this.clear();
    this.app.destroy(true);
  }
}