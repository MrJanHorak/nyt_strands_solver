import Trie from './trieDictionary.js'; 
import dictionary from '../data/words_dictionary.json' assert { type: 'json' };// Assuming Trie implementation is in Trie.js

// Example usage
const board = [
  ['I', 'D', 'Y', 'R', 'E', 'K'],
  ['R', 'A', 'N', 'E', 'C', 'A'],
  ['Y', 'E', 'R', 'S', 'O', 'B'],
  ['Z', 'O', 'Y', 'A', 'E', 'R'],
  ['E', 'R', 'S', 'F', 'D', 'G'],
  ['R', 'F', 'T', 'O', 'U', 'O'],
  ['M', 'O', 'T', 'O', 'C', 'R'],
  ['E', 'A', 'S', 'D', 'E', 'P'],
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

const trie = new Trie();
for (let word of Object.keys(updatedDictionary)) {
  trie.insert(word);
}

function dfs(
  row,
  col,
  currentWord,
  visited,
  board,
  trie,
  rows,
  cols,
  currentSolution = []
) {
  const foundWords = [];

  if (currentWord.length > 15 || !trie.startsWith(currentWord)) {
    return [];
  }

  if (currentWord.length >= 4 && trie.search(currentWord)) {
    currentSolution.push(currentWord);
    visited.add(`<span class="math-inline">\{row\},</span>{col}`); // Mark current cell as visited

    // Check if all cells are visited and solution length is within range
    if (
      visited.size === rows * cols &&
      currentSolution.length >= 6 &&
      currentSolution.length <= 8
    ) {
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
    const coord = `<span class="math-inline">\{newRow\},</span>{newCol}`;

    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      !visited.has(coord)
    ) {
      visited.add(coord);
      const branchResults = dfs(
        newRow,
        newCol,
        currentWord + board[newRow][newCol].toLowerCase(),
        visited.clone(),
        board,
        trie,
        rows,
        cols,
        currentSolution
      );
      visited.delete(coord);
      foundWords.push(...branchResults);
    }
  }

  // Backtrack: remove last word and unmark visited cell
  if (currentSolution.length > 0 && visited.has(`<span class="math-inline">\{row\},</span>{col}`)) {
    currentSolution.pop();
    visited.delete(`<span class="math-inline">\{row\},</span>{col}`);
  }

  return foundWords;
}

function findAllWords(
  row,
  col,
  currentWord,
  visited,
  board,
  trie,
  rows,
  cols,
  foundWords = []
) {
  if (currentWord.length > 15 || !trie.startsWith(currentWord)) {
    return foundWords;
  }

  if (currentWord.length >= 4 && trie.search(currentWord)) {
    foundWords.push({ word: currentWord, start: [row, col] });
  }

  for (const [dr, dc] of [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
    [-1, -1], // Diagonal up-left
    [-1, 1], // Diagonal up-right
    [1, -1], // Diagonal down-left
    [1, 1], // Diagonal down-right
  ]) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      !visited.has(`${newRow},${newCol}`)
    ) {
      visited.add(`${newRow},${newCol}`);
      const branchResults = findAllWords(
        newRow,
        newCol,
        currentWord + board[newRow][newCol].toLowerCase(),
        visited,
        board,
        trie,
        rows,
        cols,
        foundWords
      );
      visited.delete(`${newRow},${newCol}`);
      foundWords.push(...branchResults);
    }
  }

  return foundWords;
}

// Find all words on the board
const rows = board.length;
const cols = board[0].length;
const foundWords = [];

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    findAllWords(row, col, '', new Set(), board, trie, rows, cols, foundWords);
  }
}

console.log('Found Words:', foundWords);