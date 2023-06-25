import CvsUtil from '../CvsUtil';
import Point from '../Point';
import Rect from '../Rect';
import DrawToolBarAction from './DrawToolBarAction';
/**
 * 画圆圈
 */
export default class CircleStroke extends DrawToolBarAction {
  constructor(cvsUtil: CvsUtil) {
    super(
      cvsUtil,
      `<svg t="1687267111648" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3827" width="200" height="200"><path d="M512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z m0 768a341.333333 341.333333 0 1 1 341.333333-341.333333 341.333333 341.333333 0 0 1-341.333333 341.333333z" p-id="3828"></path></svg>`
    );
  }

  drawShape(sP: Point, eP: Point, lineWidth: number, color: string): void {
    const { topLeft, width, height } = Rect.fromPoint(sP, eP);
    const center = new Point(topLeft.x + width / 2, topLeft.y + height / 2);
    this.cvsUtil.ellipse(center, { x: width / 2, y: height / 2 }, lineWidth, color);
  }
}
