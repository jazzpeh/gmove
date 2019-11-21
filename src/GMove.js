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

  const target = {
    transform: {x, y},
    opacity,
  };

  const computed = {
    transform: getTranslate(element),
    opacity: o,
  };

  execute_({
    ...opts,
    step: (delta) => {
      for (const prop in target) {
        if (isNullOrUndefined(target[prop])) continue;
        transition_[prop](element, target[prop], computed[prop], delta);
      }
    },
  });
};

/**
 * Transition controller which contains different
 * algorithm to run the transition
 * @private
 */
const transition_ = {
  transform: (element, target, computed, delta) => {
    const x = normalize_(target.x, computed.x, delta);
    const y = normalize_(target.y, computed.y, delta);
    const transform = `translate(${x}px, ${y}px)`;
    element.style.transform = transform;
  },
  /**
   * Fade in/out
   * @param {HTMLElement} element
   * @param {Number} opacity
   * @param {Number} computed
   * @param {Number} delta
   */
  opacity: (element, opacity, computed, delta) => {
    element.style.opacity = opacity > computed ? delta : computed - delta;
  },
};

/**
 * Normalize for accurate values
 * @private
 *
 * @param {String|Number} target
 * @param {Number} computed
 * @param {Number} delta
 * @return {Number}
 */
const normalize_ = (target, computed, delta) => {
  let value = computed || 0;

  if (!target) return value;

  if (!isNaN(target)) {
    value = (target - computed) * delta;
    return value;
  }

  const type = target.indexOf('%') > -1 ? '%' : 'px';
  const add = target.indexOf('+') > -1;
  const raw = target.replace(/\D+/g, '');
  const moveBy = type === 'px' ?
    raw * delta :
    (raw / 100 * computed) * delta;

  value = add ? computed + moveBy : computed - moveBy;
  return value;
};

/**
 * Use the GMove library to transit elements with various animation.
 * Check out the docs for more information.
 */
const GMove = {execute_, to};

export {GMove as default};
