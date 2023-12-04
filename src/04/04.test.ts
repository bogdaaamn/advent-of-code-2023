import { describe, test, expect } from "bun:test";

const { default: inputOne } = await import("~/04/example.one.txt");
const { default: inputTwo } = await import("~/04/example.two.txt");

const { partOne, partTwo, parse } = await import("~/04/04.ts");

describe("Day 04", () => {
  test("Part one", () => {
    expect(partOne(parse(inputOne))).toEqual(13);
  });

  test("Part two", () => {
    expect(partTwo(parse(inputTwo))).toEqual(30);
  });
});
