/**
 * 操作项基类
 */
export default class ToolBarAction {
    constructor(cvsUtil, svgStr) {
        this.cvsUtil = cvsUtil;
        this.selectable = true;
        this._disabled = false;
        this.toolBar = null;
        this.svg = this.createSvgFromString(svgStr);
        this.svg.onmouseenter = () => (this.svg.style.cursor = this._disabled ? 'not-allowed' : 'pointer');
        this.svg.onmouseleave = () => (this.svg.style.cursor = this._disabled ? 'not-allowed' : 'unset');
        this.svg.style.fill = `currentColor`;
    }
    set disabled(val) {
        this._disabled = val;
        if (this._disabled) {
            this.svg.style.color = '#ddd';
            this.svg.style.cursor = 'not-allowed';
        }
        else {
            this.toolBar && (this.svg.style.color = this.toolBar.color);
            this.svg.style.cursor = 'unset';
        }
    }
    get disabled() {
        return this._disabled;
    }
    createSvgFromString(svgStr) {
        const parser = new DOMParser();
        return parser.parseFromString(svgStr, 'image/svg+xml').querySelector('svg');
    }
    setToolBar(toolBar) {
        this.toolBar = toolBar;
        this.svg.style.color = toolBar.color;
    }
}
//# sourceMappingURL=ToolBarAction.js.map