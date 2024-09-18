function calculateNumerology() {
  let name = document.getElementById('name').value.toUpperCase();
    name = removeVietnameseTones(name);  // Chuyển tiếng Việt thành không dấu
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

  document.getElementById(
    'lifePathNumber'
  ).innerText = `Bài Học Đường Đời: ${lifePathNumber}`;
  document.getElementById(
    'expressionNumber'
  ).innerText = `Năng Lực Tự Nhiên: ${expressionNumber}`;
  document.getElementById(
    'soulUrgeNumber'
  ).innerText = `Động Lực Thỏa Mãn: ${soulUrgeNumber}`;
  document.getElementById(
    'attitudeNumber'
  ).innerText = `Thái Độ Bên Ngoài: ${attitudeNumber}`;
  document.getElementById(
    'personalityNumber'
  ).innerText = `Phản Ứng Ban Đầu: ${personalityNumber}`;
  document.getElementById(
    'destinyNumber'
  ).innerText = `Mong Muốn Ban Đầu: ${destinyNumber}`;
  document.getElementById(
    'coreStrengthNumber'
  ).innerText = `Năng Lượng Thành Phần Nổi Trội: ${coreStrengthNumber}`;
  document.getElementById(
    'personalYearNumber'
  ).innerText = `Năm Thần Số: ${personalYearNumber}`;
  document.getElementById('lessonDebt').innerText = `Nợ Bài Học: ${lessonDebt}`;
}

function getLifePathNumber(day, month, year) {
  const sum =
    reduceToSingleDigit(day) +
    reduceToSingleDigit(month) +
    reduceToSingleDigit(year);
  return reduceToKarmicOrSingleDigit(sum);
}

function getExpressionNumber(name) {
  const pythagoreanTable = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };
  const nameParts = name
    .split(' ')
    .map((part) =>
      [...part].reduce((acc, char) => acc + (pythagoreanTable[char] || 0), 0)
    );
  const sum = nameParts.reduce(
    (acc, value) => acc + reduceToSingleDigit(value),
    0
  );
  return reduceToKarmicOrSingleDigit(sum);
}

function getSoulUrgeNumber(name) {
  const vowels = { A: 1, E: 5, I: 9, O: 6, U: 3 };
  const nameParts = name
    .split(' ')
    .map((part) =>
      [...part].reduce((acc, char) => acc + (vowels[char] || 0), 0)
    );
  const sum = nameParts.reduce(
    (acc, value) => acc + reduceToSingleDigit(value),
    0
  );
  return reduceToKarmicOrSingleDigit(sum);
}

function getAttitudeNumber(name) {
  const consonants = {
    B: 2,
    C: 3,
    D: 4,
    F: 6,
    G: 7,
    H: 8,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };
  const nameParts = name
    .split(' ')
    .map((part) =>
      [...part].reduce((acc, char) => acc + (consonants[char] || 0), 0)
    );
  const sum = nameParts.reduce(
    (acc, value) => acc + reduceToSingleDigit(value),
    0
  );
  return reduceToKarmicOrSingleDigit(sum);
}

function getPersonalityNumber(name) {
  const firstName = name.split(' ').pop(); // Get the last word in the name string
  const pythagoreanTable = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };
  const sum = [...firstName.toUpperCase()].reduce(
    (acc, char) => acc + (pythagoreanTablechar] || 0),
    0
  );
  return reduceToSingleDigit(sum);
}

function getDestinyNumber(name) {
  const firstName = name.split(' ').pop(); // Get the last word in the name string
  const vowels = { A: 1, E: 5, I: 9, O: 6, U: 3 };
  const sum = [...firstName.toUpperCase()].reduce(
    (acc, char) => acc + (vowels[char] || 0),
    0
  );
  return reduceToSingleDigit(sum);
}

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

function getKarmicDebtNumber(number) {
  const karmicDebts = [13, 14, 16, 19];
  return karmicDebts.includes(number) ? number : 'None';
}

function reduceToSingleDigit(number) {
  while (number > 9 && number !== 11 && number !== 22) {
    number = number
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return number;
}

function getCoreStrengthNumber(name) {
  const pythagoreanTable = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };
  const counts = [...name].reduce((acc, char) => {
    if (![' ', '-'].includes(char)) {
      acc[char] = (acc[char] || 0) + 1;
    }
    return acc;
  }, {});
  const dominantLetters = Object.keys(counts).filter(
    (char) => counts[char] >= 3
  );
  const numbers = dominantLetters.map((char) => pythagoreanTable[char]);
  return numbers.length > 0 ? numbers.join(', ') : 'None';
}

function getPersonalYearNumber(day, month, year) {
  const currentYear = new Date().getFullYear();
  const sum =
    reduceToSingleDigit(day) +
    reduceToSingleDigit(month) +
    reduceToSingleDigit(currentYear);
  return reduceToSingleDigit(sum);
}
function getLessonDebt(name) {
  const pythagoreanTable = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };

  const allNumbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const numbersInName = new Set(
    [...name.toUpperCase()].reduce((acc, char) => {
      if (pythagoreanTable[char]) {
        acc.add(pythagoreanTable[char]);
      }
      return acc;
    }, new Set())
  );

  const missingNumbers = [...allNumbers].filter(
    (num) => !numbersInName.has(num)
  );

  return missingNumbers.length > 0 ? missingNumbers.join(', ') : 'None';
}
function removeVietnameseTones(str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    return str;
}
