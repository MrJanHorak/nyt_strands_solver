import dictionary from '../data/words_dictionary.json' assert { type: 'json' };

// Example usage
const board = [
  ['M', 'U', 'H', 'A', 'Y', 'S'],
  ['O', 'B', 'F', 'G', 'N', 'A'],
  ['R', 'I', 'O', 'R', 'P', 'T'],
  ['S', 'E', 'R', 'A', 'Y', 'H'],
  ['E', 'R', 'Y', 'N', 'E', 'G'],
  ['S', 'T', 'N', 'O', 'R', 'F'],
  ['Y', 'E', 'C', 'A', 'M', 'I'],
  ['M', 'N', 'O', 'I', 'T', 'C'],
];

function removeShortWords(dictionary) {
  for (const word in dictionary) {
    if (word.length <= 3) {
      delete dictionary[word];
    }
  }

  console.log(Object.keys(dictionary).length);
  return dictionary;
}

// Usage
const updatedDictionary = removeShortWords(dictionary);

function dfs(row, col, currentWord, visited, board, dictionary, rows, cols, currentSolution = [], usedCoords = new Set()) {
  const foundWords = [];

  if (currentWord.length > 1 && dictionary[currentWord]) {
    currentSolution.push(currentWord);
    usedCoords.add(`${row},${col}`);
    if (usedCoords.size === rows * cols) {
      // If all coordinates have been used, add the solution
      foundWords.push([...currentSolution]);
    }
  }

  // Check all 8 directions (up, down, left, right, diagonals)
  for (const [dr, dc] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]) {
    const newRow = row + dr;
    const newCol = col + dc;
    const coord = `${newRow},${newCol}`;
    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      !visited.has(coord) &&
      !usedCoords.has(coord)
    ) {
      visited.add(coord);
      foundWords.push(...dfs(newRow, newCol, currentWord + board[newRow][newCol], visited, board, dictionary, rows, cols, currentSolution, usedCoords));
      visited.delete(coord);
    }
  }

  // Backtrack: remove the last word from currentSolution and its coordinates from usedCoords
  if (currentSolution.length > 0) {
    currentSolution.pop();
    usedCoords.delete(`${row},${col}`);
  }

  return foundWords;
}

function solveWordSearch(board, dictionary) {
  const rows = board.length;
  const cols = board[0].length;
  let foundWords = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      foundWords = foundWords.concat(dfs(row, col, '', new Set(), board, dictionary, rows, cols));
    }
  }

  return foundWords;
}


const foundWords = solveWordSearch(board, updatedDictionary);
console.log(foundWords);