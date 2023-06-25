import Point from './Point';
import Rect from './Rect';
export declare const LINE_COLOR = "rgb(39,151,254)";
export declare const MASK_COLOR = "#00000033";
export default class CvsUtil {
    readonly cvs: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    constructor(cvs: HTMLCanvasElement);
    /**
     * 画直线
     * @param p1
     * @param p2
     * @param lineWidth
     */
    line(points: Point[], lineWidth?: number, color?: string): void;
    /**
     * 画矩形框
     * @param p1
     * @param p2
     * @param lineWidth
     * @param color
     */
    rect(p1: Point, p2: Point, lineWidth?: number, color?: string): void;
    /**
     * 画填充矩形
     * @param p1
     * @param p2
     * @param lineWidth
     * @param color
     */
    fillRect(p1: Point, p2: Point, color?: string): void;
    /**
     * 画十字
     * @param p
     * @param len
     * @param offset 偏离中心点距离
     * @param lineWidth
     * @param color
     */
    cross(p: Point, len: number | {
        horizontal: number;
        vertical: number;
    }, offset?: number, lineWidth?: number, color?: string): void;
    /**
     * 画简单直角
     * @param p 顶点
     * @param len 长度
     * @param quadrant 第几象限
     * @param lineWidth
     * @param color
     */
    simpleRightAngle(p: Point, len: number | {
        horizontal: number;
        vertical: number;
    }, quadrant: 1 | 2 | 3 | 4, lineWidth?: number, color?: string): void;
    /**
     * 画圆圈
     * @param p
     * @param r
     * @param lineWidth
     * @param color
     */
    strokeCircle(p: Point, r: number, lineWidth?: number, color?: string): void;
    /**
     * 画椭圆
     * @param p
     * @param r
     * @param lineWidth
     * @param color
     */
    ellipse(p: Point, r: number | {
        x: number;
        y: number;
    }, lineWidth?: number, color?: string): void;
    /**
     * 画箭头 p1->p2
     * @param p1
     * @param p2
     * @param size
     * @param lineWidth
     * @param color
     */
    arrow(p1: Point, p2: Point, size: number, lineWidth?: number, color?: string): void;
    /**
     * 画蒙版
     */
    mask(rect: Rect, color?: string): void;
}
