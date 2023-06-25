import CvsUtil from '../CvsUtil';
import Point from '../Point';
import DrawToolBarAction from './DrawToolBarAction';
/**
 * 画矩形
 */
export default class RectStroke extends DrawToolBarAction {
    constructor(cvsUtil: CvsUtil);
    drawShape(sP: Point, eP: Point, lineWidth: number, color: string): void;
}
