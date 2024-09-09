import dictionary from '../data/words_dictionary.json';

// Example usage
const board = [
  [ 'E', 'L', 'T', 'I', 'T', 'G' ],
  [ 'K', 'W', 'R', 'E', 'T', 'U' ],
  [ 'H', 'C', 'A', 'F', 'F', 'S' ],
  [ 'R', 'I', 'U', 'H', 'U', 'L' ],
  [ 'O', 'L', 'C', 'O', 'A', 'H' ],
  [ 'A', 'R', 'A', 'I', 'U', 'G' ],
  [ 'O', 'T', 'R', 'L', 'T', 'C' ],
  [ 'O', 'H', 'E', 'R', 'O', 'H' ]
]

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

/**
 * Performs a depth-first search (DFS) to find words in a board of letters.
 * Depth-First Search (DFS) algorithm to find words in a board.
 *
 * @param {number} row - The current row index.
 * @param {number} col - The current column index.
 * @param {string} currentWord - The current word being formed.
 * @param {Set<string>} visited - A set of visited coordinates.
 * @param {Array<Array<string>>} board - The board of letters.
 * @param {Object} dictionary - The dictionary of valid words.
 * @param {number} rows - The total number of rows in the board.
 * @param {number} cols - The total number of columns in the board.
 * @param {Array<string>} [currentSolution=[]] - The current solution path.
 * @param {Set<string>} [usedCoords=new Set()] - The set of used coordinates in the current solution.
 * @returns {Array<string>} - An array of found words.
 */

function dfs(row, col, currentWord, visited, board, dictionary, rows, cols, currentSolution = [], usedCoords = new Set()) {
  const foundWords = [];

  if (currentWord.length > 10) {
    return [];
  }

  if (currentWord.length >= 4 && dictionary[currentWord]) {
    currentSolution.push(currentWord);
    usedCoords.add(`${row},${col}`);
    return [currentWord];
  }

  if (usedCoords.size === rows * cols) {
    console.log('Found Solution:', currentSolution);
    return currentSolution;
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
      foundWords.push(...dfs(newRow, newCol, currentWord + board[newRow][newCol].toLowerCase(), visited, board, dictionary, rows, cols, currentSolution, usedCoords));
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