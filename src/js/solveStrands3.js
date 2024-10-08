import dictionary from '../data/words_dictionary_300000_words.json';
import Trie from './trieDictionary.js';
import CoordinateTrie from './trieCoordinates.js';
// Example usage
const board = [
  ['L', 'W', 'N', 'I', 'S', 'H'],
  ['C', 'O', 'F', 'K', 'B', 'D'],
  ['K', 'U', 'N', 'U', 'E', 'Z'],
  ['S', 'B', 'B', 'M', 'P', 'E'],
  ['E', 'E', 'L', 'I', 'R', 'B'],
  ['E', 'T', 'R', 'A', 'N', 'K'],
  ['S', 'I', 'P', 'M', 'U', 'T'],
  ['C', 'H', 'R', 'E', 'G', 'I'],
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

  console.log(
    '# words in updated dictionary: ',
    Object.keys(dictionary).length
  );
  return dictionary;
}

// Usage
const updatedDictionary = removeShortWords(dictionary);

const trie = new Trie();
for (let word of Object.keys(updatedDictionary)) {
  trie.insert(word);
}

console.log('# words in trie: ');
trie.logWordCount();

/**
 * Recursively finds all valid words on a board using a trie for prefix checking.
 *
 * @param {number} row - The current row index.
 * @param {number} col - The current column index.
 * @param {string} currentWord - The word formed so far.
 * @param {Set<string>} visited - A set of visited cells in the format "row,col".
 * @param {Array<Array<string>>} board - The 2D board of characters.
 * @param {Object} trie - The trie data structure for prefix and word validation.
 * @param {number} rows - The total number of rows in the board.
 * @param {number} cols - The total number of columns in the board.
 * @param {Map<string, Array<Array<number>>>} [foundWords=new Map()] - A map to store found words and their coordinates.
 * @returns {Array<{word: string, coordinates: Array<Array<number>>}>} An array of objects containing found words and their coordinates.
 */
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
  visited.add(`${row},${col}`); // Include current word for coordinate tracking

  if (currentWord.length >= 4 && trie.search(currentWord)) {
    const wordCoordinates = Array.from(visited)
      .map((item) => item.split(','))
      .map(([r, c]) => {
        return [parseInt(r), parseInt(c)];
      });
    foundWords.set(currentWord, wordCoordinates);
    // fs.appendFileSync('foundWords.txt', `${currentWord}, ${JSON.stringify(wordCoordinates)}\n`)
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

  visited.delete(`${row},${col}`); // Remove current cell from visited

  // return foundWords;
  return Array.from(foundWords, ([word, coordinates]) => ({
    word,
    coordinates,
  }));
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

// console.log('Found Words:', foundWords);
console.log('Found Words:', foundWords.size);
// console.log('Found Words:', foundWords.entries());
// Function to check if two words share any coordinates
function shareCoordinates(coords1, coords2) {
  for (const coord1 of coords1) {
    for (const coord2 of coords2) {
      if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) {
        return true;
      }
    }
  }
  return false;
}

// Function to find all words that do not share any coordinates
function findNonOverlappingWords(words) {
  const wordsArray = Array.from(words.entries()).sort(
    (a, b) => b[0].length - a[0].length
  );
  const nonOverlappingWords = new Map();

  for (const [word, coords] of wordsArray) {
    let overlaps = false;
    for (const existingCoords of nonOverlappingWords.values()) {
      if (shareCoordinates(coords, existingCoords)) {
        overlaps = true;
        break;
      }
    }
    if (!overlaps) {
      nonOverlappingWords.set(word, coords);
    }
  }

  console.log('Non-overlapping Words:', nonOverlappingWords.size);
  console.log('Non-overlapping Words:', nonOverlappingWords.entries());
  return nonOverlappingWords;
}

