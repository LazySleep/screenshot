import CvsUtil from '../CvsUtil';
import Point from '../Point';
import DrawToolBarAction from './DrawToolBarAction';

/**
 * 画任意线条
 */
export default class PenStrok extends DrawToolBarAction {
  public paths: Point[] = [];

  constructor(cvsUtil: CvsUtil) {
    super(
      cvsUtil,
      `<svg t="1687663637582" style="scale:0.9" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3616" width="200" height="200"><path d="M818.346667 352.853333l-202.837334-188.16 56.490667-60.885333 202.837333 188.16zM438.741333 762.197333l-202.922666-188.245333 360.874666-388.949333 202.88 188.245333zM217.002667 594.218667l202.922666 188.288-270.890666 88.448z" fill="" p-id="3617"></path><path d="M747.648 98.56l126.805333 117.632c20.992 19.498667 21.162667 53.504 0.426667 75.861333-20.821333 22.442667-54.698667 24.746667-75.690667 5.290667L672.384 179.626667c-21.034667-19.498667-21.205333-53.504-0.426667-75.861334 20.821333-22.4 54.698667-24.746667 75.690667-5.290666z" p-id="3618"></path></svg>`
    );
  }

  drawShape(sP: Point, eP: Point, lineWidth: number, color: string): void {}

  myDrawShape(paths: Point[], lineWidth: number, color: string): void {
    this.cvsUtil.line(paths, lineWidth, color);
  }

  mousedown(p: Point): void {
    if (this.state === 'wait') {
      this.paths = [];
    }
    super.mousedown(p);
  }

  mousemove(p: Point): void {
    super.mousemove(p);
    if (this.state === 'moving') {
      if (this.paths.length === 0 || !this.paths[this.paths.length - 1].eq(p)) {
        this.paths.push(p);
      }
    }
  }
  /**
   * 鼠标抬起
   */
  mouseup(p: Point): void {
    if (this.state === 'moving') {
      this.state = 'wait';
      if (this.startP && !this.startP.eq(p)) {
        const paths = [...this.paths];
        const lineWidth = this.lineWidth;
        const color = this.color;
        this.toolBar?.event.emit('push-history', () => this.myDrawShape(paths, lineWidth, color));
      }
    }
  }

  draw(): void {
    this.drawMouse();
    // 如果是绘图中则绘制实时图形
    if (this.state === 'moving' && this.startP && this.moveP && !this.startP.eq(this.moveP)) {
      this.myDrawShape(this.paths, this.lineWidth, this.color);
    }
  }
}
