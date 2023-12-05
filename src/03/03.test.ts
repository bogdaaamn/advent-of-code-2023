import { describe, test, expect } from "bun:test";

const { default: inputOne } = await import("~/03/example.one.txt");
const { default: inputTwo } = await import("~/03/example.two.txt");

const { partOne, partTwo, parse } = await import("~/03/03.ts");

describe("Day 03", () => {
  test("Part one", () => {
    expect(partOne(parse(inputOne))).toEqual(4361);
  });

  test("Part two", () => {
    expect(partTwo(parse(inputTwo))).toEqual(467835);
  });
});
