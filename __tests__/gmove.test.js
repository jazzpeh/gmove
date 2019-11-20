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
});
