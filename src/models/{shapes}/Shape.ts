import { ShapeType, Point } from '@/types/types';

export abstract class Shape {
  public readonly id: string;
  public x: number;
  public y: number;
  public color: number;
  public velocityY: number;
  public readonly size: number;
  public readonly shapeType: ShapeType;

  constructor(
    x: number,
    y: number,
    color: number,
    size: number,
    shapeType: ShapeType
  ) {
    this.id = this.generateId();
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.shapeType = shapeType;
    this.velocityY = 0;
  }

  private generateId(): string {
    return `shape_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public update(deltaTime: number, gravity: number): void {
    this.velocityY += gravity * deltaTime;
    this.y += this.velocityY * deltaTime;
  }

  public isOutOfBounds(height: number): boolean {
    return this.y - this.size > height;
  }

  public abstract getArea(): number;

  public abstract contains(pointX: number, pointY: number): boolean;
  public abstract getVertices(): Point[];
}
