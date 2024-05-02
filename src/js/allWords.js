import dictionary from '../data/words_dictionary_300000_words.json' assert { type: 'json' };
import Trie from './trieDictionary.js';

const rows = board.length;
const cols = board[0].length;
const foundWords = new Map();

function removeShortWords(dictionary) {
  for (const word in dictionary) {
    if (word.length <= 3) {
      delete dictionary[word];
    }
  }

  console.log(
    '# words in updated dictionary: ',
    Object.keys(dictionary).length
  );
  return dictionary;
}

const updatedDictionary = removeShortWords(dictionary);

const trie = new Trie();
for (let word of Object.keys(updatedDictionary)) {
  trie.insert(word);
}

console.log('# words in trie: ');
trie.logWordCount();

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
    visited.has(`${row},${col}`) // Check if cell is already visited
  ) {
    return foundWords;
  }

  // 2. Add current cell to visited set
  visited.add(`${row},${col}`);

  if (currentWord.length >= 4 && trie.search(currentWord)) {
    const wordCoordinates = Array.from(visited)
      .map((item) => item.split(','))
      .map(([r, c]) => {
        return [parseInt(r), parseInt(c)];
      });
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
      !visited.has(`${newRow},${newCol}`)
    ) {
      const newWord = currentWord + board[newRow][newCol].toLowerCase();

      findAllWords(
        newRow,
        newCol,
        newWord,
        visited,
        board,
        trie,
        rows,
        cols,
        foundWords
      );
    }
  }

  visited.delete(`${row},${col}`);

  // return foundWords;
  return Array.from(foundWords, ([word, coordinates]) => ({
    word,
    coordinates,
  }));
}
