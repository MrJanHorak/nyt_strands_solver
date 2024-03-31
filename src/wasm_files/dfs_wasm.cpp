#include <emscripten.h>
#include <vector>
#include <set>
#include <string>

using namespace std;

// Define a struct to hold board data and dictionary size
struct BoardData {
  int rows;
  int cols;
  vector<char> board;
  int dictionarySize;
};

// Function to remove short words from dictionary (optional, can be done in Javascript)
BoardData removeShortWords(const vector<string>& dictionary) {
  BoardData data;
  data.dictionarySize = 0;
  for (const string& word : dictionary) {
    if (word.length() > 3) {
      data.board.push_back(word[0]); // Assuming single character representation for dictionary words
      data.dictionarySize++;
    }
  }
  data.rows = 1;
  data.cols = data.dictionarySize;
  return data;
}

// Function for depth-first search (DFS)
vector<string> dfs(const BoardData& data, int row, int col, string currentWord, set<string>& visited, vector<string>& currentSolution, set<string>& usedCoords) {
  vector<string> foundWords;

  if (currentWord.length() > 1 && col < data.dictionarySize && data.board[col] == currentWord[currentWord.length() - 1]) {
    currentSolution.push_back(currentWord);
    usedCoords.insert(to_string(row) + "," + to_string(col));
    if (usedCoords.size() == data.rows * data.cols) {
      foundWords.push_back(currentSolution.back()); // Add only the last word as solution
    }
  }

  // Check all 8 directions
  for (const pair<int, int>& dir : {{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, -1}, {-1, 1}, {1, -1}, {1, 1}}) {
    int newRow = row + dir.first;
    int newCol = col + dir.second;
    string newCoord = to_string(newRow) + "," + to_string(newCol);
    if (newRow >= 0 && newRow < data.rows && newCol >= 0 && newCol < data.dictionarySize && !visited.count(newCoord) && !usedCoords.count(newCoord)) {
      visited.insert(newCoord);
      vector<string> subWords = dfs(data, newRow, newCol, currentWord + data.board[newCol], visited, currentSolution, usedCoords);
      foundWords.insert(foundWords.end(), subWords.begin(), subWords.end());
      visited.erase(newCoord);
    }
  }

  if (!currentSolution.empty()) {
    currentSolution.pop_back();
    usedCoords.erase(to_string(row) + "," + to_string(col));
  }

  return foundWords;
}

// Function to be called from Javascript (takes board and dictionary as pointers)
extern "C" EMSCRIPTEN_KEEPALIVE
vector<string>* solveWordSearch(const char* board, int boardSize, const char* dictionary, int dictionarySize) {
  // Convert board and dictionary to usable formats
  vector<char> boardVec(boardSize);
  memcpy(boardVec.data(), board, boardSize);
  vector<string> dictVec(dictionarySize);
  for (int i = 0; i < dictionarySize; ++i) {
    dictVec[i] = string(1, dictionary[i]); // Assuming single character representation
  }

  // Prepare board data
  BoardData data = removeShortWords(dictVec); // Can be pre-processed and passed directly

  // Perform DFS and return found words
  vector<string> foundWords = dfs(data, 0, 0, "", set<string>(), vector<string>(), set<string>());
  return new vector<string>(foundWords); // Allocate memory on WASM heap
}