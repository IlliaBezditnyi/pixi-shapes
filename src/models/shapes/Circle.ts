import { Shape } from './Shape';
import { ShapeType, Point } from '@/types/types';
import { MathUtils } from '@/utils/MathUtils';

export class Circle extends Shape {
  public readonly radius: number;

  constructor(x: number, y: number, color: number, size: number) {
    super(x, y, color, size, ShapeType.CIRCLE);
    this.radius = size;
  }

  public getVertices(): Point[] {
    // Return center point, because circles don't have vertices
    return [{ x: this.x, y: this.y }];
  }

  public getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  public contains(pointX: number, pointY: number): boolean {
    return MathUtils.pointInCircle(
      { x: pointX, y: pointY },
      { x: this.x, y: this.y },
      this.radius
    );
  }

  public isOutOfBounds(height: number): boolean {
    return this.y - this.radius > height;
  }
}
