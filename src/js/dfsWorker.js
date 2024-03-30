import { parentPort, workerData } from 'worker_threads';

function dfs(row, col, currentWord, visited, board, dictionary, rows, cols, currentSolution = [], usedCoords = new Set()) {
  const foundWords = [];
  console.log('runnging dfs')
  if (currentWord.length > 1) {
    if (dictionary[currentWord]) {
      currentSolution.push(currentWord);
      usedCoords.add(`${row},${col}`);
      if (usedCoords.size === rows * cols) {
        // If all coordinates have been used, add the solution and post it
        foundWords.push([...currentSolution]);
        parentPort.postMessage(foundWords); // Send solution to main thread
        foundWords.length = 0; // Reset foundWords for next solutions
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
        !visited.has(coord) &&
        !usedCoords.has(coord)
      ) {
        visited.add(coord);
        foundWords.push(...dfs(newRow, newCol, currentWord + board[newRow][newCol], visited, board, dictionary, rows, cols, currentSolution, usedCoords));
        visited.delete(coord);
      }
    }

    // Backtrack: remove the last word from currentSolution and its coordinates from usedCoords
    if (currentSolution.length > 0) {
      currentSolution.pop();
      usedCoords.delete(`${row},${col}`);
    }
  }
  console.log('returning some words')
  return foundWords;
}

const { row, col, board, dictionary } = workerData;
const rows = board.length;
const cols = board[0].length;

// Continuously search for solutions until terminated from main thread
while (true) {
  const foundWords = dfs(row, col, '', new Set(), board, dictionary, rows, cols);
  if (foundWords.length > 0) {
    parentPort.postMessage(foundWords); // Send any found solutions
  }
}
