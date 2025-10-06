import { Shape } from './Shape';
import { ShapeType, Point } from '@/types/types';
import { MathUtils } from '@/utils/MathUtils';

export class Ellipse extends Shape {
  public readonly radiusX: number;
  public readonly radiusY: number;

  constructor(x: number, y: number, color: number, size: number) {
    super(x, y, color, size, ShapeType.ELLIPSE);
    // Make ellipse wider than it is tall
    this.radiusX = size * 1.5;
    this.radiusY = size;
  }

  public getVertices(): Point[] {
    // Return center point, because circles don't have vertices
    return [{ x: this.x, y: this.y }];
  }

  public getArea(): number {
    return Math.PI * this.radiusX * this.radiusY;
  }

  public contains(pointX: number, pointY: number): boolean {
    return MathUtils.pointInEllipse(
      { x: pointX, y: pointY },
      { x: this.x, y: this.y },
      this.radiusX,
      this.radiusY
    );
  }

  public isOutOfBounds(height: number): boolean {
    return this.y - this.radiusY > height;
  }
}
