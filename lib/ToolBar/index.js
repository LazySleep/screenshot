import { LINE_COLOR } from '../CvsUtil';
import Point from '../Point';
import CvsUtil from '../CvsUtil';
import ArrowFill from './ArrowFill';
import LineStroke from './LineStroke';
import CircleStroke from './CircleStroke';
import RectStroke from './RectStroke';
import RevokeAction from './RevokeAction';
import { Event } from '../utils/Event';
import PenStrok from './PenStroke';
/**
 * 工具栏
 */
export default class ToolBar {
    cvs;
    el;
    isShow = false;
    actions = [];
    _actived = null;
    color = 'black';
    activedColor = LINE_COLOR;
    events = {};
    areaInfo = null;
    scale = 1;
    isMouseIn = false;
    cvsUtil;
    hostory = [];
    event = new Event();
    constructor(cvs, actions = null) {
        this.cvs = cvs;
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
        if (!actions)
            actions = this.loadDefaultAciton();
        actions.forEach((action) => this.appendAction(action));
        this.events['mousemove'] = (e) => this.mousemove(Point.fromMouse(e, this.scale));
        this.events['mousedown'] = (e) => this.mousedown(Point.fromMouse(e, this.scale));
        this.events['mouseup'] = (e) => this.mouseup(Point.fromMouse(e, this.scale));
        this.event.addListener('push-history', (fn) => this.hostory.push(fn));
        this.event.addListener('pop-history', () => this.hostory.pop());
    }
    set actived(val) {
        if (this._actived)
            this._actived.svg.style.color = this.color;
        if (val)
            val.svg.style.color = this.activedColor;
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
    mousedown(p) {
        if (!this.areaInfo || !this.actived)
            return;
        if (this.areaInfo.inRect(p)) {
            this.actived.mousedown(p);
        }
    }
    mouseup(p) {
        if (!this.areaInfo || !this.actived)
            return;
        if (this.areaInfo.inRect(p)) {
            this.actived.mouseup(p);
        }
    }
    mousemove(p) {
        if (!this.areaInfo || !this.actived)
            return;
        if (this.areaInfo.inRect(p)) {
            if (!this.isMouseIn) {
                this.actived.mouseenter(p);
                this.isMouseIn = true;
            }
            this.actived.mousemove(p);
        }
        else {
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
    render(areaInfo, scale) {
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
        if (!this.isShow)
            return;
        this.el.style.display = 'none';
        this.removeEventListener();
        this.actived = null;
        this.hostory = [];
        this.isShow = false;
    }
    get width() {
        const len = this.actions.length;
        return len * this.iconSize + (len + 1) * 8;
    }
    get iconSize() {
        return 24;
    }
    appendAction(action) {
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
//# sourceMappingURL=index.js.map