export default class Point {
  constructor(public x: number = 0, public y: number = 0) {}

  static fromMouse(e: MouseEvent, scale: number = 1): Point {
    return new Point(e.clientX * scale, e.clientY * scale);
  }

  eq(p: Point): boolean {
    return this.x === p.x && this.y === p.y;
  }
}
