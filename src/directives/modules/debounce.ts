/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 */

import type { Directive, DirectiveBinding } from "vue";

interface IElType extends HTMLElement {
    __handleClick__: () => any;
}

const debounce: Directive = {
    mounted(el: IElType, binding: DirectiveBinding) {
        if (typeof binding.value !== "function") {
            throw "callback must be a function";
        }
        let timer: NodeJS.Timeout | null = null;
        el.__handleClick__ = function () {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(
                () => {
                    binding?.value?.();
                },
                binding.arg ? parseInt(binding.arg) : 500
            );
        };
        el.addEventListener("click", el.__handleClick__);
    },
    beforeUnmount(el: IElType) {
        el.removeEventListener("click", el.__handleClick__);
    }
};

export default debounce;
