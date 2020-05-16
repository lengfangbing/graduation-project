function isType(type: NumberConstructor | StringConstructor | ObjectConstructor | ArrayConstructor | RegExpConstructor) {
    return function (t: string | number | object | any[]) {
        //null 与 undefined 什么也不是
        if (t == void 0) return false;
        return t["__proto__"] == type["prototype"];
    }
}
let isNumber = isType(Number);
let isString = isType(String);
let isArray = isType(Array);
let isObject = isType(Object);
let isRegExp = isType(RegExp);
let throttle: (func: Function, time: number, args?: any[]) => Function;
let debounce: (func: Function, time: number, args?: any[]) => Function;
/**
 * 节流函数
 */
{
    let isThrottleDuringTime = false;
    let timer = void 0;
    throttle = function (func: Function, time: number, args?: any[]) {
        return function () {
            if (isThrottleDuringTime) return;
            clearTimeout(timer);
            timer = setTimeout(() => {
                isThrottleDuringTime = false;
            }, time);
            args = args || [void 0];
            func.apply(this, [...args]);
            isThrottleDuringTime = true;
        }
    }
}
/**
 * 防抖函数
 */
{
    let isDebounceDuringTime = false;
    let timer = void 0;
    debounce = function (func: Function, time: number, args?: any[]) {
        return function () {
            const setTimer = function (func: Function, time: number, args?: any[]) {
                return setTimeout(() => {
                    args = args || [void 0];
                    func.apply(this,  [...args]);
                    isDebounceDuringTime = false;
                }, time);
            };
            if (isDebounceDuringTime) {
                clearTimeout(timer);
                timer = setTimer(func, time, args);
            }
            else {
                isDebounceDuringTime = true;
                timer = setTimer(func, time, args);
            }
        }

    }
}
export { throttle, debounce, isNumber, isString, isArray, isObject, isRegExp }
