import { describe, expect, it } from "vitest";
import { makePipeline } from "../pipeline";

describe("makePipeline()", () => {
  it("should return the same value when there are no pipes", () => {
    // Arrange.
    const value = {
      test: "test",
    };

    // Act.
    const pipeline = makePipeline(value);

    // Assert.
    expect(pipeline.getValue()).toBe(value);
  });

  it("should pipe the initial value through multiple pipes", () => {
    // Arrange.
    const pipeline = makePipeline(1);

    // Act.
    const pipedValue = pipeline
      .pipe((value: number) => value + "0-test")
      .pipe((value: string) => [value, value, value])
      .pipe((value: string[]) => value.map((v) => parseInt(v, 10)))
      .pipe((value: number[]) => value.reduce((sum, v) => v + sum, 0));

    // Assert.
    expect(pipedValue.getValue()).toBe(30);
  });
});
