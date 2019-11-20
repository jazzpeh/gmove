/* eslint-disable max-len */
/* eslint-disable no-undef */
import {isNullOrUndefined} from '../src/utility';

describe('Utility', () => {
  describe('isNullOrUndefined', () => {
    it('should return `True` if value is null', () => {
      const value = null;
      const result = isNullOrUndefined(value);
      expect(result).toBe(true);
    });

    it('should return `True` if value is undefined', () => {
      let value;
      const result = isNullOrUndefined(value);
      expect(result).toBe(true);
    });

    it('should return `False` if value is not null or undefined', () => {
      const value = 'hello world';
      const result = isNullOrUndefined(value);
      expect(result).toBe(false);
    });

    it('should return `False` if value is 0', () => {
      const value = 0;
      const result = isNullOrUndefined(value);
      expect(result).toBe(false);
    });
  });
});
