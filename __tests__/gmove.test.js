/* eslint-disable max-len */
/* eslint-disable no-undef */
import {GMove} from '../src';

jest.useFakeTimers();

describe('GMove', () => {
  describe('execute_', () => {
    it('waits 1 seond before execution.', () => {
      const delay = 1000;
      GMove.execute_({delay});

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay);
    });
  });
});
