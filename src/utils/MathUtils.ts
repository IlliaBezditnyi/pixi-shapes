import { Point } from '@/types/types';

export class MathUtils {
  static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  // Calculates the area of a polygon using the Shoelace formula
  static calculatePolygonArea(vertices: Point[]): number {
    let area = 0;
    const n = vertices.length;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += vertices[i].x * vertices[j].y;
      area -= vertices[j].x * vertices[i].y;
    }

    return Math.abs(area / 2);
  }

  static pointInPolygon(point: Point, vertices: Point[]): boolean {
    let inside = false;
    const n = vertices.length;

    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = vertices[i].x;
      const yi = vertices[i].y;
      const xj = vertices[j].x;
      const yj = vertices[j].y;

      const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);

      if (intersect) inside = !inside;
    }

    return inside;
  }

  static pointInCircle(point: Point, center: Point, radius: number): boolean {
    const dx = point.x - center.x;
    const dy = point.y - center.y;
    return (dx * dx + dy * dy) <= (radius * radius);
  }

  static pointInEllipse(
    point: Point,
    center: Point,
    radiusX: number,
    radiusY: number
  ): boolean {
    const dx = point.x - center.x;
    const dy = point.y - center.y;
    return ((dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY)) <= 1;
  }

  static generatePolygonVertices(
    centerX: number,
    centerY: number,
    radius: number,
    sides: number
  ): Point[] {
    const vertices: Point[] = [];
    const angleStep = (Math.PI * 2) / sides;
    const startAngle = -Math.PI / 2;

    for (let i = 0; i < sides; i++) {
      const angle = startAngle + (i * angleStep);
      vertices.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      });
    }

    return vertices;
  }

  static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}