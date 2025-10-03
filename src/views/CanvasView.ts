import * as PIXI from 'pixi.js';
import { GameConfig } from "@/utils/GameConfig";
import { Shape } from '@/models/{shapes}/Shape';
import { RendererFactory } from './{renderers}/RendererFactory';

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
      const renderer = RendererFactory.getRenderer(shape.shapeType);
      renderer.render(shape);
      
      graphics = renderer.getGraphics();
      
      this.container.addChild(graphics);
      this.shapeGraphics.set(shape.id, graphics);
    } else {
      const renderer = RendererFactory.getRenderer(shape.shapeType);
      
      graphics.x = shape.x;
      graphics.y = shape.y;
    }

    graphics.eventMode = 'static';
    graphics.cursor = 'pointer';
  }

  public removeShape(id: string): void {
    const graphics = this.shapeGraphics.get(id);
    
    if (graphics) {
      this.container.removeChild(graphics);
      graphics.destroy();
      this.shapeGraphics.delete(id);
    }
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