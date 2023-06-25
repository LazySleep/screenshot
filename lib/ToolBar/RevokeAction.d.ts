import ToolBar from '.';
import ClickToolBarAction from './ClickToolBarAction';
/**
 * 取消按钮
 */
export default class RevokeAction extends ClickToolBarAction {
    historyLen: number;
    constructor();
    setToolBar(toolBar: ToolBar): void;
    actived(): void;
}