function findNonOverlappingWordsNested(words) {
  const wordsArray = Array.from(words.entries()).sort(
    (a, b) => b[0].length - a[0].length
  );
  const nonOverlappingWordsNested = new Map();

  for (let i = 0; i < wordsArray.length; i++) {
    const [word1, coords1] = wordsArray[i];
    let overlaps = false;

    for (let j = 0; j < wordsArray.length; j++) {
      if (i !== j) {
        const [word2, coords2] = wordsArray[j];
        if (shareCoordinates(coords1, coords2)) {
          overlaps = true;
          break;
        }
      }
    }

    if (!overlaps) {
      nonOverlappingWords.set(word1, coords1);
    }
  }

  console.log('Non-overlapping Words Nested:', nonOverlappingWordsNested.size);
  console.log(
    'Non-overlapping Words Nested:',
    nonOverlappingWordsNested.entries()
  );

  return nonOverlappingWordsNested;
}
findNonOverlappingWordsNested(foundWords);

function getSubsets(array, index = 0, currentSubset = []) {
  if (index === array.length) {
    return [currentSubset];
  } else {
    return [
      ...getSubsets(array, index + 1, currentSubset),
      ...getSubsets(array, index + 1, [...currentSubset, array[index]]),
    ];
  }
}

function isNonOverlapping(subset) {
  for (let i = 0; i < subset.length; i++) {
    for (let j = i + 1; j < subset.length; j++) {
      if (shareCoordinates(subset[i][1], subset[j][1])) {
        return false;
      }
    }
  }
  return true;
}

const totalLetters = rows * cols;

const nonOverlappingWords = findNonOverlappingWords(foundWords);
console.log('Non-overlapping Words:', nonOverlappingWords);

// Function to find complete and non-overlapping word sets
function findCompleteWordSets(words) {
  const completeSets = [];

  for (const [word1, coords1] of words) {
    const usedLetters = new Set(word1.split('')); // Track used letters for this set

    // Check if current word overlaps with existing sets
    let overlaps = false;
    for (const set of completeSets) {
      for (const word2 of set) {
        if (shareCoordinates(coords1, word2[1])) {
          // Check coordinates for overlap
          overlaps = true;
          break;
        }
      }
      if (overlaps) break;
    }

    if (!overlaps) {
      const currentSet = new Set([word1]); // Start a new set with current word
      for (const [word2, coords2] of words) {
        if (word1 !== word2 && !shareCoordinates(coords1, coords2)) {
          // Not same word & no overlap
          const word2UsedLetters = new Set(word2.split(''));

          // Check if adding this word uses new letters
          let allNewLetters = true;
          for (const letter of word2UsedLetters) {
            if (usedLetters.has(letter)) {
              allNewLetters = false;
              break;
            }
          }

          if (allNewLetters) {
            currentSet.add(word2);
            usedLetters.add(...word2UsedLetters); // Add used letters from word2
          }
        }
      }

      // Check if current set uses all letters on the board
      if (usedLetters.size === totalLetters) {
        completeSets.push([...currentSet]); // Convert set to array and add to results
      }
    }
  }

  return completeSets;
}

// Find all complete and non-overlapping word sets
const completeWordSets = findCompleteWordSets(foundWords.entries());
console.log('Complete Word Sets:', completeWordSets);

// // Function to find maximum filled word sets
// function findMaxFilledWordSets(words) {
//   let maxSetSize = 0;
//   const completeSets = [];

//   for (const [word1, coords1] of words) {
//     const usedLetters = new Set(word1.split(''));
//     let overlaps = false;

//     for (const set of completeSets) {
//       for (const word2 of set) {
//         if (shareCoordinates(coords1, word2[1])) {
//           overlaps = true;
//           break;
//         }
//       }
//       if (overlaps) break;
//     }

//     if (!overlaps) {
//       const currentSet = new Set([word1]);
//       for (const [word2, coords2] of words) {
//         if (word1 !== word2 && !shareCoordinates(coords1, coords2)) {
//           const word2UsedLetters = new Set(word2.split(''));
//           let allNewLetters = true;
//           for (const letter of word2UsedLetters) {
//             if (usedLetters.has(letter)) {
//               allNewLetters = false;
//               break;
//             }
//           }

