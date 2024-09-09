# NYT Strands Helper

This was a fun passion project to help solving the NYT Strands word puzzle. I started on this project almost within a week of the beta version of Strands was released.

I have a backend deployed as a Google Cloud run to serve the current strand board.

Here inside the React Frontend I use a DFS to find all possible words by running over the grid recursively. The wordlist I use is over 300,000 words. The NY Times Strands editors however supply a different word list to the game each day, so many of the words my app finds will not lead to hints even if they are official words. 

## How it works
This site will grabs the current strands board based upon the users current locations time and then runs a depth first search (DFS) to find all possible words from a word list of over 300,000 words.

When a user clicks on any letter of the grid of letters a list of possible words that contain that specific letter at that location will be returned. If a user selects a word from the list, the letters of that word will appear as an outline in the grid, if a user then tries to see if that word is in the strands lists of words and guessess correctly they can select that word in the word list again and it will turn blue. 

When a word is found and double clicked upon all the letters that contain that word will be removed from the word search so, turn by turn less words will be appearing as available letters of the grid are being eliminated. 

## Challenges along the way
When I started this I began exploring various 'jigsaw' puzzle solving algorithems. It took me on a long a journey that was educational for me, however not beneficial for the smooth, or rather swift working of this app. 

In essence I have a word list that would find all possible words over 3 letters long and then run through the 'puzzle'. It is as if you have a thousand pieces that all could fit in an 8 piece puzzle. The algorithms would have to essentially have to try every single combination. That is very time intensive. I explored various algos that would include random mutations to see if it could more quickly stumble upon an 'optimal' solution. I may return to using algos to try to completely solve the strands. 

The other challenge however is that the spangram is often a compound word where the first word could be shorter than 4 characters, which would mean I would have to add a new layer of complexity into the solution process. As of now. I stopped running down that rabbit trail and have settled for a user centric approach. 

An additional challenge has been the css. For one the connecting line between letters was something I spent a bit of time pondering about. Dynamcally creating an SVG was the solution I settled for. 

The Strands website appears to serve up the 'current' strand based upon the users local time based upon thier client. My backend cloudfunction wasn't always serving the same Strands board I would see if I navigated via the browser. I had to adapt my backend to recieve the local time from the client and access the strands page using the clients local time. This was an unexpected bug that I enjoyed solving. Now a user can enjoy getting help solving the same strands puzzle 


## Technologies Used:

- [React](https://reactjs.org/)
- [Google Cloud Run](https://cloud.google.com/run)
- [Google Cloud Functions](https://cloud.google.com/functions)


## Installation

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
