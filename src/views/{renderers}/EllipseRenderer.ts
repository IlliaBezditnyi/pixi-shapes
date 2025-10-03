import { Shape } from '@/models/{shapes}/Shape';
import { ShapeRenderer } from './ShapeRenderer';
import { Ellipse } from '@/models/{shapes}/Ellipse';

export class EllipseRenderer extends ShapeRenderer {
  public render(shape: Shape): void {
    this.clear();
    
    if (!(shape instanceof Ellipse)) {
      console.error('EllipseRenderer can only render Ellipse shapes');
      return;
    }

    this.graphics.beginFill(shape.color);
    this.graphics.drawEllipse(0, 0, shape.radiusX, shape.radiusY);
    this.graphics.endFill();
    
    this.updatePosition(shape);
  }
}