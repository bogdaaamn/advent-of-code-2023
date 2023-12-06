import { describe, test, expect } from "bun:test";

const { default: inputOne } = await import("~/05/example.one.txt");
const { default: inputTwo } = await import("~/05/example.two.txt");

const { partOne, partTwo, parse } = await import("~/05/05.ts");

describe("Day 05", () => {
  test("Part one", () => {
    expect(partOne(parse(inputOne))).toEqual(35);
  });

  test("Part two", () => {
    expect(partTwo(parse(inputTwo))).toEqual(46);
  });
});
