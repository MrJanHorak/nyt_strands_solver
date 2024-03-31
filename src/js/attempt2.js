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

const usedLetters = new Set(); //Track used letters

const  removeShortWords = (dictionary) =>{
  dictionary.forEach((word, index) => {
    if (word.length <= 3) {
      if (index > -1) {
        dictionary.splice(index, 1);
      }
    }
  });
  return dictionary;
}

const updatedDictionary = removeShortWords(dictionary);

const findWords = (row, col, currentWord) => {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
    return; // Out of bounds
  }

  const letter = grid[row][col];
  if (usedLetters.has(letter)) {
    return; // Already used letter
  }

  currentWord += letter;
  usedLetters.add(letter);

  // Check if a complete word is found in the dictionary
  if (updatedDictionary.includes(currentWord) && currentWord.length > 4) {
    console.log('Found Word:', currentWord);
  }

  // Explore all directions (recursively)
  findWords(row + 1, col, currentWord); // Down
  findWords(row - 1, col, currentWord); // Up
  findWords(row, col + 1, currentWord); // Right
  findWords(row, col - 1, currentWord); // Left
  findWords(row + 1, col + 1, currentWord); // Diagonally down-right
  findWords(row - 1, col - 1, currentWord); // Diagonally up-left
  findWords(row + 1, col - 1, currentWord); // Diagonally down-left
  findWords(row - 1, col + 1, currentWord); // Diagonally up-right

  usedLetters.delete(letter); // Backtrack - remove used letter
}

// Start searching from each cell
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    findWords(i, j, '');
  }
}

// Output:
