// Constants for vowels, consonants, and Pythagorean table
const VOWELS = { A: 1, E: 5, I: 9, O: 6, U: 3 };
const CONSONANTS = {
  B: 2, C: 3, D: 4, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3,
  M: 4, N: 5, P: 7, Q: 8, R: 9, S: 1, T: 2, V: 4, W: 5,
  X: 6, Z: 8
};
const PYTHAGOREAN_TABLE = {
  ...VOWELS, ...CONSONANTS,
  Y: 7 // Special case, handled in functions based on context
};

// Helper function to determine if a letter is a vowel
function isVowel(letter, prevLetter) {
  if (letter === 'Y') {
    return prevLetter && !isVowel(prevLetter); // "Y" is a vowel if preceded by a consonant
  }
  return !!VOWELS[letter];
}

// Helper function to reduce numbers to a single digit or karmic number
function reduceToKarmicOrSingleDigit(number) {
  const karmicNumbers = { 13: 4, 14: 5, 16: 7, 19: 1 };
  while (number > 9 && !karmicNumbers[number]) {
    number = number
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return karmicNumbers[number]
    ? `${karmicNumbers[number]} (${number})`
    : number;
}

// Reduce any number to a single digit except master numbers (11, 22)
function reduceToSingleDigit(number) {
  while (number > 9 && number !== 11 && number !== 22) {
    number = number
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return number;
}

// Generalized function to sum letters based on the character type
function sumLetters(name, checkFunction) {
  const nameParts = name.split(' ').map(part => {
    return [...part].reduce((acc, char, idx) => {
      const prevChar = part[idx - 1]; // Previous character to check context for "Y"
      return acc + (checkFunction(char, prevChar) ? PYTHAGOREAN_TABLE[char] || 0 : 0);
    }, 0);
  });
  return nameParts.reduce((acc, value) => acc + reduceToSingleDigit(value), 0);
}

// Function to get the life path number
function getLifePathNumber(day, month, year) {
  const sum = reduceToSingleDigit(day) + reduceToSingleDigit(month) + reduceToSingleDigit(year);
  return reduceToKarmicOrSingleDigit(sum);
}

// Function to get the expression number (using all letters)
function getExpressionNumber(name) {
  const sum = sumLetters(name, () => true); // Sum all letters
  return reduceToKarmicOrSingleDigit(sum);
}

// Function to get the soul urge number (sum only vowels)
function getSoulUrgeNumber(name) {
  const sum = sumLetters(name, isVowel);
  return reduceToKarmicOrSingleDigit(sum);
}

// Function to get the attitude number (sum consonants)
function getAttitudeNumber(name) {
  const sum = sumLetters(name, (char, prevChar) => !isVowel(char, prevChar));
  return reduceToKarmicOrSingleDigit(sum);
}

// Function to get the personality number (first name, all letters)
function getPersonalityNumber(name) {
  const firstName = name.split(' ').pop(); // Get the last word in the name string
  return sumLetters(firstName, () => true);
}

// Function to get the destiny number (first name, sum vowels)
function getDestinyNumber(name) {
  const firstName = name.split(' ').pop(); // Get the last word in the name string
  return sumLetters(firstName, isVowel);
}

// Function to get the core strength number
const PYTHAGOREAN_TABLE = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

// Function to get the core strength number
function getCoreStrengthNumber(name) {
  const counts = [...name.toUpperCase()].reduce((acc, char) => {
    if (char in PYTHAGOREAN_TABLE) {
      acc[char] = (acc[char] || 0) + 1;
    }
    return acc;
  }, {});

  // Find letters that appear at least 3 times
  const dominantLetters = Object.keys(counts).filter(
    (char) => counts[char] >= 3
  );

  // Map these letters to their corresponding numbers
  const numbers = dominantLetters.map((char) => PYTHAGOREAN_TABLE[char]);

  // Remove duplicates (e.g., if multiple letters map to the same number, keep only one)
  const uniqueNumbers = [...new Set(numbers)];

  // Return the results or 'None' if no dominant letters
  return uniqueNumbers.length > 0 ? uniqueNumbers.join(', ') : 'None';
}

// Function to get the personal year number
function getPersonalYearNumber(day, month, year) {
  const currentYear = new Date().getFullYear();
  const sum = reduceToSingleDigit(day) + reduceToSingleDigit(month) + reduceToSingleDigit(currentYear);
  return reduceToSingleDigit(sum);
}

// Function to get lesson debt (missing numbers)
function getLessonDebt(name) {
  const allNumbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const numbersInName = new Set(
    [...name.toUpperCase()].map((char) => PYTHAGOREAN_TABLE[char]).filter(Boolean)
  );
  const missingNumbers = [...allNumbers].filter(
    (num) => !numbersInName.has(num)
  );
  return missingNumbers.length > 0 ? missingNumbers.join(', ') : 'None';
}

// Function to get karmic debt number
function getKarmicDebtNumber(number) {
  const karmicDebts = [13, 14, 16, 19];
  return karmicDebts.includes(number) ? number : 'None';
}

// Function to calculate numerology based on input
function calculateNumerology() {
  const name = document.getElementById('name').value.toUpperCase();
  const dob = new Date(document.getElementById('dob').value);
  const day = dob.getDate();
  const month = dob.getMonth() + 1;
  const year = dob.getFullYear();

  const lifePathNumber = getLifePathNumber(day, month, year);
  const expressionNumber = getExpressionNumber(name);
  const soulUrgeNumber = getSoulUrgeNumber(name);
  const attitudeNumber = getAttitudeNumber(name);
  const personalityNumber = getPersonalityNumber(name);
  const destinyNumber = getDestinyNumber(name);
  const coreStrengthNumber = getCoreStrengthNumber(name);
  const personalYearNumber = getPersonalYearNumber(day, month, year);
  const lessonDebt = getLessonDebt(name);

  const karmicDebtNumbers = [
    getKarmicDebtNumber(lifePathNumber),
    getKarmicDebtNumber(expressionNumber),
    getKarmicDebtNumber(soulUrgeNumber),
    getKarmicDebtNumber(attitudeNumber),
  ]
    .filter((num) => num !== 'None')
    .join(', ');

  document.getElementById('lifePathNumber').innerText = `Sứ Mệnh Cuộc Đời: ${lifePathNumber}`;
  document.getElementById('expressionNumber').innerText = `Tố Chất Tiềm Ẩn: ${expressionNumber}`;
  document.getElementById('soulUrgeNumber').innerText = `Động Lực Bên Trong: ${soulUrgeNumber}`;
  document.getElementById('attitudeNumber').innerText = `Thái Độ Bên Ngoài: ${attitudeNumber}`;
  document.getElementById('personalityNumber').innerText = `Phản Ứng Ban Đầu: ${personalityNumber}`;
  document.getElementById('destinyNumber').innerText = `Mong Muốn Ban Đầu: ${destinyNumber}`;
  document.getElementById('coreStrengthNumber').innerText = `Năng Lượng Thành Phần Nổi Trội: ${coreStrengthNumber}`;
  document.getElementById('personalYearNumber').innerText = `Năm Thần Số: ${personalYearNumber}`;
  document.getElementById('lessonDebt').innerText = `Nợ Bài Học: ${lessonDebt}`;
}
