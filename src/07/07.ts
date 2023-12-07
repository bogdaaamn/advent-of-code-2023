export function parse(input: string) {
  const lines = input.split("\n");

  // const hands = lines.map((line) => line.split(" ")[0] ?? "");
  // const bids = lines.map((line) => line.split(" ")[1]).map(Number);

  // return {
  //   hands,
  //   bids,
  // };

  return lines;
}

export function partOne(input: ReturnType<typeof parse>): number {
  const cardStrengths = "23456789TJQKA";

  // For each line (hand), sort the cards by frequency and strength
  // And calculate the bid
  const hands = input.map((line) => {
    const [hand = "", bid = ""] = line.split(" ");

    // Calculate the card strengths into an array
    const cards = hand.split("").map((card) => cardStrengths.indexOf(card));

    // Calculate the frequency of each card (strength)
    // and sort it into a sortable object
    const frequency: { [key: string]: number } = {};

    // Count the frequency of each card (strength)
    for (const card of cards) {
      frequency[card] = (frequency[card] ?? 0) + 1;
    }

    // Sort the hand by frequency of the card
    // After the frequency, add the strengths back
    // So we can sort by both frequency and strength
    const sorted = Object.values(frequency).sort((a, b) => b - a);

    // console.log({ line, frequency, sorted});

    return { hand: sorted.concat(cards), bid: Number(bid) };
  });

  // Sort the hands by frequency and strength
  const sorted = Object.values(hands).sort((a, b) => {
    for (let i = 0; i < a.hand.length; i++) {
      // If the frequency is the same, sort by strength
      if (a.hand[i] !== b.hand[i]) {
        return a.hand[i] - b.hand[i];
      }
    }

    return 0;
  });

  // console.log(sorted);

  // Calculate the total bid, multiply the bid
  // by the position in the sorted array (rank)
  const total = sorted.reduce((total, { bid }, i) => total + bid * (i + 1), 0);

  return total;
}

export function partTwo(input: ReturnType<typeof parse>): number {
  // Move the joker to 0 points
  const cardStrengths = "J23456789TQKA";

  // For each line (hand), sort the cards by
  // Frequency and strength, add the jokers to the top
  // And calculate the bid
  const hands = input.map((line) => {
    const [hand = "", bid = ""] = line.split(" ");

    // Calculate the card strengths into an array
    const cards = hand.split("").map((card) => cardStrengths.indexOf(card));

    // Calculate the frequency of each card (strength)
    // and sort it into a sortable object
    const frequency: { [key: string]: number } = {};

    // Count the frequency of each card (strength)
    for (const card of cards) {
      frequency[card] = (frequency[card] ?? 0) + 1;
    }

    // Extract the jokers and don't count them in the sorting
    const jokers = frequency["0"];
    const filtered = Object.fromEntries(
      Object.entries(frequency).filter(([key]) => key !== "0")
    );

    // console.log({ line, frequency, cards });

    // Sort the hand by frequency of the card
    // After the frequency, add the strengths back
    // So we can sort by both frequency and strength
    const sorted = Object.values(filtered).sort((a, b) => b - a);

    // Add the jokers to the weakest card
    if (jokers) {
      // If all of them are jokers is 5 of kind!!!!!
      if (sorted[0] === undefined) {
        sorted[0] = 0;
      }

      sorted[0] += jokers;
    }

    return { hand: sorted.concat(cards), bid: Number(bid) };
  });

  // Sort the hands by frequency and strength
  const sorted = Object.values(hands).sort((a, b) => {
    for (let i = 0; i < a.hand.length; i++) {
      // If the frequency is the same, sort by strength
      if (a.hand[i] !== b.hand[i]) {
        return a.hand[i] - b.hand[i];
      }
    }

    return 0;
  });

  // console.log(sorted);

  // Calculate the total bid, multiply the bid
  // by the position in the sorted array (rank)
  const total = sorted.reduce((total, { bid }, i) => total + bid * (i + 1), 0);

  return total;
}
