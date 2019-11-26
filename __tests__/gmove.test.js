/* eslint-disable max-len */
/* eslint-disable no-undef */
import {GMove, EasingTypes} from '../src';

jest.useFakeTimers();

describe('GMove', () => {
  describe('execute_', () => {
    let opts;

    beforeEach(() => {
      opts = {
        delay: 0,
        duration: 500,
        easing: EasingTypes.SWING,
        step: () => 1,
      };
    });

    it('should wait 1 second before execution.', () => {
      const delay = 1000;
      GMove.execute_({
        ...opts,
        delay,
      });

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay);
    });

    it('should invoke complete callback after execution ends.', (done) => {
      GMove.execute_({
        ...opts,
        complete: () => {
          expect(1).toEqual(1);
          done();
        },
      });

      jest.runAllTimers();
    });

    it('should increment delta and call `step` callback.', (done) => {
      let prevDelta = 0;

      GMove.execute_({
        ...opts,
        step: (delta) => {
          expect(delta).toBeGreaterThan(prevDelta);
          prevDelta = delta;
          if (delta === 1) done();
        },
      });

      jest.runAllTimers();
    });
  });

  describe('normalize_', () => {
    it('should return `computed` if target is not specified and computed is provided', () => {
      const computed = 10;
      const result = GMove.normalize_(null, computed, 1);
      expect(result).toEqual(computed);
    });

    it('should return `0` if target and computed are not specified', () => {
      const result = GMove.normalize_(null, null, 1);
      expect(result).toEqual(0);
    });

    it('should calculate and return normalized value based on delta if target is a number', () => {
      const result = GMove.normalize_(100, 50, 1);
      expect(result).toEqual(100);

      const result2 = GMove.normalize_(-200, 0, 1);
      expect(result2).toEqual(-200);
    });

    it('should calculate and return normalized value based on delta if target is a increment/decrement value', () => {
      const result = GMove.normalize_('+100px', 50, 1);
      expect(result).toEqual(150);

      const result2 = GMove.normalize_('-100px', 50, 1);
      expect(result2).toEqual(-50);
    });
  });
});
