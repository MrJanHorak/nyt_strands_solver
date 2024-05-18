# Strands Solver Helper

This is a helper for solving strands. The backend is deployed on Google Cloud run. It uses Puppeteer to scrape the NYT Strands website for the current clue and grid.

Here inside the React Frontend I use a DFS to find all possible words by running over the grid recursively. The wordlist I use is over 300,000 words. The NY Times Strands editors however supply a different word list to the game each day, so many of the words my app finds will not lead to hints even if they are official words. 

## How it works
This site will scrape the New York Times stranmds site and return the current strand and then run a depth first search to find all possible words from a word list of over 300,000 words.

When a user clicks on any letter of the grid of letters a list of possible words that contain that specific letter at that location will be returned. If a user selects a word from the list, the letters of that word will appear as an outline in the grid, if a user then tries to see if that word is in the strands lists of words and guessess correctly they can select that word in the word list again and it will turn blue. 

When a word is found and doble clicked upon all the letters that contain that word will be removed from the word search so, turn by turn less words will be appearing as available letters of the grid are being eliminated. 




## Technologies Used:

- [React](https://reactjs.org/)
- [Google Cloud Run](https://cloud.google.com/run)
- [Google Cloud Functions](https://cloud.google.com/functions)
- [Google Cloud Storage](https://cloud.google.com/storage)

## Installation



- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
