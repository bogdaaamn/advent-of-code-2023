export function parse(input: string) {
  return input.split("\n");
}

export function partOne(input: ReturnType<typeof parse>): number {
  // Extracting the number of cubes for each group, not saving any data
  const total = input.reduce<number>((total, game, index) => {
    // Extract the game ID
    const gameID = index + 1;

    // Split the line into the different groups
    const groups = game.split(/;|:/).slice(1);

    // Extract the number of cubes for each color for each group
    const possibleGroups = groups.map((group) => {
      // Split the group into the different colors
      const possible = group.split(",").reduce<boolean>((isPossible, color) => {
        // Split the color into the number and the color name
        const [number, colorName] = color.trim().split(" ");

        // Check for the minimum required numbers
        // 12 red cubes, 13 green cubes, and 14 blue cubes
        if (colorName === "red" && Number(number) > 12) {
          return false;
        } else if (colorName === "green" && Number(number) > 13) {
          return false;
        } else if (colorName === "blue" && Number(number) > 14) {
          return false;
        }

        return isPossible;
      }, true);

      return possible;
    });

    // Check if any of the groups are impossible
    const isPossible = possibleGroups.every((possible) => possible);

    // If all every group is possible, add the game ID to the total
    if (isPossible) {
      return total + gameID;
    }

    return total;
  }, 0);

  return total;
}

export function partTwo(input: ReturnType<typeof parse>): number {
  // Nevermind, I need to save data
  const total = input.reduce<number>((total, game, index) => {
    // Split the line into the different groups
    const groups = game.split(/;|:/).slice(1);

    const maximum = {
      red: 0,
      green: 0,
      blue: 0,
    };

    // Calculate the power of each group
    groups.forEach((group) => {
      // Split the group into the different colors
      group.split(",").forEach((set) => {
        // Split the color into the number and the color name
        const [number, colorName = ""] = set.trim().split(" ");

        // Typescript bugs me
        if (
          colorName !== "red" &&
          colorName !== "green" &&
          colorName !== "blue"
        ) {
          return 0;
        }

        // Find the biggest number of cubes for each color
        if (Number(number) > maximum[colorName]) {
          maximum[colorName] = Number(number);
        }
      }, 0);

      return 0;
    });

    const power = maximum.red * maximum.green * maximum.blue;

    return total + power;
  }, 0);

  return total;
}
