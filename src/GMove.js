import {EasingTypes, Easings} from './easings';

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
 */
const to = (selector, options) => {
  const opts = Object.assign({
    complete: null,
    delay: 0,
    duration: 500,
    easing: EasingTypes.LINEAR,
  }, options);

  execute_({
    ...opts,
    step: (delta) => {
      console.log(delta);
    },
  });
};

/**
 * Use the GMove library to transit HTMLElements with various animation.
 * Check out the docs for more information.
 */
const GMove = {execute_, to};

export {GMove as default};
