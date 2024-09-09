const grid = [
  ['M', 'U', 'H', 'A', 'Y', 'S'],
  ['O', 'B', 'F', 'G', 'N', 'A'],
  ['R', 'I', 'O', 'R', 'P', 'T'],
  ['S', 'E', 'R', 'A', 'Y', 'H'],
  ['E', 'R', 'Y', 'N', 'E', 'G'],
  ['S', 'T', 'N', 'O', 'R', 'F'],
  ['Y', 'E', 'C', 'A', 'M', 'I'],
  ['M', 'N', 'O', 'I', 'T', 'C'],
];

import dictionary from '../data/dictionary_array.js';

const usedLetters = new Set();
const foundWords = []

// Function to explore and build words
/**
 * Explores the grid to find words starting from a given cell.
 *
 * @param {number} row - The row index of the starting cell.
 * @param {number} col - The column index of the starting cell.
 * @param {string} currentWord - The current word being formed.
 * @param {number} [minLength=4] - The minimum length of words to be considered valid.
 *
 * @returns {void}
 */
function exploreWords(row, col, currentWord, minLength = 4) {

  if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
    return; // Out of bounds
  }

  const letter = grid[row][col].toLowerCase();
  const coords = `${row}-${col}`;
  if (usedLetters.has(coords)) {
    return; // Already used letter
  }

  currentWord += letter
  usedLetters.add(letter.row + '-' + letter.col);
  // console.log('Current Word:', currentWord);
  // Check if a complete word is found in the dictionary (consider minLength)
  if (currentWord.length >= minLength && dictionary.includes(currentWord)) {
    console.log('Found Word:', currentWord);
    foundWords.push(currentWord);
     // Reset current word
  }

  if (currentWord.length >= 10) {
    return; // Max length reached
  }

  // Explore all directions recursively, prioritizing longer words
  exploreWords(row + 1, col, currentWord, minLength); // Down
  exploreWords(row - 1, col, currentWord, minLength); // Up
  exploreWords(row, col + 1, currentWord, minLength); // Right
  exploreWords(row, col - 1, currentWord, minLength); // Left
  exploreWords(row + 1, col + 1, currentWord, minLength); // Diagonally down-right
  exploreWords(row - 1, col - 1, currentWord, minLength); // Diagonally up-left
  exploreWords(row + 1, col - 1, currentWord, minLength); // Diagonally down-left
  exploreWords(row - 1, col + 1, currentWord, minLength); // Diagonally up-right

  // Backtrack
  usedLetters.delete(letter.row + '-' + letter.col);
}

// Start searching from each cell, starting with shorter words
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    exploreWords(i, j, '', 4); // Start with minimum length 2
  }
}

console.log('All found words:', foundWords);