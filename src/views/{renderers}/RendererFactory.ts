import { ShapeRenderer } from './ShapeRenderer';
import { PolygonRenderer } from './PolygonRenderer';
import { CircleRenderer } from './CircleRenderer';
import { EllipseRenderer } from './EllipseRenderer';
import { ShapeType } from '@/types/types';

export class RendererFactory {
  private static renderers: Map<ShapeType, ShapeRenderer> = new Map();

  public static getRenderer(shapeType: ShapeType): ShapeRenderer {
    if (this.renderers.has(shapeType)) {
      return this.renderers.get(shapeType)!;
    }

    let renderer: ShapeRenderer;

    switch (shapeType) {
      case ShapeType.TRIANGLE:
      case ShapeType.SQUARE:
      case ShapeType.PENTAGON:
      case ShapeType.HEXAGON:
        renderer = new PolygonRenderer();
        break;
      
      case ShapeType.CIRCLE:
        renderer = new CircleRenderer();
        break;
      
      case ShapeType.ELLIPSE:
        renderer = new EllipseRenderer();
        break;
      
      default:
        throw new Error(`No renderer available for shape type: ${shapeType}`);
    }

    this.renderers.set(shapeType, renderer);
    return renderer;
  }

  public static clearCache(): void {
    this.renderers.clear();
  }
}