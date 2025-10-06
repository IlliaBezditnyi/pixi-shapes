export enum ShapeType {
  TRIANGLE = 'TRIANGLE',
  SQUARE = 'SQUARE',
  PENTAGON = 'PENTAGON',
  HEXAGON = 'HEXAGON',
  CIRCLE = 'CIRCLE',
  ELLIPSE = 'ELLIPSE',
  RANDOM = 'RANDOM'
}

export interface Point {
  x: number;
  y: number;
}

export interface ShapeConfig {
  x: number;
  y: number;
  color: number;
  size: number;
  shapeType: ShapeType;
}

export interface GameConfig {
  width: number;
  height: number;
  initialShapesPerSecond: number;
  initialGravity: number;
  minShapesPerSecond: number;
  maxShapesPerSecond: number;
  minGravity: number;
  maxGravity: number;
  shapeMinSize: number;
  shapeMaxSize: number;
  shapesPerSecondStep: number;
  gravityStep: number;
}

export interface GameStats {
  shapeCount: number;
  totalArea: number;
  shapesPerSecond: number;
  gravity: number;
}

export interface ControlCallbacks {
  onIncreaseShapes: () => void;
  onDecreaseShapes: () => void;
  onIncreaseGravity: () => void;
  onDecreaseGravity: () => void;
}
