import ClickToolBarAction from './ClickToolBarAction';
/**
 * 确认
 */
export default class FinishAction extends ClickToolBarAction {
    protected onclick: () => void;
    constructor(onclick: () => void);
    actived(): void;
}
