import { describe, expect, it} from "vitest";
import { foobar } from "../index";

describe('foobar', () => {
  describe('given two positive integers', () => {
    const first = 1;
    const second = 2;

    describe('when called', () => {
      it('should return the sum of the two integers multiplied by 3', () => {
        expect(foobar(first, second)).toBe(9);
      });
    });
  });
});
