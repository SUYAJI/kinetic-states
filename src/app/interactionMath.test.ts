import { describe, expect, it } from "vitest";
import { clamp, isWithinDistance } from "./interactionMath";

describe("clamp", () => {
  it("keeps values inside the requested range", () => {
    expect(clamp(4, 0, 10)).toBe(4);
  });

  it("limits values at both bounds", () => {
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(12, 0, 10)).toBe(10);
  });
});

describe("isWithinDistance", () => {
  it("matches the strict proximity behavior used by the magnetic field", () => {
    expect(isWithinDistance(349.9, 350)).toBe(true);
    expect(isWithinDistance(350, 350)).toBe(false);
  });
});
