import { ControlCallbacks } from '@/types/types';

export class UIView {
  private shapeCountElement: HTMLElement;
  private surfaceAreaElement: HTMLElement;
  private gravityElement: HTMLElement;
  private shapesPerSecondElement: HTMLElement;

  private increaseShapesBtn: HTMLButtonElement;
  private decreaseShapesBtn: HTMLButtonElement;
  private increaseGravityBtn: HTMLButtonElement;
  private decreaseGravityBtn: HTMLButtonElement;

  constructor() {
    this.shapeCountElement = this.getElement('shapeCount');
    this.surfaceAreaElement = this.getElement('surfaceArea');
    this.gravityElement = this.getElement('gravityValue');
    this.shapesPerSecondElement = this.getElement('shapesPerSecond');

    this.increaseShapesBtn = this.getButton('increaseShapes');
    this.decreaseShapesBtn = this.getButton('decreaseShapes');
    this.increaseGravityBtn = this.getButton('increaseGravity');
    this.decreaseGravityBtn = this.getButton('decreaseGravity');
  }

  private getElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Element with id "${id}" not found`);
    }
    return element;
  }

  private getButton(id: string): HTMLButtonElement {
    const element = document.getElementById(id);
    if (!element || !(element instanceof HTMLButtonElement)) {
      throw new Error(`Button with id "${id}" not found`);
    }
    return element;
  }

  public updateShapeCount(count: number): void {
    this.shapeCountElement.textContent = count.toString();
  }

  public updateSurfaceArea(area: number): void {
    this.surfaceAreaElement.textContent = Math.round(area).toString();
  }

  public updateGravity(gravity: number): void {
    this.gravityElement.textContent = gravity.toString();
  }

  public updateShapesPerSecond(rate: number): void {
    this.shapesPerSecondElement.textContent = rate.toString();
  }

  public bindControlEvents(callbacks: ControlCallbacks): void {
    this.increaseShapesBtn.addEventListener('click', callbacks.onIncreaseShapes);
    this.decreaseShapesBtn.addEventListener('click', callbacks.onDecreaseShapes);
    this.increaseGravityBtn.addEventListener('click', callbacks.onIncreaseGravity);
    this.decreaseGravityBtn.addEventListener('click', callbacks.onDecreaseGravity);
  }

  public updateAll(stats: {
    shapeCount: number;
    totalArea: number;
    gravity: number;
    shapesPerSecond: number;
  }): void {
    this.updateShapeCount(stats.shapeCount);
    this.updateSurfaceArea(stats.totalArea);
    this.updateGravity(stats.gravity);
    this.updateShapesPerSecond(stats.shapesPerSecond);
  }
}