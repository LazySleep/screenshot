import CvsUtil from '../CvsUtil';
import Point from '../Point';
import ToolBarAction from './ToolBarAction';
/**
 * 绘图类型基础类
 */
export default abstract class DrawToolBarAction extends ToolBarAction {
    protected readonly cvsUtil: CvsUtil;
    protected state: 'wait' | 'moving';
    protected isLeave: boolean;
    protected startP: Point | null;
    protected moveP: Point | null;
    protected lineWidth: number;
    protected color: string;
    constructor(cvsUtil: CvsUtil, svgStr: string);
    actived(): void;
    /**
     * 鼠标移入区域
     */
    mouseenter(p: Point): void;
    /**
     * 鼠标区域内移动
     */
    mousemove(p: Point): void;
    /**
     * 鼠标移出区域
     */
    mouseleave(p: Point): void;
    /**
     * 鼠标按下
     */
    mousedown(p: Point): void;
    /**
     * 鼠标抬起
     */
    mouseup(p: Point): void;
    protected drawMouse(): void;
    draw(): void;
    abstract drawShape(sP: Point, eP: Point, lineWidth: number, color: string): void;
}
