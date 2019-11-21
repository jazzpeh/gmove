/**
 * Verify if value is null or undefined
 * @param {any} value
 * @return {bool}
 */
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

/**
 * Get element's computed translateX and translateY values
 * @param {HTMLElement} element
 * @return {Object}
 */
export const getTranslate = (element) => {
  const trans = {
    x: 0,
    y: 0,
  };

  if (!window.getComputedStyle) return trans;
  const style = getComputedStyle(element);

  const transform = style.transform ||
    style.webkitTransform ||
    style.mozTransform ||
    style.msTransform;

  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) return parseFloat(mat[1].split(', ')[13]);

  mat = transform.match(/^matrix\((.+)\)$/);
  trans.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
  trans.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;

  return trans;
};
