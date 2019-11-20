import {EasingTypes, Easings} from './easings';
import {isNullOrUndefined, getTranslate} from './utility';

/**
 * Main execution function to calculate transition
 * @private
 *
 * @param {Object} options
 *
 * @property {Function} options.complete
 * @property {Number} options.delay
 * @property {Number} options.duration
 * @property {EasingTypes} options.easing
 * @property {Function} step
 */
const execute_ = (options) => {
  setTimeout(() => {
    const start = new Date;
    const nextFrame = () => {
      const timePassed = new Date - start;

      let progress = timePassed / options.duration;
      if (progress > 1) progress = 1;

      const delta = Easings[options.easing](progress);
      options.step(delta);

      if (progress === 1) {
        if (typeof options.complete === 'function') options.complete();
      } else {
        window.requestAnimationFrame(nextFrame);
      }
    };

    window.requestAnimationFrame(nextFrame);
  }, options.delay);
};

/**
 * Use this method to animate to an intended destination value.
 * @param {string} selector
 * @param {Object} options
 *
 * @property {Function} options.complete
 * @property {Number} options.delay
 * @property {Number} options.duration
 * @property {EasingTypes} options.easing
 * @property {Number} options.opacity
 * @property {NUmber|String} options.x
 * @property {NUmber|String} options.y
 *
 */
const to = (selector, options) => {
  const opts = Object.assign({
    complete: null,
    delay: 0,
    duration: 500,
    easing: EasingTypes.LINEAR,
  }, options);

  const element = document.querySelector(selector);
  const {x, y, opacity} = options;
  const {opacity: o} = window.getComputedStyle(element);

  const props = {x, y, opacity};
  const computed = {
    ...getTranslate(element),
    opacity: o,
  };

  execute_({
    ...opts,
    step: (delta) => {
      for (const prop in props) {
        if (isNullOrUndefined(props[prop])) continue;
        transition[prop](element, props[prop], computed[prop], delta);
      }
    },
  });
};

/**
 * Transition controller which contains different algorithm to run
 * the transition
 */
const transition = {
  x: (element, x, computed, delta) => {
    console.log(x, computed, delta);
  },
  y: (element, y, computed, delta) => {
    console.log(y, computed, delta);
  },
  /**
   * Fade in/out
   * @param {HTMLElement} element
   * @param {Number} opacity
   * @param {Number} computed
   * @param {Number} delta
   */
  opacity: (element, opacity, computed, delta) => {
    const isFadingIn = opacity > computed;
    element.style.opacity = isFadingIn ? delta : computed - delta;
  },
};


/**
 * Use the GMove library to transit elements with various animation.
 * Check out the docs for more information.
 */
const GMove = {execute_, to};

export {GMove as default};
