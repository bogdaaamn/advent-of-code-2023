import { formatPerformance } from "scripts/utils";

export function parse(input: string) {
  // Get the seeds from the input
  const seedsText = input.match(/seeds: (.*)/)?.[1] ?? "";
  const seeds = seedsText.split(" ").map(Number);

  // Get all the maps from the input
  const mapsText = input.split("\n\n").slice(1);

  // Remove the first line of each map
  const maps = mapsText.map((mapText) => mapText.split("\n").slice(1));

  return {
    seeds,
    maps,
  };
}

type MapType = Array<string>;
type MapsType = Array<MapType>;

// Recurrent function to get the location of the seed
// Going through all the maps one by one
function getLocation(seed: number, maps: MapsType, index: number): number {
  // Exit condition, if we reach the last map,
  // return the last location (the current seed)
  if (maps.length === index) {
    return seed;
  }

  // Select the concurrent map
  const map = maps[index];

  if (!map) {
    return seed;
  }

  // Find the location of the seed in the current map
  // const location = map.reduce((total, line) => {
  //   const [destination = 0, source = 0, range = 0] = line
  //     .split(" ")
  //     .map(Number);

  //   // If the seed is in the current range
  //   // Calculate the location
  //   if (source <= seed && seed < source + range) {
  //     return destination + seed - source;
  //   }

  //   // Otherwise, do nothing
  //   return total;
  // }, 0);

  let location = seed;

  // Find the location of the seed in the current map
  // Not using reduce, so I can break the loop
  for (let i = 0; i < map.length; i++) {
    const line = map[i] ?? "";

    const [destination = 0, source = 0, range = 0] = line
      .split(" ")
      .map(Number);

    // If the seed is in the current range
    // Calculate the location, break the loop
    if (source <= seed && seed < source + range) {
      location = destination + seed - source;
      break;
    }
  }

  // console.log({ seed, location, mi: maps[index], index });

  // If the seed is not in the current map
  // the location corresponds to the seed
  // if (location === 0) {
  //   return getLocation(seed, maps, index + 1);
  // }

  // Otherwise, go to the next seed
  return getLocation(location, maps, index + 1);
}

export function partOne(input: ReturnType<typeof parse>): number {
  // Get the seeds and maps from the input
  const { seeds, maps } = input;

  // Calculate the min location
  // Going through all the seeds
  const min = Math.min(...seeds.map((seed) => getLocation(seed, maps, 0)));

  return min;
}

export function partTwo(input: ReturnType<typeof parse>): number {
  // Get the seeds and maps from the input
  const { seeds, maps } = input;

  // Do a bit of performance logging for each seed
  const startTime = performance.now();

  // For each seed, calculate its whole range
  // And the minimum location of the range
  const wholeMaps = seeds.map((seed, index) => {
    // Do a bit of performance logging for each seed
    const endTime = performance.now();
    const duration = formatPerformance(endTime - startTime);
    console.log(`[${duration}] Seed ${index}/${seeds.length}: ${seed}`);

    // If index is odd number, skip
    if (index % 2 === 1) {
      return Infinity;
    }

    // Otherwise, get the range of the seed
    const range = seeds[index + 1] ?? 0;

    // Funny way to generate lists of numbers in js
    // Generate the all seeds from seed to seed + range
    const seedRange = Array.from({ length: range }, (_, index) => seed + index);

    // Return the min of the range
    return Math.min(...seedRange.map((seed) => getLocation(seed, maps, 0)));
  });

  // Calculate the min of all the mins
  // Don't look at the performance time 🤷🏻‍♂️
  return Math.min(...wholeMaps);
}
