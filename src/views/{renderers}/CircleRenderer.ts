import { Shape } from '@/models/{shapes}/Shape';
import { ShapeRenderer } from './ShapeRenderer';
import { Circle } from 'pixi.js';

export class CircleRenderer extends ShapeRenderer {
  public render(shape: Shape): void {
    this.clear();
    
    if (!(shape instanceof Circle)) {
      console.error('CircleRenderer can only render Circle shapes');
      return;
    }

    this.graphics.beginFill(shape.color);
    this.graphics.drawCircle(0, 0, shape.radius);
    this.graphics.endFill();
    
    this.updatePosition(shape);
  }
}
