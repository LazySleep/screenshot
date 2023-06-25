import CvsUtil from '../CvsUtil';
import Point from '../Point';
import DrawToolBarAction from './DrawToolBarAction';
/**
 * 画箭头
 */
export default class ArrowFill extends DrawToolBarAction {
    constructor(cvsUtil: CvsUtil);
    drawShape(sP: Point, eP: Point, lineWidth: number, color: string): void;
}
