import { Shape } from '@/models/{shapes}/Shape';
import * as PIXI from 'pixi.js';

export abstract class ShapeRenderer {
  protected graphics: PIXI.Graphics;

  constructor() {
    this.graphics = new PIXI.Graphics();
  }

  public abstract render(shape: Shape): void;

  public getGraphics(): PIXI.Graphics {
    return this.graphics;
  }

  public clear(): void {
    this.graphics.clear();
  }

  protected updatePosition(shape: Shape): void {
    this.graphics.x = shape.x;
    this.graphics.y = shape.y;
  }
}
