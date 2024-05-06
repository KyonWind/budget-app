export const debounce = (func: Function, wait: number) => {
    let timerId: any;
    return (...args: any[]) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func(...args);
        },wait)
    }
}
