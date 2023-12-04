export function parse(input: string) {
  return input.split("\n");
}

export function partOne(input: ReturnType<typeof parse>): number {
  // Counting the winning numbers on each card (line)
  const total = input.reduce<number>((total, line) => {
    // Divide the line into Card ID: winning numbers | current numbers
    const [cardId, winningString, currentString] = line.split(/:|\|/);

    // Divide the winning and current numbers into arrays
    const winningNumbers = winningString
      ?.trim()
      .split(" ")
      .map(Number)
      .filter((number) => number > 0);

    const currentNumbers = currentString
      ?.trim()
      .split(" ")
      .map(Number)
      .filter((number) => number > 0);

    // Count how many winning numbers are in current row
    const winningCount =
      winningNumbers?.filter((number) => currentNumbers?.includes(number))
        .length ?? 0;

    // If there are no winning numbers or just one, add the winning count
    // If there are more than one, double the winning points each time
    if (winningCount === 0 || winningCount === 1) {
      return total + winningCount;
    } else {
      return total + Math.pow(2, winningCount - 1);
    }
  }, 0);

  return total;
}

export function partTwo(input: ReturnType<typeof parse>): number {
  // Counting the number of copies
  const cards = Array(input.length).fill(1);

  // Check the number of winning numbers on each card
  input.forEach((line, index) => {
    // Divide the line into Card ID: winning numbers | current numbers
    const [cardId, winningString, currentString] = line.split(/:|\|/);

    // Divide the winning and current numbers into arrays
    const winningNumbers = winningString
      ?.trim()
      .split(" ")
      .map(Number)
      .filter((number) => number > 0);

    const currentNumbers = currentString
      ?.trim()
      .split(" ")
      .map(Number)
      .filter((number) => number > 0);

    // Count how many winning numbers are in current row
    const winningCount =
      winningNumbers?.filter((number) => currentNumbers?.includes(number))
        .length ?? 0;

    // For N winning number, add 1 to the next N counts
    // Then multiply by the times the current card has won
    for (let i = 1; i <= winningCount; i++) {
      cards[index + i] = cards[index + i] + 1 * cards[index];
    }
  });

  return cards.reduce((total, card) => total + card, 0);
}
