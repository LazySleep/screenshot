import Point from './Point';
export default class Rect {
    topLeft;
    topRight;
    bottomLeft;
    bottomRight;
    width;
    height;
    constructor(topLeft, topRight, bottomLeft, bottomRight) {
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
        this.width = topRight.x - topLeft.x;
        this.height = bottomLeft.y - topLeft.y;
    }
    /**
     * 根据给定点实例化
     * @param target
     * @param offset 偏移量, 正值则扩大矩形，负值则缩小
     * @returns
     */
    static fromPoint(p1, p2, offset = 0) {
        offset = typeof offset === 'number' ? { x: offset, y: offset } : offset;
        const minX = Math.min(p1.x, p2.x) - offset.x;
        const minY = Math.min(p1.y, p2.y) - offset.y;
        const maxX = Math.max(p1.x, p2.x) + offset.x;
        const maxY = Math.max(p1.y, p2.y) + offset.y;
        return new Rect(new Point(minX, minY), new Point(maxX, minY), new Point(minX, maxY), new Point(maxX, maxY));
    }
    /**
     * 判断点是否在矩形内
     * @param p
     * @returns
     */
    inRect(p) {
        return p.x >= this.topLeft.x && p.y >= this.topLeft.y && p.x <= this.bottomRight.x && p.y <= this.bottomRight.y;
    }
}
//# sourceMappingURL=Rect.js.map