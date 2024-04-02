import dictionary from '../data/words_dictionary.json' assert { type: 'json' };

// Example usage
const board = [
  ['E', 'L', 'T', 'I', 'T', 'G'],
  ['K', 'W', 'R', 'E', 'T', 'U'],
  ['H', 'C', 'A', 'F', 'F', 'S'],
  ['R', 'I', 'U', 'H', 'U', 'L'],
  ['O', 'L', 'C', 'O', 'A', 'H'],
  ['A', 'R', 'A', 'I', 'U', 'G'],
  ['O', 'T', 'R', 'L', 'T', 'C'],
  ['O', 'H', 'E', 'R', 'O', 'H'],
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

function dfs(row, col, currentWord, visited, board, dictionary, rows, cols, currentSolution = []) {
  const foundWords = [];

  if (currentWord.length > 10) {
    return [];
  }

  if (currentWord.length >= 4 && dictionary[currentWord]) {
    console.log('Found Word:', currentWord);
    currentSolution.push(currentWord);
    visited.add(`${row},${col}`); // Mark current cell as visited

    // Check if all cells are visited and solution length is within range
    if (visited.size === rows * cols && currentSolution.length >= 6 && currentSolution.length <= 8) {
      console.log('Found Solution:', currentSolution);
      return [...currentSolution]; // Return a copy of the solution
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
      !visited.has(coord)
    ) {
      visited.add(coord);
      const branchResults = dfs(newRow, newCol, currentWord + board[newRow][newCol].toLowerCase(), visited, board, dictionary, rows, cols, currentSolution);
      visited.delete(coord);
      // Propagate results from explored branches (might be empty arrays or solutions)
      foundWords.push(...branchResults);
    }
  }

  // Backtrack: remove last word and unmark visited cell
  if (currentSolution.length > 0 && visited.has(`${row},${col}`)) {
    currentSolution.pop();
    visited.delete(`${row},${col}`);
  }

  // Return accumulated results (might be empty or contain solutions)
  return foundWords;
}

function solveWordSearch(board, dictionary) {
  const rows = board.length;
  const cols = board[0].length;
  const foundWords = []; // Array to store all solutions

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const solution = dfs(row, col, '', new Set(), board, dictionary, rows, cols);
      if (solution) {
        foundWords.push(solution); // Add found solution to the array
      }
    }
  }

  return foundWords; // Return the array of all solutions
}

const foundWords = solveWordSearch(board, updatedDictionary);
console.log(foundWords);