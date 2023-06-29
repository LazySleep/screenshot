import ToolBarAction from './ToolBarAction';
/**
 * 绘图类型基础类
 */
export default class DrawToolBarAction extends ToolBarAction {
    constructor(cvsUtil, svgStr) {
        super(cvsUtil, svgStr);
        this.cvsUtil = cvsUtil;
        this.state = 'wait';
        this.isLeave = false;
        this.startP = null;
        this.moveP = null;
        this.lineWidth = 10;
        this.color = 'red';
    }
    actived() { }
    /**
     * 鼠标移入区域
     */
    mouseenter(p) {
        this.isLeave = false;
        this.cvsUtil.cvs.style.cursor = 'none';
    }
    /**
     * 鼠标区域内移动
     */
    mousemove(p) {
        this.moveP = p;
    }
    /**
     * 鼠标移出区域
     */
    mouseleave(p) {
        this.isLeave = true;
        this.cvsUtil.cvs.style.cursor = 'unset';
    }
    /**
     * 鼠标按下
     */
    mousedown(p) {
        if (this.state === 'wait') {
            this.state = 'moving';
            this.startP = p;
        }
    }
    /**
     * 鼠标抬起
     */
    mouseup(p) {
        var _a;
        if (this.state === 'moving') {
            this.state = 'wait';
            if (this.startP && !this.startP.eq(p)) {
                const p1 = Object.assign({}, this.startP);
                const p2 = Object.assign({}, p);
                const lineWidth = this.lineWidth;
                const color = this.color;
                (_a = this.toolBar) === null || _a === void 0 ? void 0 : _a.event.emit('push-history', () => this.drawShape(p1, p2, lineWidth, color));
            }
        }
    }
    // 画鼠标
    drawMouse() {
        if (!this.isLeave && this.moveP) {
            this.cvsUtil.cross(this.moveP, 80, 20, 5, 'red');
            this.cvsUtil.strokeCircle(this.moveP, 10, 2, 'black');
        }
    }
    draw() {
        this.drawMouse();
        // 如果是绘图中则绘制实时图形
        if (this.state === 'moving' && this.startP && this.moveP && !this.startP.eq(this.moveP)) {
            this.drawShape(this.startP, this.moveP, this.lineWidth, this.color);
        }
    }
}
//# sourceMappingURL=DrawToolBarAction.js.map