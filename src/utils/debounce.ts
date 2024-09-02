export function debounce(func: Function, ms: number) {
  let timeout: any;
  return function (...args: string[]) {
    clearTimeout(timeout);
    return new Promise((resolve) => {
      timeout = setTimeout(() => {
        resolve(func.apply(this, args));
      }, ms);
    });
  };
}
