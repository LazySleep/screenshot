import CvsUtil from '../CvsUtil';
import Point from '../Point';
import DrawToolBarAction from './DrawToolBarAction';
/**
 * 画线条
 */
export default class LineStroke extends DrawToolBarAction {
    constructor(cvsUtil: CvsUtil);
    drawShape(sP: Point, eP: Point, lineWidth: number, color: string): void;
}
