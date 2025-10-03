import { IObserver } from '@/interfaces/IObserver';
import { GameConfig } from '@/utils/GameConfig';
import { Shape } from './{shapes}/Shape';
import { ISubject } from '@/interfaces/ISubject';

export class ShapeManager implements ISubject {
  private shapes: Shape[] = [];
  private observers: IObserver[] = [];

  public attach(observer: IObserver): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
    }
  }

  public detach(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public addShape(shape: Shape): void {
    this.shapes.push(shape);
    this.notify();
  }

  public removeShape(id: string): boolean {
    const initialLength = this.shapes.length;
    this.shapes = this.shapes.filter(shape => shape.id !== id);
    
    if (this.shapes.length < initialLength) {
      this.notify();
      return true;
    }
    return false;
  }

  public removeShapeByReference(shape: Shape): boolean {
    return this.removeShape(shape.id);
  }

  public update(deltaTime: number): void {
    const gravity = GameConfig.Physics.gravity;
    const canvasHeight = GameConfig.Canvas.height;
    const shapesToRemove: string[] = [];

    for (const shape of this.shapes) {
      shape.update(deltaTime, gravity);

      if (shape.isOutOfBounds(canvasHeight)) {
        shapesToRemove.push(shape.id);
      }
    }

    if (shapesToRemove.length > 0) {
      this.shapes = this.shapes.filter(shape => !shapesToRemove.includes(shape.id));
      this.notify();
    }
  }

  public findShapeAt(x: number, y: number): Shape | null {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      if (this.shapes[i].contains(x, y)) {
        return this.shapes[i];
      }
    }
    return null;
  }

  public getShapeCount(): number {
    return this.shapes.length;
  }

  public getTotalArea(): number {
    return this.shapes.reduce((total, shape) => total + shape.getArea(), 0);
  }

  public getShapes(): readonly Shape[] {
    return this.shapes;
  }

  public clear(): void {
    this.shapes = [];
    this.notify();
  }

  public getStats(): { count: number; totalArea: number } {
    return {
      count: this.getShapeCount(),
      totalArea: this.getTotalArea()
    };
  }
}