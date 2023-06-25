import { LINE_COLOR } from '../CvsUtil';
import Rect from '../Rect';
import Point from '../Point';
import CvsUtil from '../CvsUtil';
import ArrowFill from './ArrowFill';
import LineStroke from './LineStroke';
import ToolBarAction from './ToolBarAction';
import CircleStroke from './CircleStroke';
import RectStroke from './RectStroke';
import RevokeAction from './RevokeAction';
import { Event } from '../utils/Event';
import PenStrok from './PenStroke';

export type ActionHistory = () => void;
/**
 * 工具栏
 */
export default class ToolBar {
  public el: HTMLDivElement;
  protected isShow: boolean = false;
  protected actions: ToolBarAction[] = [];
  private _actived: ToolBarAction | null = null;
  public readonly color = 'black';
  public readonly activedColor = LINE_COLOR;
  protected events: { [key: string]: (e: MouseEvent) => void } = {};
  protected areaInfo: Rect | null = null;
  protected scale: number = 1;
  protected isMouseIn: boolean = false;
  protected cvsUtil: CvsUtil;
  protected hostory: ActionHistory[] = [];
  public event: Event = new Event();

  constructor(protected cvs: HTMLCanvasElement, actions: ToolBarAction[] | null = null) {
    this.cvsUtil = new CvsUtil(cvs);
    this.el = document.createElement('div');
    this.el.style.position = 'absolute';
    this.el.style.backgroundColor = '#fff';
    this.el.style.top = '0';
    this.el.style.left = '0';
    this.el.style.display = 'none';
    this.el.style.justifyContent = 'space-around';
    this.el.style.alignItems = 'center';
    this.el.style.borderRadius = '8px';
    this.el.style.height = `40px`;
    if (!actions) actions = this.loadDefaultAciton();
    actions.forEach((action) => this.appendAction(action));
    this.events['mousemove'] = (e) => this.mousemove(Point.fromMouse(e, this.scale));
    this.events['mousedown'] = (e) => this.mousedown(Point.fromMouse(e, this.scale));
    this.events['mouseup'] = (e) => this.mouseup(Point.fromMouse(e, this.scale));

    this.event.addListener('push-history', (fn) => this.hostory.push(fn));
    this.event.addListener('pop-history', () => this.hostory.pop());
  }

  set actived(val: ToolBarAction | null) {
    if (this._actived) this._actived.svg.style.color = this.color;
    if (val) val.svg.style.color = this.activedColor;
    if (!val || val.selectable) {
      this._actived = val;
    }
    val?.actived();
  }
  get actived() {
    return this._actived;
  }

  addEventListener() {
    for (let key in this.events) {
      this.cvs.addEventListener(key, this.events[key]);
    }
  }

  removeEventListener() {
    for (let key in this.events) {
      this.cvs.removeEventListener(key, this.events[key]);
    }
  }

  mousedown(p: Point) {
    if (!this.areaInfo || !this.actived) return;
    if (this.areaInfo.inRect(p)) {
      this.actived.mousedown(p);
    }
  }

  mouseup(p: Point) {
    if (!this.areaInfo || !this.actived) return;
    if (this.areaInfo.inRect(p)) {
      this.actived.mouseup(p);
    }
  }

  mousemove(p: Point) {
    if (!this.areaInfo || !this.actived) return;
    if (this.areaInfo.inRect(p)) {
      if (!this.isMouseIn) {
        this.actived.mouseenter(p);
        this.isMouseIn = true;
      }
      this.actived.mousemove(p);
    } else {
      if (this.isMouseIn) {
        this.actived.mouseleave(p);
        this.isMouseIn = false;
      }
    }
  }

  loadDefaultAciton() {
    return [
      new CircleStroke(this.cvsUtil),
      new RectStroke(this.cvsUtil),
      new LineStroke(this.cvsUtil),
      new ArrowFill(this.cvsUtil),
      new PenStrok(this.cvsUtil),
      new RevokeAction(),
    ];
  }

  render(areaInfo: Rect, scale: number) {
    if (!this.isShow) {
      this.isShow = true;
      const width = this.width;
      const left = (areaInfo.bottomLeft.x + areaInfo.width / 2) / scale - width / 2;
      this.el.style.left = `${left}px`;
      this.el.style.top = `${areaInfo.bottomLeft.y / scale + 10}px`;
      this.el.style.width = `${width}px`;
      this.el.style.display = 'flex';
      this.areaInfo = areaInfo;
      this.scale = scale;
      this.addEventListener();
    }
  }

  close() {
    if (!this.isShow) return;
    this.el.style.display = 'none';
    this.removeEventListener();
    this.actived = null;
    this.hostory = [];
    this.isShow = false;
  }

  get width(): number {
    const len = this.actions.length;
    return len * this.iconSize + (len + 1) * 8;
  }

  get iconSize(): number {
    return 24;
  }

  appendAction(action: ToolBarAction) {
    action.setToolBar(this);
    this.actions.push(action);
    action.svg.style.fontSize = `${this.iconSize}px`;
    action.svg.style.width = `${this.iconSize}px`;
    action.svg.style.height = `${this.iconSize}px`;
    action.svg.onclick = () => (this.actived = action === this.actived ? null : action);
    this.el.appendChild(action.svg);
  }

  draw() {
    this.actived && this.actived.draw();
    this.hostory.forEach((fn) => fn());
  }
}
