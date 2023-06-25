import CvsUtil, { LINE_COLOR } from './CvsUtil';
import Point from './Point';
import Rect from './Rect';
import ToolBar from './ToolBar';
import CancelAction from './ToolBar/CancelAction';
import FinishAction from './ToolBar/FinishAction';
function createEmptyCanvas(scale) {
    const cvs = document.createElement('canvas');
    cvs.width = document.body.clientWidth * scale;
    cvs.style.width = `${document.body.clientWidth}px`;
    cvs.height = document.body.clientHeight * scale;
    cvs.style.height = `${document.body.clientHeight}px`;
    cvs.style.cursor = 'crosshair';
    return cvs;
}
export default function (img, scale, success) {
    const cvs = createEmptyCanvas(scale);
    const ctx = cvs.getContext('2d');
    const cvsUtil = new CvsUtil(cvs);
    const toolBar = new ToolBar(cvs);
    let areaStart;
    let areaEnd;
    let mouse;
    let mouseLeave = false;
    let state = 'wait';
    // 绘制
    function draw() {
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
        if (state === 'wait') {
            // 绘制外边框
            cvsUtil.rect(new Point(), new Point(cvs.width, cvs.height), 5);
        }
        if (!mouseLeave && mouse && ['wait'].includes(state)) {
            // 绘制十字线
            cvsUtil.cross(mouse, { horizontal: cvs.width * 2, vertical: cvs.height * 2 });
        }
        if (['selecting', 'selected'].includes(state)) {
            // 绘制选中区域
            const _areaEnd = state === 'selecting' ? mouse : areaEnd;
            if (!(areaStart && _areaEnd)) {
                return;
            }
            if (state === 'selected') {
                toolBar.draw();
            }
            // 绘制蒙版
            cvsUtil.mask(Rect.fromPoint(areaStart, _areaEnd));
            // 绘制选中区域边框
            cvsUtil.rect(areaStart, _areaEnd);
            // 绘制四角
            const { bottomLeft, bottomRight, topRight, topLeft, width, height } = Rect.fromPoint(areaStart, _areaEnd, 5);
            [bottomLeft, bottomRight, topRight, topLeft].forEach((p, index) => {
                cvsUtil.simpleRightAngle(p, 80, (index + 1), 5);
            });
            // 绘制宽高显示
            ctx.fillStyle = LINE_COLOR;
            ctx.fillRect(topLeft.x, topLeft.y - 60, 250, 50);
            ctx.font = '40px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(`${width} x ${height}`, topLeft.x + 10, topLeft.y - 20); // 填充文本内容
        }
    }
    cvs.onmousedown = (e) => {
        if (state === 'wait') {
            cvs.style.cursor = 'nwse-resize';
            state = 'selecting';
            areaStart = Point.fromMouse(e, scale);
        }
    };
    cvs.onmouseup = (e) => {
        if (state === 'selecting') {
            state = 'selected';
            cvs.style.cursor = 'unset';
            areaEnd = Point.fromMouse(e, scale);
            toolBar.render(Rect.fromPoint(areaStart, areaEnd), scale);
        }
    };
    cvs.onmousemove = (e) => (mouse = Point.fromMouse(e, scale));
    cvs.onmouseleave = () => (mouseLeave = true);
    cvs.onmouseenter = () => (mouseLeave = false);
    let isClose = false;
    {
        function drawWork() {
            draw();
            !isClose && requestAnimationFrame(drawWork);
        }
        requestAnimationFrame(drawWork);
    }
    const el = document.createElement('div');
    el.style.position = 'relative';
    el.appendChild(cvs);
    el.appendChild(toolBar.el);
    function destroy() {
        toolBar.close();
        el.parentElement?.removeChild(el);
        isClose = true;
    }
    // 工具栏添加选中，取消按钮
    {
        toolBar.appendAction(new FinishAction(() => {
            const areaInfo = Rect.fromPoint(areaStart, areaEnd);
            // 创建新 Canvas，将选定的区域绘制到其中
            const newCvs = document.createElement('canvas');
            newCvs.width = areaInfo.width;
            newCvs.height = areaInfo.height;
            newCvs
                .getContext('2d')
                .putImageData(ctx.getImageData(areaInfo.topLeft.x, areaInfo.topLeft.y, areaInfo.width, areaInfo.height), 0, 0);
            // 将新 Canvas 转为 base64 字符串
            const imgUrl = newCvs.toDataURL('image/png');
            success(imgUrl);
            destroy();
        }));
        toolBar.appendAction(new CancelAction(destroy));
    }
    return el;
}
//# sourceMappingURL=screenshot.js.map