import DrawToolBarAction from './DrawToolBarAction';
/**
 * 画箭头
 */
export default class ArrowFill extends DrawToolBarAction {
    constructor(cvsUtil) {
        super(cvsUtil, `<svg style="transform: rotate(45deg)" t="1687333499639" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26301" width="200" height="200"><path d="M512 128l-213.333 256 170.667 0 0 512 85.333 0 0-512 170.667 0z" p-id="26302"></path></svg>`);
    }
    drawShape(sP, eP, lineWidth, color) {
        this.cvsUtil.arrow(sP, eP, lineWidth * 6, lineWidth, color);
    }
}
//# sourceMappingURL=ArrowFill.js.map