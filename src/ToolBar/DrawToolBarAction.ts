import CvsUtil from '../CvsUtil';
import Point from '../Point';
import ToolBarAction from './ToolBarAction';
/**
 * 绘图类型基础类
 */
export default abstract class DrawToolBarAction extends ToolBarAction {
  protected state: 'wait' | 'moving' = 'wait';
  protected isLeave: boolean = false;
  protected startP: Point | null = null;
  protected moveP: Point | null = null;

  protected lineWidth: number = 10;
  protected color = 'red';
  constructor(protected readonly cvsUtil: CvsUtil, svgStr: string) {
    super(cvsUtil, svgStr);
  }

  actived() {}

  /**
   * 鼠标移入区域
   */
  mouseenter(p: Point): void {
    this.isLeave = false;
    this.cvsUtil.cvs.style.cursor = 'none';
  }

  /**
   * 鼠标区域内移动
   */
  mousemove(p: Point): void {
    this.moveP = p;
  }

  /**
   * 鼠标移出区域
   */
  mouseleave(p: Point): void {
    this.isLeave = true;
    this.cvsUtil.cvs.style.cursor = 'unset';
  }

  /**
   * 鼠标按下
   */
  mousedown(p: Point): void {
    if (this.state === 'wait') {
      this.state = 'moving';
      this.startP = p;
    }
  }

  /**
   * 鼠标抬起
   */
  mouseup(p: Point): void {
    if (this.state === 'moving') {
      this.state = 'wait';
      if (this.startP && !this.startP.eq(p)) {
        const p1 = Object.assign({}, this.startP!);
        const p2 = Object.assign({}, p);
        const lineWidth = this.lineWidth;
        const color = this.color;
        this.toolBar?.event.emit('push-history', () => this.drawShape(p1, p2, lineWidth, color));
      }
    }
  }

  // 画鼠标
  protected drawMouse() {
    if (!this.isLeave && this.moveP) {
      this.cvsUtil.cross(this.moveP, 80, 20, 5, 'red');
      this.cvsUtil.strokeCircle(this.moveP, 10, 2, 'black');
    }
  }

  draw(): void {
    this.drawMouse();
    // 如果是绘图中则绘制实时图形
    if (this.state === 'moving' && this.startP && this.moveP && !this.startP.eq(this.moveP)) {
      this.drawShape(this.startP, this.moveP, this.lineWidth, this.color);
    }
  }

  // 绘制图像
  abstract drawShape(sP: Point, eP: Point, lineWidth: number, color: string): void;
}
