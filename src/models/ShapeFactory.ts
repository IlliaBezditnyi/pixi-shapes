import { ShapeType } from '@/types/types';
import { ColorUtils } from '@/utils/ColorUtils';
import { MathUtils } from '@/utils/MathUtils';
import { GameConfig } from '@/utils/GameConfig';
import { Shape } from './shapes/Shape';
import { Triangle } from './shapes/Triangle';
import { Square } from './shapes/Square';
import { Pentagon } from './shapes/Pentagon';
import { Hexagon } from './shapes/Hexagon';
import { Circle } from './shapes/Circle';
import { Ellipse } from './shapes/Ellipse';

export class ShapeFactory {
  public static createShape(
    type: ShapeType,
    x: number,
    y: number,
    color?: number,
    size?: number
  ): Shape {
    const shapeColor = color !== undefined 
      ? color 
      : ColorUtils.getRandomVibrantColor();

    const shapeSize = size !== undefined
      ? size
      : MathUtils.getRandomInt(
          GameConfig.Shapes.minSize,
          GameConfig.Shapes.maxSize
        );

    switch (type) {
      case ShapeType.TRIANGLE:
        return new Triangle(x, y, shapeColor, shapeSize);
      
      case ShapeType.SQUARE:
        return new Square(x, y, shapeColor, shapeSize);
      
      case ShapeType.PENTAGON:
        return new Pentagon(x, y, shapeColor, shapeSize);
      
      case ShapeType.HEXAGON:
        return new Hexagon(x, y, shapeColor, shapeSize);
      
      case ShapeType.CIRCLE:
        return new Circle(x, y, shapeColor, shapeSize);
      
      case ShapeType.ELLIPSE:
        return new Ellipse(x, y, shapeColor, shapeSize);
      
      case ShapeType.RANDOM:
        return this.createRandomShape(x, y, shapeColor, shapeSize);
      
      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
  }

  public static createRandomShape(
    x: number,
    y: number,
    color?: number,
    size?: number
  ): Shape {
    const shapeTypes = [
      ShapeType.TRIANGLE,
      ShapeType.SQUARE,
      ShapeType.PENTAGON,
      ShapeType.HEXAGON,
      ShapeType.CIRCLE,
      ShapeType.ELLIPSE
    ];

    const randomType = shapeTypes[MathUtils.getRandomInt(0, shapeTypes.length - 1)];
    return this.createShape(randomType, x, y, color, size);
  }

  public static createShapeAtTop(type: ShapeType, canvasWidth: number): Shape {
    const margin = GameConfig.Shapes.maxSize;
    const x = MathUtils.getRandomInt(margin, canvasWidth - margin);
    const y = -GameConfig.Shapes.maxSize; // Start above the screen

    return this.createShape(type, x, y);
  }

  public static createRandomShapeAtTop(canvasWidth: number): Shape {
    return this.createShapeAtTop(ShapeType.RANDOM, canvasWidth);
  }
}