import {afterEach, describe, expect, it, vi} from "vitest";
import {apply_expiry_mask} from "../src/lib/utils/date_mask";

describe("apply_expiry_mask", () => {
  afterEach(() => vi.useRealTimers());
  it("adds a slash after a complete month", () => {
    expect(apply_expiry_mask("08", false)).toBe("08/");
  });
  it("clamps a month greater than 12", () => {
    expect(apply_expiry_mask("13", false)).toBe("12/");
  });
  it("replaces an expired year with the current year", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 15));
    expect(apply_expiry_mask("1025", false)).toBe("10/26");
  });
});