import { describe, test, expect } from "bun:test";

const { default: inputOne } = await import("~/07/example.one.txt");
const { default: inputTwo } = await import("~/07/example.two.txt");

const { partOne, partTwo, parse } = await import("~/07/07.ts");

describe("Day 07", () => {
  test("Part one", () => {
    expect(partOne(parse(inputOne))).toEqual(6440);
  });

  test("Part two", () => {
    expect(partTwo(parse(inputTwo))).toEqual(5905);
  });
});
