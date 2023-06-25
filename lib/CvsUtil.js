import Point from './Point';
export const LINE_COLOR = 'rgb(39,151,254)';
export const MASK_COLOR = '#00000033';
export default class CvsUtil {
    cvs;
    ctx;
    constructor(cvs) {
        this.cvs = cvs;
        this.ctx = this.cvs.getContext('2d');
    }
    /**
     * 画直线
     * @param p1
     * @param p2
     * @param lineWidth
     */
    line(points, lineWidth = 2, color = LINE_COLOR) {
        if (points.length < 2)
            return;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        points.forEach((p, i) => {
            if (i === 0)
                this.ctx.moveTo(p.x, p.y);
            else
                this.ctx.lineTo(p.x, p.y);
        });
        this.ctx.stroke();
    }
    /**
     * 画矩形框
     * @param p1
     * @param p2
     * @param lineWidth
     * @param color
     */
    rect(p1, p2, lineWidth = 2, color = LINE_COLOR) {
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        const x = Math.min(p1.x, p2.x);
        const y = Math.min(p1.y, p2.y);
        const w = Math.abs(p1.x - p2.x);
        const h = Math.abs(p1.y - p2.y);
        this.ctx.rect(x, y, w, h);
        this.ctx.stroke();
    }
    /**
     * 画填充矩形
     * @param p1
     * @param p2
     * @param lineWidth
     * @param color
     */
    fillRect(p1, p2, color = LINE_COLOR) {
        this.ctx.fillStyle = color;
        const x = Math.min(p1.x, p2.x);
        const y = Math.min(p1.y, p2.y);
        const w = Math.abs(p1.x - p2.x);
        const h = Math.abs(p1.y - p2.y);
        this.ctx.fillRect(x, y, w, h);
    }
    /**
     * 画十字
     * @param p
     * @param len
     * @param offset 偏离中心点距离
     * @param lineWidth
     * @param color
     */
    cross(p, len, offset = 0, lineWidth = 2, color = LINE_COLOR) {
        const horizontal = (typeof len === 'number' ? len : len.horizontal) / 2;
        const vertical = (typeof len === 'number' ? len : len.vertical) / 2;
        this.line([new Point(p.x - offset - horizontal, p.y), new Point(p.x - offset, p.y)], lineWidth, color);
        this.line([new Point(p.x + offset, p.y), new Point(p.x + offset + horizontal, p.y)], lineWidth, color);
        this.line([new Point(p.x, p.y - offset - vertical), new Point(p.x, p.y - offset)], lineWidth, color);
        this.line([new Point(p.x, p.y + offset), new Point(p.x, p.y + offset + vertical)], lineWidth, color);
    }
    /**
     * 画简单直角
     * @param p 顶点
     * @param len 长度
     * @param quadrant 第几象限
     * @param lineWidth
     * @param color
     */
    simpleRightAngle(p, len, quadrant, lineWidth = 2, color = LINE_COLOR) {
        const horizontal = typeof len === 'number' ? len : len.horizontal;
        const vertical = typeof len === 'number' ? len : len.vertical;
        let p1 = new Point(p.x + ([1, 4].includes(quadrant) ? horizontal : -horizontal), p.y);
        let p2 = new Point(p.x, p.y - ([1, 2].includes(quadrant) ? vertical : -vertical));
        this.line([p1, p, p2], lineWidth, color);
    }
    /**
     * 画圆圈
     * @param p
     * @param r
     * @param lineWidth
     * @param color
     */
    strokeCircle(p, r, lineWidth = 2, color = LINE_COLOR) {
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
    /**
     * 画椭圆
     * @param p
     * @param r
     * @param lineWidth
     * @param color
     */
    ellipse(p, r, lineWidth = 2, color = LINE_COLOR) {
        // 计算控制点
        const { x, y } = p;
        const radiusX = typeof r === 'number' ? r : r.x;
        const radiusY = typeof r === 'number' ? r : r.y;
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
    /**
     * 画箭头 p1->p2
     * @param p1
     * @param p2
     * @param size
     * @param lineWidth
     * @param color
     */
    arrow(p1, p2, size, lineWidth = 2, color = LINE_COLOR) {
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        // 计算直线的角度和长度
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        // 绘制直线
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
        // 绘制箭头三角形
        this.ctx.beginPath();
        this.ctx.moveTo(p2.x, p2.y);
        this.ctx.lineTo(p2.x - size * Math.cos(angle - Math.PI / 6), p2.y - size * Math.sin(angle - Math.PI / 6));
        this.ctx.lineTo(p2.x - size * Math.cos(angle + Math.PI / 6), p2.y - size * Math.sin(angle + Math.PI / 6));
        this.ctx.closePath();
        this.ctx.fill();
    }
    /**
     * 画蒙版
     */
    mask(rect, color = MASK_COLOR) {
        const { topLeft, topRight, bottomLeft, bottomRight } = rect;
        this.fillRect(new Point(), new Point(topLeft.x, this.cvs.height), color); // 左侧
        this.fillRect(new Point(topRight.x, 0), new Point(this.cvs.width, this.cvs.height), color); // 右侧
        this.fillRect(new Point(topLeft.x, 0), new Point(topRight.x, topRight.y), color); // 上侧中间
        this.fillRect(new Point(bottomLeft.x, bottomLeft.y), new Point(bottomRight.x, this.cvs.height), color); // 下侧中间
    }
}
//# sourceMappingURL=CvsUtil.js.map