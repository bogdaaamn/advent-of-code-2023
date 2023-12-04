import { describe, test, expect } from "bun:test";

const { default: inputOne } = await import("~/02/example.one.txt");
const { default: inputTwo } = await import("~/02/example.two.txt");

const { partOne, partTwo, parse } = await import("~/02/02.ts");

describe("Day 02", () => {
  test("Part one", () => {
    expect(partOne(parse(inputOne))).toEqual(8);
  });

  test("Part two", () => {
    expect(partTwo(parse(inputTwo))).toEqual(2286);
  });
});
