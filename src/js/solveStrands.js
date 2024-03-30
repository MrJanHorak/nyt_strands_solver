import dictionary from '../data/words_dictionary.json' assert { type: 'json' };
import { Worker } from 'worker_threads';

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

function solveWordSearch(board, dictionary) {
  return new Promise((resolve, reject) => {
    const rows = board.length;
    const cols = board[0].length;
    const foundWords = [];

    const worker = new Worker('./dfsWorker.js', {
      workerData: { board, dictionary },
    });

    let maxSolutions = 1; // Adjust as needed (more solutions might take longer)
    let solutionsReceived = 0;

    worker.on('message', (workerFoundWords) => {
      foundWords.push(...workerFoundWords);
      solutionsReceived += workerFoundWords.length;
      if (solutionsReceived >= maxSolutions) {
        worker.terminate(); // Stop the worker after finding enough solutions
      }
    });

    worker.on('error', (err) => {
      console.error(`Worker error: ${err}`);
      reject(err);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
        reject(new Error(`Worker stopped with exit code ${code}`));
      } else {
        resolve(foundWords);
      }
    });
  });
}

solveWordSearch(board, dictionary).then(foundWords => {
  console.log(foundWords);
}).catch(err => {
  console.error(err);
});