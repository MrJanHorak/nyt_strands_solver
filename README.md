# Strands Solver Helper

This is a helper for solving strands. The backend is deployed on Google Cloud run. It uses Puppeteer to scrape the NYT Strands website for the current clue and grid.

Here inside the React Frontend I use a DFS to find all possible words by running over the grid recursively. The wordlist I use is over 300,000 words. The NY Times Strands editors however supply a different word list to the game each day, so many of the words my app finds will not lead to hints even if they are official words. 





## Technologies Used:

- [React](https://reactjs.org/)
- [Google Cloud Run](https://cloud.google.com/run)
- [Google Cloud Functions](https://cloud.google.com/functions)
- [Google Cloud Storage](https://cloud.google.com/storage)

## Installation



- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
