import { describe, test, expect } from "bun:test";

const { default: inputOne } = await import("~/06/example.one.txt");
const { default: inputTwo } = await import("~/06/example.two.txt");

const { partOne, partTwo, parse } = await import("~/06/06.ts");

describe("Day 06", () => {
  test("Part one", () => {
    expect(partOne(parse(inputOne))).toEqual(0);
  });

  test("Part two", () => {
    expect(partTwo(parse(inputTwo))).toEqual(0);
  });
});
