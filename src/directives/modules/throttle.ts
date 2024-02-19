/**
 * 思路:
 *      1.第一次点击, 立即调用方法并禁用按钮: 等延时结束再次激活按钮
 *      2.将需要触发的方法绑定在指令上
 *
 * 使用: 给DOM 加上v-throttle 及回调函数即可
 *      <button v-throttle="throttleClick"></button>
 */
import type { Directive, DirectiveBinding } from "vue";

interface IElType extends HTMLElement {
    __handleClick__: () => any;
    disabled: boolean;
}

const throttle: Directive = {
    mounted(el: IElType, binding: DirectiveBinding) {
        if (typeof binding.value !== "function") {
            throw "callback must a function";
        }
        let timer: NodeJS.Timeout | null = null;
        el.__handleClick__ = function () {
            if (timer) clearTimeout(timer);
            if (!el.disabled) {
                el.disabled = true;
                binding.value();
                timer = setTimeout(
                    () => {
                        el.disabled = false;
                    },
                    binding.arg ? parseInt(binding.arg) : 500
                );
            }
        };
        el.addEventListener("click", el.__handleClick__);
    },
    beforeUnmount(el: IElType) {
        el.removeEventListener("click", el.__handleClick__);
    }
};

export default throttle;
