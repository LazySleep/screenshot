import ToolBar from '.';
import Point from '../Point';
import ToolBarAction from './ToolBarAction';
/**
 * 点击类型base类
 */
export default abstract class ClickToolBarAction extends ToolBarAction {
  public selectable: boolean = false;
  constructor(svgStr: string) {
    super(null, svgStr);
  }
  setToolBar(toolBar: ToolBar): void {
    super.setToolBar(toolBar);
    this.svg.addEventListener('mousedown', () => !this.disabled && (this.svg.style.color = toolBar.activedColor));
    this.svg.addEventListener('mouseup', () => !this.disabled && (this.svg.style.color = toolBar.color));
    this.svg.addEventListener('mouseleave', () => !this.disabled && (this.svg.style.color = toolBar.color));
  }

  mouseenter(p: Point): void {}
  mousemove(p: Point): void {}
  mouseleave(p: Point): void {}
  mouseup(p: Point): void {}
  mousedown(p: Point): void {}
  draw(): void {}
}
