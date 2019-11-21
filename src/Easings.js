/**
 * Types of easing
 * @enum {string}
 */
export const EasingTypes = {
  LINEAR: 'linear',
  QUADRATIC: 'quadratic',
  SWING: 'swing',
  CIRC: 'circ',
  BACK: 'back',
  BOUNCE: 'bounce',
  ELASTIC: 'elastic',
};

/**
 * Easing mathematic formulas
 */
export const Easings = {
  [EasingTypes.LINEAR]: (progress) => {
    return progress;
  },
  [EasingTypes.QUADRATIC]: (progress) => {
    return Math.pow(progress, 2);
  },
  [EasingTypes.SWING]: (progress) => {
    return 0.5 - Math.cos(progress * Math.PI) / 2;
  },
  [EasingTypes.CIRC]: (progress) => {
    return 1 - Math.sin(Math.acos(progress));
  },
  [EasingTypes.BACK]: (progress, x) => {
    return Math.pow(progress, 2) * ((x + 1) * progress - x);
  },
  [EasingTypes.BOUNCE]: (progress) => {
    // eslint-disable-next-line no-constant-condition
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (progress >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
      }
    }
  },
  [EasingTypes.ELASTIC]: (progress, x) => {
    // eslint-disable-next-line max-len
    return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
  },
};
