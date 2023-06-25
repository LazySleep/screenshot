import ToolBar from '.';
import Point from '../Point';
import ToolBarAction from './ToolBarAction';
/**
 * 点击类型base类
 */
export default abstract class ClickToolBarAction extends ToolBarAction {
    selectable: boolean;
    constructor(svgStr: string);
    setToolBar(toolBar: ToolBar): void;
    mouseenter(p: Point): void;
    mousemove(p: Point): void;
    mouseleave(p: Point): void;
    mouseup(p: Point): void;
    mousedown(p: Point): void;
    draw(): void;
}
