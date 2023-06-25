export default class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    static fromMouse(e: MouseEvent, scale?: number): Point;
    eq(p: Point): boolean;
}
