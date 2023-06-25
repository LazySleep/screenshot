import CvsUtil from '../CvsUtil';
import Point from '../Point';
import DrawToolBarAction from './DrawToolBarAction';
/**
 * 画任意线条
 */
export default class PenStrok extends DrawToolBarAction {
    paths: Point[];
    constructor(cvsUtil: CvsUtil);
    drawShape(sP: Point, eP: Point, lineWidth: number, color: string): void;
    myDrawShape(paths: Point[], lineWidth: number, color: string): void;
    mousedown(p: Point): void;
    mousemove(p: Point): void;
    /**
     * 鼠标抬起
     */
    mouseup(p: Point): void;
    draw(): void;
}
