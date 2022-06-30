import * as PIXI from "pixi.js";

export const throttleAnimation = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            requestAnimationFrame(() => { func.apply(context, args) });
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}