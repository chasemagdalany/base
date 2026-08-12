declare global {
  namespace JSX {
    interface IntrinsicElements {
      [el: string]: any;
    }
  }
}

function jsx(type, props, key = null) {
  return { type, props, key };
}
const jsxs = jsx;
const Fragment = Symbol();
export { jsx, jsxs, Fragment };
