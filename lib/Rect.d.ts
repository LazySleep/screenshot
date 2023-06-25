import Point from './Point';
export default class Rect {
    readonly topLeft: Point;
    readonly topRight: Point;
    readonly bottomLeft: Point;
    readonly bottomRight: Point;
    readonly width: number;
    readonly height: number;
    constructor(topLeft: Point, topRight: Point, bottomLeft: Point, bottomRight: Point);
    /**
     * 根据给定点实例化
     * @param target
     * @param offset 偏移量, 正值则扩大矩形，负值则缩小
     * @returns
     */
    static fromPoint(p1: Point, p2: Point, offset?: number | {
        x: number;
        y: number;
    }): Rect;
    /**
     * 判断点是否在矩形内
     * @param p
     * @returns
     */
    inRect(p: Point): boolean;
}
