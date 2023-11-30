import chalk from "chalk";
import dedent from "dedent";

import { argv } from "bun";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

import { fetchInput } from "./api.ts";
import { isBetween } from "./utils.ts";

const day = parseInt(argv[2] ?? "");
const year = parseInt(process.env.YEAR ?? new Date().getFullYear());

if (!isBetween(day, [1, 25])) {
  console.log(`🎅 Pick a day between ${chalk.bold(1)} and ${chalk.bold(25)}.`);
  console.log(`🎅 To get started, try: ${chalk.cyan("bun solve 1")}`);
  process.exit(0);
}

await scaffold(day, year);

export async function scaffold(day: number, year: number) {
  const name = `${day}`.padStart(2, "0");

  const directory = new URL(`../src/${name}/`, import.meta.url);

  if (existsSync(directory)) return;

  console.log(`📂 Setting up day ${day} of ${year}`);

  await mkdir(directory);

  const test = dedent`
  import { describe, test, expect } from "bun:test";

  const { default: input } = await import("~/${name}/example.txt");
  const { partOne, partTwo, parse } = await import("~/${name}/${name}.ts");
  
  describe("Day ${name}", () => {
    test("Part one", () => {
      expect(partOne(parse(input))).toEqual(input);
    });
  
    test("Part two", () => {
      expect(partTwo(parse(input))).toEqual(input);
    });
  });
  `;

  const solution = dedent`
  export function parse(input: string) {
    return input;
  }
  
  export function partOne(input: ReturnType<typeof parse>) {
    return input;
  }
  
  export function partTwo(input: ReturnType<typeof parse>) {
    return input;
  }
  `;

  console.log(`📂 Fetching your input`);

  const input = await fetchInput({ day, year }).catch(() => {
    console.log(
      chalk.red.bold(
        "📂 Fetching your input have failed, empty file will be created."
      )
    );
  });

  await Bun.write(new URL(`${name}.test.ts`, directory.href), test);
  await Bun.write(new URL(`${name}.ts`, directory.href), solution);
  await Bun.write(new URL(`input.txt`, directory.href), input ?? "");
  await Bun.write(new URL(`example.txt`, directory.href), "");

  console.log("📂 You all set up, have fun!");
}
