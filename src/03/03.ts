export function parse(input: string) {
  return input.split("\n");
}

export function partOne(input: ReturnType<typeof parse>): number {
  // For each line, find the symbols and their positions
  const coordinates = input.flatMap((line, index) => {
    // Extract all the symbols from line
    const regex = /([^.\d])/g;
    const symbols = Array.from(line.matchAll(regex));

    // Silly way to compare objects but whatever
    // Also going for negative coordinates because they won't match
    return symbols.flatMap((symbol) => {
      const x = index;
      const y = symbol.index ?? 0;

      return [
        { x: x - 1, y: y - 1 },
        { x: x - 1, y },
        { x: x - 1, y: y + 1 },
        { x, y: y - 1 },
        // { x, y },
        { x, y: y + 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
      ].map((coord) => JSON.stringify(coord));
    });
  });

  // For each line, check if the numbers are part of the symbols
  const total = input.reduce((total, line, index) => {
    // Extract all the numbers from the line
    const regex = /(\d+)/g;
    const numbers = Array.from(line.matchAll(regex));

    // Calculate the coordinates for each number
    // Starting with the first letter (number.index) on the current line (index)
    const lineTotal = numbers.reduce((total, number) => {
      const numberCoordinates = Array(number[0].length)
        .fill({})
        .map((_, i) => {
          return {
            x: index,
            y: (number.index ?? 0) + i,
          };
        });

      // Check if any of the coordinates are part of the symbols map
      // Add the number to the total if it is, this way it adds it once
      // But also multiple times if the number repeats in the map
      const isPart = numberCoordinates.some((coord) =>
        coordinates.includes(JSON.stringify(coord))
      );

      return isPart ? total + Number(number[0]) : total;
    }, 0);

    return total + lineTotal;
  }, 0);

  return total;
}

export function partTwo(input: ReturnType<typeof parse>): number {
  // For each line, extract the numbers and their positions
  const numbers = input.flatMap((line, index) => {
    // console.log(line);
    // Extract all the numbers from the line
    const regex = /(\d+)/g;
    const numbers = Array.from(line.matchAll(regex));

    // Calculate the coordinates for each number
    // Add into an array all the positions of its digits
    // Starting with the first letter (number.index) on the current line (index)
    const numbersData = numbers.map((number) => {
      return {
        number: Number(number[0]),
        coordinates: Array(number[0].length)
          .fill({})
          .map((_, i) => {
            return {
              x: index,
              y: (number.index ?? 0) + i,
            };
          }),
      };
    });

    return numbersData;
  });

  const total = input.reduce((total, line, index) => {
    // Extract all the starts from the line
    const regex = /(\*)/g;
    const stars = Array.from(line.matchAll(regex));

    // Calculate the coordinates for each star area
    // Calculate the start ratio for each line
    const lineTotal = stars.reduce((total, symbol) => {
      const x = index;
      const y = symbol.index ?? 0;

      const starCoordinates = [
        { x: x - 1, y: y - 1 },
        { x: x - 1, y },
        { x: x - 1, y: y + 1 },
        { x, y: y - 1 },
        { x, y },
        { x, y: y + 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
      ].flatMap((coord) => JSON.stringify(coord));

      // Extract all the numbers that are part of the star area
      const partNumbers = numbers.filter((number) =>
        number.coordinates.some((coord) =>
          starCoordinates.includes(JSON.stringify(coord))
        )
      );

      // Calculate the ratio of the star
      if (partNumbers.length === 2) {
        return total + partNumbers[0].number * partNumbers[1].number;
      }

      return total;
    }, 0);

    return total + lineTotal;
  }, 0);

  return total;
}
