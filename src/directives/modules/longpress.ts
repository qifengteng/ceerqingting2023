import type { Directive, DirectiveBinding } from "vue";

const longpress: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        if (typeof binding.value !== "function") {
            throw "callback must be a function";
        }
        let timer: NodeJS.Timeout | null = null;
        // 创建定时器
        const start = (e: any) => {
            console.log(e);
            if (e.button) {
                if (e.type === "click" && e.button !== "0") {
                    return;
                }
            }
            if (timer === null) {
                timer = setTimeout(
                    () => {
                        handler(e);
                    },
                    binding.arg ? parseInt(binding.arg) : 2000
                );
            }
        };
        // 取消定时器
        const cancel = () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        };
        // 运行函数
        const handler = (e: MouseEvent | TouchEvent) => binding.value(e);

        // 添加时间监听器
        el.addEventListener("mousedown", start);
        el.addEventListener("touchstart", start);
        // 取消计时器
        el.addEventListener("click", cancel);
        el.addEventListener("mouseout", cancel);
        el.addEventListener("touchend", cancel);
        el.addEventListener("touchcancel", cancel);
    }
};

export default longpress;
