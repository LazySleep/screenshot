import ClickToolBarAction from './ClickToolBarAction';
/**
 * 取消按钮
 */
export default class RevokeAction extends ClickToolBarAction {
    constructor() {
        super(`<svg t="1687656834264" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2347" width="200" height="200"><path d="M529.3 381.5h-4.9l-0.6-110.3c0-40.9-33.9-57-62.8-33.7L192.1 453.8c-28.9 23.2-28.9 61.2 0.1 84.4L459 752.3c28.9 23.2 68.7-0.4 68.7-34.9V602h26.1c116.7 0 205.7 50.4 260.2 147.7 10.7 17.7 22 13.8 22 0-2.4-173.3-143-368.1-311.6-368.1h4.9z m-5-0.1" p-id="2348"></path></svg>`);
        this.historyLen = 0;
    }
    setToolBar(toolBar) {
        super.setToolBar(toolBar);
        toolBar.event.addListener('push-history', () => {
            this.historyLen++;
            this.disabled = false;
        });
        toolBar.event.addListener('pop-history', () => {
            if (this.historyLen > 0) {
                this.historyLen--;
            }
            if (this.historyLen === 0) {
                this.disabled = true;
            }
        });
        this.disabled = true;
    }
    actived() {
        var _a;
        (_a = this.toolBar) === null || _a === void 0 ? void 0 : _a.event.emit('pop-history');
    }
}
//# sourceMappingURL=RevokeAction.js.map