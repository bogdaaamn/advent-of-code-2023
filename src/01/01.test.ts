import { describe, test, expect } from "bun:test";

const { default: inputOne } = await import("~/01/example.one.txt");
const { default: inputTwo } = await import("~/01/example.two.txt");

const { partOne, partTwo, parse } = await import("~/01/01.ts");

describe("Day 01", () => {
  test("Part one", () => {
    expect(partOne(parse(inputOne))).toEqual(142);
  });

  test("Part two", () => {
    expect(partTwo(parse(inputTwo))).toEqual(281);
  });
});
