import ToolBarAction from './ToolBarAction';
/**
 * 点击类型base类
 */
export default class ClickToolBarAction extends ToolBarAction {
    constructor(svgStr) {
        super(null, svgStr);
        this.selectable = false;
    }
    setToolBar(toolBar) {
        super.setToolBar(toolBar);
        this.svg.addEventListener('mousedown', () => !this.disabled && (this.svg.style.color = toolBar.activedColor));
        this.svg.addEventListener('mouseup', () => !this.disabled && (this.svg.style.color = toolBar.color));
        this.svg.addEventListener('mouseleave', () => !this.disabled && (this.svg.style.color = toolBar.color));
    }
    mouseenter(p) { }
    mousemove(p) { }
    mouseleave(p) { }
    mouseup(p) { }
    mousedown(p) { }
    draw() { }
}
//# sourceMappingURL=ClickToolBarAction.js.map