export const getElem = (elem) => document.querySelector(elem);

export const getAllElems = (elem) => document.querySelectorAll(elem);

export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