//           if (allNewLetters) {
//             currentSet.add(word2);
//             usedLetters.add(...word2UsedLetters);
//           }
//         }

//         // Check for early termination based on max set size
//         if (currentSet.size === maxSetSize) {
//           break; // No larger set possible for this word (word1)
//         }
//       }

//       // Update max set size if current set is larger
//       if (currentSet.size > maxSetSize) {
//         maxSetSize = currentSet.size;
//       }

//       // Add set only if it's the maximum size
//       if (currentSet.size === maxSetSize) {
//         completeSets.push([...currentSet]);
//       }
//     }
//   }

//   return completeSets;
// }

// // Find maximum filled word sets
// const maxFilledSets = findMaxFilledWordSets(foundWords.entries());
// console.log('Maximum Filled Word Sets:', maxFilledSets);

// // Function to find all possible non-overlapping word sets
// function findAllNonOverlappingWordSets(words) {
//   const completeSets = [];

//   for (const [word1, coords1] of words) {
//     const usedLetters = new Set(word1.split(''));
//     let overlaps = false;

//     for (const set of completeSets) {
//       for (const word2 of set) {
//         if (shareCoordinates(coords1, word2[1])) {
//           overlaps = true;
//           break;
//         }
//       }
//       if (overlaps) break;
//     }

//     if (!overlaps) {
//       const currentSet = new Set([word1]);
//       for (const [word2, coords2] of words) {
//         if (word1 !== word2 && !shareCoordinates(coords1, coords2)) {
//           const word2UsedLetters = new Set(word2.split(''));
//           let allNewLetters = true;
//           for (const letter of word2UsedLetters) {
//             if (usedLetters.has(letter)) {
//               allNewLetters = false;
//               break;
//             }
//           }

//           if (allNewLetters) {
//             currentSet.add(word2);
//             usedLetters.add(...word2UsedLetters);
//           }
//         }
//       }

//       // Add all valid sets regardless of size
//       completeSets.push([...currentSet]);
//     }
//   }

//   return completeSets;
// }

// // Find all possible non-overlapping word sets
// const allSets = findAllNonOverlappingWordSets(foundWords.entries());
// console.log('All Possible Non-Overlapping Word Sets:', allSets);

// function findOptimalNonOverlappingWords(words) {
//   const wordsArray = Array.from(words.entries()).sort(
//     (a, b) => b[0].length - a[0].length
//   );
//   let bestSolution = [];
//   const trie = new CoordinateTrie();

//   function backtrack(
//     startIndex = 0,
//     currentSolution = [],
//     trie = new CoordinateTrie()
//   ) {
//     if (currentSolution.length > bestSolution.length) {
//       bestSolution = currentSolution;
//     }

//     // if (currentSolution.length + wordsArray.length - startIndex <= bestSolution.length) {
//     //   return;
//     // }

//     if (currentSolution.length >= 6 && currentSolution.length <= 9) {
//       return;
//     }

//     for (let i = startIndex; i < wordsArray.length; i++) {
//       const [word, coords] = wordsArray[i];

//       if (!trie.hasOverlap(coords)) {
//         const newTrie = new CoordinateTrie();
//         for (const [existingWord, existingCoords] of currentSolution) {
//           newTrie.insert(existingWord, existingCoords);
//         }
//         newTrie.insert(word, coords);
//         backtrack(i + 1, [...currentSolution, [word, coords]], newTrie);
//       }
//     }
//   }
//   backtrack();

//   const optimalNonOverlappingWords = new Map(bestSolution);
//   console.log(
//     'Optimal Non-overlapping Words:',
//     optimalNonOverlappingWords.size
//   );
//   console.log(
//     'Optimal Non-overlapping Words:',
//     optimalNonOverlappingWords.entries()
//   );
//   return optimalNonOverlappingWords;
// }

