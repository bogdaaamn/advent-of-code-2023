export function parse(input: string) {
  return input.split("\n");
}

export function partOne(input: ReturnType<typeof parse>): number {
  // Filter out all the digits from each line
  const digits = input.map((line) =>
    line
      .split("")
      .map((char) => parseInt(char, 10))
      .filter((digit) => !isNaN(digit))
  );

  // Extract the first and last digit from each line
  // And add them together
  const result = digits.reduce((acc, curr) => {
    const firstDigit = curr[0] ?? 0;
    const lastDigit = curr[curr.length - 1] ?? firstDigit;

    const number = parseInt(firstDigit.toString() + lastDigit.toString(), 10);
    return acc + number;
  }, 0);

  return result;
}

export function partTwo(input: ReturnType<typeof parse>): number {
  const digitsDictionary = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  // Go through all the substrings of each line
  const newLines = input.map((line) => {
    const newLine = [];
    let lastJ = 0;

    // Go through all the substrings of the line
    for (let i = 0; i < line.length; i++) {
      for (let j = i + 1; j <= line.length; j++) {
        // Check if the substring is a digit word
        if (line.slice(i, j) in digitsDictionary) {
          // If it is, add the previous substring to the new line
          newLine.push(line.slice(lastJ, i));

          // Add the digit to the new line
          newLine.push(
            digitsDictionary[line.slice(i, j) as keyof typeof digitsDictionary]
          );

          // Update the last letter position of the
          // last found substring so next time we add just the
          // letters between the last found substring and the current one
          lastJ = j;

          // Jump the loop to the end of the current substring
          i = j;
          j = i + 1;
        }
      }
    }

    // Add the last substring to the new line
    newLine.push(line.slice(lastJ, line.length));

    // console.log(line, newLine, newLine.join(""));

    return newLine.join("");
  });

  // Filter out all the digits from each line
  const digits = newLines.map((line) =>
    line
      .split("")
      .map((char) => parseInt(char, 10))
      .filter((digit) => !isNaN(digit))
  );

  // console.log(digits);

  // Extract the first and last digit from each line
  // And add them together
  const result = digits.reduce((acc, curr) => {
    const firstDigit = curr[0] ?? 0;
    const lastDigit = curr[curr.length - 1] ?? firstDigit;

    const number = parseInt(firstDigit.toString() + lastDigit.toString(), 10);

    // console.log(number);

    return acc + number;
  }, 0);

  return result;
}
