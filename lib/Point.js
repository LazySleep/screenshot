export default class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static fromMouse(e, scale = 1) {
        return new Point(e.clientX * scale, e.clientY * scale);
    }
    eq(p) {
        return this.x === p.x && this.y === p.y;
    }
}
//# sourceMappingURL=Point.js.map