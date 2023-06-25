import { domToImage } from 'modern-screenshot';
import screenshot from './screenshot';
export default function (success) {
    const scale = 3;
    domToImage(document.body, { scale }).then((img) => {
        const el = screenshot(img, scale, success);
        el.style.position = 'fixed';
        el.style.left = '0';
        el.style.top = '0';
        el.style.zIndex = String(1e10);
        document.body.append(el);
    });
}
//# sourceMappingURL=index.js.map