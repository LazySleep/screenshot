import ToolBar, { ActionHistory } from '.';
import CvsUtil from '../CvsUtil';
import Point from '../Point';

/**
 * 操作项基类
 */
export default abstract class ToolBarAction {
  public selectable: boolean = true;
  private _disabled: boolean = false;
  public svg: SVGSVGElement;
  protected toolBar: ToolBar | null = null;

  constructor(protected readonly cvsUtil: CvsUtil | null, svgStr: string) {
    this.svg = this.createSvgFromString(svgStr);
    this.svg.onmouseenter = () => (this.svg.style.cursor = this._disabled ? 'not-allowed' : 'pointer');
    this.svg.onmouseleave = () => (this.svg.style.cursor = this._disabled ? 'not-allowed' : 'unset');
    this.svg.style.fill = `currentColor`;
  }

  set disabled(val: boolean) {
    this._disabled = val;
    if (this._disabled) {
      this.svg.style.color = '#ddd';
      this.svg.style.cursor = 'not-allowed';
    } else {
      this.toolBar && (this.svg.style.color = this.toolBar.color);
      this.svg.style.cursor = 'unset';
    }
  }

  get disabled() {
    return this._disabled;
  }

  public createSvgFromString(svgStr: string): SVGSVGElement {
    const parser = new DOMParser();
    return parser.parseFromString(svgStr, 'image/svg+xml').querySelector('svg')!;
  }

  setToolBar(toolBar: ToolBar) {
    this.toolBar = toolBar;
    this.svg.style.color = toolBar.color;
  }

  abstract actived(): void;

  abstract mouseenter(p: Point): void;
  abstract mousemove(p: Point): void;
  abstract mouseleave(p: Point): void;
  abstract mouseup(p: Point): void;
  abstract mousedown(p: Point): void;
  abstract draw(): void;
}
