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
    protected cvs: HTMLCanvasElement;
    el: HTMLDivElement;
    protected isShow: boolean;
    protected actions: ToolBarAction[];
    private _actived;
    readonly color = "black";
    readonly activedColor = "rgb(39,151,254)";
    protected events: {
        [key: string]: (e: MouseEvent) => void;
    };
    protected areaInfo: Rect | null;
    protected scale: number;
    protected isMouseIn: boolean;
    protected cvsUtil: CvsUtil;
    protected hostory: ActionHistory[];
    event: Event;
    constructor(cvs: HTMLCanvasElement, actions?: ToolBarAction[] | null);
    set actived(val: ToolBarAction | null);
    get actived(): ToolBarAction | null;
    addEventListener(): void;
    removeEventListener(): void;
    mousedown(p: Point): void;
    mouseup(p: Point): void;
    mousemove(p: Point): void;
    loadDefaultAciton(): (ArrowFill | LineStroke | CircleStroke | RectStroke | RevokeAction | PenStrok)[];
    render(areaInfo: Rect, scale: number): void;
    close(): void;
    get width(): number;
    get iconSize(): number;
    appendAction(action: ToolBarAction): void;
    draw(): void;
}
