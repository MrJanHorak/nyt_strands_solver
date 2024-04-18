import dictionary from '../data/words_dictionary_300000_words.json' assert { type: 'json' };

function removeShortWords(dictionary) {
  const updatedDictionary = {};

  for (const word in dictionary) {
    if (word.length <= 3) {
      delete dictionary[word];
    }
  }

  for (const word in dictionary) {
    if (word.length > 3) {
      updatedDictionary[word.toUpperCase()] = dictionary[word];
    }
  }

  console.log(
    '# words in updated dictionary: ',
    Object.keys(dictionary).length
  );
  return dictionary;
}

const updatedDictionary = removeShortWords(dictionary);

function solveWordSearch(board, dictionary) {
  const rows = board.length;
  const cols = board[0].length;
  const foundWords = new Set();

  function dfs(row, col, currentWord, visited) {
    if (dictionary.has(currentWord) && currentWord.length > 1) {
      foundWords.add(currentWord);
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
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited.has([newRow, newCol])
      ) {
        visited.add([newRow, newCol]);
        dfs(newRow, newCol, currentWord + board[newRow][newCol], visited);
        visited.delete([newRow, newCol]);
      }
    }
  }

  // Iterate through each cell in the grid and start DFS
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dfs(row, col, "", new Set());
    }
  }

  return Array.from(foundWords);
}


const board = [
  [ 'T', 'A', 'W', 'N', 'R', 'E' ],
  [ 'E', 'R', 'H', 'T', 'E', 'T' ],
  [ 'T', 'E', 'E', 'I', 'N', 'U' ],
  [ 'A', 'C', 'B', 'L', 'T', 'E' ],
  [ 'S', 'A', 'T', 'L', 'I', 'L' ],
  [ 'T', 'E', 'I', 'I', 'C', 'E' ],
  [ 'E', 'E', 'O', 'N', 'E', 'T' ],
  [ 'L', 'H', 'P', 'C', 'I', 'R' ]
]

const foundWords = solveWordSearch(board, dictionary);
console.log(foundWords);