// const optimalNonOverlappingWords = findOptimalNonOverlappingWords(foundWords);
// console.log('Optimal Non-overlapping Words:', optimalNonOverlappingWords);

const POPULATION_SIZE = foundWords.size;
const MAX_GENERATIONS = 10000;
const TARGET_FITNESS = rows * cols;
const CURRENT_LENGTH = 10;
const LARGE_PENALTY = 100;
const TOURNAMENT_SIZE = 2;
const MUTATION_RATE = 0.5;
const ELITISM_COUNT = 6;
const DIVERSITY_COUNT = 5;

// Initialization
let population = [];
for (let i = 0; i < POPULATION_SIZE; i++) {
  const individual = Array.from({ length: 9 }, () => {
    const wordsArray = Array.from(foundWords.keys());
    return wordsArray[Math.floor(Math.random() * wordsArray.length)];
  });
  population.push(individual);
}

// Fitness Function
function fitness(individual) {
  let coverage = 0;
  let overlaps = 0;
  const coveredCoords = new Map();

  for (const word of individual) {
    const coords = foundWords.get(word);
    coverage += coords.length;

    for (const coord of coords) {
      const key = coord.join(',');
      if (coveredCoords.has(key)) {
        overlaps++;
      } else {
        coveredCoords.set(key, word);
      }
    }
  }

  return coverage - overlaps * LARGE_PENALTY;
}

// Selection
function selection(population) {
  const fitnesses = population.map(fitness);
  const totalFitness = fitnesses.reduce((a, b) => a + b, 0);
  const rand = Math.random() * totalFitness;
  let sum = 0;
  for (let i = 0; i < population.length; i++) {
    sum += fitnesses[i];
    if (sum >= rand) {
      return population[i];
    }
  }
  return population[population.length - 1];
}

function tournamentSelection(population, tournamentSize) {
  // Select a number of individuals at random
  const tournament = Array.from({ length: tournamentSize }, () => {
    const index = Math.floor(Math.random() * population.length);
    return population[index];
  });

  // Select the best individual
  const bestIndividual = tournament.reduce((a, b) =>
    fitness(a) > fitness(b) ? a : b
  );

  return bestIndividual;
}

// Crossover
// function crossover(parent1, parent2) {
//   const crossoverPoint = Math.floor(Math.random() * parent1.length);
//   let child = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];

//   // Remove overlapping words
//   const trie = new CoordinateTrie();
//   child = child.filter(word => {
//     const coords = foundWords.get(word);  // Retrieve the coordinates for the word
//     if (!trie.hasOverlap(word, coords)) {  // Pass the coordinates to hasOverlap
//       trie.insert(word, coords);
//       return true;
//     }
//     return false;
//   });

//   return child;
// }

function crossover(parent1, parent2) {
  let child = [];

  // Create a CoordinateTrie from the child
  const trie = new CoordinateTrie();

  // Select words from the parents one by one, and only add a word to the child if it does not overlap with the existing words
  for (const parent of [parent1, parent2]) {
    for (const word of parent) {
      const coords = foundWords.get(word);
      if (!trie.hasOverlap(word, coords)) {
        trie.insert(word, coords);
        child.push(word);
      }
    }
  }

  return child;
}

// Mutation
function mutate(individual) {
  const wordsArray = Array.from(foundWords.keys());
  const numMutations = Math.floor(MUTATION_RATE * individual.length);

  // Create a trie from the individual
  const trie = new CoordinateTrie();
  for (const word of individual) {
    const coords = foundWords.get(word);
    trie.insert(word, coords);
  }

  for (let i = 0; i < numMutations; i++) {
    const index = Math.floor(Math.random() * individual.length);
    let newWord;
    let coords;

    // Find a new word that does not overlap with the existing words
    do {
      newWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
      coords = foundWords.get(newWord);
    } while (trie.hasOverlap(newWord, coords));

    // Replace the word at the selected index with the new word
    const oldCoords = foundWords.get(individual[index]);
    trie.delete(individual[index], oldCoords);
    trie.insert(newWord, coords);
    individual[index] = newWord;
  }

  return individual;
}
// Main GA loop
let bestSolution = population[0];
let bestFitness = fitness(bestSolution);

