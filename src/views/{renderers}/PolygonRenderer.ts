import { ShapeRenderer } from './ShapeRenderer';
import { Shape } from '@/models/{shapes}/Shape';

export class PolygonRenderer extends ShapeRenderer {
  public render(shape: Shape): void {
    this.clear();
    
    const vertices = shape.getVertices();
    
    if (vertices.length === 0) return;

    this.graphics.beginFill(shape.color);
    
    this.graphics.moveTo(vertices[0].x - shape.x, vertices[0].y - shape.y);
    
    for (let i = 1; i < vertices.length; i++) {
      this.graphics.lineTo(vertices[i].x - shape.x, vertices[i].y - shape.y);
    }
    
    this.graphics.closePath();
    this.graphics.endFill();
    
    this.updatePosition(shape);
  }
}