import { Shape } from './Shape';
import { ShapeType, Point } from '@/types/types';
import { MathUtils } from '@/utils/MathUtils';

export class Square extends Shape {
  constructor(x: number, y: number, color: number, size: number) {
    super(x, y, color, size, ShapeType.SQUARE);
  }

  public getVertices(): Point[] {
    return MathUtils.generatePolygonVertices(this.x, this.y, this.size, 4);
  }

  public getArea(): number {
    const vertices = this.getVertices();
    return MathUtils.calculatePolygonArea(vertices);
  }

  public contains(pointX: number, pointY: number): boolean {
    const vertices = this.getVertices();
    return MathUtils.pointInPolygon({ x: pointX, y: pointY }, vertices);
  }
}
