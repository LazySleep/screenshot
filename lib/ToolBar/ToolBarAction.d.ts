import ToolBar from '.';
import CvsUtil from '../CvsUtil';
import Point from '../Point';
/**
 * 操作项基类
 */
export default abstract class ToolBarAction {
    protected readonly cvsUtil: CvsUtil | null;
    selectable: boolean;
    private _disabled;
    svg: SVGSVGElement;
    protected toolBar: ToolBar | null;
    constructor(cvsUtil: CvsUtil | null, svgStr: string);
    set disabled(val: boolean);
    get disabled(): boolean;
    createSvgFromString(svgStr: string): SVGSVGElement;
    setToolBar(toolBar: ToolBar): void;
    abstract actived(): void;
    abstract mouseenter(p: Point): void;
    abstract mousemove(p: Point): void;
    abstract mouseleave(p: Point): void;
    abstract mouseup(p: Point): void;
    abstract mousedown(p: Point): void;
    abstract draw(): void;
}
