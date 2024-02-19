/**
 *
 * 需求: 给整个页面添加背景水印
 *
 *
 * 思路:
 *      1.使用canvas 特性生成base64 格式的图片文件, 设置其字体大小, 颜色等
 *      2,将其设置为背景图片, 从而实现页面或组件的水印效果
 *
 * 使用: 设置水印文案, 颜色, 字体大小即可
 * <div v-waterMarker="{ text: '侧耳倾听', textColor: 'rgba(180, 180, 180, 0.4)' }"></div>
 *
 *
 */
import type { Directive, DirectiveBinding } from "vue";
import { useUserStore } from "@/stores/modules/user";

const addWaterMarker = (str: string, parentNode: any, font: any, textColor: string) => {
    // 水印文字, 父元素, 字体, 文字颜色
    let can: HTMLCanvasElement = document.createElement("canvas");
    can.width = 205;
    can.height = 149;
    can.style.display = "none";
    let cans = can.getContext("2d") as CanvasRenderingContext2D;
    cans.rotate((-20 * Math.PI) / 180);
    cans.font = font || "16px Microsoft JhengHei";
    cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
    cans.textAlign = "left";
    cans.textBaseline = "Middle" as CanvasTextBaseline;
    cans.fillText(str, can.width / 10, can.height / 2);
    parentNode.style.position = "relative";

    const wartermarker = document.createElement("div");
    const styleStr = `
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 999999;
        overflow: hidden;
        pointer-events: none;
        background-repeat:repeat;
        mix-blend-mode: multiply;
        background-image:url('${can.toDataURL("image/png")}');`;
    wartermarker.setAttribute("style", styleStr);
    wartermarker.classList.add("__wartermarker__");
    parentNode.appendChild(wartermarker);

    //此方法是防止用户通过控制台修改样式去除水印效果
    /* MutationObserver 是一个可以监听DOM结构变化的接口。 */
    const observer = new MutationObserver(() => {
        const wmInstance = document.querySelector(".__wartermarker__");
        if ((wmInstance && wmInstance.getAttribute("style") !== styleStr) || !wmInstance) {
            // 如果标签在, 只修改了属性, 重新复制属性
            if (wmInstance) {
                // 避免一直触发
                // observer.disconnect();
                // console.log("水印属性修改了");
                wmInstance.setAttribute("style", styleStr);
            } else {
                // 此处根据用户登录状态，判断是否终止监听，避免用户退出后登录页面仍然有水印
                const userStore = useUserStore?.();
                if (userStore?.token) {
                    // 标签被移除, 重新添加标签
                    console.log("水印标签被移除了");
                    parentNode.appendChild(wartermarker);
                } else {
                    observer.disconnect();
                }
            }
        }
    });
    observer.observe(parentNode, {
        attributes: true,
        subtree: true,
        childList: true
    });
    parentNode.observer = observer;
};

interface IElType extends HTMLElement {
    observer: any;
}
const waterMarker: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor);
    },
    beforeUnmount(el: IElType) {
        el.observer?.disconnect();
    }
};

export default waterMarker;