for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
  let newPopulation = [];
  for (let i = 0; i < POPULATION_SIZE; i++) {
    const parent1 = selection(population);
    const parent2 = selection(population);
    let child = crossover(parent1, parent2);
    child = mutate(child);
    newPopulation.push(child);
  }

  const sortedPopulation = population
    .slice()
    .sort((a, b) => fitness(b) - fitness(a));
  for (let i = 0; i < ELITISM_COUNT; i++) {
    newPopulation.push(sortedPopulation[i]);
  }
  for (let i = 0; i < DIVERSITY_COUNT; i++) {
    const individual = Array.from(
      { length: Math.floor(Math.random() * 10) },
      () => {
        const wordsArray = Array.from(foundWords.keys());
        return wordsArray[Math.floor(Math.random() * wordsArray.length)];
      }
    );
    newPopulation.push(individual);
  }

  // for (let i = 0; i < POPULATION_SIZE; i++) {
  //   const parent1 = tournamentSelection(population, TOURNAMENT_SIZE);
  //   const parent2 = tournamentSelection(population, TOURNAMENT_SIZE);
  //   let child = crossover(parent1, parent2);
  //   child = mutate(child);
  //   newPopulation.push(child);
  // }
  population = newPopulation;

  // Calculate the average fitness score of the population
  let averageFitness =
    population.reduce((sum, individual) => sum + fitness(individual), 0) /
    population.length;

  // Determine the length of the individuals in the next generation based on the average fitness score
  let nextGenerationLength;
  if (averageFitness > TARGET_FITNESS) {
    nextGenerationLength = CURRENT_LENGTH - 1;
  } else if (averageFitness < TARGET_FITNESS) {
    nextGenerationLength = CURRENT_LENGTH + 1;
  } else {
    nextGenerationLength = CURRENT_LENGTH;
  }

  // Generate the next generation
  let nextGeneration = [];
  for (let i = 0; i < POPULATION_SIZE; i++) {
    const individual = Array.from({ length: nextGenerationLength }, () => {
      const wordsArray = Array.from(foundWords.keys());
      return wordsArray[Math.floor(Math.random() * wordsArray.length)];
    });
    nextGeneration.push(individual);
  }

  population = nextGeneration;

  // Check if a better solution has been found
  const bestIndividual = population.reduce((a, b) =>
    fitness(a) > fitness(b) ? a : b
  );
  const bestIndividualFitness = fitness(bestIndividual);
  if (bestIndividualFitness > bestFitness) {
    bestSolution = bestIndividual;
    bestFitness = bestIndividualFitness;
  }

  console.log('Generation:', generation, 'Best Fitness:', bestFitness);

  // Check if a solution that covers all cells has been found
  if (bestFitness === rows * cols) {
    console.log('Solution found:', bestSolution);
    break;
  }

  console.log('Best solution found:', bestSolution);

  // Log the words and their coordinates in the best solution
  // for (const word of bestSolution) {
  //   const coords = foundWords.get(word);
  //   console.log('Word:', word, 'Coordinates:', coords);
  // }
}

console.log('Best solution found:', bestSolution);

let grid = Array.from({ length: rows }, () => Array(cols).fill(' '));

// Fill in the letters of each word at their corresponding coordinates
for (const word of bestSolution) {
  const coords = foundWords.get(word);
  for (let i = 0; i < word.length; i++) {
    const [x, y] = coords[i];
    grid[x][y] = word[i];
  }
}

// Output the grid
for (const row of grid) {
  console.log(row.join(' '));
}
