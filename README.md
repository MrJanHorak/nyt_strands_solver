# Strands Solver Helper

This is a helper for solving strands. The backend is deployed on Google Cloud run. It uses Puppeteer to scrape the NYT Strands website for the current clue and grid.

Here inside the React Frontend I use a DFS to find all possible words by running over the grid recursively. The wordlist I use is over 300,000 words. The NY Times Strands editors however supply a different word list to the game each day, so many of the words my app finds will not lead to hints even if they are official words. 

## How it works
This site will scrape the New York Times stranmds site and return the current strand and then run a depth first search to find all possible words from a word list of over 300,000 words.

When a user clicks on any letter of the grid of letters a list of possible words that contain that specific letter at that location will be returned. If a user selects a word from the list, the letters of that word will appear as an outline in the grid, if a user then tries to see if that word is in the strands lists of words and guessess correctly they can select that word in the word list again and it will turn blue. 

When a word is found and doble clicked upon all the letters that contain that word will be removed from the word search so, turn by turn less words will be appearing as available letters of the grid are being eliminated. 

## Challenges along the way
WHen I started this I began exploring various 'jigsaw' puzzle solving algorithems. It took me a long a journey that was eeducational for me, however not beneficial for the smoothly, or rather swiftly working of this app. In essence I have a word list that would find all possible words over 4 letters long and then run through the 'puzzle'. It is as if you have a thousand pieces that all could fit in an 8 piece puzzle. The algorithms would have to essentially idelly have to try every single combination. That is very time intensive. I explored various algos that would include random mutations to see if it could more quickly stumble upon an 'optimal' solution. I may return to using algos to try to solve the strands. The other challenge however is that the span-gram is often a compound word where the first word could be shorter than 4 characters, which would mean I would have to add a new layer of complexity into the solution process. As of now. I stopped running down that rabbit trail and have settled for a user centric approach.  


## Technologies Used:

- [React](https://reactjs.org/)
- [Google Cloud Run](https://cloud.google.com/run)
- [Google Cloud Functions](https://cloud.google.com/functions)
- [Google Cloud Storage](https://cloud.google.com/storage)

## Installation

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
