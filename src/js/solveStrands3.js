import Trie from './trieDictionary.js';
import dictionary from '../data/words_dictionary.json' assert { type: 'json' }; // Assuming Trie implementation is in Trie.js

// Example usage
const board = [
  ['D', 'B', 'C', 'O', 'R', 'C'],
  ['E', 'R', 'A', 'T', 'U', 'A'],
  ['Y', 'K', 'O', 'S', 'L', 'S'],
  ['A', 'C', 'A', 'C', 'B', 'E'],
  ['R', 'I', 'W', 'D', 'A', 'A'],
  ['P', 'R', 'G', 'R', 'W', 'R'],
  ['S', 'I', 'A', 'E', 'A', 'E'],
  ['H', 'A', 'S', 'E', 'Y', 'T'],
];

const rows = board.length;
const cols = board[0].length;
const foundWords = new Map();

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

function findAllWords(
  row,
  col,
  currentWord,
  visited,
  board,
  trie,
  rows,
  cols,
  foundWords = new Map()
) {
  // 1. Check for base cases
  if (
    currentWord.length > 15 || // Maximum word length check
    !trie.startsWith(currentWord) || // Prefix check
    row < 0 ||
    row >= rows ||
    col < 0 ||
    col >= cols ||
    visited.has(`<span class="math-inline">\{row\},</span>{col}`) // Check if cell is already visited
  ) {
    return foundWords;
  }

  // 2. Add current cell to visited set
  visited.add(`<span class="math-inline">\{row\},</span>{col},${currentWord}`); // Include current word for coordinate tracking

  // 3. Check for complete word and add coordinates (if found)
  if (currentWord.length >= 4 && trie.search(currentWord)) {
    const wordCoordinates = [...visited];// Declare outside the loop to accumulate coordinates

    // 3.1 Loop through visited entries that match the current word
    for (const [r, c] of visited) {
      if (visited.has(`${r},${c},${currentWord}`)) {
        wordCoordinates.push([r, c]); // Add coordinates only for the complete word
      }
    }

    // 3.2 Add word and coordinates to foundWords Map
    foundWords.set(currentWord, wordCoordinates);
  }

  // 4. Explore neighbors recursively
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
      !visited.has(`${r},${c},${currentWord}`)
    ) {
      const newWord = currentWord + board[newRow][newCol].toLowerCase();
      const newVisited = new Set([...visited]); // Create a copy of visited set

      const branchResults = findAllWords(
        newRow,
        newCol,
        newWord,
        newVisited,
        board,
        trie,
        rows,
        cols,
        foundWords
      );

      visited.delete(`${r},${c},${currentWord}`); // Remove current cell from visited
    }
  }
  

  return foundWords;
}

// Find all words on the board

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const visited = new Set();
    findAllWords(
      row,
      col,
      board[row][col].toLowerCase(),
      visited,
      board,
      trie,
      rows,
      cols,
      foundWords
    );
  }
}

console.log('Found Words:', foundWords);
