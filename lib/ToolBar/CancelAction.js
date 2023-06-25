import ClickToolBarAction from './ClickToolBarAction';
/**
 * 取消按钮
 */
export default class CancelAction extends ClickToolBarAction {
    onclick;
    constructor(onclick) {
        super(`<svg t="1687334842948" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29059" width="200" height="200"><path d="M801.645714 170.666667l51.833905 51.590095L565.150476 511.951238l288.353524 289.670095-51.833905 51.614477-288.109714-289.450667L225.426286 853.23581 173.592381 801.621333l288.329143-289.670095L173.592381 222.256762 225.426286 170.666667l288.109714 289.426285L801.645714 170.666667z" p-id="29060"></path></svg>`);
        this.onclick = onclick;
    }
    actived() {
        this.onclick();
    }
}
//# sourceMappingURL=CancelAction.js.map