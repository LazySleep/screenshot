import CvsUtil from '../CvsUtil';
import Point from '../Point';
import DrawToolBarAction from './DrawToolBarAction';
/**
 * 画圆圈
 */
export default class CircleStroke extends DrawToolBarAction {
    constructor(cvsUtil: CvsUtil);
    drawShape(sP: Point, eP: Point, lineWidth: number, color: string): void;
}
