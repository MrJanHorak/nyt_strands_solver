// import dictionary from '../data/words_dictionary_300000_words.json' assert { type: 'json' };
import Trie from './trieDictionary.js';
let updatedDictionary = {}

async function removeShortWords(dictionary) {
  for (const word in dictionary) {
    if (word.length <= 3) {
      delete dictionary[word];
    }
  }

  return dictionary;
}



function addWordsToUpdatedDictionary(words, spangram) {
  return new Promise((resolve, reject) => {
    if (!words || !Array.isArray(words)) {
      return reject(new Error('Words array is not available or invalid.'));
    }

    if (!spangram || !spangram.length) {
      console.warn('SpanGram is not available yet.');
      return;
    }

    if (!words.includes(spangram)) {
      words.push(spangram);
    }

    words = words.map((word) => word.toLowerCase());

    for (const word of words) {
      if (!updatedDictionary[word]) {
        updatedDictionary[word] = 1;
      }
    }

    trie = new Trie();
    for (let word of Object.keys(updatedDictionary)) {
      trie.insert(word);
    }

    setTimeout(() => {
      resolve();
    }, 100);
  });
}

let trie = new Trie();
for (let word of Object.keys(updatedDictionary)) {
  trie.insert(word);
}

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
  if (
    row < 0 ||
    row >= rows ||
    col < 0 ||
    col >= cols ||
    visited.has(`${row},${col}`) ||
    currentWord.length > 16 ||
    !trie.startsWith(currentWord)
  ) {
    return foundWords;
  }

  visited.add(`${row},${col}`);

  if (currentWord.length >= 4 && trie.search(currentWord)) {
    const wordCoordinates = Array.from(visited)
      .filter((item) => item.includes(','))
      .map((item) => item.split(','))
      .map(([r, c]) => [parseInt(r), parseInt(c)]);

    foundWords.set(currentWord, wordCoordinates);
  }

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

  return Array.from(foundWords, ([word, coordinates]) => ({
    word,
    coordinates,
  }));
}

export async function findWordsInBoard(board, themeWords, spanGram, dictionary) {
  const rows = board.length;
  const cols = board[0].length;
  const foundWords = new Map();

  updatedDictionary = await removeShortWords(dictionary)

  try {
    await addWordsToUpdatedDictionary(themeWords, spanGram);
  } catch (error) {
    console.error('Error adding words to updated dictionary:', error);
  }

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

  return Array.from(foundWords, ([word, coordinates]) => ({
    word,
    coordinates,
  }));
}
