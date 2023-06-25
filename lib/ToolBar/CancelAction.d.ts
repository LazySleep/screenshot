import ClickToolBarAction from './ClickToolBarAction';
/**
 * 取消按钮
 */
export default class CancelAction extends ClickToolBarAction {
    protected onclick: () => void;
    constructor(onclick: () => void);
    actived(): void;
}
