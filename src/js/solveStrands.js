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
const dictionary = new Set([
  "STORY",
  "RANGE",
  "YEAR",
  "MONTH",
  "STONE",
  "MAGIC",
  "FIND",
  "FORT",
  "MIGHT",
  "PLACE",
]);

const foundWords = solveWordSearch(board, dictionary);
console.log(foundWords);