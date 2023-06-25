import CvsUtil from '../CvsUtil';
import Point from '../Point';
import DrawToolBarAction from './DrawToolBarAction';

/**
 * 画矩形
 */
export default class RectStroke extends DrawToolBarAction {
  constructor(cvsUtil: CvsUtil) {
    super(
      cvsUtil,
      `<svg t="1687665604132" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4720" width="200" height="200"><path d="M192 192h640v640H192V192z m-48-80c-17.673 0-32 14.327-32 32v736c0 17.673 14.327 32 32 32h736c17.673 0 32-14.327 32-32V144c0-17.673-14.327-32-32-32H144z" p-id="4721"></path></svg>`
    );
  }

  drawShape(sP: Point, eP: Point, lineWidth: number, color: string): void {
    this.cvsUtil.rect(sP, eP, lineWidth, color);
  }
}
