import { Point } from '@/types/types';

export class InputController {
  private canvas: HTMLCanvasElement;
  private clickCallback: (x: number, y: number) => void;

  constructor(canvas: HTMLCanvasElement, clickCallback: (x: number, y: number) => void) {
    this.canvas = canvas;
    this.clickCallback = clickCallback;
  }

  public initialize(): void {
    this.canvas.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(event: MouseEvent): void {
    const position = this.getLocalPosition(event);
    this.clickCallback(position.x, position.y);
  }


  // Converts mouse event to canvas-local coordinates
  private getLocalPosition(event: MouseEvent): Point {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  }

  public destroy(): void {
    this.canvas.removeEventListener('click', this.handleClick.bind(this));
  }
}